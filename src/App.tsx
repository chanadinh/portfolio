import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedusaChat from './components/MedusaChat';
import Portfolio from './components/Portfolio';
import DynamicBackground from './components/DynamicBackground';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <DynamicBackground>
        <div className="min-h-screen">
          <Routes>
            <Route path="/medusachat" element={<MedusaChat />} />
            <Route path="/" element={<Portfolio />} />
          </Routes>
        </div>
      </DynamicBackground>
    </Router>
  );
};

export default App;
