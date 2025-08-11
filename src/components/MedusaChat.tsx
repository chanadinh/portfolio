import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, ArrowLeft, MessageCircle, AlertCircle, Linkedin, Briefcase, GraduationCap, Award, Code, Database, Brain } from 'lucide-react';
import PERSONAL_INFO from '../data/personalInfo';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  error?: boolean;
}

// Use imported personal information for RAG
const KNOWLEDGE_BASE = PERSONAL_INFO;

// Function to retrieve relevant information based on user query
const retrieveRelevantInfo = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  let relevantInfo = "";
  
  // Check for education-related queries
  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university') || lowerQuery.includes('gpa')) {
    relevantInfo += `# 🎓 Education & Academic Background

## 📋 **Degree Information**
**Program:** ${KNOWLEDGE_BASE.education.degree}  
**Institution:** ${KNOWLEDGE_BASE.education.university}  
**Expected Graduation:** ${KNOWLEDGE_BASE.education.graduation}  
**Academic Performance:** **${KNOWLEDGE_BASE.education.gpa} GPA**

## 📚 **Core Coursework**
${KNOWLEDGE_BASE.education.relevant_courses.map(course => `• **${course}**`).join('\n')}

## 🎯 **Academic Highlights**
Chan's **perfect 4.0 GPA** demonstrates exceptional dedication to academic excellence. This outstanding performance, combined with specialized coursework in AI/ML, computer vision, and natural language processing, provides a solid theoretical foundation for advanced technical projects and research.

---

*Chan's academic achievements reflect his commitment to mastering both fundamental computer science principles and cutting-edge AI/ML technologies.*\n\n`;
  }
  
  // Check for experience-related queries
  if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('intern') || lowerQuery.includes('job')) {
    relevantInfo += `# 💼 Professional Experience & Expertise

## 🎯 **Current Role**
**Position:** ${KNOWLEDGE_BASE.experience.current_role}

## 🔄 **Previous Experience**
**Background:** ${KNOWLEDGE_BASE.experience.previous}

## ⚡ **Technical Skills & Technologies**

### 🐍 **Programming Languages & Frameworks**
• **Python** - Core language for AI/ML development  
• **JavaScript** - Full-stack web development  
• **React** - Modern frontend development  
• **Node.js** - Backend and server-side development  

### 🤖 **AI/ML & Data Science**
• **PyTorch** - Deep learning framework  
• **TensorFlow** - Machine learning platform  
• **Machine Learning** - Algorithm development and implementation  
• **Deep Learning** - Neural network architectures  

### 👁️ **Computer Vision & NLP**
• **Computer Vision** - Image processing and analysis  
• **Natural Language Processing** - Text analysis and generation  

### 🛠️ **Development & Tools**
• **Web Development** - Full-stack applications  
• **Software Engineering** - Best practices and methodologies  

---

*Chan's diverse skill set combines practical industry experience with cutting-edge AI/ML knowledge, making him a versatile professional capable of tackling complex technical challenges across multiple domains.*\n\n`;
  }
  
  // Check for project-related queries
  if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('work')) {
    relevantInfo += `# 🚀 Projects & Portfolio

## 🌟 **Featured Projects**

### 🤖 **Project Pæmon**
**Type:** AI Web Application  
**Technologies:** GPT-5, Stable Diffusion, Web Development  
**Achievement:** 🏆 **Best Personal Project** at Nosu AI Hackathon ($650 prize)  
**Description:** An innovative AI-powered platform that generates personalized digital companions, showcasing advanced AI integration and user experience design.

### 🔢 **MNIST Digit Classifier**
**Type:** Machine Learning Project  
**Technologies:** Neural Networks, ML Algorithms, Python  
**Description:** Implementation of various machine learning algorithms for digit recognition, demonstrating strong fundamentals in ML and algorithm development.

### 🚲 **Bike Sharing Demand Prediction**
**Type:** ML/Automation Project  
**Technologies:** AutoGluon, Time Series Forecasting, Automated ML  
**Description:** Advanced machine learning project using AutoGluon for automated machine learning and time series forecasting, showing expertise in modern ML tools.

### 🐕 **Dog Breed Classifier**
**Type:** Computer Vision Project  
**Technologies:** PyTorch, CNN Architectures (AlexNet, VGG, ResNet)  
**Description:** Sophisticated computer vision project implementing multiple CNN architectures for breed classification, demonstrating deep learning expertise.

### 🤖 **Medusa Bot**
**Type:** Discord Bot Development  
**Technologies:** REST API Integration, Multiple External APIs, Bot Development  
**Description:** Feature-rich Discord bot showcasing API integration skills and software engineering best practices.

---

## 🎯 **Project Highlights**
These projects demonstrate Chan's **versatility** across multiple domains:
• **AI/ML & Computer Vision** - Advanced neural network implementations  
• **Web Development** - Modern, responsive applications  
• **Software Engineering** - Clean, maintainable code architecture  
• **API Integration** - Seamless third-party service connections  

*Each project represents a unique technical challenge and showcases different aspects of Chan's comprehensive skill set.*\n\n`;
  }
  
  // Check for achievement-related queries
  if (lowerQuery.includes('achievement') || lowerQuery.includes('award') || lowerQuery.includes('prize') || lowerQuery.includes('hackathon')) {
    relevantInfo += `# 🏆 Achievements & Awards

## 🥇 **Best Personal Project (CodeBuff)**
**Prize:** $650 USD  
**Event:** Nosu AI Hackathon  
**Description:** Created an innovative AI-powered project that impressed judges with its technical sophistication and practical application.

## 🏅 **Top 5 Individual**
**Event:** Intercollegiate Programming Competition  
**Achievement:** Demonstrated exceptional problem-solving and algorithmic skills in a competitive environment.

## 🎓 **AI Programming with Python Nanodegree**
**Provider:** Udacity  
**Focus:** Python, Machine Learning, AI Fundamentals  
**Outcome:** Comprehensive expertise in modern AI development practices.

## 📚 **Academic Excellence**
**Performance:** 4.0 GPA  
**Field:** Computer Science  
**Institution:** Seminole State College of Florida  
**Status:** Graduating 2025

---

*These achievements demonstrate Chan's technical prowess, competitive spirit, and unwavering commitment to excellence in AI/ML and computer science.*\n\n`;
  }
  
  // Check for skills-related queries
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming') || lowerQuery.includes('language')) {
    relevantInfo += `# ⚡ Technical Skills & Expertise

## 🐍 **Programming Languages & Frameworks**
• **Python** - Primary language for AI/ML development and data science  
• **JavaScript** - Full-stack web development and modern applications  
• **React** - Component-based frontend development  
• **Node.js** - Server-side JavaScript and backend development  

## 🤖 **AI/ML & Data Science**
• **PyTorch** - Deep learning framework for research and production  
• **TensorFlow** - Comprehensive machine learning platform  
• **Machine Learning** - Algorithm development and model training  
• **Deep Learning** - Neural network architectures and optimization  

## 👁️ **Computer Vision & NLP**
• **Computer Vision** - Image processing, object detection, and analysis  
• **Natural Language Processing** - Text analysis, generation, and understanding  

## 🛠️ **Development & Tools**
• **Web Development** - Full-stack applications and responsive design  
• **Software Engineering** - Best practices, testing, and deployment  

---

## 🎯 **Skill Level Assessment**
Chan's expertise spans **multiple technical domains** with particular strength in:
• **AI/ML Development** - Advanced neural network implementations  
• **Full-Stack Development** - End-to-end application development  
• **Research & Innovation** - Cutting-edge technology exploration  
• **Problem Solving** - Algorithmic thinking and optimization  

*This diverse skill set makes Chan a versatile professional capable of contributing to projects across the entire technology stack.*\n\n`;
  }
  
  // Check for contact-related queries
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('linkedin') || lowerQuery.includes('github')) {
    relevantInfo += `# 📧 Contact & Professional Links

## 💬 **Get in Touch**
**Email:** [${KNOWLEDGE_BASE.personal.email}](mailto:${KNOWLEDGE_BASE.personal.email})  
**LinkedIn:** [Professional Profile](${KNOWLEDGE_BASE.personal.linkedin})  
**GitHub:** [Code Repository](${KNOWLEDGE_BASE.personal.github})  

## 📍 **Location**
**City:** ${KNOWLEDGE_BASE.personal.location}

## 🤝 **Collaboration Opportunities**
Chan is always interested in:
• **Technical Discussions** - AI/ML, computer vision, and software development  
• **Project Collaboration** - Open source contributions and joint ventures  
• **Research Opportunities** - Cutting-edge AI/ML research and development  
• **Professional Networking** - Industry connections and mentorship  

---

*Feel free to reach out for any of these opportunities or to learn more about Chan's work and expertise!*\n\n`;
  }
  
  // Check for general personal queries
  if (lowerQuery.includes('who are you') || lowerQuery.includes('tell me about') || lowerQuery.includes('background') || lowerQuery.includes('yourself')) {
    relevantInfo += `# 👋 About Chan Dinh

## 🎯 **Professional Identity**
**Role:** ${KNOWLEDGE_BASE.personal.title}  
**Location:** ${KNOWLEDGE_BASE.personal.location}

## 🔥 **Areas of Passion & Expertise**
${KNOWLEDGE_BASE.interests.map(interest => `• **${interest}**`).join('\n')}

## 🌟 **Professional Summary**
Chan is a **dedicated AI/ML engineer** and **full-stack developer** who combines strong academic foundations with practical industry experience. His work spans from competitive programming to cutting-edge AI applications, demonstrating both technical depth and innovative thinking.

## 🚀 **Key Strengths**
• **Academic Excellence** - Perfect 4.0 GPA in Computer Science  
• **Technical Versatility** - Full-stack development to AI/ML research  
• **Competitive Edge** - Top programming competition performer  
• **Innovation Focus** - Hackathon winner with practical AI solutions  

---

*Chan represents the next generation of AI/ML professionals - combining theoretical knowledge with practical implementation skills to create innovative solutions.*\n\n`;
  }
  
  return relevantInfo;
};

const MedusaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm Medusa, your AI assistant powered by OpenAI GPT-5 Chat. I have access to information about Chan Dinh's professional background, including his resume, LinkedIn, projects, and achievements. I can help you learn about his experience, skills, projects, or answer general questions. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if API key is set on component mount
  useEffect(() => {
    // First check for environment variable (for production/Vercel)
    const envApiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (envApiKey) {
      setApiKey(envApiKey);
      setShowApiKeyInput(false);
      return;
    }
    
    // Fallback to localStorage (for development/local use)
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setShowApiKeyInput(false);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      setShowApiKeyInput(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-5-chat-latest',
          messages: [
            {
              role: 'system',
              content: `You are Medusa, a helpful AI assistant with access to detailed information about Chan Dinh's professional background. 

IMPORTANT CONTEXT ABOUT CHAN DINH:
${retrieveRelevantInfo(inputText)}

Use this information to provide accurate, personalized responses about Chan's experience, skills, projects, and achievements. When asked about Chan, always reference this information and maintain the enhanced ChatGPT-like formatting structure.

IMPORTANT FORMATTING GUIDELINES:
- Use Markdown-style headers (# for main sections, ## for subsections, ### for sub-subsections)
- Include relevant emojis for visual appeal and section identification
- Use horizontal rules (---) to separate major sections
- Format lists with bullet points (•) and bold key terms
- Use bold text (**text**) for emphasis on important information
- Include descriptive text for each bullet point when appropriate
- Add summary sections with key highlights
- Use italics (*text*) for concluding thoughts and insights
- Maintain consistent spacing and visual hierarchy
- For general questions, you can also provide helpful information about programming, AI/ML, and other topics

Be conversational, helpful, and provide accurate information. Keep responses concise but informative. If the user asks about Chan's background, skills, or experience, make sure to include relevant details from the context provided in a well-formatted, ChatGPT-like manner.`
            },
            ...messages
              .filter(msg => msg.sender === 'user')
              .map(msg => ({ role: 'user' as const, content: msg.text }))
              .slice(-10), // Keep last 10 user messages for context
            { role: 'user' as const, content: inputText }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0]?.message?.content || 'Sorry, I encountered an error processing your request.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('OpenAI API error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while processing your request. Please check your API key and try again.',
        sender: 'bot',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setShowApiKeyInput(true);
  };

  if (showApiKeyInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full mx-4"
        >
          <div className="text-center mb-6">
            <img src="/medusa.ico" alt="Medusa" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup Required</h1>
            <p className="text-gray-600">Please enter your OpenAI API key to use Medusa Chat</p>
          </div>
          
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              Start Chatting
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              ← Back to Portfolio
            </a>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your API key is stored locally and never sent to our servers. 
              Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Platform</a>.
            </p>
            <p className="text-sm text-blue-800 mt-2">
              <strong>For Production:</strong> Set <code className="bg-blue-100 px-1 rounded">REACT_APP_OPENAI_API_KEY</code> environment variable in Vercel.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Portfolio</span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <img src="/medusa.ico" alt="Medusa" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-gray-900">Medusa Chat</h1>
            </div>
            <div className="flex items-center space-x-2">
              {process.env.REACT_APP_OPENAI_API_KEY ? (
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Production Mode
                </span>
              ) : (
                <button
                  onClick={clearApiKey}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  title="Change API Key"
                >
                  Change Key
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/medusa.ico" alt="Medusa" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Medusa AI Assistant</h2>
                <p className="text-white/80 text-sm">Powered by OpenAI GPT-5 Chat with RAG</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    message.sender === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : message.error 
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : 
                     message.error ? <AlertCircle className="w-4 h-4" /> : 
                     <img src="/medusa.ico" alt="Medusa" className="w-6 h-6" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : message.error
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-primary-100' : 
                      message.error ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/medusa.ico" alt="Medusa" className="w-6 h-6" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Chan's experience, skills, projects, or anything else..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping || !apiKey}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setInputText("Tell me about Chan's education and background")}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                Education
              </button>
              <button
                onClick={() => setInputText("What are Chan's technical skills?")}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => setInputText("Tell me about Chan's projects")}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => setInputText("What are Chan's achievements?")}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                Achievements
              </button>
              <button
                onClick={() => setInputText("How can I contact Chan?")}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">About Medusa Chat</h3>
            <p className="text-gray-600 mb-4">
              This is an AI-powered chatbot powered by OpenAI's GPT-5 Chat model with RAG capabilities. 
              I have access to Chan Dinh's professional information and can answer questions about his experience, skills, projects, and achievements.
            </p>
            
            {/* RAG Capabilities */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">What I Know About Chan:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Education & GPA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Work Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span>Technical Skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>Projects & Portfolio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Achievements & Awards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>Contact & LinkedIn</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <img src="/medusa.ico" alt="Medusa" className="w-4 h-4" />
                <span>OpenAI Powered</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Brain className="w-4 h-4 text-primary-600" />
                <span>RAG Enhanced</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <User className="w-4 h-4 text-primary-600" />
                <span>Personalized</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MedusaChat;
