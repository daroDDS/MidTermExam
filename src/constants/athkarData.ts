// src/constants/athkarData.ts
// Purpose: Static data for Athkar categories and initial content

import { Colors } from './Colors';
import { Category } from '@/types';

/**
 * Athkar Categories
 * These will be inserted into SQLite database on first launch
 */
export const CATEGORIES: Omit<Category, 'id'>[] = [
  {
    name_en: 'Morning Athkar',
    name_ar: 'أذكار الصباح',
    name_fr: 'Invocations du Matin',
    icon: 'sunny',
    color: Colors.morning,
    order_index: 1,
  },
  {
    name_en: 'Evening Athkar',
    name_ar: 'أذكار المساء',
    name_fr: 'Invocations du Soir',
    icon: 'moon',
    color: Colors.evening,
    order_index: 2,
  },
  {
    name_en: 'Sleep Athkar',
    name_ar: 'أذكار النوم',
    name_fr: 'Invocations avant de Dormir',
    icon: 'bed',
    color: Colors.sleep,
    order_index: 3,
  },
  {
    name_en: 'Waking Up Athkar',
    name_ar: 'أذكار الاستيقاظ',
    name_fr: 'Invocations au Réveil',
    icon: 'alarm',
    color: Colors.waking,
    order_index: 4,
  },
  {
    name_en: 'After Prayer',
    name_ar: 'أذكار بعد الصلاة',
    name_fr: 'Invocations après la Prière',
    icon: 'hands-pray',
    color: '#9C27B0',
    order_index: 5,
  },
  {
    name_en: 'Various Athkar',
    name_ar: 'أذكار متنوعة',
    name_fr: 'Invocations Diverses',
    icon: 'apps',
    color: '#607D8B',
    order_index: 6,
  },
];

/**
 * Morning Athkar content
 * Add more athkar as needed
 */
export const MORNING_ATHKAR = [
  {
    category: 'morning',
    text_ar: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamdu, wahuwa 'ala kulli shay'in qadir",
    translation_fr: "Nous voici au matin et le règne appartient à Allah. Louange à Allah. Il n'y a de divinité digne d'adoration qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange et Il est Capable de toute chose",
    translation_en: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things competent",
    repetitions: 1,
    benefits: 'Protection for the day',
    source: 'Muslim',
    order_index: 1,
  },
  {
    category: 'morning',
    text_ar: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration: "Allahumma bika asbahna, wabika amsayna, wabika nahya, wabika namutu, wa ilaykan-nushur",
    translation_fr: "Ô Allah, c'est par Toi que nous entrons dans la matinée, c'est par Toi que nous entrons dans la soirée, c'est par Toi que nous vivons et c'est par Toi que nous mourrons, et c'est vers Toi que se fera la Résurrection",
    translation_en: "O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection",
    repetitions: 1,
    benefits: 'Reminder of Allah in all states',
    source: 'Abu Dawud, Tirmidhi',
    order_index: 2,
  },
  {
    category: 'morning',
    text_ar: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    transliteration: "Asbahna 'ala fitratil-Islam, wa 'ala kalimatil-ikhlas, wa 'ala dini nabiyyina Muhammad (sallallahu 'alayhi wasallam), wa 'ala millati abina Ibrahim, hanifan musliman, wama kana minal-mushrikin",
    translation_fr: "Nous voici au matin, attachés à la nature originelle de l'Islam, à la parole du monothéisme pur, à la religion de notre Prophète Muhammad ﷺ et à la voie de notre père Ibrahim, qui vouait un culte exclusif à Allah, soumis à Lui, et n'était point du nombre des associateurs",
    translation_en: "We have entered a new day upon the fitrah of Islam, the word of sincere devotion, the religion of our Prophet Muhammad ﷺ, and the way of our father Ibrahim, who was upright and a Muslim, and was not of those who associate others with Allah",
    repetitions: 1,
    benefits: 'Affirmation of faith',
    source: 'Ahmad',
    order_index: 3,
  },
  {
    category: 'morning',
    text_ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: "Subhanallahi wa bihamdihi",
    translation_fr: "Gloire et pureté à Allah et je Le loue",
    translation_en: "Glory is to Allah and praise is to Him",
    repetitions: 100,
    benefits: 'Sins are forgiven even if they are like the foam of the sea',
    source: 'Bukhari, Muslim',
    order_index: 4,
  },
  {
    category: 'morning',
    text_ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamdu, wahuwa 'ala kulli shay'in qadir",
    translation_fr: "Il n'y a de divinité digne d'adoration qu'Allah, Seul sans associé. À Lui la royauté, à Lui la louange et Il est Capable de toute chose",
    translation_en: "There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things competent",
    repetitions: 10,
    benefits: 'Reward of freeing 4 slaves, 100 good deeds, 100 sins erased, protection from Shaytan',
    source: 'Bukhari, Muslim',
    order_index: 5,
  },
];

/**
 * Evening Athkar content
 */
export const EVENING_ATHKAR = [
  {
    category: 'evening',
    text_ar: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamdu, wahuwa 'ala kulli shay'in qadir",
    translation_fr: "Nous voici au soir et le règne appartient à Allah. Louange à Allah. Il n'y a de divinité digne d'adoration qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange et Il est Capable de toute chose",
    translation_en: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things competent",
    repetitions: 1,
    benefits: 'Protection for the night',
    source: 'Muslim',
    order_index: 1,
  },
  {
    category: 'evening',
    text_ar: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    transliteration: "Allahumma bika amsayna, wabika asbahna, wabika nahya, wabika namutu, wa ilaykal-masir",
    translation_fr: "Ô Allah, c'est par Toi que nous entrons dans la soirée, c'est par Toi que nous entrons dans la matinée, c'est par Toi que nous vivons et c'est par Toi que nous mourrons, et c'est vers Toi que sera le retour",
    translation_en: "O Allah, by You we enter the evening, by You we enter the morning, by You we live, by You we die, and to You is the return",
    repetitions: 1,
    benefits: 'Reminder of Allah in all states',
    source: 'Abu Dawud, Tirmidhi',
    order_index: 2,
  },
  // Add more evening athkar...
];

/**
 * Sleep Athkar content
 */
export const SLEEP_ATHKAR = [
  {
    category: 'sleep',
    text_ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation_fr: "C'est en Ton nom, ô Allah, que je meurs et que je vis",
    translation_en: "In Your name, O Allah, I die and I live",
    repetitions: 1,
    benefits: 'Protection during sleep',
    source: 'Bukhari',
    order_index: 1,
  },
  {
    category: 'sleep',
    text_ar: 'اللَّهُمَّ إِنِّي أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
    transliteration: "Allahumma inni aslamtu nafsi ilayk, wafawwadtu amri ilayk, wawajjahtu wajhi ilayk, wa-alja'tu thahri ilayk, raghbatan warahbatan ilayk, la malja'a wala manja minka illa ilayk, amantu bikitabikal-ladhi anzalt, wabinabiyyikal-ladhi arsalt",
    translation_fr: "Ô Allah, je me suis soumis à Toi, j'ai remis mon sort entre Tes mains, j'ai tourné mon visage vers Toi et je me suis appuyé sur Toi, par désir et par crainte de Toi. Il n'y a ni refuge ni échappatoire loin de Toi si ce n'est auprès de Toi. Je crois en Ton Livre que Tu as révélé et en Ton Prophète que Tu as envoyé",
    translation_en: "O Allah, I submit my soul to You, I entrust my affair to You, I turn my face to You, and I rely completely upon You, in hope of You and in fear of You. There is no refuge or escape from You except to You. I believe in Your Book which You revealed and in Your Prophet whom You sent",
    repetitions: 1,
    benefits: 'Die upon fitrah if you die that night',
    source: 'Bukhari, Muslim',
    order_index: 2,
  },
  // Add more sleep athkar...
];

/**
 * Waking Up Athkar content
 */
export const WAKING_ATHKAR = [
  {
    category: 'waking',
    text_ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translation_fr: "Louange à Allah qui nous a rendu la vie après nous avoir fait mourir, et c'est vers Lui que se fera la Résurrection",
    translation_en: "All praise is for Allah who gave us life after having taken it from us, and to Him is the resurrection",
    repetitions: 1,
    benefits: 'First dhikr upon waking',
    source: 'Bukhari',
    order_index: 1,
  },
  // Add more waking athkar...
];

/**
 * Quick Actions data for home screen
 */
export const QUICK_ACTIONS = [
  {
    id: 'various',
    label_en: 'Various Azkar',
    label_ar: 'أذكار متنوعة',
    label_fr: 'Azkar Divers',
    icon: 'apps',
    route: '/athkar/various',
  },
  {
    id: 'quran',
    label_en: 'Quran Benefit',
    label_ar: 'فوائد القرآن',
    label_fr: 'Bienfaits Coran',
    icon: 'book',
    route: '/(tabs)/quran',
  },
  {
    id: 'counter',
    label_en: 'Counter',
    label_ar: 'العداد',
    label_fr: 'Compteur',
    icon: 'calculator',
    route: '/counter',
  },
  {
    id: 'tracker',
    label_en: 'Tracker',
    label_ar: 'المتتبع',
    label_fr: 'Suivi',
    icon: 'checkmark-done',
    route: '/tracker',
  },
];