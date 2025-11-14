// Purpose: Theme context for managing light/dark mode across the app

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, ThemeColors } from '@/constants/Colors';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { Theme } from '@/types';

// Context type definition
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isDark: boolean;
  colors: ThemeColors;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider props
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider Component
 * Wraps the entire app to provide theme functionality
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Get device theme
  const [theme, setThemeState] = useState<Theme>('auto');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme from AsyncStorage on mount
  useEffect(() => {
    loadTheme();
  }, []);

  /**
   * Load theme preference from AsyncStorage
   */
  const loadTheme = async () => {
    try {
      const savedTheme = await storage.get<Theme>(STORAGE_KEYS.THEME);
      if (savedTheme) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update theme and save to AsyncStorage
   */
  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      await storage.save(STORAGE_KEYS.THEME, newTheme);
      console.log('✅ Theme saved:', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  /**
   * Determine if dark mode is active
   */
  const isDark = 
    theme === 'dark' || 
    (theme === 'auto' && systemColorScheme === 'dark');

  /**
   * Get current theme colors
   */
  const colors = isDark ? Colors.dark : Colors.light;

  // Don't render children until theme is loaded
  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 * Usage: const { theme, setTheme, isDark, colors } = useTheme();
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};