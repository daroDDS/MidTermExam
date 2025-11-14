// app/+not-found.tsx
// Purpose: 404 Not Found screen

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';

/**
 * Not Found Screen
 * Shown when user navigates to invalid route
 */
export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons name="alert-circle-outline" size={100} color={colors.textSecondary} />
      
      <Text style={[styles.title, { color: colors.text }]}>
        Page Not Found
      </Text>
      
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        The page you're looking for doesn't exist.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)')}
        activeOpacity={0.8}
      >
        <Ionicons name="home" size={20} color="white" />
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.lg,
  },
  subtitle: {
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
});