// Purpose: Root layout with providers (Theme, Language, Database)

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useDatabase } from '@/hooks/useDatabase';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ErrorView } from '@/components/ErrorView';
import { useAthkarStore } from '@/store/useAthkarStore';

/**
 * Root Layout Component
 * Wraps app with providers and initializes database
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RootLayoutContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const { isReady, error } = useDatabase();
  const { loadCategories, loadFavorites } = useAthkarStore();

  // Load initial data when database is ready
  useEffect(() => {
    if (isReady) {
      loadInitialData();
    }
  }, [isReady]);

  const loadInitialData = async () => {
    try {
      await loadCategories();
      await loadFavorites();
      console.log('✅ Initial data loaded');
    } catch (error) {
      console.error('❌ Error loading initial data:', error);
    }
  };

  // Show loading screen while database initializes
  if (!isReady && !error) {
    return <LoadingScreen message="Initializing app..." />;
  }

  // Show error if database failed to initialize
  if (error) {
    return <ErrorView message="Failed to initialize database" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="athkar" />
      <Stack.Screen 
        name="counter" 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}