// Test Database Configuration Script
// Run with: npx ts-node test-database.ts
// Or compile first: npx tsc test-database.ts && node test-database.js

import { connectDB, disconnectDB, getDBInfo, isMongoDBConfigured } from './src/config/database';

async function testDatabaseConfig() {
  console.log('🧪 Testing Database Configuration...\n');

  // Test 1: Check if MongoDB is configured
  console.log('1️⃣  Testing MongoDB Configuration Status:');
  const isConfigured = isMongoDBConfigured();
  console.log(`   MongoDB Configured: ${isConfigured ? '✅ Yes' : '❌ No'}`);
  
  if (!isConfigured) {
    console.log('   💡 Set REACT_APP_MONGODB_URI environment variable');
    console.log('   💡 Example: export REACT_APP_MONGODB_URI="mongodb+srv://..."');
    return;
  }

  // Test 2: Get database info
  console.log('\n2️⃣  Testing Database Info:');
  try {
    const dbInfo = getDBInfo();
    console.log('   📊 Database Info:');
    console.log(`      Database: ${dbInfo.database}`);
    console.log(`      Collection: ${dbInfo.collection}`);
    console.log(`      Cluster: ${dbInfo.cluster}`);
    console.log(`      Connection Status: ${dbInfo.connectionStatus}`);
    console.log(`      Is Configured: ${dbInfo.isConfigured}`);
  } catch (error) {
    console.log('   ❌ Error getting database info:', error);
  }

  // Test 3: Test connection
  console.log('\n3️⃣  Testing MongoDB Connection:');
  try {
    console.log('   🔌 Attempting to connect...');
    await connectDB();
    console.log('   ✅ Connection successful!');
    
    // Test 4: Test disconnection
    console.log('\n4️⃣  Testing MongoDB Disconnection:');
    await disconnectDB();
    console.log('   ✅ Disconnection successful!');
    
  } catch (error) {
    console.log('   ❌ Connection failed:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Check if REACT_APP_MONGODB_URI is set correctly');
    console.log('   - Verify your MongoDB Atlas cluster is running');
    console.log('   - Check if your IP is whitelisted');
    console.log('   - Verify username/password are correct');
  }

  console.log('\n🎯 Database Configuration Test Complete!');
}

// Run the test
console.log('🚀 Starting Database Configuration Test...\n');
testDatabaseConfig().catch(console.error);
