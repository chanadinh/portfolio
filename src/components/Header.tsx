import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = ['home', 'about', 'projects', 'skills', 'achievements', 'contact'];

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-600 hover:text-primary-600 transition-colors duration-300 capitalize font-medium"
              >
                {item}
              </button>
            ))}
            <a
              href="/graphing"
              className="text-gray-600 hover:text-primary-600 transition-colors duration-300 font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700"
            >
              Graphing
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:hidden"
          >
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-primary-600 transition-colors duration-300 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-gray-200 bg-white/95 backdrop-blur-md">
                {navigationItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleMobileNavClick(item)}
                    className="w-full text-left px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-300 capitalize font-medium rounded-lg mx-2"
                  >
                    {item}
                  </button>
                ))}
                <a
                  href="/graphing"
                  className="block w-full text-left px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-300 font-medium rounded-lg mx-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700"
                >
                  Graphing
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
