// Purpose: TypeScript types for type safety across the app


// ATHKAR TYPES

export type AthkarCategory = 
  | 'morning'
  | 'evening'
  | 'sleep'
  | 'waking'
  | 'afterPrayer'
  | 'various';

export interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  name_fr: string;
  icon: string;
  color: string;
  order_index: number;
}

export interface Athkar {
  id: number;
  category_id: number;
  text_ar: string;
  text_fr?: string;
  transliteration?: string;
  translation_en?: string;
  translation_fr?: string;
  repetitions: number;
  audio_url?: string;
  benefits?: string;
  source?: string;
  order_index: number;
}

export interface AthkarWithProgress extends Athkar {
  is_completed: boolean;
  current_count: number;
}

// USER PROGRESS TYPES

export interface UserProgress {
  id: number;
  athkar_id: number;
  date: string;
  completed: boolean;
  completed_at?: string;
  current_count: number;
}

export interface DailyStats {
  date: string;
  total_athkar: number;
  completed_athkar: number;
  completion_percentage: number;
}

// FAVORITES TYPES

export interface Favorite {
  id: number;
  athkar_id: number;
  added_at: string;
}

// COUNTER TYPES

export interface CounterHistory {
  id: number;
  count: number;
  dhikr_text?: string;
  date: string;
  created_at: string;
}

// SETTINGS TYPES

export type Theme = 'light' | 'dark' | 'auto';
export type Language = 'ar' | 'fr' | 'en';
export type FontSize = 'small' | 'medium' | 'large';

export interface UserSettings {
  theme: Theme;
  language: Language;
  fontSize: FontSize;
  notificationsEnabled: boolean;
  morningReminderTime?: string;
  eveningReminderTime?: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

// NAVIGATION TYPES

export type RootStackParamList = {
  '(tabs)': undefined;
  'athkar/[category]': { category: AthkarCategory };
  'counter': undefined;
};

// DATABASE TYPES

export interface DatabaseResult {
  insertId?: number;
  rowsAffected: number;
}

// ISLAMIC DATE TYPES

export interface IslamicDate {
  hijri_day: number;
  hijri_month: string;
  hijri_year: number;
  gregorian_date: string;
}