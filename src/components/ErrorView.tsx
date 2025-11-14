// Purpose: Error display component

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/Styles';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

/**
 * Error View Component
 */
export const ErrorView: React.FC<ErrorViewProps> = ({ 
  message = 'Something went wrong',
  onRetry 
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={64} color={Colors.error} />
      <Text style={[styles.message, { color: colors.text }]}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  message: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  retryText: {
    color: 'white',
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});