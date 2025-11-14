// Purpose: Entry point - redirects to main tabs

import { useEffect } from 'react';
import { router } from 'expo-router';

/**
 * Index Screen
 * Redirects to main tabs immediately
 */
export default function Index() {
  useEffect(() => {
    // Redirect to tabs on mount
    router.replace('/(tabs)');
  }, []);

  return null;
}