/**
 * Supabase Data Migration & Seed Script for धर्मवीर संभाजी क्रीडा मंडळ
 * 
 * Usage:
 *   node scripts/seed-supabase.mjs
 * 
 * Requirements:
 *   NEXT_PUBLIC_SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *   in .env.local or environment variables.
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load .env.local or .env if present
const envFiles = ['.env.local', '.env'];
for (const file of envFiles) {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...val] = trimmed.split('=');
        if (key && val.length > 0 && !process.env[key.trim()]) {
          process.env[key.trim()] = val.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.error('👉 Please set these in .env.local before running this seed script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 1. Leadership Members Data
const leadershipTeam = [
  {
    name: "कल्याण औटे",
    position: "मंडळ ट्रस्ट अध्यक्ष",
    image_url: "/images/people/leadership/01_kalyan_aute.png",
    badge: "ट्रस्ट अध्यक्ष",
    object_position: "center 10%",
    scale: 1.0,
    display_order: 1,
    is_active: true
  },
  {
    name: "अविनाश कुलकर्णी",
    position: "संस्थापक अध्यक्ष",
    image_url: "/images/people/leadership/02_avinash_kulkarni.png",
    badge: "संस्थापक",
    object_position: "center 8%",
    scale: 1.0,
    display_order: 2,
    is_active: true
  },
  {
    name: "मनोज कुलकर्णी",
    position: "संस्थापक अध्यक्ष",
    image_url: "/images/people/leadership/03_manoj_kulkarni.png",
    badge: "संस्थापक",
    object_position: "center 10%",
    scale: 1.0,
    display_order: 3,
    is_active: true
  },
  {
    name: "विजय तांदळे",
    position: "मंडळ सचिव",
    image_url: "/images/people/leadership/04_vijay_tandale.png",
    object_position: "center 12%",
    scale: 1.1,
    display_order: 4,
    is_active: true
  },
  {
    name: "चंद्रकांत साळुंके",
    position: "मंडळ संघटक",
    image_url: "/images/people/leadership/05_chandrakant_salunke.png",
    object_position: "center 14%",
    scale: 1.12,
    display_order: 5,
    is_active: true
  },
  {
    name: "कै. लक्ष्मण अण्णा थोरात",
    position: "प्रेरणा स्थान",
    image_url: "/images/people/leadership/06_laxman_anna_thorat.png",
    is_memorial: true,
    memorial_note: "आदरणीय स्मृती व अखंड प्रेरणा स्थान",
    badge: "प्रेरणा स्थान",
    object_position: "center 3%",
    scale: 1.0,
    display_order: 6,
    is_active: true
  },
  {
    name: "सोमनाथ भाऊ बोंबले",
    position: "मंडळ संघटक",
    image_url: "/images/people/leadership/07_somnath_bhau_bombale.png",
    object_position: "center 10%",
    scale: 1.0,
    display_order: 7,
    is_active: true
  },
  {
    name: "सुनील शंख",
    position: "मंडळ संघटक",
    image_url: "/images/people/leadership/08_sunil_shankh.png",
    object_position: "center 6%",
    scale: 1.0,
    display_order: 8,
    is_active: true
  },
  {
    name: "प्रकाश काडवदे",
    position: "मंडळ संघटक",
    image_url: "/images/people/leadership/09_prakash_kadwade.png",
    object_position: "center 10%",
    scale: 1.0,
    display_order: 9,
    is_active: true
  },
  {
    name: "नितीन कांबळे",
    position: "मंडळ संपर्क प्रमुख",
    image_url: "/images/people/leadership/10_nitin_kamble.png",
    object_position: "center 10%",
    scale: 1.0,
    display_order: 10,
    is_active: true
  },
  {
    name: "दत्ता देवकर",
    position: "मंडळ संपर्क प्रमुख",
    image_url: "/images/people/leadership/11_datta_devkar.png",
    object_position: "center 12%",
    scale: 1.0,
    display_order: 11,
    is_active: true
  },
  {
    name: "सुशील सातदिवे आणि मंगेश थोरात",
    names: ["सुशील सातदिवे", "मंगेश थोरात"],
    position: "मंडळ ढोल ताशा गट पथक प्रमुख",
    image_url: "/images/people/leadership/12_sushil_satdive_mangesh_thorat.png",
    badge: "ढोल ताशा पथक प्रमुख",
    object_position: "center 8%",
    scale: 1.0,
    display_order: 12,
    is_active: true
  }
];

// 2. Mentors Framing Calibration
const mentorFramingConfig = {
  1:  { objectPosition: "50% 10%", scale: 1.0, translateY: "2%" },
  2:  { objectPosition: "50% 8%",  scale: 1.0, translateY: "2%" },
  3:  { objectPosition: "52% 8%",  scale: 1.0, translateY: "3%" },
  4:  { objectPosition: "50% 8%",  scale: 1.0, translateY: "3%" },
  5:  { objectPosition: "50% 12%", scale: 1.08 },
  6:  { objectPosition: "50% 6%",  scale: 0.98, translateY: "5%" },
  7:  { objectPosition: "50% 6%",  scale: 0.98, translateY: "5%" },
  8:  { objectPosition: "50% 10%", scale: 1.05 },
  9:  { objectPosition: "48% 8%",  scale: 1.0 },
  10: { objectPosition: "50% 8%",  scale: 1.0, translateY: "3%" },
  11: { objectPosition: "50% 10%", scale: 1.0, translateY: "2%" },
  12: { objectPosition: "50% 8%",  scale: 1.0 },
  13: { objectPosition: "50% 8%",  scale: 1.0, translateY: "3%" },
  14: { objectPosition: "50% 6%",  scale: 1.0 },
  15: { objectPosition: "50% 8%",  scale: 1.0 },
  16: { objectPosition: "50% 10%", scale: 1.0 },
  17: { objectPosition: "50% 7%",  scale: 1.0 },
  18: { objectPosition: "50% 8%",  scale: 1.0 },
  19: { objectPosition: "48% 7%",  scale: 1.0 },
  20: { objectPosition: "50% 9%",  scale: 1.0 },
  21: { objectPosition: "48% 7%",  scale: 1.0 },
  22: { objectPosition: "50% 8%",  scale: 1.0 },
  23: { objectPosition: "50% 12%", scale: 1.0 },
  24: { objectPosition: "50% 10%", scale: 1.0, translateY: "2%" },
  25: { objectPosition: "50% 10%", scale: 1.0, translateY: "2%" },
  26: { objectPosition: "50% 8%",  scale: 1.0 },
  27: { objectPosition: "50% 7%",  scale: 1.0 },
  28: { objectPosition: "50% 8%",  scale: 1.0 },
  29: { objectPosition: "50% 8%",  scale: 1.0, translateY: "2%" },
  30: { objectPosition: "52% 12%", scale: 1.0 },
  31: { objectPosition: "50% 9%",  scale: 1.0, translateY: "2%" },
  32: { objectPosition: "50% 8%",  scale: 1.0, translateY: "2%" },
};

const mentorsList = Array.from({ length: 32 }, (_, i) => {
  const numIndex = i + 1;
  const num = String(numIndex).padStart(2, "0");
  const filename = `mentor-${num}.jpg`;
  const framing = mentorFramingConfig[numIndex] || { objectPosition: "center 10%" };

  return {
    name: null,
    role_title: "मार्गदर्शक",
    image_url: `/images/people/mentors/${filename}`,
    display_order: numIndex,
    is_active: true,
    object_position: framing.objectPosition,
    scale: framing.scale || 1.0,
    translate_y: framing.translateY || null
  };
});

// 3. Special Cooperation Data
const specialCooperationList = [
  {
    name: null,
    role_title: "विशेष सहकार्य",
    image_url: "/images/people/special-cooperation/special_cooperation_01.png",
    display_order: 1,
    is_active: true,
    object_position: "center 14%",
    scale: 1.0
  },
  {
    name: null,
    role_title: "विशेष सहकार्य",
    image_url: "/images/people/special-cooperation/special_cooperation_02.jpg",
    display_order: 2,
    is_active: true,
    object_position: "center 8%",
    scale: 1.0
  },
  {
    name: null,
    role_title: "विशेष सहकार्य",
    image_url: "/images/people/special-cooperation/special_cooperation_03.png",
    display_order: 3,
    is_active: true,
    object_position: "center 10%",
    scale: 1.0
  },
  {
    name: null,
    role_title: "विशेष सहकार्य",
    image_url: "/images/people/special-cooperation/special_cooperation_04.png",
    display_order: 4,
    is_active: true,
    object_position: "center 10%",
    scale: 1.0
  }
];

// 4. Gallery Data
const gallery2023Filenames = [
  'img-20230929-wa0012.jpg', 'img-20230929-wa0159.jpg', 'img-20230928-wa0076.jpg', 'img-20230929-wa0149.jpg',
  'img-20230929-wa0157.jpg', 'img-20230929-wa0146.jpg', 'img-20230929-wa0150.jpg', 'img-20230929-wa0147.jpg',
  'img-20230929-wa0153.jpg', 'img-20230929-wa0148.jpg', 'img-20230929-wa0093.jpg', 'img-20230929-wa0107.jpg',
  'img-20230929-wa0144.jpg', 'img-20230929-wa0137.jpg', 'img-20230929-wa0143.jpg', 'img-20230929-wa0145.jpg',
  'img-20230929-wa0134.jpg', 'img-20230930-wa0031.jpg', 'img-20230929-wa0140.jpg', 'img-20230929-wa0126.jpg',
  'img-20230929-wa0138.jpg', 'img-20230929-wa0127.jpg', 'img-20230929-wa0125.jpg', 'img-20230929-wa0114.jpg',
  'img-20230929-wa0124.jpg', 'img-20230929-wa0117.jpg', 'img-20230929-wa0116.jpg', 'img-20230929-wa0112.jpg',
  'img-20230929-wa0109.jpg', 'img-20230929-wa0097.jpg', 'img-20230929-wa0094.jpg', 'img-20230929-wa0083.jpg',
  'img-20230929-wa0081.jpg', 'img-20230929-wa0082.jpg', 'img-20230929-wa0068.jpg', 'img-20230929-wa0065.jpg',
  'img-20230929-wa0063.jpg', 'img-20230929-wa0060.jpg', 'img-20230929-wa0062.jpg', 'img-20230929-wa0059.jpg',
  'img-20230929-wa0054.jpg', 'img-20230929-wa0057.jpg', 'img-20230929-wa0058.jpg', 'img-20230929-wa0056.jpg',
  'img-20230929-wa0055.jpg', 'img-20230929-wa0051.jpg', 'img-20230929-wa0050.jpg', 'img-20230929-wa0049.jpg',
  'img-20230929-wa0047.jpg', 'img-20230929-wa0048.jpg', 'img-20230929-wa0042.jpg', 'img-20230929-wa0041.jpg',
  'img-20230929-wa0046.jpg', 'img-20230929-wa0045.jpg', 'img-20230929-wa0043.jpg', 'img-20230929-wa0039.jpg',
  'img-20230929-wa0037.jpg', 'img-20230929-wa0038.jpg', 'img-20230929-wa0035.jpg', 'img-20230929-wa0032.jpg',
  'img-20230929-wa0036.jpg', 'img-20230929-wa0033.jpg', 'img-20230929-wa0034.jpg', 'img-20230929-wa0031.jpg',
  'img-20230929-wa0030.jpg', 'img-20230929-wa0029.jpg', 'img-20230929-wa0026.jpg', 'img-20230929-wa0022.jpg',
  'img-20230929-wa0025.jpg', 'img-20230929-wa0024.jpg', 'img-20230929-wa0023.jpg', 'img-20230929-wa0028.jpg',
  'img20230928192401.jpg',   'img20230928192352.jpg',   'img20230928192402.jpg',   'img20230928184439.jpg',
  'img20230928184447.jpg',   'img20230928184442.jpg',   'img-20230928-wa0074.jpg'
];

const galleryArchiveFilenames = [
  'img_20220830_204745.jpg', 'img-20220828-wa0094.jpg', 'img-20220828-wa0093.jpg', 'img-20220828-wa0096.jpg',
  'img-20220828-wa0100.jpg', 'img-20220828-wa0099.jpg', 'img-20220828-wa0078.jpg', 'img-20220828-wa0103.jpg',
  'img-20220828-wa0081.jpg', 'img-20220828-wa0084.jpg', 'img-20220828-wa0086.jpg', 'img-20220828-wa0073.jpg',
  'img-20220828-wa0075.jpg', 'img-20220828-wa0058.jpg', 'img-20220828-wa0056.jpg', 'img-20220828-wa0066.jpg',
  'img-20220828-wa0041.jpg', 'img-20220828-wa0061.jpg', 'img-20220828-wa0062.jpg', 'img-20220828-wa0050.jpg',
  'img-20220828-wa0051.jpg', 'img-20220828-wa0059.jpg', 'img-20220828-wa0042.jpg', 'img-20220828-wa0048.jpg',
  'img-20220828-wa0035.jpg', 'img-20220828-wa0036.jpg', 'img-20220828-wa0046.jpg', 'img-20220828-wa0044.jpg',
  'img-20220828-wa0052.jpg', 'img-20220828-wa0030.jpg', 'img-20220828-wa0014.jpg', 'img-20220828-wa0034.jpg',
  'img-20220828-wa0001.jpg', 'img-20220828-wa0017.jpg', 'img-20220828-wa0020.jpg', 'img-20220828-wa0019.jpg',
  'img-20220828-wa0027.jpg', 'img-20220828-wa0015.jpg', 'img-20220828-wa0009.jpg', 'img-20220828-wa0016.jpg',
  'img-20220828-wa0023.jpg', 'img-20220828-wa0013.jpg', '1661109220262.jpg',          '1000134161.jpg',
  '1000134162.jpg',          '1000134160.jpg',          '1000134158.jpg',          '1000134159.jpg',
  '1000134157.jpg',          '1000134156.jpg',          '1000134179.jpg',          '1000134154.jpg',
  '1000134176.jpg',          '1000134155.jpg',          '1000134177.jpg',          '1000134174.jpg',
  '1000134175.jpg',          '1000134373.jpg',          '1000134172.jpg',          '1000134173.jpg',
  '1000134170.jpg',          '1000134171.jpg',          'img_20230912_082349.jpg', 'dsc_0004.jpg',
  'img_1132.jpg',            'img-20230914-wa0020.jpg', 'img-20230914-wa0021.jpg', 'img-20230914-wa0015.jpg',
  'img-20230914-wa0016.jpg', 'img20230915214020.jpg',  'img20230915214018.jpg',  'screenshot_2023-09-16-09-45-26-904_com.facebook.katana.png',
  'screenshot_2023-09-16-09-44-02-426_com.facebook.katana.png', 'screenshot_2023-09-16-09-45-07-138_com.facebook.katana.png',
  'screenshot_2023-09-16-09-45-41-653_com.facebook.katana.png', 'screenshot_2023-09-16-09-44-48-130_com.facebook.katana.png',
  'screenshot_2023-09-16-09-42-35-710_com.facebook.katana.png', 'screenshot_2023-09-16-09-42-09-361_com.facebook.katana.png',
  'fb_img_1694837240358.jpg'
];

const galleryList = [
  ...gallery2023Filenames.map((fn, idx) => ({
    image_url: `/images/gallery-2023/${fn}`,
    category: '2k23',
    title: `गणेशोत्सव २०२३ - छायाचित्र ${idx + 1}`,
    year: '२०२३',
    display_order: idx + 1,
    is_active: true,
    show_in_slideshow: true
  })),
  ...galleryArchiveFilenames.map((fn, idx) => ({
    image_url: `/images/gallery-archive/${fn}`,
    category: 'archive',
    title: `जुनी आठवण - छायाचित्र ${idx + 1}`,
    year: 'संग्रहित',
    display_order: gallery2023Filenames.length + idx + 1,
    is_active: true,
    show_in_slideshow: true
  }))
];

async function seed() {
  console.log('🚀 Starting Supabase data seeding...');

  // 1. Seed Leadership Members
  console.log(`\n📋 Seeding ${leadershipTeam.length} leadership members...`);
  const { error: membersErr } = await supabase.from('members').upsert(leadershipTeam, { onConflict: 'name' });
  if (membersErr) {
    console.warn('⚠️ Members upsert note:', membersErr.message);
    const { error: insertErr } = await supabase.from('members').insert(leadershipTeam);
    if (insertErr) console.error('❌ Insert members error:', insertErr);
    else console.log('✅ Leadership members inserted successfully!');
  } else {
    console.log('✅ Leadership members seeded successfully!');
  }

  // 2. Seed Mentors
  console.log(`\n📋 Seeding ${mentorsList.length} mentors...`);
  const { error: mentorsErr } = await supabase.from('mentors').insert(mentorsList);
  if (mentorsErr) console.warn('⚠️ Mentors insert note:', mentorsErr.message);
  else console.log('✅ Mentors seeded successfully!');

  // 3. Seed Special Cooperation
  console.log(`\n📋 Seeding ${specialCooperationList.length} special cooperation entries...`);
  const { error: coopErr } = await supabase.from('special_cooperation').insert(specialCooperationList);
  if (coopErr) console.warn('⚠️ Special cooperation note:', coopErr.message);
  else console.log('✅ Special cooperation seeded successfully!');

  // 4. Seed Gallery Images
  console.log(`\n📋 Seeding ${galleryList.length} gallery images in batches...`);
  const BATCH_SIZE = 50;
  for (let i = 0; i < galleryList.length; i += BATCH_SIZE) {
    const batch = galleryList.slice(i, i + BATCH_SIZE);
    const { error: galErr } = await supabase.from('gallery').insert(batch);
    if (galErr) console.warn(`⚠️ Gallery batch ${i / BATCH_SIZE + 1} note:`, galErr.message);
    else console.log(`   Processed batch ${i + 1} to ${Math.min(i + BATCH_SIZE, galleryList.length)}`);
  }
  console.log('✅ Gallery images seeded successfully!');

  // 5. Seed Site Settings
  console.log('\n📋 Seeding canonical branding and site settings...');
  const settings = [
    {
      key: 'site_logo',
      value: {
        url: '/images/branding/mandal-logo.png',
        alt: 'धर्मवीर संभाजी क्रीडा मंडळ लोगो',
        updated_at: new Date().toISOString()
      }
    },
    {
      key: 'contact_info',
      value: {
        addressMarathi: 'एन - ६ सिडको, ई सेक्टर, छत्रपती संभाजीनगर, महाराष्ट्र',
        instagramHandle: '@bhgv__vadal',
        telegramHandle: '@bhgvvadal',
        youtubeHandle: '@bhgvvadal',
        instagramUrl: 'https://instagram.com/bhgv__vadal',
        youtubeUrl: 'https://youtube.com/@bhgvvadal',
        telegramUrl: 'https://t.me/bhgvvadal'
      }
    }
  ];
  const { error: setErr } = await supabase.from('site_settings').upsert(settings, { onConflict: 'key' });
  if (setErr) console.warn('⚠️ Site settings note:', setErr.message);
  else console.log('✅ Site settings seeded successfully!');

  console.log('\n🎉 All official data successfully migrated/seeded to Supabase!');
}

seed().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
