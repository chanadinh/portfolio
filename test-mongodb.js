// Test MongoDB Connection Script
// Run this with: node test-mongodb.js
// Make sure to set your actual password in the URI

const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace YOUR_ACTUAL_PASSWORD with your real MongoDB password
const uri = "mongodb+srv://chandinhjobs:YOUR_ACTUAL_PASSWORD@cluster0.mknpcws.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test database access
    const db = client.db('portfolio');
    console.log('📊 Database "portfolio" accessed successfully');
    
    // Test collection access
    const collection = db.collection('Chat');
    console.log('🗂️  Collection "Chat" accessed successfully');
    
    // Test a simple operation
    const count = await collection.countDocuments();
    console.log(`📈 Current documents in Chat collection: ${count}`);
    
    // Test ping
    await client.db("admin").command({ ping: 1 });
    console.log('🏓 Ping successful - MongoDB is responsive!');
    
    console.log('\n🎉 MongoDB connection test completed successfully!');
    console.log('📋 Your setup is ready for the chat history system.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure your password is correct');
    console.log('2. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify the cluster is running');
    console.log('4. Ensure the database user has proper permissions');
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

console.log('🚀 Starting MongoDB Connection Test...');
console.log('📍 Cluster: cluster0.mknpcws.mongodb.net');
console.log('📊 Database: portfolio');
console.log('🗂️  Collection: Chat');
console.log('');

testConnection().catch(console.dir);
