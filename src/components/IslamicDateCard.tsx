// Purpose: Display Islamic/Hijri date card

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '@/constants/Styles';
import { useTheme } from '@/hooks/useTheme';

interface IslamicDateCardProps {
  style?: any;
}

/**
 * Islamic Date Card Component
 * Displays current Hijri date
 */
export const IslamicDateCard: React.FC<IslamicDateCardProps> = ({ style }) => {
  const { colors } = useTheme();
  const [islamicDate, setIslamicDate] = useState({
    day: 28,
    month: "Rabi' II",
    year: 1446,
  });

  useEffect(() => {
    calculateIslamicDate();
  }, []);

  /**
   * Calculate Islamic date (simple approximation)
   * For production, use a proper Hijri calendar library
   */
  const calculateIslamicDate = () => {
    const hijriMonths = [
      'Muharram', 'Safar', "Rabi' I", "Rabi' II",
      'Jumada I', 'Jumada II', 'Rajab', "Sha'ban",
      'Ramadan', 'Shawwal', "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ];

    // Simple approximation (not accurate - use library for production)
    const gregorianDate = new Date();
    const hijriYear = 1446; // Update based on current year
    const hijriMonth = hijriMonths[3]; // Example: Rabi' II
    const hijriDay = gregorianDate.getDate();

    setIslamicDate({
      day: hijriDay,
      month: hijriMonth,
      year: hijriYear,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }, style]}>
      <Ionicons name="calendar" size={20} color={colors.textSecondary} />
      <Text style={[styles.dateText, { color: colors.text }]}>
        {islamicDate.day} {islamicDate.month}
      </Text>
      <Text style={[styles.yearText, { color: colors.textSecondary }]}>
        {islamicDate.year} AH
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
    ...Shadow.small,
  },
  dateText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  yearText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
});