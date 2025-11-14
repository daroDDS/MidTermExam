// Purpose: Category card component for home screen

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Category } from '@/types';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '@/constants/Styles';
import { useTheme } from '@/hooks/useTheme';
import * as Haptics from 'expo-haptics';

interface CategoryCardProps {
  category: Category;
  progress?: {
    completed: number;
    total: number;
  };
}

/**
 * Category Card Component
 * Displays athkar category with icon and name
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({ category, progress }) => {
  const { colors } = useTheme();

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Navigate to category detail
    const categoryRoute = category.name_en.toLowerCase().replace(/ /g, '_');
    router.push(`/athkar/${categoryRoute}`);
  };

  const progressPercentage = progress 
    ? Math.round((progress.completed / progress.total) * 100) 
    : 0;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[category.color, category.color + 'DD']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons 
            name={category.icon as any} 
            size={32} 
            color="white" 
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {category.name_en}
          </Text>
          
          <Text style={styles.titleArabic} numberOfLines={1}>
            {category.name_ar}
          </Text>

          {/* Progress indicator */}
          {progress && progress.total > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${progressPercentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {progress.completed}/{progress.total}
              </Text>
            </View>
          )}
        </View>

        {/* Arrow icon */}
        <Ionicons 
          name="chevron-forward" 
          size={24} 
          color="white" 
          style={styles.arrow}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.medium,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    minHeight: 90,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: 'white',
    marginBottom: Spacing.xs,
  },
  titleArabic: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Spacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: BorderRadius.full,
  },
  progressText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: 'white',
    minWidth: 40,
  },
  arrow: {
    marginLeft: Spacing.sm,
  },
});