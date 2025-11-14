// Purpose: Settings screen with preferences and options

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Share,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { resetAllProgress, clearOldProgress } from '@/database/database';
import { BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/Styles';
import { Theme, Language, FontSize as FontSizeType } from '@/types';
import * as Haptics from 'expo-haptics';

/**
 * Settings Screen
 * User preferences and app settings
 */
export default function SettingsScreen() {
  const { colors, theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const [fontSize, setFontSizeState] = useState<FontSizeType>('medium');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedFontSize = await storage.get<FontSizeType>(STORAGE_KEYS.FONT_SIZE);
    const savedNotifications = await storage.get<boolean>(STORAGE_KEYS.NOTIFICATIONS_ENABLED);
    const savedSound = await storage.get<boolean>(STORAGE_KEYS.SOUND_ENABLED);
    const savedVibration = await storage.get<boolean>(STORAGE_KEYS.VIBRATION_ENABLED);

    if (savedFontSize) setFontSizeState(savedFontSize);
    if (savedNotifications !== null) setNotificationsEnabled(savedNotifications);
    if (savedSound !== null) setSoundEnabled(savedSound);
    if (savedVibration !== null) setVibrationEnabled(savedVibration);
  };

  const handleThemeChange = async (newTheme: Theme) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setTheme(newTheme);
  };

  const handleLanguageChange = async (newLanguage: Language) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setLanguage(newLanguage);
  };

  const handleFontSizeChange = async (newSize: FontSizeType) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFontSizeState(newSize);
    await storage.save(STORAGE_KEYS.FONT_SIZE, newSize);
  };

  const handleNotificationToggle = async (value: boolean) => {
    setNotificationsEnabled(value);
    await storage.save(STORAGE_KEYS.NOTIFICATIONS_ENABLED, value);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleSoundToggle = async (value: boolean) => {
    setSoundEnabled(value);
    await storage.save(STORAGE_KEYS.SOUND_ENABLED, value);
  };

  const handleVibrationToggle = async (value: boolean) => {
    setVibrationEnabled(value);
    await storage.save(STORAGE_KEYS.VIBRATION_ENABLED, value);
    if (value) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear old progress data (older than 30 days). Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearOldProgress(30);
            Alert.alert('Success', 'Cache cleared successfully!');
          },
        },
      ]
    );
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'This will delete ALL your progress. This action cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAllProgress();
            Alert.alert('Success', 'All progress has been reset.');
          },
        },
      ]
    );
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing Azkar app! It helps me remember my daily dhikr.',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRateApp = () => {
    Alert.alert('Rate Us', 'Thank you for your support! ❤️');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Settings
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Appearance
          </Text>

          {/* Theme */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="color-palette" size={20} color={colors.text} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Theme
              </Text>
            </View>
            <View style={styles.optionsRow}>
              <OptionButton
                label="Light"
                icon="sunny"
                selected={theme === 'light'}
                onPress={() => handleThemeChange('light')}
              />
              <OptionButton
                label="Dark"
                icon="moon"
                selected={theme === 'dark'}
                onPress={() => handleThemeChange('dark')}
              />
              <OptionButton
                label="Auto"
                icon="phone-portrait"
                selected={theme === 'auto'}
                onPress={() => handleThemeChange('auto')}
              />
            </View>
          </View>

          {/* Font Size */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="text" size={20} color={colors.text} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Font Size
              </Text>
            </View>
            <View style={styles.optionsRow}>
              <OptionButton
                label="Small"
                icon="resize"
                selected={fontSize === 'small'}
                onPress={() => handleFontSizeChange('small')}
              />
              <OptionButton
                label="Medium"
                icon="resize"
                selected={fontSize === 'medium'}
                onPress={() => handleFontSizeChange('medium')}
              />
              <OptionButton
                label="Large"
                icon="resize"
                selected={fontSize === 'large'}
                onPress={() => handleFontSizeChange('large')}
              />
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Language
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.optionsRow}>
              <OptionButton
                label="العربية"
                icon="language"
                selected={language === 'ar'}
                onPress={() => handleLanguageChange('ar')}
              />
              <OptionButton
                label="Français"
                icon="language"
                selected={language === 'fr'}
                onPress={() => handleLanguageChange('fr')}
              />
              <OptionButton
                label="English"
                icon="language"
                selected={language === 'en'}
                onPress={() => handleLanguageChange('en')}
              />
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notifications
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <SettingRow
              icon="notifications"
              label="Enable Notifications"
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
            />
          </View>
        </View>

        {/* Audio & Haptics Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Audio & Haptics
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <SettingRow
              icon="volume-high"
              label="Sound Effects"
              value={soundEnabled}
              onValueChange={handleSoundToggle}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="phone-portrait"
              label="Vibration"
              value={vibrationEnabled}
              onValueChange={handleVibrationToggle}
            />
          </View>
        </View>

        {/* Data & Storage Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Data & Storage
          </Text>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={handleClearCache}
          >
            <View style={styles.actionRow}>
              <Ionicons name="trash-outline" size={20} color={colors.text} />
              <Text style={[styles.actionLabel, { color: colors.text }]}>
                Clear Cache
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={handleResetProgress}
          >
            <View style={styles.actionRow}>
              <Ionicons name="refresh" size={20} color="#F44336" />
              <Text style={[styles.actionLabel, { color: '#F44336' }]}>
                Reset Progress
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.actionRow}>
              <Ionicons name="information-circle" size={20} color={colors.text} />
              <Text style={[styles.actionLabel, { color: colors.text }]}>
                Version
              </Text>
              <Text style={[styles.versionText, { color: colors.textSecondary }]}>
                1.0.0
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={handleShareApp}
          >
            <View style={styles.actionRow}>
              <Ionicons name="share-social" size={20} color={colors.text} />
              <Text style={[styles.actionLabel, { color: colors.text }]}>
                Share App
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={handleRateApp}
          >
            <View style={styles.actionRow}>
              <Ionicons name="star" size={20} color="#FFC107" />
              <Text style={[styles.actionLabel, { color: colors.text }]}>
                Rate Us
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Components
interface OptionButtonProps {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, icon, selected, onPress }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.optionButton,
        {
          backgroundColor: selected ? '#42A5F5' : colors.background,
          borderColor: selected ? '#42A5F5' : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon as any}
        size={18}
        color={selected ? 'white' : colors.text}
      />
      <Text
        style={[
          styles.optionLabel,
          { color: selected ? 'white' : colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface SettingRowProps {
  icon: string;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, label, value, onValueChange }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={20} color={colors.text} />
        <Text style={[styles.settingLabel, { color: colors.text }]}>
          {label}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: '#42A5F5' }}
        thumbColor={value ? 'white' : '#f4f3f4'}
      />
    </View>
  );
};

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
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  card: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  optionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  versionText: {
    fontSize: FontSize.md,
  },
});