import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
}

export interface IChat extends Document {
  sessionId: string;
  ipAddress: string; // Primary identifier for chat sessions
  userId?: string;
  messages: IMessage[];
  totalTokens: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    userAgent?: string;
    location?: string;
    deviceInfo?: string;
    browserInfo?: string;
  };
}

const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  tokens: {
    type: Number,
    default: 0
  }
});

const ChatSchema = new Schema<IChat>({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  ipAddress: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    index: true
  },
  messages: [MessageSchema],
  totalTokens: {
    type: Number,
    default: 0
  },
  metadata: {
    userAgent: String,
    location: String,
    deviceInfo: String,
    browserInfo: String
  }
}, {
  timestamps: true
});

// Indexes for efficient querying by IP address
ChatSchema.index({ ipAddress: 1, createdAt: -1 });
ChatSchema.index({ ipAddress: 1, sessionId: 1 });
ChatSchema.index({ sessionId: 1, createdAt: -1 });
ChatSchema.index({ userId: 1, createdAt: -1 });

export const Chat = mongoose.model<IChat>('Chat', ChatSchema);

// Frontend data structure for chat history
export interface ChatHistoryItem {
  sessionId: string;
  ipAddress: string;
  lastMessage: string;
  messageCount: number;
  lastActivity: Date;
  totalTokens: number;
  userAgent?: string;
  location?: string;
}

// Search result interface
export interface ChatSearchResult {
  sessionId: string;
  ipAddress: string;
  message: IMessage;
  relevance: number;
}
