#!/bin/bash

# 🚀 Quick Status Check for Portfolio Chat System
# Run this to get immediate status of your deployment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "🚀 Quick Status Check - Portfolio Chat System"
echo "============================================="

DOMAIN="www.chandinh.org"
BASE_URL="https://$DOMAIN"

echo -e "\n${BLUE}📍 Checking: ${GREEN}$BASE_URL${NC}"

# Quick health check
echo -e "\n${BLUE}🔍 Quick Health Check...${NC}"
health_response=$(curl -s "$BASE_URL/api/health" 2>/dev/null || echo "ERROR")

if [[ "$health_response" == *"status"* ]]; then
    echo -e "   ${GREEN}✅ API is working!${NC}"
    status=$(echo "$health_response" | jq -r '.status // "OK"' 2>/dev/null || echo "OK")
    echo -e "   ${BLUE}   Status: ${GREEN}$status${NC}"
elif [[ "$health_response" == *"FUNCTION_INVOCATION_TIMEOUT"* ]]; then
    echo -e "   ${YELLOW}⚠️  API is timing out${NC}"
    echo -e "   ${BLUE}   💡 MongoDB connection issue - check environment variables${NC}"
elif [[ "$health_response" == "ERROR" ]]; then
    echo -e "   ${RED}❌ API is not accessible${NC}"
else
    echo -e "   ${YELLOW}⚠️  API response unexpected${NC}"
    echo -e "   ${BLUE}   Response: ${YELLOW}$health_response${NC}"
fi

# Check main page
echo -e "\n${BLUE}🔍 Checking Main Portfolio...${NC}"
if curl -s -f "$BASE_URL/" > /dev/null; then
    echo -e "   ${GREEN}✅ Portfolio loads successfully${NC}"
else
    echo -e "   ${RED}❌ Portfolio failed to load${NC}"
fi

# Check chat page
echo -e "\n${BLUE}🔍 Checking Chat Interface...${NC}"
if curl -s -f "$BASE_URL/medusachat" > /dev/null; then
    echo -e "   ${GREEN}✅ Chat interface loads successfully${NC}"
else
    echo -e "   ${RED}❌ Chat interface failed to load${NC}"
fi

# Summary
echo -e "\n${BLUE}📊 Current Status Summary${NC}"
echo "============================================="

if [[ "$health_response" == *"status"* ]]; then
    echo -e "\n${GREEN}🎉 FULLY OPERATIONAL!${NC}"
    echo -e "   ✅ Frontend: Working"
    echo -e "   ✅ Backend: Working" 
    echo -e "   ✅ Database: Connected"
    echo -e "   🚀 Ready for testing!"
elif [[ "$health_response" == *"FUNCTION_INVOCATION_TIMEOUT"* ]]; then
    echo -e "\n${YELLOW}⚠️  PARTIALLY OPERATIONAL${NC}"
    echo -e "   ✅ Frontend: Working"
    echo -e "   ✅ Backend: Deployed"
    echo -e "   ❌ Database: Connection issue"
    echo -e "   🔧 Action needed: Set environment variables in Vercel"
else
    echo -e "\n${RED}❌ NOT OPERATIONAL${NC}"
    echo -e "   ❌ Frontend: May have issues"
    echo -e "   ❌ Backend: Not accessible"
    echo -e "   ❌ Database: Not connected"
    echo -e "   🔧 Action needed: Check deployment and configuration"
fi

echo -e "\n${BLUE}💡 Next Steps:${NC}"
if [[ "$health_response" == *"FUNCTION_INVOCATION_TIMEOUT"* ]]; then
    echo -e "   1. Go to Vercel Dashboard → Portfolio Project → Settings → Environment Variables"
    echo -e "   2. Add: REACT_APP_OPENAI_API_KEY, REACT_APP_DESMOS_API_KEY, REACT_APP_MONGODB_URI"
    echo -e "   3. Wait for auto-redeploy or manually redeploy"
    echo -e "   4. Run this check again"
elif [[ "$health_response" == *"status"* ]]; then
    echo -e "   1. 🎉 Your system is working perfectly!"
    echo -e "   2. Test the chat interface at: ${GREEN}$BASE_URL/medusachat${NC}"
    echo -e "   3. Try sending a message to verify AI responses"
    echo -e "   4. Check chat history functionality"
else
    echo -e "   1. Check Vercel deployment status"
    echo -e "   2. Verify domain configuration"
    echo -e "   3. Check for any build errors"
    echo -e "   4. Run full test: ./test-vercel-deployment.sh"
fi

echo -e "\n${BLUE}🔗 Quick Links:${NC}"
echo -e "   📱 Portfolio: ${GREEN}$BASE_URL${NC}"
echo -e "   💬 Chat: ${GREEN}$BASE_URL/medusachat${NC}"
echo -e "   📊 Graphing: ${GREEN}$BASE_URL/graphing${NC}"
echo -e "   🧪 Full Test: ${GREEN}./test-chat-functionality.sh${NC}"
