// Purpose: Custom hook for managing athkar progress and completion

import { useState, useCallback } from 'react';
import { updateProgress, getTodayStats } from '@/database/database';
import * as Haptics from 'expo-haptics';

interface ProgressData {
  [athkarId: number]: {
    currentCount: number;
    isCompleted: boolean;
  };
}

/**
 * Hook to manage athkar progress
 */
export const useAthkarProgress = () => {
  const [progress, setProgress] = useState<ProgressData>({});
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Increment count for an athkar
   */
  const incrementCount = useCallback(async (
    athkarId: number,
    maxRepetitions: number,
    enableVibration: boolean = true
  ) => {
    const currentData = progress[athkarId] || { currentCount: 0, isCompleted: false };
    const newCount = currentData.currentCount + 1;
    const isCompleted = newCount >= maxRepetitions;

    // Update local state immediately (optimistic update)
    setProgress(prev => ({
      ...prev,
      [athkarId]: {
        currentCount: newCount,
        isCompleted,
      },
    }));

    // Vibration feedback
    if (enableVibration) {
      if (isCompleted) {
        // Different vibration for completion
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }

    // Update database
    try {
      setIsUpdating(true);
      await updateProgress(athkarId, newCount, isCompleted);
      console.log(`✅ Progress updated: ${athkarId} - ${newCount}/${maxRepetitions}`);
    } catch (error) {
      console.error('❌ Error updating progress:', error);
      // Revert optimistic update on error
      setProgress(prev => ({
        ...prev,
        [athkarId]: currentData,
      }));
    } finally {
      setIsUpdating(false);
    }
  }, [progress]);

  /**
   * Reset count for an athkar
   */
  const resetCount = useCallback(async (athkarId: number) => {
    setProgress(prev => ({
      ...prev,
      [athkarId]: {
        currentCount: 0,
        isCompleted: false,
      },
    }));

    try {
      await updateProgress(athkarId, 0, false);
      console.log(`✅ Progress reset: ${athkarId}`);
    } catch (error) {
      console.error('❌ Error resetting progress:', error);
    }
  }, []);

  /**
   * Mark athkar as complete
   */
  const markAsComplete = useCallback(async (
    athkarId: number,
    repetitions: number
  ) => {
    setProgress(prev => ({
      ...prev,
      [athkarId]: {
        currentCount: repetitions,
        isCompleted: true,
      },
    }));

    try {
      await updateProgress(athkarId, repetitions, true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log(`✅ Marked as complete: ${athkarId}`);
    } catch (error) {
      console.error('❌ Error marking as complete:', error);
    }
  }, []);

  /**
   * Get today's statistics
   */
  const getStats = useCallback(async () => {
    try {
      const stats = await getTodayStats();
      return stats;
    } catch (error) {
      console.error('❌ Error getting stats:', error);
      return { total: 0, completed: 0, percentage: 0 };
    }
  }, []);

  /**
   * Load progress from database
   */
  const loadProgress = useCallback((progressData: ProgressData) => {
    setProgress(progressData);
  }, []);

  return {
    progress,
    isUpdating,
    incrementCount,
    resetCount,
    markAsComplete,
    getStats,
    loadProgress,
  };
};