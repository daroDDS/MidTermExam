// Purpose: Centralized keys for AsyncStorage to avoid typos

export const STORAGE_KEYS = {
    // User preferences
    THEME: '@azkar:theme',                    // 'light' | 'dark' | 'auto'
    LANGUAGE: '@azkar:language',              // 'ar' | 'fr' | 'en'
    FONT_SIZE: '@azkar:fontSize',             // 'small' | 'medium' | 'large'
    
    // Settings
    NOTIFICATIONS_ENABLED: '@azkar:notificationsEnabled',
    MORNING_REMINDER_TIME: '@azkar:morningReminderTime',
    EVENING_REMINDER_TIME: '@azkar:eveningReminderTime',
    SOUND_ENABLED: '@azkar:soundEnabled',
    VIBRATION_ENABLED: '@azkar:vibrationEnabled',
    
    // App state
    ONBOARDING_COMPLETED: '@azkar:onboardingCompleted',
    LAST_OPENED_DATE: '@azkar:lastOpenedDate',
    
    // Feature flags
    VIDEO_AUTOPLAY: '@azkar:videoAutoplay',
  } as const;
  
  // Type helper
  export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];