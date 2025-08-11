import { Chat, IChat, IMessage } from '../models/Chat';
import { connectDB } from '../config/database';

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async saveMessage(
    sessionId: string,
    role: 'user' | 'assistant',
    content: string,
    ipAddress: string, // Required IP address
    tokens?: number,
    userId?: string,
    metadata?: any
  ): Promise<IChat> {
    await connectDB();

    const message: IMessage = {
      role,
      content,
      timestamp: new Date(),
      tokens: tokens || 0
    };

    // Try to find existing chat session by IP address first, then by sessionId
    let chat = await Chat.findOne({ 
      $or: [
        { ipAddress, sessionId },
        { ipAddress }
      ]
    });

    if (chat) {
      // Add message to existing session
      chat.messages.push(message);
      chat.totalTokens += (tokens || 0);
      if (metadata) {
        chat.metadata = { ...chat.metadata, ...metadata };
      }
      // Update sessionId if it changed
      if (chat.sessionId !== sessionId) {
        chat.sessionId = sessionId;
      }
    } else {
      // Create new chat session
      chat = new Chat({
        sessionId,
        ipAddress,
        userId,
        messages: [message],
        totalTokens: tokens || 0,
        metadata
      });
    }

    return await chat.save();
  }

  async getChatHistory(sessionId: string): Promise<IChat | null> {
    await connectDB();
    return await Chat.findOne({ sessionId }).sort({ createdAt: -1 });
  }

  async getChatHistoryByIP(ipAddress: string, limit: number = 50): Promise<IChat[]> {
    await connectDB();
    return await Chat.find({ ipAddress })
      .sort({ updatedAt: -1 })
      .limit(limit);
  }

  async getUserChatHistory(userId: string, limit: number = 50): Promise<IChat[]> {
    await connectDB();
    return await Chat.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(limit);
  }

  async getSessionChatHistory(sessionId: string, limit: number = 100): Promise<IMessage[]> {
    await connectDB();
    const chat = await Chat.findOne({ sessionId })
      .select('messages')
      .sort({ 'messages.timestamp': -1 })
      .limit(limit);
    
    return chat?.messages || [];
  }

  async deleteChat(sessionId: string): Promise<boolean> {
    await connectDB();
    const result = await Chat.deleteOne({ sessionId });
    return result.deletedCount > 0;
  }

  async deleteChatsByIP(ipAddress: string): Promise<number> {
    await connectDB();
    const result = await Chat.deleteMany({ ipAddress });
    return result.deletedCount;
  }

  async deleteUserChats(userId: string): Promise<number> {
    await connectDB();
    const result = await Chat.deleteMany({ userId });
    return result.deletedCount;
  }

  async getChatStats(sessionId: string): Promise<{
    totalMessages: number;
    totalTokens: number;
    userMessages: number;
    assistantMessages: number;
    sessionDuration: number;
  }> {
    await connectDB();
    const chat = await Chat.findOne({ sessionId });
    
    if (!chat) {
      return {
        totalMessages: 0,
        totalTokens: 0,
        userMessages: 0,
        assistantMessages: 0,
        sessionDuration: 0
      };
    }

    const userMessages = chat.messages.filter(m => m.role === 'user').length;
    const assistantMessages = chat.messages.filter(m => m.role === 'assistant').length;
    const sessionDuration = chat.updatedAt.getTime() - chat.createdAt.getTime();

    return {
      totalMessages: chat.messages.length,
      totalTokens: chat.totalTokens,
      userMessages,
      assistantMessages,
      sessionDuration
    };
  }

  async getChatStatsByIP(ipAddress: string): Promise<{
    totalSessions: number;
    totalMessages: number;
    totalTokens: number;
    averageMessagesPerSession: number;
    firstSeen: Date | null;
    lastSeen: Date | null;
  }> {
    await connectDB();
    const chats = await Chat.find({ ipAddress }).sort({ createdAt: 1 });
    
    if (chats.length === 0) {
      return {
        totalSessions: 0,
        totalMessages: 0,
        totalTokens: 0,
        averageMessagesPerSession: 0,
        firstSeen: null,
        lastSeen: null
      };
    }

    const totalMessages = chats.reduce((sum, chat) => sum + chat.messages.length, 0);
    const totalTokens = chats.reduce((sum, chat) => sum + chat.totalTokens, 0);
    const firstSeen = chats[0].createdAt;
    const lastSeen = chats[chats.length - 1].updatedAt;

    return {
      totalSessions: chats.length,
      totalMessages,
      totalTokens,
      averageMessagesPerSession: Math.round(totalMessages / chats.length * 100) / 100,
      firstSeen,
      lastSeen
    };
  }

  async searchChats(query: string, userId?: string, ipAddress?: string): Promise<IChat[]> {
    await connectDB();
    
    const searchQuery: any = {
      'messages.content': { $regex: query, $options: 'i' }
    };

    if (userId) {
      searchQuery.userId = userId;
    }

    if (ipAddress) {
      searchQuery.ipAddress = ipAddress;
    }

    return await Chat.find(searchQuery)
      .sort({ updatedAt: -1 })
      .limit(20);
  }

  async getUniqueIPs(limit: number = 100): Promise<string[]> {
    await connectDB();
    const ips = await Chat.distinct('ipAddress');
    return ips.slice(0, limit);
  }

  async getIPActivitySummary(limit: number = 50): Promise<Array<{
    ipAddress: string;
    totalSessions: number;
    totalMessages: number;
    lastActivity: Date;
  }>> {
    await connectDB();
    
    const pipeline: any[] = [
      { $group: {
        _id: '$ipAddress',
        totalSessions: { $sum: 1 },
        totalMessages: { $sum: { $size: '$messages' } },
        lastActivity: { $max: '$updatedAt' }
      }},
      { $sort: { lastActivity: -1 } },
      { $limit: limit },
      { $project: {
        _id: 0,
        ipAddress: '$_id',
        totalSessions: 1,
        totalMessages: 1,
        lastActivity: 1
      }}
    ];

    return await Chat.aggregate(pipeline);
  }
}

export default ChatService.getInstance();
