'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as Theme;

    // Force light theme on mobile, use saved theme on desktop
    if (window.innerWidth < 768) {
      setThemeState('light');
    } else if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      setThemeState('light');
    }

    setMounted(true);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Force light theme on mobile
      const finalTheme = isMobile ? 'light' : theme;
      
      // Update document class and localStorage
      document.documentElement.classList.toggle('dark', finalTheme === 'dark');
      
      // Only save theme on desktop
      if (!isMobile) {
        localStorage.setItem('theme', theme);
      }
    }
  }, [theme, mounted, isMobile]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Return default theme during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{
        theme: 'light',
        toggleTheme: () => { },
        setTheme: () => { }
      }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
