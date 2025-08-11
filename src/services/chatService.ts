// Chat Service - Frontend API Client
// This service communicates with the backend API server
// The backend handles MongoDB operations

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-vercel-domain.vercel.app/api';

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async saveMessage(
    sessionId: string,
    role: 'user' | 'assistant',
    content: string,
    ipAddress: string,
    tokens?: number,
    userId?: string,
    metadata?: any
  ): Promise<any> {
    const payload = {
      sessionId,
      role,
      content,
      ipAddress,
      tokens,
      userId,
      metadata
    };

    return this.makeRequest('/chat/message', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async getChatHistory(sessionId: string): Promise<any> {
    return this.makeRequest(`/chat/session/${sessionId}`);
  }

  async getChatHistoryByIP(ipAddress: string, limit: number = 50): Promise<any> {
    return this.makeRequest(`/chat/history/${ipAddress}?limit=${limit}`);
  }

  async getUserChatHistory(userId: string, limit: number = 50): Promise<any> {
    // Note: This would need to be implemented on the backend
    // For now, we'll return an empty array
    console.warn('getUserChatHistory not implemented in backend yet');
    return { success: true, data: [] };
  }

  async getSessionChatHistory(sessionId: string, limit: number = 100): Promise<any> {
    const result = await this.makeRequest(`/chat/session/${sessionId}`);
    return result.data?.messages || [];
  }

  async deleteChat(sessionId: string): Promise<boolean> {
    // Note: This would need to be implemented on the backend
    console.warn('deleteChat not implemented in backend yet');
    return false;
  }

  async deleteChatsByIP(ipAddress: string): Promise<number> {
    const result = await this.makeRequest(`/chat/ip/${ipAddress}`, {
      method: 'DELETE'
    });
    return result.deletedCount || 0;
  }

  async deleteUserChats(userId: string): Promise<number> {
    // Note: This would need to be implemented on the backend
    console.warn('deleteUserChats not implemented in backend yet');
    return 0;
  }

  async getChatStats(sessionId: string): Promise<any> {
    const result = await this.makeRequest(`/chat/session/${sessionId}`);
    if (!result.data) {
      return {
        totalMessages: 0,
        totalTokens: 0,
        userMessages: 0,
        assistantMessages: 0,
        sessionDuration: 0
      };
    }

    const chat = result.data;
    const userMessages = chat.messages.filter((m: any) => m.role === 'user').length;
    const assistantMessages = chat.messages.filter((m: any) => m.role === 'assistant').length;
    const sessionDuration = new Date(chat.updatedAt).getTime() - new Date(chat.createdAt).getTime();

    return {
      totalMessages: chat.messages.length,
      totalTokens: chat.totalTokens,
      userMessages,
      assistantMessages,
      sessionDuration
    };
  }

  async getChatStatsByIP(ipAddress: string): Promise<any> {
    return this.makeRequest(`/chat/stats/${ipAddress}`);
  }

  async searchChats(query: string, userId?: string, ipAddress?: string): Promise<any> {
    const params = new URLSearchParams({ query });
    if (ipAddress) params.append('ipAddress', ipAddress);
    
    return this.makeRequest(`/chat/search?${params.toString()}`);
  }

  async getUniqueIPs(limit: number = 100): Promise<string[]> {
    const result = await this.makeRequest(`/chat/ips?limit=${limit}`);
    return result.data || [];
  }

  async getIPActivitySummary(limit: number = 50): Promise<any> {
    // Note: This would need to be implemented on the backend
    // For now, we'll return an empty array
    console.warn('getIPActivitySummary not implemented in backend yet');
    return [];
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.makeRequest('/health');
      return result.status === 'OK';
    } catch (error) {
      return false;
    }
  }
}

export default ChatService.getInstance();
