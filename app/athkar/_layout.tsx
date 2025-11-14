// Purpose: Stack layout for athkar detail screens

import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

/**
 * Athkar Stack Layout
 */
export default function AthkarLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    />
  );
}