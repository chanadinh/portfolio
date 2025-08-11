import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedusaChat from './components/MedusaChat';
import Portfolio from './components/Portfolio';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/medusachat" element={<MedusaChat />} />
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </Router>
  );
};

export default App;
