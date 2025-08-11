import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import MedusaChat from './MedusaChat';

const MainRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/medusachat" element={<MedusaChat />} />
    </Routes>
  </Router>
);

export default MainRouter;
