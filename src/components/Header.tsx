import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <img
              src="/logo.png"
              alt="Chan Dinh Logo"
              className="w-28 h-28 rounded-lg"
            />
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'projects', 'skills', 'achievements', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-600 hover:text-primary-600 transition-colors duration-300 capitalize font-medium"
              >
                {item}
              </button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:hidden"
          >
            <button className="text-gray-600 hover:text-primary-600 transition-colors duration-300">
              <Menu className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
