// Vercel Serverless Function - Delete Chats by IP
// This replaces the Express.js DELETE /api/chat/ip/:ipAddress endpoint

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

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ipAddress } = req.query;
    
    if (!ipAddress) {
      return res.status(400).json({ error: 'IP address is required' });
    }

    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const result = await collection.deleteMany({ ipAddress });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} chat sessions for IP ${ipAddress}`,
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Error deleting chats:', error);
    res.status(500).json({ error: 'Failed to delete chats' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
