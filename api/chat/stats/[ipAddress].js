// Vercel Serverless Function - Get Chat Stats by IP
// This replaces the Express.js GET /api/chat/stats/:ipAddress endpoint

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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ipAddress } = req.query;
    
    if (!ipAddress) {
      return res.status(400).json({ error: 'IP address is required' });
    }

    const database = await connectDB();
    const collection = database.collection('Chat');
    
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

    res.status(200).json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Error fetching chat stats:', error);
    res.status(500).json({ error: 'Failed to fetch chat stats' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
