import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-lg p-4 flex items-center ${
      theme === 'dark' ? 'bg-red-900/30 text-red-200' : 'bg-red-50 text-red-800'
    } my-4`}>
      <AlertCircle className="mr-3" size={20} />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;