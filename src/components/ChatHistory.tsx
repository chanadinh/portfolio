import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Search, 
  Trash2, 
  RefreshCw, 
  MessageSquare, 
  User, 
  Bot,
  Calendar,
  Clock,
  BarChart3,
  Globe,
  Database,
  Filter
} from 'lucide-react';
import { useChatHistory } from '../contexts/ChatHistoryContext';
import { IMessage, IChat } from '../models/Chat';
import chatService from '../services/chatService';
import sessionManager from '../utils/sessionManager';

interface ChatHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ isOpen, onClose }) => {
  const { state, clearHistory, newSession } = useChatHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<IMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [databaseChats, setDatabaseChats] = useState<IChat[]>([]);
  const [isLoadingDatabase, setIsLoadingDatabase] = useState(false);
  const [viewMode, setViewMode] = useState<'current' | 'database'>('current');
  const [ipFilter, setIpFilter] = useState<string>('');

  // Load database chats when component mounts
  useEffect(() => {
    if (isOpen && viewMode === 'database') {
      loadDatabaseChats();
    }
  }, [isOpen, viewMode]);

  const loadDatabaseChats = async () => {
    if (!state.ipAddress) return;
    
    setIsLoadingDatabase(true);
    try {
      const chats = await chatService.getChatHistoryByIP(state.ipAddress);
      setDatabaseChats(chats);
    } catch (error) {
      console.error('Failed to load database chats:', error);
    } finally {
      setIsLoadingDatabase(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMessages(state.messages);
    } else {
      const filtered = state.messages.filter(message =>
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchQuery, state.messages]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return timestamp.toLocaleDateString();
  };

  const getMessageIcon = (role: 'user' | 'assistant') => {
    return role === 'user' ? (
      <User className="w-4 h-4 text-blue-600" />
    ) : (
      <Bot className="w-4 h-4 text-purple-600" />
    );
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      clearHistory();
    }
  };

  const handleNewSession = () => {
    if (state.messages.length > 0) {
      if (window.confirm('Start a new session? Current chat will be cleared.')) {
        newSession();
      }
    } else {
      newSession();
    }
  };

  const handleClearDatabaseChats = async () => {
    if (!state.ipAddress) return;
    
    if (window.confirm(`Are you sure you want to clear all chat history for IP ${state.ipAddress}? This action cannot be undone.`)) {
      try {
        await chatService.deleteChatsByIP(state.ipAddress);
        setDatabaseChats([]);
      } catch (error) {
        console.error('Failed to clear database chats:', error);
      }
    }
  };

  const renderCurrentSession = () => (
    <>
      {/* Stats */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="font-semibold">{state.stats.totalMessages}</div>
          <div className="text-blue-100">Messages</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{state.stats.totalTokens}</div>
          <div className="text-blue-100">Tokens</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{state.stats.userMessages}</div>
          <div className="text-blue-100">User</div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={handleNewSession}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">New Session</span>
          </button>
          <button
            onClick={handleClearHistory}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear All</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No messages yet</p>
            <p className="text-sm">Start a conversation to see history here</p>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                selectedMessage === message ? 'bg-blue-50 border border-blue-200' : ''
              }`}
              onClick={() => setSelectedMessage(message === selectedMessage ? null : message)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getMessageIcon(message.role)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${
                      message.role === 'user' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {message.role === 'user' ? 'You' : 'Medusa'}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(message.timestamp)}</span>
                      {message.tokens && (
                        <>
                          <BarChart3 className="w-3 h-3" />
                          <span>{message.tokens} tokens</span>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {message.content}
                  </p>
                </div>
              </div>
              
              {/* Expanded message view */}
              <AnimatePresence>
                {selectedMessage === message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-200"
                  >
                    <div className="text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {message.timestamp.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </>
  );

  const renderDatabaseSessions = () => (
    <>
      {/* IP Address Info */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 text-blue-800">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Current IP: {state.ipAddress || 'Unknown'}</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search database chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={loadDatabaseChats}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
          >
            <Database className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
          <button
            onClick={handleClearDatabaseChats}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear DB</span>
          </button>
        </div>
      </div>

      {/* Database Sessions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoadingDatabase ? (
          <div className="text-center text-gray-500 py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Loading database chats...</p>
          </div>
        ) : databaseChats.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Database className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No database chats found</p>
            <p className="text-sm">Chats will appear here after you send messages</p>
          </div>
        ) : (
          databaseChats.map((chat, index) => (
            <motion.div
              key={chat._id?.toString() || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-mono text-gray-600">{chat.ipAddress}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(chat.updatedAt)}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Session:</span> {chat.sessionId.substring(0, 20)}...
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{chat.messages.length} messages</span>
                <span>{chat.totalTokens} tokens</span>
                <span>Created: {formatTimestamp(chat.createdAt)}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-md border-l border-gray-200 shadow-2xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Chat History</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* View Mode Toggle */}
            <div className="mt-3 flex space-x-1 bg-white/20 rounded-lg p-1">
              <button
                onClick={() => setViewMode('current')}
                className={`flex-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'current' 
                    ? 'bg-white text-blue-600' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Current
              </button>
              <button
                onClick={() => setViewMode('database')}
                className={`flex-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'database' 
                    ? 'bg-white text-blue-600' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Database
              </button>
            </div>
          </div>

          {/* Content based on view mode */}
          {viewMode === 'current' ? renderCurrentSession() : renderDatabaseSessions()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatHistory;
