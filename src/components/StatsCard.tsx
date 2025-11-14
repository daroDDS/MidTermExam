// Purpose: Display daily progress statistics

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '@/constants/Styles';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';

interface StatsCardProps {
  total: number;
  completed: number;
  percentage: number;
}

/**
 * Stats Card Component
 * Shows completion progress for the day
 */
export const StatsCard: React.FC<StatsCardProps> = ({ total, completed, percentage }) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Title */}
      <View style={styles.header}>
        <Ionicons name="stats-chart" size={20} color={Colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Today's Progress
        </Text>
      </View>

      {/* Progress circle */}
      <View style={styles.content}>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, { borderColor: isDark ? '#383838' : '#E0E0E0' }]}>
            <View 
              style={[
                styles.circleFill, 
                { 
                  borderColor: Colors.primary,
                  transform: [{ rotate: `${(percentage / 100) * 360}deg` }]
                }
              ]} 
            />
            <View style={[styles.circleInner, { backgroundColor: colors.card }]}>
              <Text style={[styles.percentageText, { color: Colors.primary }]}>
                {percentage}%
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.success }]}>
              {completed}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Completed
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {total - completed}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Remaining
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.primary }]}>
              {total}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total
            </Text>
          </View>
        </View>
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
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  content: {
    gap: Spacing.lg,
  },
  circleContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleFill: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: Colors.primary,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  circleInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSize.sm,
  },
  divider: {
    width: 1,
    height: 40,
  },
});