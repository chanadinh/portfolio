export class SessionManager {
  private static instance: SessionManager;
  private sessionId: string | null = null;
  private ipAddress: string | null = null;

  private constructor() {}

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  generateSessionId(ipAddress?: string): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    const sessionId = `session_${timestamp}_${randomStr}`;
    
    this.sessionId = sessionId;
    if (ipAddress) {
      this.ipAddress = ipAddress;
    }
    this.saveSessionId(sessionId);
    
    return sessionId;
  }

  getCurrentSessionId(): string | null {
    if (!this.sessionId) {
      this.sessionId = this.loadSessionId();
    }
    return this.sessionId;
  }

  getCurrentIPAddress(): string | null {
    return this.ipAddress;
  }

  setIPAddress(ipAddress: string): void {
    this.ipAddress = ipAddress;
    this.saveIPAddress(ipAddress);
  }

  private saveSessionId(sessionId: string): void {
    try {
      localStorage.setItem('medusa_chat_session_id', sessionId);
      sessionStorage.setItem('medusa_chat_session_id', sessionId);
    } catch (error) {
      console.warn('Could not save session ID to storage:', error);
    }
  }

  private saveIPAddress(ipAddress: string): void {
    try {
      localStorage.setItem('medusa_chat_ip_address', ipAddress);
      sessionStorage.setItem('medusa_chat_ip_address', ipAddress);
    } catch (error) {
      console.warn('Could not save IP address to storage:', error);
    }
  }

  private loadSessionId(): string | null {
    try {
      // Try sessionStorage first (cleared when tab closes)
      let sessionId = sessionStorage.getItem('medusa_chat_session_id');
      
      if (!sessionId) {
        // Fallback to localStorage (persists across sessions)
        sessionId = localStorage.getItem('medusa_chat_session_id');
      }
      
      return sessionId;
    } catch (error) {
      console.warn('Could not load session ID from storage:', error);
      return null;
    }
  }

  private loadIPAddress(): string | null {
    try {
      // Try sessionStorage first (cleared when tab closes)
      let ipAddress = sessionStorage.getItem('medusa_chat_ip_address');
      
      if (!ipAddress) {
        // Fallback to localStorage (persists across sessions)
        ipAddress = localStorage.getItem('medusa_chat_ip_address');
      }
      
      return ipAddress;
    } catch (error) {
      console.warn('Could not load IP address from storage:', error);
      return null;
    }
  }

  clearSession(): void {
    this.sessionId = null;
    this.ipAddress = null;
    try {
      localStorage.removeItem('medusa_chat_session_id');
      sessionStorage.removeItem('medusa_chat_session_id');
      localStorage.removeItem('medusa_chat_ip_address');
      sessionStorage.removeItem('medusa_chat_ip_address');
    } catch (error) {
      console.warn('Could not clear session data from storage:', error);
    }
  }

  isNewSession(): boolean {
    return !this.getCurrentSessionId();
  }

  getSessionInfo(): {
    sessionId: string;
    ipAddress: string | null;
    isNew: boolean;
    createdAt: Date;
  } {
    const sessionId = this.getCurrentSessionId() || this.generateSessionId();
    const ipAddress = this.getCurrentIPAddress();
    const isNew = !this.loadSessionId();
    
    return {
      sessionId,
      ipAddress,
      isNew,
      createdAt: new Date()
    };
  }

  // Generate a mock IP address for development/testing
  generateMockIPAddress(): string {
    const segments = [];
    for (let i = 0; i < 4; i++) {
      segments.push(Math.floor(Math.random() * 256));
    }
    return segments.join('.');
  }

  // Get IP address from various sources (mock for development)
  async getClientIPAddress(): Promise<string> {
    // In production, this would come from your backend/API
    // For now, we'll use a mock IP for development
    if (this.ipAddress) {
      return this.ipAddress;
    }

    // Try to get from storage
    const storedIP = this.loadIPAddress();
    if (storedIP) {
      this.ipAddress = storedIP;
      return storedIP;
    }

    // Generate mock IP for development
    const mockIP = this.generateMockIPAddress();
    this.setIPAddress(mockIP);
    return mockIP;
  }
}

export default SessionManager.getInstance();
