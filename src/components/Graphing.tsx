import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, Settings, Download, Share2 } from 'lucide-react';

const Graphing: React.FC = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const calculatorInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    // Get API key from environment variable
    const desmosApiKey = process.env.REACT_APP_DESMOS_API_KEY;
    
    if (!desmosApiKey) {
      console.error('Desmos API key not found. Please set REACT_APP_DESMOS_API_KEY in your environment variables.');
      setHasApiKey(false);
      setIsLoading(false);
      return;
    }

    // Load Desmos API script
    const script = document.createElement('script');
    script.src = `https://www.desmos.com/api/v1.11/calculator.js?apiKey=${desmosApiKey}`;
    script.async = true;
    
    script.onload = () => {
      if (calculatorRef.current && (window as any).Desmos) {
        // Initialize the Desmos calculator
        const calculator = (window as any).Desmos.GraphingCalculator(calculatorRef.current, {
          keypad: true,
          graphpaper: true,
          expressions: true,
          settingsMenu: true,
          zoomButtons: true,
          showResetButtonOnGraphpaper: true,
          expressionsTopbar: true,
          pointsOfInterest: true,
          trace: true,
          border: true,
          lockViewport: false,
          expressionsCollapsed: false,
          capExpressionSize: false,
          authorFeatures: false,
          images: true,
          folders: true,
          notes: true,
          sliders: true,
          actions: 'auto',
          substitutions: true,
          links: true,
          qwertyKeyboard: true,
          distributions: true,
          restrictedFunctions: false,
          forceEnableGeometryFunctions: false,
          pasteGraphLink: false,
          pasteTableData: true,
          clearIntoDegreeMode: false,
          degreeMode: false,
          polarMode: false,
          lockUnicode: false,
          invertedColors: false,
          brailleMode: 'none',
          sixKeyInput: false,
          projectorMode: false,
          decimalToFraction: true,
          functionDefinition: true,
          autosize: true
        });
        
        calculatorInstanceRef.current = calculator;
        
        // Add some default expressions to get started
        calculator.setExpression({ id: 'welcome', latex: 'y=x^2', color: '#2d70b3' });
        calculator.setExpression({ id: 'line', latex: 'y=2x+1', color: '#388c46' });
        calculator.setExpression({ id: 'circle', latex: '(x-2)^2+(y-1)^2=4', color: '#6042a6' });
        
        setIsLoading(false);
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      if (calculatorInstanceRef.current) {
        calculatorInstanceRef.current.destroy();
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleReset = () => {
    if (calculatorInstanceRef.current) {
      calculatorInstanceRef.current.setBlank();
    }
  };

  const handleScreenshot = () => {
    if (calculatorInstanceRef.current) {
      calculatorInstanceRef.current.asyncScreenshot({
        width: 800,
        height: 600,
        targetPixelRatio: 2
      }).then((dataURL: string) => {
        const link = document.createElement('a');
        link.download = 'desmos-graph.png';
        link.href = dataURL;
        link.click();
      });
    }
  };

  const handleShare = () => {
    if (calculatorInstanceRef.current) {
      const state = calculatorInstanceRef.current.getState();
      const graphUrl = `https://www.desmos.com/calculator?state=${encodeURIComponent(JSON.stringify(state))}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(graphUrl).then(() => {
        alert('Graph URL copied to clipboard!');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = graphUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Graph URL copied to clipboard!');
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Portfolio</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-blue-600" />
                <span>Interactive Graphing Calculator</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={handleScreenshot}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Screenshot</span>
              </button>
              
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Info Section */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the Interactive Graphing Calculator!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Features</h3>
              <ul className="space-y-1 text-sm">
                <li>• Plot functions, equations, and inequalities</li>
                <li>• Create interactive sliders and animations</li>
                <li>• Add tables and data visualization</li>
                <li>• Explore 3D graphs and geometry</li>
                <li>• Save and share your graphs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-600">Getting Started</h3>
              <ul className="space-y-1 text-sm">
                <li>• Type equations in the expressions list</li>
                <li>• Use the keypad for mathematical symbols</li>
                <li>• Drag to pan and scroll to zoom</li>
                <li>• Click on points to see coordinates</li>
                <li>• Right-click for additional options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calculator Container */}
        {!hasApiKey ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <div className="text-red-600 mb-4">
              <Calculator className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">API Key Required</h3>
              <p className="text-red-700">
                The Desmos API key is not configured. Please set the REACT_APP_DESMOS_API_KEY environment variable in Vercel.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
              <p className="font-medium mb-2">To get your API key:</p>
              <ol className="list-decimal list-inside space-y-1 text-left max-w-md mx-auto">
                <li>Email <a href="mailto:partnerships@desmos.com" className="text-blue-600 underline">partnerships@desmos.com</a></li>
                <li>Request access to the Desmos API</li>
                <li>Add the key to your Vercel environment variables</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="w-full h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading Desmos Calculator...</p>
                </div>
              </div>
            ) : (
              <div 
                ref={calculatorRef}
                className="w-full h-[600px]"
                style={{ minHeight: '600px' }}
              />
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by <a href="https://www.desmos.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Desmos</a> - The most advanced graphing calculator</p>
          <p className="mt-1">This calculator is for educational and demonstration purposes.</p>
        </div>
      </motion.main>
    </div>
  );
};

export default Graphing;
