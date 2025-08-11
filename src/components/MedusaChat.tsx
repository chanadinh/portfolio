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

const MedusaChat: React.FC = () => {
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
          className="bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-white/25 to-white/15 px-6 py-4 border-b-2 border-white/30 shadow-lg">
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
                      ? 'bg-blue-600/90 text-white border-2 border-blue-400/70 shadow-blue-500/50'
                      : message.error
                        ? 'bg-red-600/90 text-white border-2 border-red-400/70 shadow-red-500/50'
                        : 'bg-gray-900/90 text-white border-2 border-gray-400/70 shadow-gray-500/50'
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
                  <div className="bg-gray-900/90 rounded-2xl px-4 py-3 border-2 border-gray-400/70 backdrop-blur-sm shadow-2xl shadow-gray-500/50">
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
          <div className="border-t-2 border-white/30 p-4 bg-gradient-to-t from-white/15 to-transparent shadow-lg">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Chan's experience, skills, projects, or anything else..."
                  className="w-full px-4 py-3 bg-white/25 border-2 border-white/40 rounded-xl focus:ring-2 focus:ring-white/60 focus:border-white/60 resize-none text-white placeholder-white/70 backdrop-blur-sm shadow-lg"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping || !apiKey}
                className="px-6 py-3 bg-white/35 text-white rounded-xl hover:bg-white/45 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 border-2 border-white/50 backdrop-blur-sm shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setInputText("Tell me about Chan's education and background")}
                className="px-3 py-1 text-xs bg-white/25 hover:bg-white/35 text-white rounded-full transition-colors border-2 border-white/40 backdrop-blur-sm shadow-md"
              >
                Education
              </button>
              <button
                onClick={() => setInputText("What are Chan's technical skills?")}
                className="px-3 py-1 text-xs bg-white/25 hover:bg-white/35 text-white rounded-full transition-colors border-2 border-white/40 backdrop-blur-sm shadow-md"
              >
                Skills
              </button>
              <button
                onClick={() => setInputText("Tell me about Chan's projects")}
                className="px-3 py-1 text-xs bg-white/25 hover:bg-white/35 text-white rounded-full transition-colors border-2 border-white/40 backdrop-blur-sm shadow-md"
              >
                Projects
              </button>
              <button
                onClick={() => setInputText("What are Chan's achievements?")}
                className="px-3 py-1 text-xs bg-white/25 hover:bg-white/35 text-white rounded-full transition-colors border-2 border-white/40 backdrop-blur-sm shadow-md"
              >
                Achievements
              </button>
              <button
                onClick={() => setInputText("How can I contact Chan?")}
                className="px-3 py-1 text-xs bg-white/25 hover:bg-white/35 text-white rounded-full transition-colors border-2 border-white/40 backdrop-blur-sm shadow-md"
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
          className="mt-8 bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border-2 border-white/30"
        >
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">About Medusa Chat</h3>
            <p className="text-white/80 mb-4">
              This is an AI-powered chatbot powered by OpenAI's GPT-5 Chat model with RAG capabilities. 
              I have access to Chan Dinh's professional information and can answer questions about his experience, skills, projects, and achievements.
            </p>
            
            {/* RAG Capabilities */}
            <div className="mb-6 p-4 bg-white/15 rounded-lg border-2 border-white/30 backdrop-blur-sm shadow-lg">
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
