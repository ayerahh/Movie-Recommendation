import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const LoadingSpinner: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex justify-center items-center py-12">
      <div className={`w-10 h-10 border-4 rounded-full animate-spin ${
        theme === 'dark' 
          ? 'border-blue-600 border-t-transparent' 
          : 'border-blue-500 border-t-transparent'
      }`} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;