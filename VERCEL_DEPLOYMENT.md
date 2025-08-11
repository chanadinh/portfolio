# Vercel Deployment Guide for Portfolio with MedusaChat

## 🚀 Overview
This guide explains how to deploy your portfolio with the OpenAI-powered MedusaChat component to Vercel, including proper environment variable configuration.

## 📋 Prerequisites
- Vercel account ([sign up here](https://vercel.com/signup))
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))
- GitHub repository with your portfolio code

## 🔧 Step-by-Step Deployment

### 1. **Connect Repository to Vercel**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. Select the repository containing your portfolio

### 2. **Configure Environment Variables**
1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the following environment variable:
   ```
   Name: REACT_APP_OPENAI_API_KEY
   Value: sk-your_actual_openai_api_key_here
   Environment: Production, Preview, Development
   ```
3. Click **Save**

### 3. **Deploy Configuration**
- **Framework Preset**: Create React App
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `build` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 4. **Deploy**
1. Click **Deploy**
2. Wait for build to complete
3. Your portfolio will be live at the provided Vercel URL

## 🔐 Environment Variable Security

### **Why Environment Variables?**
- **Security**: API keys are not exposed in client-side code
- **Flexibility**: Easy to change keys without redeploying
- **Best Practice**: Industry standard for production deployments
- **Team Access**: Multiple developers can deploy without sharing keys

### **How It Works**
1. **Build Time**: Vercel injects environment variables during build
2. **Runtime**: Variables are embedded in the built JavaScript bundle
3. **Client Side**: Variables are accessible via `process.env.REACT_APP_*`

## 🌍 Environment-Specific Configuration

### **Production Environment**
```
REACT_APP_OPENAI_API_KEY=sk-prod_key_here
```

### **Preview Environment (Pull Requests)**
```
REACT_APP_OPENAI_API_KEY=sk-preview_key_here
```

### **Development Environment**
```
REACT_APP_OPENAI_API_KEY=sk-dev_key_here
```

## 🔄 Automatic Deployments

### **GitHub Integration**
- **Push to main**: Automatically deploys to production
- **Pull Request**: Creates preview deployment
- **Branch push**: Creates preview deployment

### **Environment Variable Updates**
- Changes to environment variables require a new deployment
- No downtime during updates
- Instant rollback capability

## 🛡️ Security Best Practices

### **API Key Management**
1. **Never commit API keys** to your repository
2. **Use different keys** for different environments
3. **Rotate keys regularly** for security
4. **Monitor usage** in OpenAI dashboard

### **Vercel Security Features**
- **HTTPS only**: All deployments use SSL
- **Environment isolation**: Variables are scoped to projects
- **Access control**: Team member permissions
- **Audit logs**: Track who accessed what

## 🧪 Testing Your Deployment

### **Local Testing**
```bash
# Test with environment variable
REACT_APP_OPENAI_API_KEY=sk-test_key npm start

# Test without environment variable (localStorage fallback)
npm start
```

### **Production Testing**
1. Deploy to Vercel
2. Navigate to `/medusachat` route
3. Verify no setup screen appears (production mode)
4. Test chat functionality

## 🔍 Troubleshooting

### **Common Issues**

#### **"API key not found"**
- Check environment variable name: `REACT_APP_OPENAI_API_KEY`
- Ensure variable is set for all environments
- Redeploy after adding environment variables

#### **"Build failed"**
- Verify environment variable syntax
- Check for typos in variable names
- Ensure build command works locally

#### **"Chat not working in production"**
- Verify API key is valid and active
- Check OpenAI account for rate limits
- Monitor Vercel function logs

### **Debug Steps**
1. **Check Vercel logs** in dashboard
2. **Verify environment variables** are set correctly
3. **Test API key** in OpenAI playground
4. **Check network tab** for API calls

## 📊 Monitoring & Analytics

### **Vercel Analytics**
- **Performance metrics**: Core Web Vitals
- **Usage statistics**: Page views, visitors
- **Error tracking**: Build and runtime errors
- **Deployment history**: Rollback capabilities

### **OpenAI Usage**
- **Token consumption**: Monitor API costs
- **Rate limits**: Track API usage patterns
- **Error rates**: Identify API issues

## 🔄 Updating Your Deployment

### **Code Changes**
1. Push changes to GitHub
2. Vercel automatically redeploys
3. Environment variables persist

### **Environment Variable Changes**
1. Update in Vercel dashboard
2. Trigger manual redeploy
3. Or push any code change to trigger auto-deploy

## 💰 Cost Considerations

### **Vercel Costs**
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for advanced features
- **Enterprise**: Custom pricing for teams

### **OpenAI API Costs**
- **GPT-3.5 Turbo**: ~$0.002 per 1K tokens
- **Typical chat**: 100-500 tokens per response
- **Monthly estimate**: $5-20 for moderate usage

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🆘 Support

- **Vercel Issues**: [Vercel Support](https://vercel.com/support)
- **OpenAI Issues**: [OpenAI Help Center](https://help.openai.com/)
- **Portfolio Issues**: Check repository issues or documentation
