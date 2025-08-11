#!/bin/bash

# 🚀 Vercel Deployment Script for Portfolio Chat System
# This script automates the deployment process to Vercel

set -e  # Exit on any error

echo "🚀 Starting Vercel deployment for Portfolio Chat System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found!${NC}"
    echo -e "${YELLOW}💡 Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 Please log in to Vercel...${NC}"
    vercel login
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found!${NC}"
    echo -e "${BLUE}💡 Creating .env from .env.example...${NC}"
    cp env.example .env
    echo -e "${YELLOW}⚠️  Please update .env with your actual API keys before deploying!${NC}"
    echo -e "${YELLOW}⚠️  Press Enter when ready to continue...${NC}"
    read
fi

# Check if required environment variables are set
echo -e "${BLUE}🔍 Checking environment variables...${NC}"

if [ -z "$REACT_APP_OPENAI_API_KEY" ] && ! grep -q "REACT_APP_OPENAI_API_KEY=your_openai_api_key_here" .env; then
    echo -e "${GREEN}✅ OpenAI API key found${NC}"
else
    echo -e "${YELLOW}⚠️  OpenAI API key not set or using placeholder${NC}"
fi

if [ -z "$REACT_APP_MONGODB_URI" ] && ! grep -q "REACT_APP_MONGODB_URI=mongodb+srv://chandinhjobs:YOUR_ACTUAL_PASSWORD" .env; then
    echo -e "${GREEN}✅ MongoDB URI found${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB URI not set or using placeholder${NC}"
fi

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed! Please fix errors and try again.${NC}"
    exit 1
fi

# Deploy to Vercel
echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
echo -e "${YELLOW}💡 Follow the prompts to complete deployment...${NC}"

vercel --prod

# Check deployment status
if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    
    # Get the deployment URL
    DEPLOYMENT_URL=$(vercel ls --json | jq -r '.[0].url' 2>/dev/null || echo "unknown")
    
    echo -e "${BLUE}📱 Your app is now live at: ${GREEN}https://$DEPLOYMENT_URL${NC}"
    echo -e "${BLUE}🔗 API endpoints available at: ${GREEN}https://$DEPLOYMENT_URL/api${NC}"
    
    echo -e "\n${YELLOW}📋 Next steps:${NC}"
    echo -e "1. Test the health endpoint: ${GREEN}https://$DEPLOYMENT_URL/api/health${NC}"
    echo -e "2. Test chat functionality at: ${GREEN}https://$DEPLOYMENT_URL/medusachat${NC}"
    echo -e "3. Monitor function logs in Vercel dashboard"
    echo -e "4. Set up environment variables in Vercel dashboard"
    
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    echo -e "${YELLOW}💡 Check the error messages above and try again.${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎯 Deployment complete!${NC}"
echo -e "${BLUE}📚 For more information, see: VERCEL_DEPLOYMENT.md${NC}"
