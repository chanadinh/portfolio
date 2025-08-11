export class SessionManager {
  private static instance: SessionManager;
  private sessionId: string | null = null;

  private constructor() {}

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  generateSessionId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    const sessionId = `session_${timestamp}_${randomStr}`;
    
    this.sessionId = sessionId;
    this.saveSessionId(sessionId);
    
    return sessionId;
  }

  getCurrentSessionId(): string | null {
    if (!this.sessionId) {
      this.sessionId = this.loadSessionId();
    }
    return this.sessionId;
  }

  private saveSessionId(sessionId: string): void {
    try {
      localStorage.setItem('medusa_chat_session_id', sessionId);
      sessionStorage.setItem('medusa_chat_session_id', sessionId);
    } catch (error) {
      console.warn('Could not save session ID to storage:', error);
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

  clearSession(): void {
    this.sessionId = null;
    try {
      localStorage.removeItem('medusa_chat_session_id');
      sessionStorage.removeItem('medusa_chat_session_id');
    } catch (error) {
      console.warn('Could not clear session ID from storage:', error);
    }
  }

  isNewSession(): boolean {
    return !this.getCurrentSessionId();
  }

  getSessionInfo(): {
    sessionId: string;
    isNew: boolean;
    createdAt: Date;
  } {
    const sessionId = this.getCurrentSessionId() || this.generateSessionId();
    const isNew = !this.loadSessionId();
    
    return {
      sessionId,
      isNew,
      createdAt: new Date()
    };
  }
}

export default SessionManager.getInstance();
