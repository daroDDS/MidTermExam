// Purpose: Prayers/Salat screen (placeholder)

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { FontSize, FontWeight, Spacing } from '@/constants/Styles';

/**
 * Prayers Screen
 * Placeholder for prayer times and tracking
 */
export default function PrayersScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Prayers
        </Text>
      </View>

      <View style={styles.content}>
        <Ionicons name="moon" size={80} color={colors.textSecondary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Prayer Times
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Coming soon! This section will show prayer times and tracking.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 22,
  },
});