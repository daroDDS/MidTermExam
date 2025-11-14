// Purpose: Centralized color palette for the entire app

export const Colors = {
    // Primary brand colors
    primary: '#5B4FCF',
    primaryDark: '#4A3FB5',
    primaryLight: '#6B5FD9',
    
    // Secondary colors
    secondary: '#42A5F5',
    accent: '#4CAF50',
    
    // Athkar category colors (from your design)
    morning: '#FF8A65',      // Orange - Morning Athkar
    evening: '#42A5F5',      // Blue - Evening Athkar
    sleep: '#EF5350',        // Red - Sleep Athkar
    waking: '#AB47BC',       // Purple - Waking up Athkar
    
    // Semantic colors
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
    
    // Neutral colors (Light theme)
    light: {
      background: '#F5F5F5',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
      border: '#E0E0E0',
      divider: '#BDBDBD',
    },
    
    // Dark theme colors
    dark: {
      background: '#121212',
      surface: '#1E1E1E',
      card: '#2C2C2C',
      text: '#FFFFFF',
      textSecondary: '#B0B0B0',
      border: '#383838',
      divider: '#505050',
    },
    
    // Gradient colors
    gradient: {
      start: '#5B4FCF',
      end: '#6B5FD9',
    },
  };
  
  // Type for theme colors
  export type ThemeColors = typeof Colors.light;