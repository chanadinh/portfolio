# 🚀 Vercel Deployment Guide for Portfolio Chat System

This guide shows you how to deploy both the React frontend and Express backend to Vercel using serverless functions.

## 📋 **Prerequisites**

- [Vercel CLI](https://vercel.com/cli) installed
- MongoDB Atlas database set up
- GitHub repository connected to Vercel

## 🏗️ **Architecture Overview**

```
Frontend (React) → Vercel Static Hosting
     ↓
Backend (API Routes) → Vercel Serverless Functions
     ↓
Database → MongoDB Atlas
```

## 🚀 **Step 1: Deploy to Vercel**

### **1.1 Install Vercel CLI**
```bash
npm i -g vercel
```

### **1.2 Login to Vercel**
```bash
vercel login
```

### **1.3 Deploy Your Project**
```bash
vercel
```

Follow the prompts:
- Set up and deploy? → `Y`
- Which scope? → Select your account
- Link to existing project? → `N`
- Project name? → `portfolio-chat` (or your preferred name)
- Directory? → `./` (current directory)
- Override settings? → `N`

## ⚙️ **Step 2: Configure Environment Variables**

### **2.1 In Vercel Dashboard**
Go to your project settings → Environment Variables and add:

```bash
# OpenAI API
REACT_APP_OPENAI_API_KEY=your_openai_api_key

# Desmos API  
REACT_APP_DESMOS_API_KEY=your_desmos_api_key

# MongoDB URI
REACT_APP_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# API URL (will be auto-generated)
REACT_APP_API_URL=https://your-project.vercel.app/api
```

### **2.2 Update API Base URL**
After deployment, update `src/services/chatService.ts`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-project.vercel.app/api';
```

## 🔧 **Step 3: Verify API Endpoints**

Your API endpoints will be available at:
- `https://your-project.vercel.app/api/health`
- `https://your-project.vercel.app/api/chat/message`
- `https://your-project.vercel.app/api/chat/history/[ipAddress]`
- `https://your-project.vercel.app/api/chat/session/[sessionId]`
- `https://your-project.vercel.app/api/chat/search`
- `https://your-project.vercel.app/api/chat/stats/[ipAddress]`
- `https://your-project.vercel.app/api/chat/ip/[ipAddress]`
- `https://your-project.vercel.app/api/chat/ips`

## 🧪 **Step 4: Test Deployment**

### **4.1 Test Health Endpoint**
```bash
curl https://your-project.vercel.app/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Portfolio Chat API is running",
  "timestamp": "2024-01-XX...",
  "database": "Connected",
  "environment": "production"
}
```

### **4.2 Test Chat Message Endpoint**
```bash
curl -X POST https://your-project.vercel.app/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session",
    "role": "user",
    "content": "Hello Medusa!",
    "ipAddress": "192.168.1.100"
  }'
```

## 🔄 **Step 5: Update Frontend**

### **5.1 Update Environment Variables**
In your local `.env` file:
```bash
REACT_APP_API_URL=https://your-project.vercel.app/api
```

### **5.2 Test Locally**
```bash
npm start
```

Your React app will now communicate with the Vercel-deployed API.

## 🚀 **Step 6: Production Deployment**

### **6.1 Deploy Updates**
```bash
vercel --prod
```

### **6.2 Automatic Deployments**
Connect your GitHub repository to Vercel for automatic deployments on push.

## 📊 **Monitoring & Debugging**

### **6.1 Vercel Dashboard**
- View function logs
- Monitor performance
- Check error rates

### **6.2 Function Logs**
```bash
vercel logs your-project-name
```

### **6.3 Local Testing**
```bash
vercel dev
```

## ⚠️ **Important Notes**

### **6.1 Cold Starts**
- Serverless functions have cold start delays
- First request might be slower
- Subsequent requests are faster

### **6.2 Timeout Limits**
- Free tier: 10 seconds
- Pro tier: 60 seconds
- Enterprise: 900 seconds

### **6.3 MongoDB Connections**
- Each function creates a new connection
- Connections are closed after each request
- Consider connection pooling for high traffic

## 🔒 **Security Considerations**

### **6.1 CORS**
- API routes include CORS headers
- Configure allowed origins in production
- Consider restricting to your domain

### **6.2 Environment Variables**
- Never commit secrets to git
- Use Vercel environment variables
- Rotate API keys regularly

### **6.3 Rate Limiting**
- Consider implementing rate limiting
- Monitor API usage
- Set up alerts for abuse

## 🚨 **Troubleshooting**

### **6.1 Common Issues**

**Function Timeout**
- Check MongoDB connection speed
- Optimize database queries
- Consider upgrading Vercel plan

**CORS Errors**
- Verify CORS headers in API functions
- Check browser console for errors
- Ensure proper preflight handling

**MongoDB Connection Failures**
- Verify connection string
- Check network access
- Ensure IP whitelisting

### **6.2 Debug Commands**
```bash
# Check function status
vercel ls

# View recent deployments
vercel ls --limit 5

# Check environment variables
vercel env ls

# Test function locally
vercel dev
```

## 📈 **Performance Optimization**

### **6.1 Database**
- Use indexes on frequently queried fields
- Implement pagination for large datasets
- Consider caching strategies

### **6.2 API Functions**
- Minimize cold start impact
- Use connection pooling
- Implement proper error handling

### **6.3 Frontend**
- Optimize bundle size
- Implement lazy loading
- Use React.memo for expensive components

## 🎯 **Next Steps**

1. **Deploy to Vercel** using the steps above
2. **Test all API endpoints** to ensure functionality
3. **Monitor performance** in Vercel dashboard
4. **Set up alerts** for errors and timeouts
5. **Optimize** based on usage patterns

## 📚 **Additional Resources**

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [React Deployment](https://create-react-app.dev/docs/deployment/)

---

**🎉 Congratulations!** Your portfolio chat system is now deployed on Vercel with full MongoDB integration!
