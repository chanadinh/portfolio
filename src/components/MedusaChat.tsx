import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ArrowLeft, MessageCircle, AlertCircle, Linkedin, Briefcase, GraduationCap, Award, Code, Database, Brain, History } from 'lucide-react';
import { motion } from 'framer-motion';
import PERSONAL_INFO from '../data/personalInfo';
import { useChatHistory } from '../contexts/ChatHistoryContext';
import ChatHistory from './ChatHistory';
import chatService from '../services/chatService';
import sessionManager from '../utils/sessionManager';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  error?: boolean;
  tokens?: number;
}

interface MedusaChatProps {
  apiKey: string;
}

// Function to detect background and get complementary colors
const getBackgroundComplementaryColors = (backgroundStyle: string) => {
  // Default colors for fallback
  let userGradient = 'from-blue-600/95 to-purple-600/95';
  let botGradient = 'from-gray-700/95 to-slate-700/95';
  let errorGradient = 'from-red-600/95 to-pink-600/95';
  let userBorder = 'border-blue-300/80';
  let botBorder = 'border-gray-300/80';
  let errorBorder = 'border-red-300/80';
  let userShadow = 'shadow-blue-400/60';
  let botShadow = 'shadow-gray-400/60';
  let errorShadow = 'shadow-red-400/60';

  // Detect background type and set complementary colors
  if (backgroundStyle.includes('blue') && backgroundStyle.includes('indigo')) {
    // Blue/Indigo background - use moderate dark blue tones
    userGradient = 'from-blue-700/95 to-indigo-700/95';
    botGradient = 'from-slate-700/95 to-blue-700/95';
    errorGradient = 'from-red-700/95 to-pink-700/95';
    userBorder = 'border-blue-400/80';
    botBorder = 'border-slate-400/80';
    errorBorder = 'border-red-400/80';
    userShadow = 'shadow-blue-500/60';
    botShadow = 'shadow-slate-500/60';
    errorShadow = 'shadow-red-500/60';
  } else if (backgroundStyle.includes('red') && backgroundStyle.includes('yellow')) {
    // Red/Yellow background - use moderate dark red tones
    userGradient = 'from-red-700/95 to-orange-700/95';
    botGradient = 'from-orange-700/95 to-red-700/95';
    errorGradient = 'from-pink-700/95 to-rose-700/95';
    userBorder = 'border-red-400/80';
    botBorder = 'border-orange-400/80';
    errorBorder = 'border-pink-400/80';
    userShadow = 'shadow-red-500/60';
    botShadow = 'shadow-orange-500/60';
    errorShadow = 'shadow-pink-500/60';
  } else if (backgroundStyle.includes('green') && backgroundStyle.includes('blue')) {
    // Green/Blue background - use moderate dark green tones
    userGradient = 'from-green-700/95 to-teal-700/95';
    botGradient = 'from-teal-700/95 to-green-700/95';
    errorGradient = 'from-emerald-700/95 to-cyan-700/95';
    userBorder = 'border-green-400/80';
    botBorder = 'border-teal-400/80';
    errorBorder = 'border-emerald-400/80';
    userShadow = 'shadow-green-500/60';
    botShadow = 'shadow-teal-500/60';
    errorShadow = 'shadow-emerald-500/60';
  } else if (backgroundStyle.includes('purple') && backgroundStyle.includes('pink')) {
    // Purple/Pink background - use moderate dark purple tones
    userGradient = 'from-purple-700/95 to-violet-700/95';
    botGradient = 'from-violet-700/95 to-purple-700/95';
    errorGradient = 'from-fuchsia-700/95 to-pink-700/95';
    userBorder = 'border-purple-400/80';
    botBorder = 'border-violet-400/80';
    errorBorder = 'border-fuchsia-400/80';
    userShadow = 'shadow-purple-500/60';
    botShadow = 'shadow-violet-500/60';
    errorShadow = 'shadow-fuchsia-500/60';
  } else if (backgroundStyle.includes('orange') && backgroundStyle.includes('yellow')) {
    // Orange/Yellow background - use moderate dark orange tones
    userGradient = 'from-orange-700/95 to-amber-700/95';
    botGradient = 'from-amber-700/95 to-orange-700/95';
    errorGradient = 'from-yellow-700/95 to-orange-700/95';
    userBorder = 'border-orange-400/80';
    botBorder = 'border-amber-400/80';
    errorBorder = 'border-yellow-400/80';
    userShadow = 'shadow-orange-500/60';
    botShadow = 'shadow-amber-500/60';
    errorShadow = 'shadow-yellow-500/60';
  } else if (backgroundStyle.includes('teal') && backgroundStyle.includes('green')) {
    // Teal/Green background - use moderate dark teal tones
    userGradient = 'from-teal-700/95 to-cyan-700/95';
    botGradient = 'from-cyan-700/95 to-teal-700/95';
    errorGradient = 'from-blue-700/95 to-teal-700/95';
    userBorder = 'border-teal-400/80';
    botBorder = 'border-cyan-400/80';
    errorBorder = 'border-blue-400/80';
    userShadow = 'shadow-teal-500/60';
    botShadow = 'shadow-cyan-500/60';
    errorShadow = 'shadow-blue-500/60';
  } else if (backgroundStyle.includes('indigo') && backgroundStyle.includes('purple')) {
    // Indigo/Purple background - use moderate dark indigo tones
    userGradient = 'from-indigo-700/95 to-blue-700/95';
    botGradient = 'from-blue-700/95 to-indigo-700/95';
    errorGradient = 'from-slate-700/95 to-indigo-700/95';
    userBorder = 'border-indigo-400/80';
    botBorder = 'border-blue-400/80';
    errorBorder = 'border-slate-400/80';
    userShadow = 'shadow-indigo-500/60';
    botShadow = 'shadow-blue-500/60';
    errorShadow = 'shadow-slate-500/60';
  } else if (backgroundStyle.includes('pink') && backgroundStyle.includes('orange')) {
    // Pink/Orange background - use moderate dark pink tones
    userGradient = 'from-pink-700/95 to-rose-700/95';
    botGradient = 'from-rose-700/95 to-pink-700/95';
    errorGradient = 'from-red-700/95 to-pink-700/95';
    userBorder = 'border-pink-400/80';
    botBorder = 'border-rose-400/80';
    errorBorder = 'border-red-400/80';
    userShadow = 'shadow-pink-500/60';
    botShadow = 'shadow-rose-500/60';
    errorShadow = 'shadow-red-500/60';
  }

  return {
    userGradient,
    botGradient,
    errorGradient,
    userBorder,
    botBorder,
    errorBorder,
    userShadow,
    botShadow,
    errorShadow
  };
};

// Use imported personal information for RAG
const KNOWLEDGE_BASE = PERSONAL_INFO;

// Function to retrieve relevant information based on user query
const retrieveRelevantInfo = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  let relevantInfo = "";
  
  // Check for education-related queries
  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university') || lowerQuery.includes('gpa')) {
    relevantInfo += `Here's what I know about Chan's education:

Degree: ${KNOWLEDGE_BASE.education.degree}
University: ${KNOWLEDGE_BASE.education.university}
Graduation: ${KNOWLEDGE_BASE.education.graduation}
GPA: ${KNOWLEDGE_BASE.education.gpa}

Relevant Courses:
${KNOWLEDGE_BASE.education.relevant_courses.map(course => `• ${course}`).join('\n')}\n\n`;
  }
  
  // Check for experience-related queries
  if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('intern') || lowerQuery.includes('job')) {
    relevantInfo += `Here's Chan's work experience:

Current Role: ${KNOWLEDGE_BASE.experience.current_role}
Previous Role: ${KNOWLEDGE_BASE.experience.previous}

Technical Skills:
${KNOWLEDGE_BASE.experience.skills.map(skill => `• ${skill}`).join('\n')}\n\n`;
  }
  
  // Check for project-related queries
  if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('work')) {
    relevantInfo += `Here are Chan's key projects:

Pæmon: ${KNOWLEDGE_BASE.projects.paemon}

MNIST Digit Classifier: ${KNOWLEDGE_BASE.projects.mnist}

Bike Sharing Demand Prediction: ${KNOWLEDGE_BASE.projects.bike_sharing}

Dog Breed Classifier: ${KNOWLEDGE_BASE.projects.dog_classifier}

Medusa Bot: ${KNOWLEDGE_BASE.projects.medusa_bot}\n\n`;
  }
  
  // Check for achievement-related queries
  if (lowerQuery.includes('achievement') || lowerQuery.includes('award') || lowerQuery.includes('prize') || lowerQuery.includes('hackathon')) {
    relevantInfo += `Here are Chan's achievements:

Hackathon Success: ${KNOWLEDGE_BASE.achievements.hackathon}

Programming Competition: ${KNOWLEDGE_BASE.achievements.programming}

AI Nanodegree: ${KNOWLEDGE_BASE.achievements.nanodegree}

Academic Excellence: ${KNOWLEDGE_BASE.achievements.academic}\n\n`;
  }
  
  // Check for skills-related queries
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming') || lowerQuery.includes('language')) {
    relevantInfo += `Here are Chan's technical skills:

Programming Languages & Frameworks:
${KNOWLEDGE_BASE.experience.skills.slice(0, 4).map(skill => `• ${skill}`).join('\n')}

AI/ML & Data Science:
${KNOWLEDGE_BASE.experience.skills.slice(4, 8).map(skill => `• ${skill}`).join('\n')}

Computer Vision & NLP:
${KNOWLEDGE_BASE.experience.skills.slice(8, 10).map(skill => `• ${skill}`).join('\n')}

Development & Tools:
${KNOWLEDGE_BASE.experience.skills.slice(10).map(skill => `• ${skill}`).join('\n')}\n\n`;
  }
  
  // Check for contact-related queries
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('linkedin') || lowerQuery.includes('github')) {
    relevantInfo += `Here's how to contact Chan:

Email: ${KNOWLEDGE_BASE.personal.email}
LinkedIn: ${KNOWLEDGE_BASE.personal.linkedin}
GitHub: ${KNOWLEDGE_BASE.personal.github}
Location: ${KNOWLEDGE_BASE.personal.location}\n\n`;
  }
  
  // Check for general personal queries
  if (lowerQuery.includes('who are you') || lowerQuery.includes('tell me about') || lowerQuery.includes('background') || lowerQuery.includes('yourself')) {
    relevantInfo += `Here's what I know about Chan:

Name: ${KNOWLEDGE_BASE.personal.name}
Title: ${KNOWLEDGE_BASE.personal.title}
Location: ${KNOWLEDGE_BASE.personal.location}

Areas of Interest:
${KNOWLEDGE_BASE.interests.map(interest => `• ${interest}`).join('\n')}

Education: ${KNOWLEDGE_BASE.education.degree} at ${KNOWLEDGE_BASE.education.university} (${KNOWLEDGE_BASE.education.graduation}) with ${KNOWLEDGE_BASE.education.gpa} GPA\n\n`;
  }
  
  return relevantInfo;
};

const MedusaChat: React.FC<MedusaChatProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey there! I'm Medusa, and I'm excited to chat with you about Chan Dinh! I've got all the inside scoop on his background, projects, and achievements. I'm here to help you learn about his experience, skills, or just chat about anything else you're curious about. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentBackground, setCurrentBackground] = useState<string>('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Chat history context
  const { addMessage: addToHistory, state: chatHistoryState } = useChatHistory();

  // Function to save message to database with IP address
  const saveMessageToDatabase = async (
    role: 'user' | 'assistant',
    content: string,
    tokens?: number
  ) => {
    try {
      const sessionId = chatHistoryState.sessionId;
      const ipAddress = chatHistoryState.ipAddress || await sessionManager.getClientIPAddress();
      
      if (sessionId && ipAddress) {
        await chatService.saveMessage(
          sessionId,
          role,
          content,
          ipAddress,
          tokens,
          undefined, // userId
          {
            userAgent: navigator.userAgent,
            deviceInfo: `${navigator.platform} - ${navigator.language}`,
            browserInfo: `${navigator.appName} ${navigator.appVersion}`
          }
        );
      }
    } catch (error) {
      console.error('Failed to save message to database:', error);
    }
  };

  // Function to detect background changes
  const detectBackgroundChange = () => {
    // Get the current background from the document
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    const background = computedStyle.background || computedStyle.backgroundImage;
    
    if (background && background !== currentBackground) {
      setCurrentBackground(background);
    }
  };

  // Listen for background changes
  useEffect(() => {
    detectBackgroundChange();
    
    // Check for background changes periodically
    const interval = setInterval(detectBackgroundChange, 1000);
    
    // Also listen for DOM changes that might indicate background updates
    const observer = new MutationObserver(detectBackgroundChange);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [currentBackground]);

  // Get complementary colors based on current background
  const complementaryColors = getBackgroundComplementaryColors(currentBackground);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize API key from environment or localStorage
  useEffect(() => {
    const envApiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (envApiKey) {
      return;
    }
    
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      // API key is already available via props
      return;
    }
  }, []);

  const clearApiKey = () => {
    localStorage.removeItem('openai_api_key');
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
    
    // Save user message to chat history context
    addToHistory({
      role: 'user',
      content: inputText,
      tokens: Math.ceil(inputText.length / 4) // Rough token estimation
    });

    // Save user message to database with IP address
    await saveMessageToDatabase(
      'user',
      inputText,
      Math.ceil(inputText.length / 4)
    );
    
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

IMPORTANT INSTRUCTIONS:
- Answer like a real person having a conversation, not like a formal AI assistant
- Be conversational, friendly, and natural in your responses
- Use casual language and personal pronouns (I, you, we)
- Share your thoughts and opinions about Chan's background and achievements
- Express genuine interest and enthusiasm when talking about his work
- Use phrases like "I think", "I find it really cool that", "What impresses me about", etc.
- Keep responses conversational and engaging, not robotic or overly formal
- When asked about Chan, reference the provided information but explain it in your own words
- Feel free to add personal insights and observations about his skills and projects
- For general questions, you can also provide helpful information about programming, AI/ML, and other topics

Be helpful, conversational, and provide accurate information while maintaining a natural, human-like tone.`
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
      
      // Save bot response to chat history context
      addToHistory({
        role: 'assistant',
        content: data.choices[0]?.message?.content || 'Sorry, I encountered an error processing your request.',
        tokens: data.usage?.completion_tokens || Math.ceil(botResponse.text.length / 4)
      });

      // Save bot response to database with IP address
      await saveMessageToDatabase(
        'assistant',
        data.choices[0]?.message?.content || 'Sorry, I encountered an error processing your request.',
        data.usage?.completion_tokens || Math.ceil(botResponse.text.length / 4)
      );
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
      
      // Save error message to chat history context
      addToHistory({
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please check your API key and try again.',
        tokens: Math.ceil(errorMessage.text.length / 4)
      });

      // Save error message to database with IP address
      await saveMessageToDatabase(
        'assistant',
        'Sorry, I encountered an error while processing your request. Please check your API key and try again.',
        Math.ceil(errorMessage.text.length / 4)
      );
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a
                href="/"
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Portfolio</span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <img src="/medusa.ico" alt="Medusa" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-white">Medusa Chat</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsHistoryOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30"
                title="Chat History"
              >
                <History className="w-4 h-4" />
                <span className="text-sm font-medium">History</span>
                {chatHistoryState.messages.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                    {chatHistoryState.messages.length}
                  </span>
                )}
              </button>
              {process.env.REACT_APP_OPENAI_API_KEY ? (
                <span className="text-sm text-green-200 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400/30">
                  Production Mode
                </span>
              ) : (
                <button
                  onClick={clearApiKey}
                  className="text-sm text-white/70 hover:text-white transition-colors"
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
          className="bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/40 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500/30 via-purple-500/25 to-pink-500/20 px-6 py-4 border-b-2 border-white/40 shadow-lg backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm">
                <img src="/medusa.ico" alt="Medusa" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Medusa AI Assistant</h2>
                <p className="text-white/80 text-sm">Powered by OpenAI GPT-5 Chat with RAG</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/5 to-white/10">
            {/* Dynamic Color Indicator */}
            <div className="px-6 py-2 bg-gradient-to-r from-white/10 to-white/5 border-b border-white/20">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>🎨 Dynamic Colors Active</span>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                  </div>
                  <span>Background: {currentBackground ? 'Detected' : 'Default'}</span>
                </div>
              </div>
            </div>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden backdrop-blur-sm ${
                    message.sender === 'user' 
                      ? 'bg-white/30 text-white border border-white/40' 
                      : message.error 
                        ? 'bg-red-500/80 text-white border border-red-400/50'
                        : 'bg-white/20 text-white border border-white/30'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : 
                     message.error ? <AlertCircle className="w-4 h-4" /> : 
                     <img src="/medusa.ico" alt="Medusa" className="w-6 h-6" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 backdrop-blur-sm shadow-2xl ${
                    message.sender === 'user'
                      ? `bg-gradient-to-r ${complementaryColors.userGradient} text-white border-2 ${complementaryColors.userBorder} ${complementaryColors.userShadow}`
                      : message.error
                        ? `bg-gradient-to-r ${complementaryColors.errorGradient} text-white border-2 ${complementaryColors.errorBorder} ${complementaryColors.errorShadow}`
                        : `bg-gradient-to-r ${complementaryColors.botGradient} text-white border-2 ${complementaryColors.botBorder} ${complementaryColors.botShadow}`
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-white/70' : 
                      message.error ? 'text-red-300' : 'text-white/60'
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
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border border-white/30">
                    <img src="/medusa.ico" alt="Medusa" className="w-6 h-6" />
                  </div>
                  <div className={`bg-gradient-to-r ${complementaryColors.botGradient} rounded-2xl px-4 py-3 border-2 ${complementaryColors.botBorder} backdrop-blur-sm shadow-2xl ${complementaryColors.botShadow}`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-2 border-white/40 p-4 bg-gradient-to-t from-blue-500/20 via-purple-500/15 to-pink-500/10 shadow-lg backdrop-blur-md">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Chan's experience, skills, projects, or anything else..."
                  className="w-full px-4 py-3 bg-gradient-to-r from-white/30 via-blue-50/25 to-purple-50/20 border-2 border-blue-300/60 rounded-xl focus:ring-2 focus:ring-blue-400/70 focus:border-blue-400/70 resize-none text-black placeholder-gray-600 backdrop-blur-sm shadow-lg"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping || !apiKey}
                className="px-6 py-3 bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white rounded-xl hover:from-blue-600/90 hover:to-purple-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 border-2 border-blue-300/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setInputText("Tell me about Chan's education and background")}
                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/70 to-purple-500/70 hover:from-blue-600/80 hover:to-purple-600/80 text-white rounded-full transition-all duration-300 border-2 border-blue-300/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105"
              >
                Education
              </button>
              <button
                onClick={() => setInputText("What are Chan's technical skills?")}
                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/70 to-purple-500/70 hover:from-blue-600/80 hover:to-purple-600/80 text-white rounded-full transition-all duration-300 border-2 border-blue-300/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105"
              >
                Skills
              </button>
              <button
                onClick={() => setInputText("Tell me about Chan's projects")}
                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/70 to-purple-500/70 hover:from-blue-600/80 hover:to-purple-600/80 text-white rounded-full transition-all duration-300 border-2 border-blue-300/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105"
              >
                Projects
              </button>
              <button
                onClick={() => setInputText("What are Chan's achievements?")}
                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/70 to-purple-500/70 hover:from-blue-600/80 hover:to-purple-600/80 text-white rounded-full transition-all duration-300 border-2 border-blue-300/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105"
              >
                Achievements
              </button>
              <button
                onClick={() => setInputText("How can I contact Chan?")}
                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/70 to-purple-500/70 hover:from-blue-600/80 hover:to-purple-600/80 text-white rounded-full transition-all duration-300 border-2 border-blue-300/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105"
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
          className="mt-8 bg-gradient-to-br from-white/20 via-blue-500/15 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border-2 border-white/40"
        >
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">About Medusa Chat</h3>
            <p className="text-white/80 mb-4">
              This is an AI-powered chatbot powered by OpenAI's GPT-5 Chat model with RAG capabilities. 
              I have access to Chan Dinh's professional information and can answer questions about his experience, skills, projects, and achievements.
            </p>
            
            {/* RAG Capabilities */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-pink-500/10 rounded-lg border-2 border-white/40 backdrop-blur-sm shadow-lg">
              <h4 className="font-semibold text-white mb-3">What I Know About Chan:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/80">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-white" />
                  <span>Education & GPA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-white" />
                  <span>Work Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-white" />
                  <span>Technical Skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-white" />
                  <span>Projects & Portfolio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-white" />
                  <span>Achievements & Awards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 text-white" />
                  <span>Contact & LinkedIn</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-white font-medium">OpenAI Powered</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Brain className="w-4 h-4 text-white" />
                <span className="text-white font-medium">RAG Enhanced</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <User className="w-4 h-4 text-white" />
                <span className="text-white font-medium">Personalized</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Chat History Sidebar */}
      <ChatHistory 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />
    </div>
  );
};

export default MedusaChat;
