import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const storedTheme = localStorage.getItem('medicare_theme');
  if (storedTheme) return storedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', currentTheme);
    root.classList.toggle('dark', currentTheme === 'dark');
    localStorage.setItem('medicare_theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
