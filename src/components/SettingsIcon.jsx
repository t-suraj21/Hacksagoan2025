import React from 'react';
import { Settings } from 'lucide-react';

const SettingsIcon = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ${className}`}
      aria-label="Settings"
    >
      <Settings 
        className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-transform duration-300 group-hover:rotate-90" 
      />
      <span className="absolute -top-2 -right-2 w-2 h-2 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default SettingsIcon; 