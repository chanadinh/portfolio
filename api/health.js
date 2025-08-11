// Vercel Serverless Function - Health Check
// This replaces the Express.js health endpoint

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
    
    // Test the connection
    await db.command({ ping: 1 });
    
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
    const database = await connectDB();
    
    res.status(200).json({
      status: 'OK',
      message: 'Portfolio Chat API is running',
      timestamp: new Date().toISOString(),
      database: database ? 'Connected' : 'Disconnected',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
