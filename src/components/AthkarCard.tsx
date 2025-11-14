// Purpose: Individual athkar card with text and progress counter

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AthkarWithProgress } from '@/types';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '@/constants/Styles';
import { useTheme } from '@/hooks/useTheme';
import { useAthkarStore } from '@/store/useAthkarStore';
import * as Haptics from 'expo-haptics';

interface AthkarCardProps {
  athkar: AthkarWithProgress;
  onIncrement: () => void;
  onComplete: () => void;
  showTranslation?: boolean;
}

/**
 * Athkar Card Component
 * Displays individual athkar with counter and favorite button
 */
export const AthkarCard: React.FC<AthkarCardProps> = ({
  athkar,
  onIncrement,
  onComplete,
  showTranslation = true,
}) => {
  const { colors, isDark } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useAthkarStore();
  const [showFullText, setShowFullText] = useState(false);
  
  const favorite = isFavorite(athkar.id);
  const progress = athkar.current_count || 0;
  const total = athkar.repetitions;
  const isCompleted = athkar.is_completed || progress >= total;

  const handleIncrement = async () => {
    if (isCompleted) return;
    
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onIncrement();
    
    if (progress + 1 >= total) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onComplete();
    }
  };

  const handleFavoriteToggle = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (favorite) {
      await removeFavorite(athkar.id);
    } else {
      await addFavorite(athkar.id);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Header with favorite button */}
      <View style={styles.header}>
        <View style={styles.counterBadge}>
          <Text style={[styles.counterText, { color: isCompleted ? '#4CAF50' : colors.text }]}>
            {progress}/{total}
          </Text>
        </View>

        <TouchableOpacity onPress={handleFavoriteToggle} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={24}
            color={favorite ? '#F44336' : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Arabic text */}
      <TouchableOpacity onPress={() => setShowFullText(!showFullText)} activeOpacity={0.7}>
        <Text 
          style={[styles.arabicText, { color: colors.text }]}
          numberOfLines={showFullText ? undefined : 3}
        >
          {athkar.text_ar}
        </Text>
      </TouchableOpacity>

      {/* Transliteration */}
      {athkar.transliteration && (
        <Text 
          style={[styles.transliteration, { color: colors.textSecondary }]}
          numberOfLines={showFullText ? undefined : 2}
        >
          {athkar.transliteration}
        </Text>
      )}

      {/* Translation */}
      {showTranslation && athkar.translation_fr && (
        <Text 
          style={[styles.translation, { color: colors.textSecondary }]}
          numberOfLines={showFullText ? undefined : 2}
        >
          {athkar.translation_fr}
        </Text>
      )}

      {/* Benefits */}
      {athkar.benefits && (
        <View style={[styles.benefitsContainer, { backgroundColor: isDark ? '#2C2C2C' : '#F5F5F5' }]}>
          <Ionicons name="star" size={14} color="#FFC107" style={styles.benefitIcon} />
          <Text style={[styles.benefits, { color: colors.textSecondary }]}>
            {athkar.benefits}
          </Text>
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.actions}>
        {/* Source */}
        {athkar.source && (
          <View style={styles.sourceContainer}>
            <Ionicons name="book-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.source, { color: colors.textSecondary }]}>
              {athkar.source}
            </Text>
          </View>
        )}

        {/* Counter button */}
        <TouchableOpacity
          style={[
            styles.counterButton,
            { 
              backgroundColor: isCompleted ? '#4CAF50' : Colors.primary,
              opacity: isCompleted ? 0.7 : 1,
            }
          ]}
          onPress={handleIncrement}
          disabled={isCompleted}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isCompleted ? 'checkmark-circle' : 'add-circle'} 
            size={20} 
            color="white" 
          />
          <Text style={styles.counterButtonText}>
            {isCompleted ? 'Completed' : 'Count'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadow.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  counterBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(66, 165, 245, 0.1)',
  },
  counterText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  arabicText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.medium,
    lineHeight: 36,
    textAlign: 'right',
    marginBottom: Spacing.sm,
  },
  transliteration: {
    fontSize: FontSize.sm,
    fontStyle: 'italic',
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  translation: {
    fontSize: FontSize.md,
    marginBottom: Spacing.sm,
    lineHeight: 22,
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  benefitIcon: {
    marginRight: Spacing.xs,
  },
  benefits: {
    flex: 1,
    fontSize: FontSize.sm,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  source: {
    fontSize: FontSize.sm,
  },
  counterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  counterButtonText: {
    color: 'white',
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});

// Import Colors for counterButton
import { Colors } from '@/constants/Colors';