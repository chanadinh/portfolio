import { IMessage, IChat } from '../models/Chat';

// This service can be easily adapted for backend integration
// For now, it uses localStorage as a fallback when MongoDB is not available

export class ApiService {
  private static instance: ApiService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL || '';
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Save message to backend (or localStorage fallback)
  async saveMessage(
    sessionId: string,
    role: 'user' | 'assistant',
    content: string,
    tokens?: number,
    userId?: string,
    metadata?: any
  ): Promise<IChat | null> {
    try {
      if (this.baseUrl) {
        // Backend API call
        const response = await fetch(`${this.baseUrl}/api/chat/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            role,
            content,
            tokens,
            userId,
            metadata
          })
        });

        if (response.ok) {
          return await response.json();
        }
      }
    } catch (error) {
      console.warn('Backend API not available, using localStorage fallback:', error);
    }

    // Fallback to localStorage
    return this.saveToLocalStorage(sessionId, role, content, tokens, userId, metadata);
  }

  // Get chat history from backend (or localStorage fallback)
  async getChatHistory(sessionId: string): Promise<IChat | null> {
    try {
      if (this.baseUrl) {
        // Backend API call
        const response = await fetch(`${this.baseUrl}/api/chat/history/${sessionId}`);
        
        if (response.ok) {
          return await response.json();
        }
      }
    } catch (error) {
      console.warn('Backend API not available, using localStorage fallback:', error);
    }

    // Fallback to localStorage
    return this.getFromLocalStorage(sessionId);
  }

  // Search chats from backend (or localStorage fallback)
  async searchChats(query: string, userId?: string): Promise<IChat[]> {
    try {
      if (this.baseUrl) {
        // Backend API call
        const params = new URLSearchParams({ q: query });
        if (userId) params.append('userId', userId);
        
        const response = await fetch(`${this.baseUrl}/api/chat/search?${params}`);
        
        if (response.ok) {
          return await response.json();
        }
      }
    } catch (error) {
      console.warn('Backend API not available, using localStorage fallback:', error);
    }

    // Fallback to localStorage
    return this.searchLocalStorage(query, userId);
  }

  // Delete chat from backend (or localStorage fallback)
  async deleteChat(sessionId: string): Promise<boolean> {
    try {
      if (this.baseUrl) {
        // Backend API call
        const response = await fetch(`${this.baseUrl}/api/chat/sessions/${sessionId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          return true;
        }
      }
    } catch (error) {
      console.warn('Backend API not available, using localStorage fallback:', error);
    }

    // Fallback to localStorage
    return this.deleteFromLocalStorage(sessionId);
  }

  // LocalStorage fallback methods
  private saveToLocalStorage(
    sessionId: string,
    role: 'user' | 'assistant',
    content: string,
    tokens?: number,
    userId?: string,
    metadata?: any
  ): IChat | null {
    try {
      const storageKey = `chat_${sessionId}`;
      const existing = localStorage.getItem(storageKey);
      
      const message: IMessage = {
        role,
        content,
        timestamp: new Date(),
        tokens: tokens || 0
      };

      let chat: IChat;
      
      if (existing) {
        chat = JSON.parse(existing);
        chat.messages.push(message);
        chat.totalTokens += (tokens || 0);
        if (metadata) {
          chat.metadata = { ...chat.metadata, ...metadata };
        }
        chat.updatedAt = new Date();
      } else {
        chat = {
          _id: sessionId,
          sessionId,
          userId,
          messages: [message],
          totalTokens: tokens || 0,
          metadata,
          createdAt: new Date(),
          updatedAt: new Date()
        } as IChat;
      }

      localStorage.setItem(storageKey, JSON.stringify(chat));
      return chat;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return null;
    }
  }

  private getFromLocalStorage(sessionId: string): IChat | null {
    try {
      const storageKey = `chat_${sessionId}`;
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  private searchLocalStorage(query: string, userId?: string): IChat[] {
    try {
      const results: IChat[] = [];
      const queryLower = query.toLowerCase();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('chat_')) {
          try {
            const chat = JSON.parse(localStorage.getItem(key) || '{}');
            
            // Check if chat matches search criteria
            const hasMatchingContent = chat.messages?.some((msg: IMessage) =>
              msg.content.toLowerCase().includes(queryLower)
            );

            if (hasMatchingContent && (!userId || chat.userId === userId)) {
              results.push(chat);
            }
          } catch (e) {
            // Skip invalid entries
          }
        }
      }

      return results.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } catch (error) {
      console.error('Error searching localStorage:', error);
      return [];
    }
  }

  private deleteFromLocalStorage(sessionId: string): boolean {
    try {
      const storageKey = `chat_${sessionId}`;
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
      return false;
    }
  }
}

export default ApiService.getInstance();
