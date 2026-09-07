import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const isDarkMode = currentTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200 active:scale-95"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
      <span className="text-xs font-bold hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'} Mode</span>
    </button>
  );
};

export default ThemeToggle;

