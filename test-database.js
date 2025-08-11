// Test Database Configuration Script (JavaScript version)
// Run with: node test-database.js
// Make sure to set your MongoDB URI environment variable first

const { MongoClient, ServerApiVersion } = require('mongodb');

async function testDatabaseConfig() {
  console.log('🧪 Testing Database Configuration...\n');

  // Test 1: Check if MongoDB is configured
  console.log('1️⃣  Testing MongoDB Configuration Status:');
  const mongoUri = process.env.REACT_APP_MONGODB_URI;
  const isConfigured = !!mongoUri;
  
  console.log(`   MongoDB Configured: ${isConfigured ? '✅ Yes' : '❌ No'}`);
  
  if (!isConfigured) {
    console.log('   💡 Set REACT_APP_MONGODB_URI environment variable');
    console.log('   💡 Example: export REACT_APP_MONGODB_URI="mongodb+srv://..."');
    console.log('   💡 Or create a .env file with your MongoDB URI');
    return;
  }

  // Test 2: Parse and display connection info
  console.log('\n2️⃣  Testing Connection String Parsing:');
  try {
    const uri = new URL(mongoUri);
    console.log('   📊 Connection Details:');
    console.log(`      Protocol: ${uri.protocol}`);
    console.log(`      Host: ${uri.hostname}`);
    console.log(`      Port: ${uri.port || 'default'}`);
    console.log(`      Database: ${uri.pathname.slice(1) || 'not specified'}`);
    console.log(`      Username: ${uri.username}`);
    console.log(`      Has Password: ${uri.password ? '✅ Yes' : '❌ No'}`);
    
    // Check for required parameters
    const hasRetryWrites = uri.searchParams.has('retryWrites');
    const hasW = uri.searchParams.has('w');
    const hasAppName = uri.searchParams.has('appName');
    
    console.log('\n   🔧 Connection Parameters:');
    console.log(`      retryWrites: ${hasRetryWrites ? '✅ Yes' : '❌ No'}`);
    console.log(`      w (write concern): ${hasW ? '✅ Yes' : '❌ No'}`);
    console.log(`      appName: ${hasAppName ? '✅ Yes' : '❌ No'}`);
    
  } catch (error) {
    console.log('   ❌ Error parsing connection string:', error.message);
  }

  // Test 3: Test actual connection
  console.log('\n3️⃣  Testing MongoDB Connection:');
  const client = new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  try {
    console.log('   🔌 Attempting to connect...');
    await client.connect();
    console.log('   ✅ Connection successful!');
    
    // Test database access
    const db = client.db('portfolio');
    console.log('   📊 Database "portfolio" accessed successfully');
    
    // Test collection access
    const collection = db.collection('Chat');
    console.log('   🗂️  Collection "Chat" accessed successfully');
    
    // Test ping
    await client.db("admin").command({ ping: 1 });
    console.log('   🏓 Ping successful - MongoDB is responsive!');
    
    // Test 4: Test disconnection
    console.log('\n4️⃣  Testing MongoDB Disconnection:');
    await client.close();
    console.log('   ✅ Disconnection successful!');
    
  } catch (error) {
    console.log('   ❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Check if REACT_APP_MONGODB_URI is set correctly');
    console.log('   - Verify your MongoDB Atlas cluster is running');
    console.log('   - Check if your IP is whitelisted');
    console.log('   - Verify username/password are correct');
    console.log('   - Ensure the database name is specified in the URI');
  }

  console.log('\n🎯 Database Configuration Test Complete!');
}

// Run the test
console.log('🚀 Starting Database Configuration Test...\n');
console.log('📍 Testing cluster0.mknpcws.mongodb.net configuration\n');
testDatabaseConfig().catch(console.error);
