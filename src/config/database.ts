import mongoose from 'mongoose';

// MongoDB Atlas connection string - MUST be set in environment variables
const MONGODB_URI = process.env.REACT_APP_MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('⚠️  REACT_APP_MONGODB_URI not set. Chat history will not work.');
  console.log('💡 Set this in Vercel environment variables for production.');
  console.log('💡 For local development, create a .env file with your MongoDB URI.');
}

export const connectDB = async (): Promise<void> => {
  if (!MONGODB_URI) {
    console.error('❌ MongoDB URI not configured. Cannot connect to database.');
    throw new Error('REACT_APP_MONGODB_URI environment variable is not set');
  }

  try {
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB already connected');
      return;
    }

    // Connect to MongoDB Atlas with proper options
    await mongoose.connect(MONGODB_URI, {
      serverApi: {
        version: '1' as any,
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Atlas connected successfully to cluster0.mknpcws.mongodb.net');
    console.log('📊 Database: portfolio');
    console.log('🗂️  Collection: Chat');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('💡 Make sure REACT_APP_MONGODB_URI is set in Vercel environment variables');
    console.log('💡 Check that your MongoDB Atlas cluster is running and accessible');
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
};

// Get database info
export const getDBInfo = () => {
  return {
    database: 'portfolio',
    collection: 'Chat',
    cluster: 'cluster0.mknpcws.mongodb.net',
    connectionStatus: mongoose.connection.readyState,
    isConfigured: !!MONGODB_URI
  };
};

// Check if MongoDB is properly configured
export const isMongoDBConfigured = (): boolean => {
  return !!MONGODB_URI;
};
