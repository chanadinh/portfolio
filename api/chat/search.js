// Vercel Serverless Function - Search Chats
// This replaces the Express.js GET /api/chat/search endpoint

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
    const { query, ipAddress, limit = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const database = await connectDB();
    const collection = database.collection('Chat');
    
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

    res.status(200).json({
      success: true,
      data: chats,
      count: chats.length,
      query
    });
    
  } catch (error) {
    console.error('Error searching chats:', error);
    res.status(500).json({ error: 'Failed to search chats' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
