// Vercel Serverless Function - Save Chat Message
// This replaces the Express.js POST /api/chat/message endpoint

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.REACT_APP_MONGODB_URI || process.env.MONGODB_URI;

let client;
let db;

async function connectDB() {
  if (db) return db;
  
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    await client.connect();
    db = client.db('portfolio');
    
    return db;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
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
        error: 'Missing required fields: sessionId, role, content, ipAddress' 
      });
    }

    const database = await connectDB();
    const collection = database.collection('Chat');
    
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

    res.status(200).json({ 
      success: true, 
      message: 'Message saved successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
