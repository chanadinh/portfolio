import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
}

export interface IChat extends Document {
  sessionId: string;
  userId?: string;
  messages: IMessage[];
  totalTokens: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    location?: string;
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
    ipAddress: String,
    location: String
  }
}, {
  timestamps: true
});

// Index for efficient querying
ChatSchema.index({ sessionId: 1, createdAt: -1 });
ChatSchema.index({ userId: 1, createdAt: -1 });

export const Chat = mongoose.model<IChat>('Chat', ChatSchema);

// Frontend data structure for chat history
export interface ChatHistoryItem {
  sessionId: string;
  lastMessage: string;
  messageCount: number;
  lastActivity: Date;
  totalTokens: number;
}

// Search result interface
export interface ChatSearchResult {
  sessionId: string;
  message: IMessage;
  relevance: number;
}
