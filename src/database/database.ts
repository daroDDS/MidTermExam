// Purpose: SQLite database initialization and CRUD operations

import * as SQLite from 'expo-sqlite';
import { 
  Category, 
  Athkar, 
  UserProgress, 
  AthkarWithProgress,
  Favorite,
  CounterHistory,
  DatabaseResult 
} from '@/types';

const DATABASE_NAME = 'azkar.db';
const DATABASE_VERSION = 1;

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Open database connection (singleton pattern)
 */
export const openDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;
  
  try {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    console.log('✅ Database opened successfully');
    await initDatabase();
    return db;
  } catch (error) {
    console.error('❌ Error opening database:', error);
    throw error;
  }
};

/**
 * Initialize database tables
 */
const initDatabase = async (): Promise<void> => {
  if (!db) throw new Error('Database not opened');

  try {
    // Create tables with proper schema
    await db.execAsync(`
      -- Categories table
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_en TEXT NOT NULL,
        name_ar TEXT NOT NULL,
        name_fr TEXT,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        order_index INTEGER NOT NULL
      );

      -- Athkar table
      CREATE TABLE IF NOT EXISTS athkar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        text_ar TEXT NOT NULL,
        text_fr TEXT,
        transliteration TEXT,
        translation_en TEXT,
        translation_fr TEXT,
        repetitions INTEGER DEFAULT 1,
        audio_url TEXT,
        benefits TEXT,
        source TEXT,
        order_index INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );

      -- User progress table
      CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        athkar_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        completed_at TEXT,
        current_count INTEGER DEFAULT 0,
        FOREIGN KEY (athkar_id) REFERENCES athkar(id) ON DELETE CASCADE,
        UNIQUE(athkar_id, date)
      );

      -- Favorites table
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        athkar_id INTEGER NOT NULL,
        added_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (athkar_id) REFERENCES athkar(id) ON DELETE CASCADE,
        UNIQUE(athkar_id)
      );

      -- Counter history table
      CREATE TABLE IF NOT EXISTS counter_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        count INTEGER NOT NULL,
        dhikr_text TEXT,
        date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes for better performance (Lecture 4 best practice)
      CREATE INDEX IF NOT EXISTS idx_athkar_category ON athkar(category_id);
      CREATE INDEX IF NOT EXISTS idx_progress_date ON user_progress(date);
      CREATE INDEX IF NOT EXISTS idx_progress_athkar ON user_progress(athkar_id);
      CREATE INDEX IF NOT EXISTS idx_favorites_athkar ON favorites(athkar_id);
    `);

    console.log('✅ Database tables created successfully');

    // Check if we need to seed data
    await checkAndSeedData();
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

/**
 * Check if database is empty and seed initial data
 */
const checkAndSeedData = async (): Promise<void> => {
  if (!db) return;

  try {
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM categories'
    );

    if (result && result.count === 0) {
      console.log('📦 Database is empty, seeding initial data...');
      const { seedDatabase } = await import('./seed');
      await seedDatabase(db);
      console.log('✅ Database seeded successfully');
    }
  } catch (error) {
    console.error('❌ Error checking/seeding data:', error);
  }
};

// CATEGORY OPERATIONS

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const database = await openDatabase();
  
  try {
    const categories = await database.getAllAsync<Category>(
      'SELECT * FROM categories ORDER BY order_index ASC'
    );
    return categories;
  } catch (error) {
    console.error('❌ Error getting categories:', error);
    return [];
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: number): Promise<Category | null> => {
  const database = await openDatabase();
  
  try {
    const category = await database.getFirstAsync<Category>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );
    return category || null;
  } catch (error) {
    console.error('❌ Error getting category:', error);
    return null;
  }
};

// ATHKAR OPERATIONS

/**
 * Get all athkar for a specific category
 */
export const getAthkarByCategory = async (categoryId: number): Promise<Athkar[]> => {
  const database = await openDatabase();
  
  try {
    const athkar = await database.getAllAsync<Athkar>(
      'SELECT * FROM athkar WHERE category_id = ? ORDER BY order_index ASC',
      [categoryId]
    );
    return athkar;
  } catch (error) {
    console.error('❌ Error getting athkar by category:', error);
    return [];
  }
};

/**
 * Get athkar with progress for today
 */
export const getAthkarWithProgress = async (categoryId: number): Promise<AthkarWithProgress[]> => {
  const database = await openDatabase();
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const athkar = await database.getAllAsync<AthkarWithProgress>(`
      SELECT 
        a.*,
        COALESCE(p.completed, 0) as is_completed,
        COALESCE(p.current_count, 0) as current_count
      FROM athkar a
      LEFT JOIN user_progress p ON a.id = p.athkar_id AND p.date = ?
      WHERE a.category_id = ?
      ORDER BY a.order_index ASC
    `, [today, categoryId]);
    
    return athkar;
  } catch (error) {
    console.error('❌ Error getting athkar with progress:', error);
    return [];
  }
};

/**
 * Get single athkar by ID
 */
export const getAthkarById = async (id: number): Promise<Athkar | null> => {
  const database = await openDatabase();
  
  try {
    const athkar = await database.getFirstAsync<Athkar>(
      'SELECT * FROM athkar WHERE id = ?',
      [id]
    );
    return athkar || null;
  } catch (error) {
    console.error('❌ Error getting athkar by ID:', error);
    return null;
  }
};

/**
 * Search athkar by text
 */
export const searchAthkar = async (searchTerm: string): Promise<Athkar[]> => {
  const database = await openDatabase();
  
  try {
    const athkar = await database.getAllAsync<Athkar>(`
      SELECT * FROM athkar 
      WHERE text_ar LIKE ? 
         OR text_fr LIKE ? 
         OR transliteration LIKE ?
      ORDER BY order_index ASC
    `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
    
    return athkar;
  } catch (error) {
    console.error('❌ Error searching athkar:', error);
    return [];
  }
};

// USER PROGRESS OPERATIONS

/**
 * Update or create progress for an athkar
 */
export const updateProgress = async (
  athkarId: number,
  count: number,
  completed: boolean
): Promise<void> => {
  const database = await openDatabase();
  const today = new Date().toISOString().split('T')[0];
  
  try {
    // Use transaction for data integrity (Lecture 4 best practice)
    await database.withTransactionAsync(async () => {
      await database.runAsync(`
        INSERT INTO user_progress (athkar_id, date, current_count, completed, completed_at)
        VALUES (?, ?, ?, ?, datetime('now'))
        ON CONFLICT(athkar_id, date) 
        DO UPDATE SET 
          current_count = ?,
          completed = ?,
          completed_at = CASE WHEN ? = 1 THEN datetime('now') ELSE completed_at END
      `, [
        athkarId, 
        today, 
        count, 
        completed ? 1 : 0,
        count,
        completed ? 1 : 0,
        completed ? 1 : 0
      ]);
    });
    
    console.log('✅ Progress updated successfully');
  } catch (error) {
    console.error('❌ Error updating progress:', error);
    throw error;
  }
};

/**
 * Get today's progress statistics
 */
export const getTodayStats = async (): Promise<{
  total: number;
  completed: number;
  percentage: number;
}> => {
  const database = await openDatabase();
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const result = await database.getFirstAsync<{
      total: number;
      completed: number;
    }>(`
      SELECT 
        COUNT(DISTINCT a.id) as total,
        COUNT(DISTINCT CASE WHEN p.completed = 1 THEN p.athkar_id END) as completed
      FROM athkar a
      LEFT JOIN user_progress p ON a.id = p.athkar_id AND p.date = ?
    `, [today]);
    
    if (!result) return { total: 0, completed: 0, percentage: 0 };
    
    const percentage = result.total > 0 
      ? Math.round((result.completed / result.total) * 100) 
      : 0;
    
    return {
      total: result.total,
      completed: result.completed,
      percentage,
    };
  } catch (error) {
    console.error('❌ Error getting today stats:', error);
    return { total: 0, completed: 0, percentage: 0 };
  }
};

/**
 * Get progress for specific date
 */
export const getProgressByDate = async (date: string): Promise<UserProgress[]> => {
  const database = await openDatabase();
  
  try {
    const progress = await database.getAllAsync<UserProgress>(
      'SELECT * FROM user_progress WHERE date = ?',
      [date]
    );
    return progress;
  } catch (error) {
    console.error('❌ Error getting progress by date:', error);
    return [];
  }
};

/**
 * Reset all progress (for settings)
 */
export const resetAllProgress = async (): Promise<void> => {
  const database = await openDatabase();
  
  try {
    await database.runAsync('DELETE FROM user_progress');
    console.log('✅ All progress reset successfully');
  } catch (error) {
    console.error('❌ Error resetting progress:', error);
    throw error;
  }
};

/**
 * Clear old progress (keep last 30 days)
 */
export const clearOldProgress = async (daysToKeep: number = 30): Promise<void> => {
  const database = await openDatabase();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  const cutoffDateString = cutoffDate.toISOString().split('T')[0];
  
  try {
    const result = await database.runAsync(
      'DELETE FROM user_progress WHERE date < ?',
      [cutoffDateString]
    );
    console.log(`✅ Cleared ${result.changes} old progress records`);
  } catch (error) {
    console.error('❌ Error clearing old progress:', error);
    throw error;
  }
};

// FAVORITES OPERATIONS

/**
 * Add athkar to favorites
 */
export const addFavorite = async (athkarId: number): Promise<void> => {
  const database = await openDatabase();
  
  try {
    await database.runAsync(
      'INSERT OR IGNORE INTO favorites (athkar_id) VALUES (?)',
      [athkarId]
    );
    console.log('✅ Added to favorites');
  } catch (error) {
    console.error('❌ Error adding favorite:', error);
    throw error;
  }
};

/**
 * Remove athkar from favorites
 */
export const removeFavorite = async (athkarId: number): Promise<void> => {
  const database = await openDatabase();
  
  try {
    await database.runAsync(
      'DELETE FROM favorites WHERE athkar_id = ?',
      [athkarId]
    );
    console.log('✅ Removed from favorites');
  } catch (error) {
    console.error('❌ Error removing favorite:', error);
    throw error;
  }
};

/**
 * Get all favorite athkar
 */
export const getFavorites = async (): Promise<Athkar[]> => {
  const database = await openDatabase();
  
  try {
    const favorites = await database.getAllAsync<Athkar>(`
      SELECT a.* 
      FROM athkar a
      INNER JOIN favorites f ON a.id = f.athkar_id
      ORDER BY f.added_at DESC
    `);
    return favorites;
  } catch (error) {
    console.error('❌ Error getting favorites:', error);
    return [];
  }
};

/**
 * Check if athkar is favorite
 */
export const isFavorite = async (athkarId: number): Promise<boolean> => {
  const database = await openDatabase();
  
  try {
    const result = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM favorites WHERE athkar_id = ?',
      [athkarId]
    );
    return (result?.count || 0) > 0;
  } catch (error) {
    console.error('❌ Error checking favorite:', error);
    return false;
  }
};

// ============================================
// COUNTER HISTORY OPERATIONS
// ============================================

/**
 * Save counter history
 */
export const saveCounterHistory = async (
  count: number,
  dhikrText?: string
): Promise<void> => {
  const database = await openDatabase();
  const today = new Date().toISOString().split('T')[0];
  
  try {
    await database.runAsync(
      'INSERT INTO counter_history (count, dhikr_text, date) VALUES (?, ?, ?)',
      [count, dhikrText || null, today]
    );
    console.log('✅ Counter history saved');
  } catch (error) {
    console.error('❌ Error saving counter history:', error);
    throw error;
  }
};

/**
 * Get counter history
 */
export const getCounterHistory = async (limit: number = 10): Promise<CounterHistory[]> => {
  const database = await openDatabase();
  
  try {
    const history = await database.getAllAsync<CounterHistory>(
      'SELECT * FROM counter_history ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return history;
  } catch (error) {
    console.error('❌ Error getting counter history:', error);
    return [];
  }
};

/**
 * Clear counter history
 */
export const clearCounterHistory = async (): Promise<void> => {
  const database = await openDatabase();
  
  try {
    await database.runAsync('DELETE FROM counter_history');
    console.log('✅ Counter history cleared');
  } catch (error) {
    console.error('❌ Error clearing counter history:', error);
    throw error;
  }
};

// DATABASE MAINTENANCE

/**
 * Close database connection
 */
export const closeDatabase = async (): Promise<void> => {
  if (db) {
    try {
      await db.closeAsync();
      db = null;
      console.log('✅ Database closed');
    } catch (error) {
      console.error('❌ Error closing database:', error);
    }
  }
};

/**
 * Get database version
 */
export const getDatabaseVersion = async (): Promise<number> => {
  const database = await openDatabase();
  
  try {
    const result = await database.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version'
    );
    return result?.user_version || 0;
  } catch (error) {
    console.error('❌ Error getting database version:', error);
    return 0;
  }
};

/**
 * Set database version (for migrations)
 */
export const setDatabaseVersion = async (version: number): Promise<void> => {
  const database = await openDatabase();
  
  try {
    await database.execAsync(`PRAGMA user_version = ${version}`);
    console.log(`✅ Database version set to ${version}`);
  } catch (error) {
    console.error('❌ Error setting database version:', error);
    throw error;
  }
};