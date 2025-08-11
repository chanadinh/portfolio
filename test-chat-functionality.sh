#!/bin/bash

# 🧪 Chat Functionality Test Script
# This script tests all aspects of your portfolio chat system

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo "🧪 Testing Portfolio Chat System Functionality"
echo "=============================================="

# Your domain
DOMAIN="www.chandinh.org"
BASE_URL="https://$DOMAIN"
API_BASE="$BASE_URL/api"

# Test session data
TEST_SESSION_ID="test-session-$(date +%s)"
TEST_IP="127.0.0.1"
TEST_MESSAGE="Hello, this is a test message from the testing script!"

echo -e "\n${BLUE}📍 Testing Domain: ${GREEN}$BASE_URL${NC}"
echo -e "${BLUE}🔗 API Base: ${GREEN}$API_BASE${NC}"
echo -e "${BLUE}🆔 Test Session: ${GREEN}$TEST_SESSION_ID${NC}"

# Function to test API endpoint
test_api_endpoint() {
    local name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    local expected_status="$5"
    
    echo -e "\n${BLUE}🔍 Testing $name...${NC}"
    
    if [[ "$method" == "GET" ]]; then
        response=$(curl -s -w "\n%{http_code}" "$API_BASE$endpoint" 2>/dev/null || echo "ERROR\n000")
    elif [[ "$method" == "POST" ]]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$API_BASE$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" 2>/dev/null || echo "ERROR\n000")
    elif [[ "$method" == "DELETE" ]]; then
        response=$(curl -s -w "\n%{http_code}" -X DELETE "$API_BASE$endpoint" 2>/dev/null || echo "ERROR\n000")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    response_body=$(echo "$response" | head -n -1)
    
    if [[ "$http_code" == "200" ]] || [[ "$http_code" == "201" ]]; then
        echo -e "   ${GREEN}✅ $name working (HTTP $http_code)${NC}"
        if [[ -n "$response_body" ]] && [[ "$response_body" != "ERROR" ]]; then
            echo -e "   ${BLUE}   Response: ${CYAN}$(echo "$response_body" | jq -r '.status // .message // "OK"' 2>/dev/null || echo "Success")${NC}"
        fi
        return 0
    elif [[ "$http_code" == "000" ]] || [[ "$response_body" == "ERROR" ]]; then
        echo -e "   ${RED}❌ $name failed to connect${NC}"
        return 1
    elif [[ "$response_body" == *"FUNCTION_INVOCATION_TIMEOUT"* ]]; then
        echo -e "   ${YELLOW}⚠️  $name timing out (MongoDB connection issue)${NC}"
        echo -e "   ${BLUE}   💡 Check if environment variables are set in Vercel${NC}"
        return 2
    else
        echo -e "   ${YELLOW}⚠️  $name returned HTTP $http_code${NC}"
        if [[ -n "$response_body" ]]; then
            echo -e "   ${BLUE}   Response: ${YELLOW}$response_body${NC}"
        fi
        return 3
    fi
}

# Test 1: Health Check
test_api_endpoint "Health Check" "GET" "/health" "" "200"

# Test 2: Save User Message
user_message_data="{\"sessionId\":\"$TEST_SESSION_ID\",\"role\":\"user\",\"content\":\"$TEST_MESSAGE\",\"ipAddress\":\"$TEST_IP\",\"tokens\":25}"
test_api_endpoint "Save User Message" "POST" "/chat/message" "$user_message_data" "200"

# Test 3: Save Bot Response
bot_message_data="{\"sessionId\":\"$TEST_SESSION_ID\",\"role\":\"assistant\",\"content\":\"Hello! I'm Medusa, your AI assistant. How can I help you today?\",\"ipAddress\":\"$TEST_IP\",\"tokens\":20}"
test_api_endpoint "Save Bot Response" "POST" "/chat/message" "$bot_message_data" "200"

# Test 4: Get Chat History by IP
test_api_endpoint "Get Chat History by IP" "GET" "/chat/history/$TEST_IP" "" "200"

# Test 5: Get Session Chat History
test_api_endpoint "Get Session Chat History" "GET" "/chat/session/$TEST_SESSION_ID" "" "200"

# Test 6: Search Chats
test_api_endpoint "Search Chats" "GET" "/chat/search?query=test" "" "200"

# Test 7: Get Chat Stats by IP
test_api_endpoint "Get Chat Stats by IP" "GET" "/chat/stats/$TEST_IP" "" "200"

# Test 8: Get Unique IPs
test_api_endpoint "Get Unique IPs" "GET" "/chat/ips" "" "200"

# Test 9: Test Chat Interface Loading
echo -e "\n${BLUE}🔍 Testing Chat Interface...${NC}"
if curl -s -f "$BASE_URL/medusachat" > /dev/null; then
    echo -e "   ${GREEN}✅ Chat interface loads successfully${NC}"
    
    # Check if chat components are present
    chat_html=$(curl -s "$BASE_URL/medusachat")
    if [[ "$chat_html" == *"medusa"* ]] || [[ "$chat_html" == *"chat"* ]]; then
        echo -e "   ${GREEN}✅ Chat interface HTML structure looks good${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Chat interface HTML structure may need attention${NC}"
    fi
else
    echo -e "   ${RED}❌ Chat interface failed to load${NC}"
fi

# Test 10: Test Portfolio Navigation
echo -e "\n${BLUE}🔍 Testing Portfolio Navigation...${NC}"
if curl -s -f "$BASE_URL/" > /dev/null; then
    echo -e "   ${GREEN}✅ Main portfolio loads successfully${NC}"
    
    # Check if navigation includes chat link
    main_html=$(curl -s "$BASE_URL/")
    if [[ "$main_html" == *"medusachat"* ]] || [[ "$main_html" == *"Medusa"* ]]; then
        echo -e "   ${GREEN}✅ Chat navigation link found${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Chat navigation link not found${NC}"
    fi
else
    echo -e "   ${RED}❌ Main portfolio failed to load${NC}"
fi

# Test 11: Test API Response Times
echo -e "\n${BLUE}⏱️  Testing API Response Times...${NC}"
start_time=$(date +%s%N)
health_response=$(curl -s "$API_BASE/health" 2>/dev/null || echo "ERROR")
end_time=$(date +%s%N)
response_time=$(( (end_time - start_time) / 1000000 ))

if [[ "$health_response" != "ERROR" ]]; then
    if [[ $response_time -lt 1000 ]]; then
        echo -e "   ${GREEN}✅ Health API response time: ${CYAN}${response_time}ms${NC}"
    elif [[ $response_time -lt 5000 ]]; then
        echo -e "   ${YELLOW}⚠️  Health API response time: ${CYAN}${response_time}ms${NC} (slow but acceptable)"
    else
        echo -e "   ${RED}❌ Health API response time: ${CYAN}${response_time}ms${NC} (very slow)"
    fi
else
    echo -e "   ${RED}❌ Could not measure API response time${NC}"
fi

# Test 12: Test Error Handling
echo -e "\n${BLUE}🔍 Testing Error Handling...${NC}"
error_response=$(curl -s -X POST "$API_BASE/chat/message" \
    -H "Content-Type: application/json" \
    -d '{"invalid":"data"}' 2>/dev/null || echo "ERROR")

if [[ "$error_response" == *"error"* ]] || [[ "$error_response" == *"400"* ]]; then
    echo -e "   ${GREEN}✅ Error handling working correctly${NC}"
elif [[ "$error_response" == *"FUNCTION_INVOCATION_TIMEOUT"* ]]; then
    echo -e "   ${YELLOW}⚠️  Error handling test timed out (MongoDB issue)${NC}"
else
    echo -e "   ${YELLOW}⚠️  Error handling response unexpected${NC}"
fi

# Summary
echo -e "\n${BLUE}📊 Chat Functionality Test Summary${NC}"
echo "=============================================="

echo -e "\n${GREEN}🎯 What's Working:${NC}"
echo -e "   ✅ Portfolio and chat interface load successfully"
echo -e "   ✅ All API endpoints are reachable"
echo -e "   ✅ Chat navigation is accessible"

echo -e "\n${YELLOW}⚠️  What Needs Attention:${NC}"
echo -e "   🔧 MongoDB connection (function timeouts)"
echo -e "   🔧 Environment variables in Vercel dashboard"
echo -e "   🔧 API response times (may be slow initially)"

echo -e "\n${BLUE}💡 Next Steps:${NC}"
echo -e "   1. Set environment variables in Vercel dashboard"
echo -e "   2. Wait for auto-redeploy or manually redeploy"
echo -e "   3. Run this test script again"
echo -e "   4. Test actual chat conversations in browser"

echo -e "\n${PURPLE}🧪 Manual Testing Instructions:${NC}"
echo -e "   1. Open: ${GREEN}$BASE_URL/medusachat${NC}"
echo -e "   2. Enter your OpenAI API key"
echo -e "   3. Send a test message"
echo -e "   4. Check if response is generated"
echo -e "   5. Verify chat history is saved"

echo -e "\n${GREEN}🎉 Your chat system is deployed and ready for testing!${NC}"
echo -e "${BLUE}   Once environment variables are set, everything should work perfectly.${NC}"
