// Purpose: Athkar detail screen showing athkar list for a category

import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text,
  ActivityIndicator,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AthkarCard } from '@/components/AthkarCard';
import { ErrorView } from '@/components/ErrorView';
import { useTheme } from '@/hooks/useTheme';
import { useAthkarProgress } from '@/hooks/useAthkarProgress';
import { useAthkarStore } from '@/store/useAthkarStore';
import { 
  getAthkarWithProgress, 
  getCategoryById,
} from '@/database/database';
import { AthkarWithProgress } from '@/types';
import { Spacing } from '@/constants/Styles';

/**
 * Athkar Detail Screen
 * Shows list of athkar for selected category
 */
export default function AthkarDetailScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { colors } = useTheme();
  const { categories } = useAthkarStore();
  const { incrementCount, markAsComplete, loadProgress } = useAthkarProgress();

  const [athkarList, setAthkarList] = useState<AthkarWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    loadAthkar();
  }, [category]);

  const loadAthkar = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Find category by route name
      const foundCategory = categories.find(
        (cat) => cat.name_en.toLowerCase().replace(/ /g, '_') === category
      );

      if (!foundCategory) {
        setError('Category not found');
        setIsLoading(false);
        return;
      }

      setCategoryData(foundCategory);

      // Load athkar with progress
      const athkar = await getAthkarWithProgress(foundCategory.id);
      setAthkarList(athkar);

      // Load progress into hook
      const progressData: any = {};
      athkar.forEach((a) => {
        progressData[a.id] = {
          currentCount: a.current_count,
          isCompleted: a.is_completed,
        };
      });
      loadProgress(progressData);

      setIsLoading(false);
    } catch (err) {
      console.error('Error loading athkar:', err);
      setError('Failed to load athkar');
      setIsLoading(false);
    }
  };

  const handleIncrement = async (athkar: AthkarWithProgress) => {
    await incrementCount(athkar.id, athkar.repetitions, true);
    
    // Reload to get updated data
    await loadAthkar();
  };

  const handleComplete = async (athkar: AthkarWithProgress) => {
    await markAsComplete(athkar.id, athkar.repetitions);
    await loadAthkar();
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.text} />
          <Text style={{ color: colors.text, marginTop: Spacing.md }}>
            Loading athkar...
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SafeAreaView style={styles.loadingContainer}>
          <ErrorView message={error} onRetry={loadAthkar} />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: categoryData?.name_en || 'Athkar',
          headerStyle: {
            backgroundColor: categoryData?.color || colors.card,
          },
          headerTintColor: 'white',
        }}
      />

      <FlatList
        data={athkarList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AthkarCard
            athkar={item}
            onIncrement={() => handleIncrement(item)}
            onComplete={() => handleComplete(item)}
            showTranslation={true}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: colors.textSecondary }}>
              No athkar found for this category
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
});