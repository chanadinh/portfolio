// Vercel Serverless Function - Save Chat Message
// This replaces the Express.js POST /api/chat/message endpoint

const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, role, content, ipAddress, tokens, userId, metadata } = req.body;
    
    if (!sessionId || !role || !content || !ipAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId, role, content, ipAddress'
      });
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is required');
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    const database = client.db('portfolio');
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

      await client.close();

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
      await client.close();

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
};
