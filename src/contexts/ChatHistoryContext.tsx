import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { IMessage } from '../models/Chat';
import sessionManager from '../utils/sessionManager';

interface ChatHistoryState {
  messages: IMessage[];
  sessionId: string;
  ipAddress: string | null;
  isLoading: boolean;
  error: string | null;
  stats: {
    totalMessages: number;
    totalTokens: number;
    userMessages: number;
    assistantMessages: number;
  };
}

type ChatHistoryAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: IMessage }
  | { type: 'SET_MESSAGES'; payload: IMessage[] }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'UPDATE_STATS'; payload: Partial<ChatHistoryState['stats']> }
  | { type: 'SET_SESSION'; payload: { sessionId: string; ipAddress?: string } }
  | { type: 'SET_IP_ADDRESS'; payload: string };

const initialState: ChatHistoryState = {
  messages: [],
  sessionId: sessionManager.getCurrentSessionId() || sessionManager.generateSessionId(),
  ipAddress: sessionManager.getCurrentIPAddress(),
  isLoading: false,
  error: null,
  stats: {
    totalMessages: 0,
    totalTokens: 0,
    userMessages: 0,
    assistantMessages: 0
  }
};

function chatHistoryReducer(state: ChatHistoryState, action: ChatHistoryAction): ChatHistoryState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'ADD_MESSAGE':
      const newMessages = [...state.messages, action.payload];
      const newStats = {
        ...state.stats,
        totalMessages: newMessages.length,
        totalTokens: newMessages.reduce((sum, msg) => sum + (msg.tokens || 0), 0),
        userMessages: newMessages.filter(m => m.role === 'user').length,
        assistantMessages: newMessages.filter(m => m.role === 'assistant').length
      };
      
      return {
        ...state,
        messages: newMessages,
        stats: newStats
      };
    
    case 'SET_MESSAGES':
      const messages = action.payload;
      const stats = {
        totalMessages: messages.length,
        totalTokens: messages.reduce((sum, msg) => sum + (msg.tokens || 0), 0),
        userMessages: messages.filter(m => m.role === 'user').length,
        assistantMessages: messages.filter(m => m.role === 'assistant').length
      };
      
      return {
        ...state,
        messages,
        stats
      };
    
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
        stats: {
          totalMessages: 0,
          totalTokens: 0,
          userMessages: 0,
          assistantMessages: 0
        }
      };
    
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      };
    
    case 'SET_SESSION':
      return {
        ...state,
        sessionId: action.payload.sessionId,
        ipAddress: action.payload.ipAddress || state.ipAddress
      };

    case 'SET_IP_ADDRESS':
      return {
        ...state,
        ipAddress: action.payload
      };
    
    default:
      return state;
  }
}

interface ChatHistoryContextType {
  state: ChatHistoryState;
  dispatch: React.Dispatch<ChatHistoryAction>;
  addMessage: (message: Omit<IMessage, 'timestamp'>) => void;
  clearHistory: () => void;
  newSession: () => void;
  setIPAddress: (ipAddress: string) => void;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
};

interface ChatHistoryProviderProps {
  children: ReactNode;
}

export const ChatHistoryProvider: React.FC<ChatHistoryProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatHistoryReducer, initialState);

  const addMessage = (message: Omit<IMessage, 'timestamp'>) => {
    const newMessage: IMessage = {
      ...message,
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  const newSession = async () => {
    const ipAddress = await sessionManager.getClientIPAddress();
    const newSessionId = sessionManager.generateSessionId(ipAddress);
    dispatch({ type: 'SET_SESSION', payload: { sessionId: newSessionId, ipAddress } });
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  const setIPAddress = (ipAddress: string) => {
    sessionManager.setIPAddress(ipAddress);
    dispatch({ type: 'SET_IP_ADDRESS', payload: ipAddress });
  };

  // Initialize session and IP address on mount
  useEffect(() => {
    const initializeSession = async () => {
      if (!state.sessionId) {
        const ipAddress = await sessionManager.getClientIPAddress();
        const sessionId = sessionManager.generateSessionId(ipAddress);
        dispatch({ type: 'SET_SESSION', payload: { sessionId, ipAddress } });
      } else if (!state.ipAddress) {
        const ipAddress = await sessionManager.getClientIPAddress();
        dispatch({ type: 'SET_IP_ADDRESS', payload: ipAddress });
      }
    };

    initializeSession();
  }, [state.sessionId, state.ipAddress]);

  const value: ChatHistoryContextType = {
    state,
    dispatch,
    addMessage,
    clearHistory,
    newSession,
    setIPAddress
  };

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
};
