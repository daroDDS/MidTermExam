// Purpose: Tasbeeh/Dhikr counter screen

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/hooks/useTheme';
import { storage } from '@/utils/storage';
import { saveCounterHistory } from '@/database/database';
import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/Styles';

/**
 * Counter Screen
 * Tasbeeh/Dhikr counter with target and reset
 */
export default function CounterScreen() {
  const { colors } = useTheme();
  
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Load saved settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedVibration = await storage.get<boolean>('@azkar:vibrationEnabled');
    if (savedVibration !== null) {
      setVibrationEnabled(savedVibration);
    }
  };

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);

    // Haptic feedback
    if (vibrationEnabled) {
      if (newCount === target) {
        // Special vibration when target reached
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (newCount % 10 === 0) {
        // Medium vibration every 10 counts
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        // Light vibration
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Counter',
      'Are you sure you want to reset the counter?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            // Save to history before reset
            if (count > 0) {
              await saveCounterHistory(count);
            }
            setCount(0);
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          },
        },
      ]
    );
  };

  const handleSave = async () => {
    if (count === 0) {
      Alert.alert('No Count', 'Counter is at 0. Nothing to save.');
      return;
    }

    await saveCounterHistory(count);
    Alert.alert('Saved', `Count of ${count} saved successfully!`);
    setCount(0);
  };

  const handleSetTarget = () => {
    Alert.prompt(
      'Set Target',
      'Enter target count (common: 33, 100)',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Set',
          onPress: (value) => {
            const num = parseInt(value || '0');
            if (num > 0 && num <= 9999) {
              setTarget(num);
            } else {
              Alert.alert('Invalid', 'Please enter a number between 1 and 9999');
            }
          },
        },
      ],
      'plain-text',
      target.toString(),
      'number-pad'
    );
  };

  const progress = Math.min((count / target) * 100, 100);
  const isTargetReached = count >= target;

  return (
    <LinearGradient
      colors={[Colors.gradient.start, Colors.gradient.end]}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Tasbeeh Counter',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <SafeAreaView style={styles.content}>
        {/* Top actions */}
        <View style={styles.topActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSetTarget}
          >
            <Ionicons name="flag-outline" size={20} color="white" />
            <Text style={styles.actionButtonText}>
              Target: {target}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setVibrationEnabled(!vibrationEnabled)}
          >
            <Ionicons 
              name={vibrationEnabled ? 'phone-portrait' : 'phone-portrait-outline'} 
              size={20} 
              color="white" 
            />
            <Text style={styles.actionButtonText}>
              {vibrationEnabled ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Counter circle */}
        <View style={styles.counterContainer}>
          {/* Progress circle background */}
          <View style={styles.progressCircle}>
            <View 
              style={[
                styles.progressFill,
                { 
                  transform: [{ rotate: `${(progress / 100) * 360}deg` }]
                }
              ]}
            />
          </View>

          {/* Count display */}
          <TouchableOpacity
            style={styles.counterButton}
            onPress={handleIncrement}
            activeOpacity={0.8}
          >
            <Text style={styles.countText}>{count}</Text>
            {isTargetReached && (
              <View style={styles.completeBadge}>
                <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Progress text */}
        <Text style={styles.progressText}>
          {count} / {target} ({Math.round(progress)}%)
        </Text>

        {/* Bottom actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={[styles.bottomButton, styles.resetButton]}
            onPress={handleReset}
          >
            <Ionicons name="refresh" size={24} color="white" />
            <Text style={styles.bottomButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.bottomButton, styles.saveButton]}
            onPress={handleSave}
          >
            <Ionicons name="save-outline" size={24} color="white" />
            <Text style={styles.bottomButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Tip */}
        <Text style={styles.tipText}>
          💡 Tap the circle to count
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  actionButtonText: {
    color: 'white',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressFill: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    borderColor: 'white',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  counterButton: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  countText: {
    fontSize: 80,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  completeBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  progressText: {
    color: 'white',
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  bottomButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
  },
  resetButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
  },
  saveButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  tipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});