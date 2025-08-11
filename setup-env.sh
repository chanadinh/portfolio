#!/bin/bash

# Environment Setup Script for Portfolio
# This script helps you set up your local environment variables

echo "🚀 Setting up environment variables for Portfolio..."

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Backing up to .env.backup"
    cp .env .env.backup
fi

# Create .env file from example
if [ -f "env.example" ]; then
    cp env.example .env
    echo "✅ Created .env file from env.example"
else
    echo "❌ env.example not found. Creating basic .env file..."
    cat > .env << EOF
# Local Development Environment Variables
# This file is for local development only and should NEVER be committed to git

# OpenAI API Key for Medusa Chat
# Get your key from: https://platform.openai.com/api-keys
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Desmos API Key for Interactive Graphing Calculator
# Get your key by emailing: partnerships@desmos.com
REACT_APP_DESMOS_API_KEY=your_desmos_api_key_here

# MongoDB Connection URI for Chat History
# Your specific MongoDB Atlas setup:
# - Cluster: cluster0.mknpcws.mongodb.net
# - Username: chandinhjobs
# - Database: portfolio
# - Collection: Chat
REACT_APP_MONGODB_URI=mongodb+srv://chandinhjobs:YOUR_ACTUAL_PASSWORD@cluster0.mknpcws.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0

# ⚠️  SECURITY WARNING:
# - This file contains your actual MongoDB password
# - It's already in .gitignore so it won't be committed
# - For production, use Vercel environment variables instead
EOF
fi

echo ""
echo "📝 Next steps:"
echo "1. Edit .env file with your actual API keys and MongoDB password"
echo "2. For MongoDB, replace YOUR_ACTUAL_PASSWORD with your real password"
echo "3. Test connection: node test-mongodb.js"
echo ""
echo "🔐 Your .env file is ready for editing!"
echo "💡 Remember: Never commit this file to git!"
echo ""
echo "📋 Environment variables to set:"
echo "   - REACT_APP_OPENAI_API_KEY"
echo "   - REACT_APP_DESMOS_API_KEY" 
echo "   - REACT_APP_MONGODB_URI"
echo ""
echo "✅ Setup complete!"
