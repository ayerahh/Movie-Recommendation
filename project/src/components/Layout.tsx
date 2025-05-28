import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunMoon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <header className={`py-4 px-6 flex justify-between items-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-md`}>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          MovieMind
        </h1>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors duration-200`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <SunMoon size={20} />
        </button>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className={`py-6 px-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } border-t ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="container mx-auto text-center">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © {new Date().getFullYear()} MovieMind • Powered by TMDB API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;