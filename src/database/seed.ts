// src/database/seed.ts
// Purpose: Seed initial data into SQLite database

import * as SQLite from 'expo-sqlite';
import { 
  CATEGORIES, 
  MORNING_ATHKAR, 
  EVENING_ATHKAR, 
  SLEEP_ATHKAR, 
  WAKING_ATHKAR 
} from '@/constants/athkarData';

/**
 * Seed database with initial categories and athkar
 */
export const seedDatabase = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    // Use transaction for better performance (Lecture 4)
    await db.withTransactionAsync(async () => {
      // 1. Insert categories
      const categoryIds: Record<string, number> = {};
      
      for (const category of CATEGORIES) {
        const result = await db.runAsync(
          `INSERT INTO categories (name_en, name_ar, name_fr, icon, color, order_index)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            category.name_en,
            category.name_ar,
            category.name_fr,
            category.icon,
            category.color,
            category.order_index,
          ]
        );
        
        // Store category ID for later use
        const categoryName = category.name_en.toLowerCase().replace(/ /g, '_');
        categoryIds[categoryName] = result.lastInsertRowId;
      }

      console.log('✅ Categories inserted:', categoryIds);

      // 2. Insert Morning Athkar
      if (categoryIds['morning_athkar']) {
        for (let i = 0; i < MORNING_ATHKAR.length; i++) {
          const athkar = MORNING_ATHKAR[i];
          await db.runAsync(
            `INSERT INTO athkar (
              category_id, text_ar, text_fr, transliteration, 
              translation_en, translation_fr, repetitions, 
              benefits, source, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              categoryIds['morning_athkar'],
              athkar.text_ar,
              athkar.text_fr || null,
              athkar.transliteration || null,
              athkar.translation_en || null,
              athkar.translation_fr || null,
              athkar.repetitions,
              athkar.benefits || null,
              athkar.source || null,
              i + 1,
            ]
          );
        }
        console.log(`✅ Inserted ${MORNING_ATHKAR.length} morning athkar`);
      }

      // 3. Insert Evening Athkar
      if (categoryIds['evening_athkar']) {
        for (let i = 0; i < EVENING_ATHKAR.length; i++) {
          const athkar = EVENING_ATHKAR[i];
          await db.runAsync(
            `INSERT INTO athkar (
              category_id, text_ar, text_fr, transliteration, 
              translation_en, translation_fr, repetitions, 
              benefits, source, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              categoryIds['evening_athkar'],
              athkar.text_ar,
              athkar.text_fr || null,
              athkar.transliteration || null,
              athkar.translation_en || null,
              athkar.translation_fr || null,
              athkar.repetitions,
              athkar.benefits || null,
              athkar.source || null,
              i + 1,
            ]
          );
        }
        console.log(`✅ Inserted ${EVENING_ATHKAR.length} evening athkar`);
      }

      // 4. Insert Sleep Athkar
      if (categoryIds['sleep_athkar']) {
        for (let i = 0; i < SLEEP_ATHKAR.length; i++) {
          const athkar = SLEEP_ATHKAR[i];
          await db.runAsync(
            `INSERT INTO athkar (
              category_id, text_ar, text_fr, transliteration, 
              translation_en, translation_fr, repetitions, 
              benefits, source, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              categoryIds['sleep_athkar'],
              athkar.text_ar,
              athkar.text_fr || null,
              athkar.transliteration || null,
              athkar.translation_en || null,
              athkar.translation_fr || null,
              athkar.repetitions,
              athkar.benefits || null,
              athkar.source || null,
              i + 1,
            ]
          );
        }
        console.log(`✅ Inserted ${SLEEP_ATHKAR.length} sleep athkar`);
      }

      // 5. Insert Waking Athkar
      if (categoryIds['waking_up_athkar']) {
        for (let i = 0; i < WAKING_ATHKAR.length; i++) {
          const athkar = WAKING_ATHKAR[i];
          await db.runAsync(
            `INSERT INTO athkar (
              category_id, text_ar, text_fr, transliteration, 
              translation_en, translation_fr, repetitions, 
              benefits, source, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              categoryIds['waking_up_athkar'],
              athkar.text_ar,
              athkar.text_fr || null,
              athkar.transliteration || null,
              athkar.translation_en || null,
              athkar.translation_fr || null,
              athkar.repetitions,
              athkar.benefits || null,
              athkar.source || null,
              i + 1,
            ]
          );
        }
        console.log(`✅ Inserted ${WAKING_ATHKAR.length} waking athkar`);
      }
    });

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};