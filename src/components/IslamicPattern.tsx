// Purpose: Islamic geometric pattern background with gradient

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import Svg, { Path, G } from 'react-native-svg';

interface IslamicPatternProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Islamic Pattern Background Component
 * Creates the purple/blue gradient with geometric pattern
 */
export const IslamicPattern: React.FC<IslamicPatternProps> = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[Colors.gradient.start, Colors.gradient.end]}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Pattern overlay */}
      <View style={styles.patternOverlay}>
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          opacity={0.1}
        >
          <G>
            {/* Simple Islamic star pattern */}
            <Path
              d="M50 10 L55 30 L75 25 L60 40 L75 55 L55 50 L50 70 L45 50 L25 55 L40 40 L25 25 L45 30 Z"
              fill="white"
            />
            <Path
              d="M50 10 L55 30 L75 25 L60 40 L75 55 L55 50 L50 70 L45 50 L25 55 L40 40 L25 25 L45 30 Z"
              fill="white"
              transform="translate(50, 0)"
            />
            <Path
              d="M50 10 L55 30 L75 25 L60 40 L75 55 L55 50 L50 70 L45 50 L25 55 L40 40 L25 25 L45 30 Z"
              fill="white"
              transform="translate(0, 50)"
            />
            <Path
              d="M50 10 L55 30 L75 25 L60 40 L75 55 L55 50 L50 70 L45 50 L25 55 L40 40 L25 25 L45 30 Z"
              fill="white"
              transform="translate(50, 50)"
            />
          </G>
        </Svg>
      </View>
      
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
  },
});