// Purpose: Quick action button component for home screen

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '@/constants/Styles';
import { useTheme } from '@/hooks/useTheme';
import * as Haptics from 'expo-haptics';

interface QuickActionButtonProps {
  icon: string;
  label: string;
  route?: string;
  onPress?: () => void;
}

/**
 * Quick Action Button Component
 * Small buttons for quick access to features
 */
export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  route,
  onPress,
}) => {
  const { colors } = useTheme();

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (onPress) {
      onPress();
    } else if (route) {
      router.push(route as any);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
        <Ionicons name={icon as any} size={24} color={colors.text} />
      </View>
      <Text style={[styles.label, { color: colors.text }]} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 70,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    ...Shadow.small,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
    lineHeight: 14,
  },
});