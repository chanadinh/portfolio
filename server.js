// Express.js Backend Server for Portfolio Chat System
// Run with: node server.js
// This server handles MongoDB operations and provides API endpoints

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.REACT_APP_MONGODB_URI || process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MongoDB URI not found in environment variables!');
  console.log('💡 Set REACT_APP_MONGODB_URI environment variable first');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log('✅ MongoDB connection verified');
    
    return client.db('portfolio');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

// Initialize database connection
let db;
connectDB().then(database => {
  db = database;
  console.log('🚀 Database connection established');
}).catch(console.error);

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio Chat API is running',
    timestamp: new Date().toISOString(),
    database: db ? 'Connected' : 'Disconnected'
  });
});

// Save chat message
app.post('/api/chat/message', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { sessionId, role, content, ipAddress, tokens, userId, metadata } = req.body;
    
    if (!sessionId || !role || !content || !ipAddress) {
      return res.status(400).json({ 
        error: 'Missing required fields: sessionId, role, content, ipAddress' 
      });
    }

    const collection = db.collection('Chat');
    
    // Try to find existing chat session by IP address first, then by sessionId
    let chat = await collection.findOne({ 
      $or: [
        { ipAddress, sessionId },
        { ipAddress }
      ]
    });

    const message = {
      role,
      content,
      timestamp: new Date(),
      tokens: tokens || 0
    };

    if (chat) {
      // Add message to existing session
      chat.messages.push(message);
      chat.totalTokens += (tokens || 0);
      if (metadata) {
        chat.metadata = { ...chat.metadata, ...metadata };
      }
      // Update sessionId if it changed
      if (chat.sessionId !== sessionId) {
        chat.sessionId = sessionId;
      }
      
      await collection.replaceOne({ _id: chat._id }, chat);
    } else {
      // Create new chat session
      const newChat = {
        sessionId,
        ipAddress,
        userId,
        messages: [message],
        totalTokens: tokens || 0,
        metadata,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await collection.insertOne(newChat);
    }

    res.json({ 
      success: true, 
      message: 'Message saved successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get chat history by IP address
app.get('/api/chat/history/:ipAddress', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { ipAddress } = req.params;
    const { limit = 50 } = req.query;
    
    const collection = db.collection('Chat');
    const chats = await collection.find({ ipAddress })
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .toArray();

    res.json({
      success: true,
      data: chats,
      count: chats.length,
      ipAddress
    });
    
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Get chat history by session ID
app.get('/api/chat/session/:sessionId', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { sessionId } = req.params;
    
    const collection = db.collection('Chat');
    const chat = await collection.findOne({ sessionId });

    if (!chat) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      success: true,
      data: chat
    });
    
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// Search chats by content
app.get('/api/chat/search', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { query, ipAddress, limit = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const collection = db.collection('Chat');
    
    const searchQuery = {
      'messages.content': { $regex: query, $options: 'i' }
    };

    if (ipAddress) {
      searchQuery.ipAddress = ipAddress;
    }

    const chats = await collection.find(searchQuery)
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
    res.status(500).json({ error: 'Failed to search chats' });
  }
});

// Get chat statistics by IP address
app.get('/api/chat/stats/:ipAddress', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { ipAddress } = req.params;
    
    const collection = db.collection('Chat');
    const chats = await collection.find({ ipAddress }).sort({ createdAt: 1 }).toArray();
    
    if (chats.length === 0) {
      return res.json({
        success: true,
        data: {
          totalSessions: 0,
          totalMessages: 0,
          totalTokens: 0,
          averageMessagesPerSession: 0,
          firstSeen: null,
          lastSeen: null
        }
      });
    }

    const totalMessages = chats.reduce((sum, chat) => sum + chat.messages.length, 0);
    const totalTokens = chats.reduce((sum, chat) => sum + chat.totalTokens, 0);
    const firstSeen = chats[0].createdAt;
    const lastSeen = chats[chats.length - 1].updatedAt;

    const stats = {
      totalSessions: chats.length,
      totalMessages,
      totalTokens,
      averageMessagesPerSession: Math.round(totalMessages / chats.length * 100) / 100,
      firstSeen,
      lastSeen
    };

    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Error fetching chat stats:', error);
    res.status(500).json({ error: 'Failed to fetch chat stats' });
  }
});

// Delete chats by IP address
app.delete('/api/chat/ip/:ipAddress', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { ipAddress } = req.params;
    
    const collection = db.collection('Chat');
    const result = await collection.deleteMany({ ipAddress });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} chat sessions for IP ${ipAddress}`,
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Error deleting chats:', error);
    res.status(500).json({ error: 'Failed to delete chats' });
  }
});

// Get unique IP addresses
app.get('/api/chat/ips', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { limit = 100 } = req.query;
    
    const collection = db.collection('Chat');
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
    res.status(500).json({ error: 'Failed to fetch IP addresses' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Chat API Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
  process.exit(0);
});
