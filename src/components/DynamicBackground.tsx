import React, { useEffect, useState } from 'react';

interface DynamicBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ children, className = '' }) => {
  const [backgroundStyle, setBackgroundStyle] = useState<string>('');

  useEffect(() => {
    // Generate a new gradient background on each page load
    const gradients = [
      'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
      'linear-gradient(135deg, rgba(255, 107, 107, 0.8) 0%, rgba(255, 193, 7, 0.8) 100%)',
      'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(33, 150, 243, 0.8) 100%)',
      'linear-gradient(135deg, rgba(156, 39, 176, 0.8) 0%, rgba(233, 30, 99, 0.8) 100%)',
      'linear-gradient(135deg, rgba(255, 87, 34, 0.8) 0%, rgba(255, 193, 7, 0.8) 100%)',
      'linear-gradient(135deg, rgba(0, 150, 136, 0.8) 0%, rgba(76, 175, 80, 0.8) 100%)',
      'linear-gradient(135deg, rgba(63, 81, 181, 0.8) 0%, rgba(156, 39, 176, 0.8) 100%)',
      'linear-gradient(135deg, rgba(233, 30, 99, 0.8) 0%, rgba(255, 87, 34, 0.8) 100%)'
    ];
    
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setBackgroundStyle(randomGradient);
  }, []); // Empty dependency array ensures it only runs once per page load

  const backgroundStyles = {
    background: backgroundStyle,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative' as const,
  };

  // Add subtle overlay for better text readability
  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)',
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative' as const,
    zIndex: 2,
  };

  return (
    <div className={`dynamic-background ${className}`} style={backgroundStyles}>
      {/* Subtle overlay for better readability */}
      <div style={overlayStyle} />
      
      {/* Content */}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
