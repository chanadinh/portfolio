# MedusaChat Setup Guide

## Overview
MedusaChat is an AI-powered chatbot component that integrates with OpenAI's GPT-3.5 Turbo model to provide intelligent responses to user queries.

## Features
- **OpenAI Integration**: Powered by GPT-3.5 Turbo for intelligent responses
- **Secure API Key Storage**: API keys are stored locally in browser localStorage
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Error Handling**: Graceful error handling for API failures
- **Responsive Design**: Mobile-friendly interface with smooth animations

## Setup Instructions

### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Generate a new API key
4. Copy the key (starts with `sk-`)

### 2. Configure API Key
When you first visit the MedusaChat page:
1. You'll see a setup screen asking for your OpenAI API key
2. Enter your API key in the input field
3. Click "Start Chatting"
4. Your key will be stored locally in your browser

### 3. Start Chatting
- Once configured, you can start chatting immediately
- The AI will respond to your questions about programming, AI/ML, and general topics
- Your API key is stored locally and never sent to our servers

## Security Notes
- **Local Storage**: API keys are stored in your browser's localStorage
- **No Server Storage**: We never see or store your API key
- **HTTPS Required**: API calls are made directly to OpenAI's secure endpoints
- **Key Management**: You can change your API key anytime using the "Change Key" button

## API Configuration
The component uses the following OpenAI API settings:
- **Model**: `gpt-3.5-turbo`
- **Max Tokens**: 500
- **Temperature**: 0.7 (balanced creativity and accuracy)
- **System Prompt**: Customized for helpful, conversational AI assistance

## Troubleshooting

### Common Issues
1. **"API request failed"**: Check your API key and internet connection
2. **"Rate limit exceeded"**: You may have hit OpenAI's rate limits
3. **"Invalid API key"**: Ensure your key is correct and active

### Solutions
- Verify your API key is correct
- Check your OpenAI account for any restrictions
- Ensure you have sufficient API credits
- Try refreshing the page and re-entering your key

## Cost Considerations
- OpenAI charges per API call based on token usage
- GPT-3.5 Turbo is cost-effective for most use cases
- Monitor your usage in the [OpenAI Dashboard](https://platform.openai.com/usage)

## Customization
You can modify the component to:
- Change the AI model (e.g., to GPT-4)
- Adjust response parameters (temperature, max tokens)
- Customize the system prompt
- Add additional features like conversation history export

## Support
For technical issues or questions about the MedusaChat component, please refer to the main portfolio documentation or create an issue in the repository.
