// Vercel Serverless Function - Get Unique IP Addresses
// This replaces the Express.js GET /api/chat/ips endpoint

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
    const { limit = 100 } = req.query;

    const database = await connectDB();
    const collection = database.collection('Chat');
    
    const ips = await collection.distinct('ipAddress');
    const limitedIPs = ips.slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      data: limitedIPs,
      count: limitedIPs.length,
      total: ips.length
    });
    
  } catch (error) {
    console.error('Error fetching IP addresses:', error);
    res.status(500).json({ error: 'Failed to fetch IP addresses' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
