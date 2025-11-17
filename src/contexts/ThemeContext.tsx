import React, { createContext, useContext, useEffect, useState } from 'react';
import { StorageService, STORAGE_KEYS } from '@/lib/storage';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'dark' | 'light';
  isTransitioning: boolean;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  actualTheme: 'dark',
  setTheme: () => null,
  isTransitioning: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (StorageService.get<Theme>(STORAGE_KEYS.THEME) as Theme) || defaultTheme
  );

  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    // Add transition class for smooth animations
    root.classList.add('theme-transitioning');
    setIsTransitioning(true);

    root.classList.remove('light', 'dark');

    let resolvedTheme: 'dark' | 'light';

    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
    } else {
      resolvedTheme = theme;
    }

    root.classList.add(resolvedTheme);
    setActualTheme(resolvedTheme);

    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      root.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 600); // Match CSS transition duration

    return () => clearTimeout(timer);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      StorageService.set(STORAGE_KEYS.THEME, theme);
      setTheme(theme);
    },
    actualTheme,
    isTransitioning,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
      {/* Grain overlay for smooth transitions */}
      {isTransitioning && (
        <div className="theme-grain-overlay" />
      )}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};