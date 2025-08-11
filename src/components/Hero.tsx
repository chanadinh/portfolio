import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/medusachat');
  };

  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/162244788?v=4"
              alt="Chan Dinh"
              className="w-32 h-32 rounded-full border-4 border-primary-100 shadow-xl"
            />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="gradient-text">Chan Dinh</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI/ML Developer passionate about creating innovative solutions and contributing to the open-source community. 
            Currently interning at Siemens Energy on cutting-edge AI and machine learning technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={handleChatClick}
              className="btn-primary"
            >
              Chat with My Assistant
            </button>
            <a
              href="/graphing"
              className="btn-secondary bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              Interactive Graphing
            </a>
            <a
              href="/Chan Dinh Resume April 2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download Resume
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">4.00</div>
              <div className="text-gray-600">GPA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">3+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
