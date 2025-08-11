#!/bin/bash

echo "🚀 MongoDB Atlas App Services Deployment Script"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "backend/server.js" ]; then
    echo "❌ Error: Please run this script from the portfolio root directory"
    exit 1
fi

echo "✅ Backend files found"
echo ""

# Create deployment package
echo "📦 Creating deployment package..."
cd backend

# Remove old node_modules if it exists
if [ -d "node_modules" ]; then
    echo "🗑️  Removing old node_modules..."
    rm -rf node_modules
fi

# Install production dependencies
echo "📥 Installing production dependencies..."
npm install --production

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf ../atlas-deployment.tar.gz .

echo ""
echo "✅ Deployment package created: atlas-deployment.tar.gz"
echo ""
echo "📋 Next Steps:"
echo "1. Go to MongoDB Atlas Dashboard → App Services"
echo "2. Create a new app or select existing app"
echo "3. Choose 'Upload Files' deployment method"
echo "4. Upload the atlas-deployment.tar.gz file"
echo "5. Deploy your app"
echo ""
echo "🔗 Your app.json is already configured with:"
echo "   - MongoDB connection string"
echo "   - Environment variables"
echo "   - Port configuration"
echo ""
echo "🎯 After deployment, update your frontend:"
echo "   REACT_APP_API_URL=https://your-app-name.region.apps.mongodb.com/api"
echo ""

cd ..
