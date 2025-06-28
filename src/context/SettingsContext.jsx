import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  // Theme Settings
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Font Size Settings
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'medium';
  });

  // Apply theme and font size on mount and when they change
  useEffect(() => {
    // Apply theme
    document.documentElement.classList.remove('light', 'dark', 'normal', 'purple', 'blue');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);

    // Apply font size
    const root = document.documentElement;
    switch (fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
    localStorage.setItem('fontSize', fontSize);
  }, [theme, fontSize]);

  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext; 