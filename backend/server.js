const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let client;
let db;

async function connectDB() {
  if (db) return db;
  
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is required');
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    await client.connect();
    db = client.db('portfolio');
    
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const database = await connectDB();
    await database.admin().ping();
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: 'Connected',
      uptime: process.uptime()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Save chat message
app.post('/api/chat/message', async (req, res) => {
  try {
    const { sessionId, role, content, ipAddress, tokens, userId, metadata } = req.body;
    
    if (!sessionId || !role || !content || !ipAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId, role, content, ipAddress'
      });
    }

    const database = await connectDB();
    const collection = database.collection('Chat');
    
    // Find existing chat session or create new one
    const existingChat = await collection.findOne({ 
      sessionId, 
      ipAddress 
    });

    if (existingChat) {
      // Update existing chat
      const result = await collection.updateOne(
        { sessionId, ipAddress },
        {
          $push: {
            messages: {
              role,
              content,
              timestamp: new Date(),
              tokens: tokens || 0
            }
          },
          $set: {
            updatedAt: new Date(),
            totalTokens: (existingChat.totalTokens || 0) + (tokens || 0)
          }
        }
      );

      res.json({
        success: true,
        message: 'Message added to existing chat session',
        sessionId,
        ipAddress
      });
    } else {
      // Create new chat session
      const newChat = {
        sessionId,
        ipAddress,
        messages: [{
          role,
          content,
          timestamp: new Date(),
          tokens: tokens || 0
        }],
        createdAt: new Date(),
        updatedAt: new Date(),
        totalTokens: tokens || 0
      };

      const result = await collection.insertOne(newChat);

      res.json({
        success: true,
        message: 'New chat session created',
        sessionId,
        ipAddress,
        chatId: result.insertedId
      });
    }
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save message',
      details: error.message
    });
  }
});

// Get chat history by session ID
app.get('/api/chat/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const chat = await collection.findOne({ sessionId });
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: 'Chat session not found'
      });
    }

    res.json({
      success: true,
      data: chat
    });
  } catch (error) {
    console.error('Error fetching chat session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat session',
      details: error.message
    });
  }
});

// Get chat history by IP address
app.get('/api/chat/history/:ipAddress', async (req, res) => {
  try {
    const { ipAddress } = req.params;
    const { limit = 50 } = req.query;
    
    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const chats = await collection
      .find({ ipAddress })
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .toArray();

    res.json({
      success: true,
      data: chats,
      count: chats.length
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat history',
      details: error.message
    });
  }
});

// Search chats
app.get('/api/chat/search', async (req, res) => {
  try {
    const { query, ipAddress, limit = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const searchFilter = {
      $or: [
        { 'messages.content': { $regex: query, $options: 'i' } }
      ]
    };

    if (ipAddress) {
      searchFilter.ipAddress = ipAddress;
    }

    const chats = await collection
      .find(searchFilter)
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .toArray();

    res.json({
      success: true,
      data: chats,
      count: chats.length,
      query
    });
  } catch (error) {
    console.error('Error searching chats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search chats',
      details: error.message
    });
  }
});

// Get chat statistics by IP address
app.get('/api/chat/stats/:ipAddress', async (req, res) => {
  try {
    const { ipAddress } = req.params;
    
    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const chats = await collection.find({ ipAddress }).toArray();
    
    const stats = {
      totalSessions: chats.length,
      totalMessages: 0,
      totalTokens: 0,
      userMessages: 0,
      assistantMessages: 0,
      averageSessionLength: 0
    };

    chats.forEach(chat => {
      stats.totalMessages += chat.messages.length;
      stats.totalTokens += chat.totalTokens || 0;
      
      chat.messages.forEach(message => {
        if (message.role === 'user') {
          stats.userMessages++;
        } else if (message.role === 'assistant') {
          stats.assistantMessages++;
        }
      });
    });

    if (stats.totalSessions > 0) {
      stats.averageSessionLength = Math.round(stats.totalMessages / stats.totalSessions);
    }

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching chat stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat stats',
      details: error.message
    });
  }
});

// Delete chat sessions by IP address
app.delete('/api/chat/ip/:ipAddress', async (req, res) => {
  try {
    const { ipAddress } = req.params;
    
    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const result = await collection.deleteMany({ ipAddress });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} chat sessions for IP ${ipAddress}`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting chats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete chats',
      details: error.message
    });
  }
});

// Get unique IP addresses
app.get('/api/chat/ips', async (req, res) => {
  try {
    const { limit = 100 } = req.query;

    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const ips = await collection.distinct('ipAddress');
    const limitedIPs = ips.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: limitedIPs,
      count: limitedIPs.length,
      total: ips.length
    });
  } catch (error) {
    console.error('Error fetching IP addresses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch IP addresses',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Start server
async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔗 API base: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  if (client) {
    await client.close();
    console.log('✅ MongoDB connection closed');
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  if (client) {
    await client.close();
    console.log('✅ MongoDB connection closed');
  }
  process.exit(0);
});

startServer();
