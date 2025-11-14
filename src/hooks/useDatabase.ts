// Purpose: Custom hook to initialize and manage database connection

import { useEffect, useState } from 'react';
import { openDatabase } from '@/database/database';

/**
 * Hook to initialize database on app start
 * Returns loading state and error if any
 */
export const useDatabase = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      console.log('🔄 Initializing database...');
      await openDatabase();
      setIsReady(true);
      console.log('✅ Database ready');
    } catch (err) {
      console.error('❌ Database initialization failed:', err);
      setError(err as Error);
    }
  };

  return { isReady, error };
};