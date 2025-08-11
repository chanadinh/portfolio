import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container-custom text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img
              src="/logo.png"
              alt="Chan Dinh Logo"
              className="w-28 h-28 rounded-lg"
            />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AI/ML Developer passionate about innovation and technology. Currently interning at Siemens Energy, 
            working on cutting-edge AI and machine learning solutions.
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com/chanadinh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/chan-dinh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:chan.dinh@example.com"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400">
            © 2025 Chan Dinh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
