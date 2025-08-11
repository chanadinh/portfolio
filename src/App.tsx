import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedusaChat from './components/MedusaChat';
import Portfolio from './components/Portfolio';
import Graphing from './components/Graphing';
import DynamicBackground from './components/DynamicBackground';
import { ChatHistoryProvider } from './contexts/ChatHistoryContext';
import './App.css';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');

  // Initialize API key from environment or localStorage
  useEffect(() => {
    const envApiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (envApiKey) {
      setApiKey(envApiKey);
      return;
    }
    
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  return (
    <Router>
      <DynamicBackground>
        <div className="min-h-screen">
                           <Routes>
                   <Route path="/medusachat" element={
                     <ChatHistoryProvider>
                       <MedusaChat apiKey={apiKey} />
                     </ChatHistoryProvider>
                   } />
                   <Route path="/" element={<Portfolio />} />
                   <Route path="/graphing" element={<Graphing />} />
                 </Routes>
        </div>
      </DynamicBackground>
    </Router>
  );
};

export default App;
