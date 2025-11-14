// Purpose: Language context for managing app language (ar, fr, en)

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { Language } from '@/types';

// Translations type
interface Translations {
  // Common
  appName: string;
  home: string;
  settings: string;
  back: string;
  save: string;
  cancel: string;
  delete: string;
  
  // Tabs
  athkar: string;
  quran: string;
  prayers: string;
  
  // Categories
  morningAthkar: string;
  eveningAthkar: string;
  sleepAthkar: string;
  wakingAthkar: string;
  afterPrayer: string;
  variousAthkar: string;
  
  // Actions
  markAsComplete: string;
  addToFavorites: string;
  removeFromFavorites: string;
  
  // Settings
  appearance: string;
  language: string;
  fontSize: string;
  notifications: string;
  about: string;
  
  // Stats
  completed: string;
  remaining: string;
  progress: string;
}

// Translations data
const translations: Record<Language, Translations> = {
  ar: {
    appName: 'أذكاري',
    home: 'الرئيسية',
    settings: 'الإعدادات',
    back: 'رجوع',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    
    athkar: 'الأذكار',
    quran: 'القرآن',
    prayers: 'الصلوات',
    
    morningAthkar: 'أذكار الصباح',
    eveningAthkar: 'أذكار المساء',
    sleepAthkar: 'أذكار النوم',
    wakingAthkar: 'أذكار الاستيقاظ',
    afterPrayer: 'أذكار بعد الصلاة',
    variousAthkar: 'أذكار متنوعة',
    
    markAsComplete: 'تحديد كمكتمل',
    addToFavorites: 'إضافة للمفضلة',
    removeFromFavorites: 'إزالة من المفضلة',
    
    appearance: 'المظهر',
    language: 'اللغة',
    fontSize: 'حجم الخط',
    notifications: 'الإشعارات',
    about: 'حول',
    
    completed: 'مكتمل',
    remaining: 'متبقي',
    progress: 'التقدم',
  },
  
  fr: {
    appName: 'Mes Azkar',
    home: 'Accueil',
    settings: 'Paramètres',
    back: 'Retour',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    
    athkar: 'Azkar',
    quran: 'Coran',
    prayers: 'Prières',
    
    morningAthkar: 'Azkar du Matin',
    eveningAthkar: 'Azkar du Soir',
    sleepAthkar: 'Azkar avant de Dormir',
    wakingAthkar: 'Azkar au Réveil',
    afterPrayer: 'Azkar après la Prière',
    variousAthkar: 'Azkar Divers',
    
    markAsComplete: 'Marquer comme terminé',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    
    appearance: 'Apparence',
    language: 'Langue',
    fontSize: 'Taille de police',
    notifications: 'Notifications',
    about: 'À propos',
    
    completed: 'Complété',
    remaining: 'Restant',
    progress: 'Progression',
  },
  
  en: {
    appName: 'My Azkar',
    home: 'Home',
    settings: 'Settings',
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    
    athkar: 'Azkar',
    quran: 'Quran',
    prayers: 'Prayers',
    
    morningAthkar: 'Morning Azkar',
    eveningAthkar: 'Evening Azkar',
    sleepAthkar: 'Sleep Azkar',
    wakingAthkar: 'Waking Up Azkar',
    afterPrayer: 'After Prayer',
    variousAthkar: 'Various Azkar',
    
    markAsComplete: 'Mark as Complete',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    
    appearance: 'Appearance',
    language: 'Language',
    fontSize: 'Font Size',
    notifications: 'Notifications',
    about: 'About',
    
    completed: 'Completed',
    remaining: 'Remaining',
    progress: 'Progress',
  },
};

// Context type definition
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
  t: Translations;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider props
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Language Provider Component
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar'); // Default Arabic
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language on mount
  useEffect(() => {
    loadLanguage();
  }, []);

  /**
   * Load language preference from AsyncStorage
   */
  const loadLanguage = async () => {
    try {
      const savedLanguage = await storage.get<Language>(STORAGE_KEYS.LANGUAGE);
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update language and save to AsyncStorage
   */
  const setLanguage = async (newLanguage: Language) => {
    try {
      setLanguageState(newLanguage);
      await storage.save(STORAGE_KEYS.LANGUAGE, newLanguage);
      console.log('✅ Language saved:', newLanguage);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Get translations for current language
  const t = translations[language];

  if (isLoading) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use language context
 * Usage: const { language, setLanguage, t } = useLanguage();
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};