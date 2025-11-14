// src/store/useAthkarStore.ts
// Purpose: Zustand store for global state management
// Used for favorites, categories, and runtime data (Lecture 4)

import { create } from 'zustand';
import { Category, Athkar } from '@/types';
import { 
  getAllCategories, 
  getFavorites, 
  addFavorite as dbAddFavorite,
  removeFavorite as dbRemoveFavorite,
  isFavorite as dbIsFavorite 
} from '@/database/database';

// Store state interface
interface AthkarStore {
  // State
  categories: Category[];
  favorites: Athkar[];
  favoriteIds: Set<number>;
  isLoading: boolean;
  
  // Actions - Categories
  loadCategories: () => Promise<void>;
  
  // Actions - Favorites
  loadFavorites: () => Promise<void>;
  addFavorite: (athkarId: number) => Promise<void>;
  removeFavorite: (athkarId: number) => Promise<void>;
  isFavorite: (athkarId: number) => boolean;
  
  // Actions - Reset
  reset: () => void;
}

/**
 * Zustand Store
 * Global state accessible from any component
 */
export const useAthkarStore = create<AthkarStore>((set, get) => ({
  // Initial state
  categories: [],
  favorites: [],
  favoriteIds: new Set(),
  isLoading: false,

  /**
   * Load categories from database
   */
  loadCategories: async () => {
    set({ isLoading: true });
    try {
      const categories = await getAllCategories();
      set({ categories, isLoading: false });
      console.log('✅ Categories loaded:', categories.length);
    } catch (error) {
      console.error('❌ Error loading categories:', error);
      set({ isLoading: false });
    }
  },

  /**
   * Load favorites from database
   */
  loadFavorites: async () => {
    try {
      const favorites = await getFavorites();
      const favoriteIds = new Set(favorites.map(f => f.id));
      set({ favorites, favoriteIds });
      console.log('✅ Favorites loaded:', favorites.length);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
    }
  },

  /**
   * Add athkar to favorites
   */
  addFavorite: async (athkarId: number) => {
    try {
      await dbAddFavorite(athkarId);
      
      // Update local state
      const { favoriteIds } = get();
      const newFavoriteIds = new Set(favoriteIds);
      newFavoriteIds.add(athkarId);
      set({ favoriteIds: newFavoriteIds });
      
      // Reload favorites to get full data
      await get().loadFavorites();
      
      console.log('✅ Added to favorites:', athkarId);
    } catch (error) {
      console.error('❌ Error adding favorite:', error);
    }
  },

  /**
   * Remove athkar from favorites
   */
  removeFavorite: async (athkarId: number) => {
    try {
      await dbRemoveFavorite(athkarId);
      
      // Update local state
      const { favoriteIds, favorites } = get();
      const newFavoriteIds = new Set(favoriteIds);
      newFavoriteIds.delete(athkarId);
      
      const newFavorites = favorites.filter(f => f.id !== athkarId);
      
      set({ 
        favoriteIds: newFavoriteIds,
        favorites: newFavorites 
      });
      
      console.log('✅ Removed from favorites:', athkarId);
    } catch (error) {
      console.error('❌ Error removing favorite:', error);
    }
  },

  /**
   * Check if athkar is favorite (fast lookup)
   */
  isFavorite: (athkarId: number) => {
    const { favoriteIds } = get();
    return favoriteIds.has(athkarId);
  },

  /**
   * Reset store to initial state
   */
  reset: () => {
    set({
      categories: [],
      favorites: [],
      favoriteIds: new Set(),
      isLoading: false,
    });
  },
}));