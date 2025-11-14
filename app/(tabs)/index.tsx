// Purpose: Home screen with athkar categories

import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { IslamicPattern } from '@/components/IslamicPattern';
import { CategoryCard } from '@/components/CategoryCard';
import { QuickActionButton } from '@/components/QuickActionButton';
import { IslamicDateCard } from '@/components/IslamicDateCard';
import { StatsCard } from '@/components/StatsCard';
import { useAthkarStore } from '@/store/useAthkarStore';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { getTodayStats } from '@/database/database';
import { FontSize, FontWeight, Spacing } from '@/constants/Styles';
import { QUICK_ACTIONS } from '@/constants/athkarData';

/**
 * Home Screen
 * Main screen showing athkar categories
 */
export default function HomeScreen() {
  const { colors } = useTheme();
  const { t, language } = useLanguage();
  const { categories, loadCategories } = useAthkarStore();
  
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, percentage: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const todayStats = await getTodayStats();
      setStats(todayStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCategories();
    await loadData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with gradient background */}
      <IslamicPattern style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            {/* Menu icon */}
            <TouchableOpacity onPress={() => console.log('Menu')}>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.headerTitle}>Athkar</Text>

            {/* More options */}
            <TouchableOpacity onPress={() => console.log('Options')}>
              <Ionicons name="ellipsis-vertical" size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Islamic Date */}
          <View style={styles.dateContainer}>
            <IslamicDateCard />
          </View>
        </SafeAreaView>
      </IslamicPattern>

      {/* Main content */}
      <ScrollView
        style={[styles.content, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
      >
        {/* Today's Stats */}
        {stats.total > 0 && (
          <StatsCard 
            total={stats.total}
            completed={stats.completed}
            percentage={stats.percentage}
          />
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Access
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActions}
          >
            {QUICK_ACTIONS.map((action) => (
              <QuickActionButton
                key={action.id}
                icon={action.icon}
                label={
                  language === 'ar' ? action.label_ar :
                  language === 'fr' ? action.label_fr :
                  action.label_en
                }
                route={action.route}
              />
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Athkar Categories
          </Text>
          
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: Spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: 'white',
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  content: {
    flex: 1,
    marginTop: -Spacing.lg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  quickActionsContainer: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  quickActions: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  categoriesContainer: {
    marginTop: Spacing.lg,
  },
});