// Purpose: Wrapper around AsyncStorage with error handling and JSON serialization


import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  /**
   * Save data to AsyncStorage
   * @param key - Storage key (use STORAGE_KEYS constants)
   * @param value - Any JSON-serializable value
   */
  async save<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving to AsyncStorage [${key}]:`, error);
      throw error;
    }
  },

  /**
   * Get data from AsyncStorage
   * @param key - Storage key
   * @returns Parsed value or null if not found
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error reading from AsyncStorage [${key}]:`, error);
      return null;
    }
  },

  /**
   * Remove item from AsyncStorage
   * @param key - Storage key
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from AsyncStorage [${key}]:`, error);
      throw error;
    }
  },

  /**
   * Clear all AsyncStorage data (use with caution!)
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  },

  /**
   * Get all keys in AsyncStorage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys from AsyncStorage:', error);
      return [];
    }
  },

  /**
   * Get multiple items at once (more efficient)
   */
  async multiGet<T>(keys: string[]): Promise<Record<string, T | null>> {
    try {
      const result = await AsyncStorage.multiGet(keys);
      const data: Record<string, T | null> = {};
      
      result.forEach(([key, value]) => {
        data[key] = value ? JSON.parse(value) : null;
      });
      
      return data;
    } catch (error) {
      console.error('Error getting multiple items from AsyncStorage:', error);
      return {};
    }
  },
};