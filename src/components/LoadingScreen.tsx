// Purpose: Loading screen component

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { IslamicPattern } from './IslamicPattern';
import { FontSize, FontWeight, Spacing } from '@/constants/Styles';

interface LoadingScreenProps {
  message?: string;
}

/**
 * Loading Screen Component
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <IslamicPattern style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>{message}</Text>
      </View>
    </IslamicPattern>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  text: {
    color: 'white',
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
  },
});