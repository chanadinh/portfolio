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

    // Try to find existing chat session
    let chat = await Chat.findOne({ sessionId });

    if (chat) {
      // Add message to existing session
      chat.messages.push(message);
      chat.totalTokens += (tokens || 0);
      if (metadata) {
        chat.metadata = { ...chat.metadata, ...metadata };
      }
    } else {
      // Create new chat session
      chat = new Chat({
        sessionId,
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

  async searchChats(query: string, userId?: string): Promise<IChat[]> {
    await connectDB();
    
    const searchQuery: any = {
      'messages.content': { $regex: query, $options: 'i' }
    };

    if (userId) {
      searchQuery.userId = userId;
    }

    return await Chat.find(searchQuery)
      .sort({ updatedAt: -1 })
      .limit(20);
  }
}

export default ChatService.getInstance();
