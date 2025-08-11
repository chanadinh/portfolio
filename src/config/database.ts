import mongoose from 'mongoose';

// MongoDB Atlas connection string - set this in Vercel environment variables
const MONGODB_URI = process.env.REACT_APP_MONGODB_URI || 'mongodb+srv://chandinhjobs:<db_password>@cluster0.mknpcws.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
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
    connectionStatus: mongoose.connection.readyState
  };
};
