import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://dhrmveersambhajikridamandal.wordpress.com/wp-content/uploads/';

const manifest = {
  brand: [
    { remote: '2022/08/img-20220828-wa0040.jpg', local: 'logo.jpg' }
  ],
  about: [
    { remote: '2023/09/1000136288-1.jpg', local: 'about-anchor.jpg' }
  ],
  leadership: [
    { remote: '2023/09/1000136586-1.jpg', local: 'kalyan-aute.jpg', name: 'कल्याण औटे', role: 'मंडळ ट्रस्ट अध्यक्ष' },
    { remote: '2023/09/img_20230916_104328.jpg', local: 'avinash-kulkarni.jpg', name: 'अविनाश कुलकर्णी', role: 'संस्थापक अध्यक्ष' },
    { remote: '2023/09/1000134406-2.jpg', local: 'manoj-kulkarni.jpg', name: 'मनोज कुलकर्णी', role: 'संस्थापक अध्यक्ष' },
    { remote: '2023/09/1000136285-1.jpg', local: 'vijay-tandale.jpg', name: 'विजय तांदळे', role: 'मंडळ सचिव' },
    { remote: '2023/09/1000136606.jpg', local: 'chandrakant-salunke.jpg', name: 'चंद्रकांत साळुंके', role: 'मंडळ संघटक' },
    { remote: '2023/09/1000136572.jpg', local: 'laxman-anna-thorat.jpg', name: 'कै. लक्ष्मण अण्णा थोरात', role: 'प्रेरणा स्थान' },
    { remote: '2023/09/1000136569.jpg', local: 'somnath-bhau-bomble.jpg', name: 'सोमनाथ भाऊ बोंबले', role: 'मंडळ संघटक' },
    { remote: '2023/09/1000136571.jpg', local: 'sunil-shankh.jpg', name: 'सुनील शंख', role: 'मंडळ संघटक' },
    { remote: '2023/09/1000136231-1.jpg', local: 'prakash-kadwade.jpg', name: 'प्रकाश काडवादे', role: 'मंडळ संघटक' },
    { remote: '2023/09/1000136284.jpg', local: 'nitin-kamble.jpg', name: 'नितीन कांबळे', role: 'मंडळ संपर्क प्रमुख' },
    { remote: '2023/09/1000136286.jpg', local: 'datta-devkar.jpg', name: 'दत्ता देवकर', role: 'मंडळ संपर्क प्रमुख' },
    { remote: '2023/09/1000138625-1.jpg', local: 'sushil-satdive-mangesh-thora.jpg', name: 'सुशील सातदिवे || मंगेश थोरा', role: 'मंडळ ढोल ताशा गट पथक प्रमुख' },
  ],
  specialCooperation: [
    { remote: '2023/09/1000138628.jpg', local: 'coop-1.jpg' },
    { remote: '2022/08/img-20240909-wa0006.jpg', local: 'coop-2.jpg' },
    { remote: '2025/08/img-20250816-wa0012-1-edited-1.jpg', local: 'coop-3.jpg' },
  ],
  mentors: [
    '2023/09/1000136754.jpg',
    '2023/09/1000137048.jpg',
    '2023/09/1000137053.jpg',
    '2023/09/1000137049.jpg',
    '2023/09/img_20230924_115738.jpg',
    '2023/09/1000137047.jpg',
    '2023/09/1000136361.jpg',
    '2023/09/1000136585.jpg',
    '2023/09/1000136589.jpg',
    '2023/09/1000141682.jpg',
    '2023/09/1000137144.jpg',
    '2023/09/1000136584-1.jpg',
    '2023/09/1000136755.webp',
    '2023/09/1000136960.jpg',
    '2023/09/1000136570-1.jpg',
    '2022/08/img-20250826-wa0003-1.jpg',
    '2022/08/img-20250826-wa0004.jpg',
    '2022/08/img-20250827-wa0011.jpg',
    '2022/08/img-20250829-wa0032.jpg',
    '2022/08/img-20240905-wa0007.jpg',
    '2023/09/1000138058.jpg',
    '2023/09/1000138083.jpg',
    '2023/09/1000138080.jpg',
    '2023/09/1000138086.jpg',
    '2023/09/1000138094.jpg',
    '2023/09/1000138093.jpg',
    '2023/09/1000138155.jpg',
    '2023/09/1000141221.jpg',
    '2023/10/1000145754.jpg',
    '2023/09/1000138323.jpg',
    '2023/09/1000138326.jpg',
    '2023/09/1000138441.jpg',
  ].map((remote, idx) => ({
    remote,
    local: `mentor-${String(idx + 1).padStart(2, '0')}${path.extname(remote)}`,
  })),
  history: [
    {
      remote: '2022/08/screenshot_2022-08-17-17-57-40-86_99c04817c0de5652397fc8b56c3b3817-10.jpg',
      local: 'vadyapujan-2022.jpg',
      title: 'वद्यपूजन २०२२',
    },
    {
      remote: '2022/08/screenshot_2022-08-22-00-45-46-12_1cdbe7dded7ec259ed1024b4ff1ae8db-4.jpg',
      local: 'founding-1991-first-photo.jpg',
      title: '1991 चा भगवं वादळ पहिला फोटो',
    },
  ],
  gallery2023: [
    'img-20230929-wa0012.jpg',
    'img-20230929-wa0159.jpg',
    'img-20230928-wa0076.jpg',
    'img-20230929-wa0149.jpg',
    'img-20230929-wa0157.jpg',
    'img-20230929-wa0146.jpg',
    'img-20230929-wa0150.jpg',
    'img-20230929-wa0147.jpg',
    'img-20230929-wa0153.jpg',
    'img-20230929-wa0148.jpg',
    'img-20230929-wa0093.jpg',
    'img-20230929-wa0107.jpg',
    'img-20230929-wa0144.jpg',
    'img-20230929-wa0137.jpg',
    'img-20230929-wa0143.jpg',
    'img-20230929-wa0145.jpg',
    'img-20230929-wa0134.jpg',
    'img-20230930-wa0031.jpg',
    'img-20230929-wa0140.jpg',
    'img-20230929-wa0126.jpg',
    'img-20230929-wa0138.jpg',
    'img-20230929-wa0127.jpg',
    'img-20230929-wa0125.jpg',
    'img-20230929-wa0114.jpg',
    'img-20230929-wa0124.jpg',
    'img-20230929-wa0117.jpg',
    'img-20230929-wa0116.jpg',
    'img-20230929-wa0112.jpg',
    'img-20230929-wa0109.jpg',
    'img-20230929-wa0097.jpg',
    'img-20230929-wa0094.jpg',
    'img-20230929-wa0083.jpg',
    'img-20230929-wa0081.jpg',
    'img-20230929-wa0082.jpg',
    'img-20230929-wa0068.jpg',
    'img-20230929-wa0065.jpg',
    'img-20230929-wa0063.jpg',
    'img-20230929-wa0060.jpg',
    'img-20230929-wa0062.jpg',
    'img-20230929-wa0059.jpg',
    'img-20230929-wa0054.jpg',
    'img-20230929-wa0057.jpg',
    'img-20230929-wa0058.jpg',
    'img-20230929-wa0056.jpg',
    'img-20230929-wa0055.jpg',
    'img-20230929-wa0051.jpg',
    'img-20230929-wa0050.jpg',
    'img-20230929-wa0049.jpg',
    'img-20230929-wa0047.jpg',
    'img-20230929-wa0048.jpg',
    'img-20230929-wa0042.jpg',
    'img-20230929-wa0041.jpg',
    'img-20230929-wa0046.jpg',
    'img-20230929-wa0045.jpg',
    'img-20230929-wa0043.jpg',
    'img-20230929-wa0039.jpg',
    'img-20230929-wa0037.jpg',
    'img-20230929-wa0038.jpg',
    'img-20230929-wa0035.jpg',
    'img-20230929-wa0032.jpg',
    'img-20230929-wa0036.jpg',
    'img-20230929-wa0033.jpg',
    'img-20230929-wa0034.jpg',
    'img-20230929-wa0031.jpg',
    'img-20230929-wa0030.jpg',
    'img-20230929-wa0029.jpg',
    'img-20230929-wa0026.jpg',
    'img-20230929-wa0022.jpg',
    'img-20230929-wa0025.jpg',
    'img-20230929-wa0024.jpg',
    'img-20230929-wa0023.jpg',
    'img-20230929-wa0028.jpg',
    'img20230928192401.jpg',
    'img20230928192352.jpg',
    'img20230928192402.jpg',
    'img20230928184439.jpg',
    'img20230928184447.jpg',
    'img20230928184442.jpg',
    'img-20230928-wa0074.jpg',
  ].map((filename) => ({
    remote: `2023/09/${filename}`,
    local: filename,
  })),
  galleryArchive: [
    ...[
      'img_20220830_204745.jpg',
      'img-20220828-wa0094.jpg',
      'img-20220828-wa0093.jpg',
      'img-20220828-wa0096.jpg',
      'img-20220828-wa0100.jpg',
      'img-20220828-wa0099.jpg',
      'img-20220828-wa0078.jpg',
      'img-20220828-wa0103.jpg',
      'img-20220828-wa0081.jpg',
      'img-20220828-wa0084.jpg',
      'img-20220828-wa0086.jpg',
      'img-20220828-wa0073.jpg',
      'img-20220828-wa0075.jpg',
      'img-20220828-wa0058.jpg',
      'img-20220828-wa0056.jpg',
      'img-20220828-wa0066.jpg',
      'img-20220828-wa0041.jpg',
      'img-20220828-wa0061.jpg',
      'img-20220828-wa0062.jpg',
      'img-20220828-wa0050.jpg',
      'img-20220828-wa0051.jpg',
      'img-20220828-wa0059.jpg',
      'img-20220828-wa0042.jpg',
      'img-20220828-wa0048.jpg',
      'img-20220828-wa0035.jpg',
      'img-20220828-wa0036.jpg',
      'img-20220828-wa0046.jpg',
      'img-20220828-wa0044.jpg',
      'img-20220828-wa0052.jpg',
      'img-20220828-wa0030.jpg',
      'img-20220828-wa0014.jpg',
      'img-20220828-wa0034.jpg',
      'img-20220828-wa0001.jpg',
      'img-20220828-wa0017.jpg',
      'img-20220828-wa0020.jpg',
      'img-20220828-wa0019.jpg',
      'img-20220828-wa0027.jpg',
      'img-20220828-wa0015.jpg',
      'img-20220828-wa0009.jpg',
      'img-20220828-wa0016.jpg',
      'img-20220828-wa0023.jpg',
      'img-20220828-wa0013.jpg',
      '1661109220262.jpg',
    ].map((f) => ({ remote: `2022/08/${f}`, local: f })),
    ...[
      '1000134161.jpg',
      '1000134162.jpg',
      '1000134160.jpg',
      '1000134158.jpg',
      '1000134159.jpg',
      '1000134157.jpg',
      '1000134156.jpg',
      '1000134179.jpg',
      '1000134154.jpg',
      '1000134176.jpg',
      '1000134155.jpg',
      '1000134177.jpg',
      '1000134174.jpg',
      '1000134175.jpg',
      '1000134373.jpg',
      '1000134172.jpg',
      '1000134173.jpg',
      '1000134170.jpg',
      '1000134171.jpg',
      'img_20230912_082349.jpg',
      'dsc_0004.jpg',
      'img_1132.jpg',
      'img-20230914-wa0020.jpg',
      'img-20230914-wa0021.jpg',
      'img-20230914-wa0015.jpg',
      'img-20230914-wa0016.jpg',
      'img20230915214020.jpg',
      'img20230915214018.jpg',
      'screenshot_2023-09-16-09-45-26-904_com.facebook.katana.png',
      'screenshot_2023-09-16-09-44-02-426_com.facebook.katana.png',
      'screenshot_2023-09-16-09-45-07-138_com.facebook.katana.png',
      'screenshot_2023-09-16-09-45-41-653_com.facebook.katana.png',
      'screenshot_2023-09-16-09-44-48-130_com.facebook.katana.png',
      'screenshot_2023-09-16-09-42-35-710_com.facebook.katana.png',
      'screenshot_2023-09-16-09-42-09-361_com.facebook.katana.png',
      'fb_img_1694837240358.jpg',
    ].map((f) => ({ remote: `2023/09/${f}`, local: f })),
  ],
};

function createSvgPlaceholder(name = '', role = '') {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
    : '🚩';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bhagwaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7A1A" />
      <stop offset="100%" stop-color="#800B22" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="#FFF8F0" />
  <rect x="20" y="20" width="560" height="560" rx="16" fill="url(#bhagwaGrad)" opacity="0.1" stroke="#EA580C" stroke-width="2" stroke-dasharray="6,6" />
  <circle cx="300" cy="250" r="90" fill="#EA580C" opacity="0.15" />
  <text x="300" y="275" font-size="70" text-anchor="middle" fill="#EA580C" font-family="sans-serif" font-weight="bold">${initials}</text>
  <text x="300" y="380" font-size="28" text-anchor="middle" fill="#7C2D12" font-family="sans-serif" font-weight="bold">${name || 'धर्मवीर संभाजी'}</text>
  <text x="300" y="420" font-size="22" text-anchor="middle" fill="#C2410C" font-family="sans-serif">${role || 'भगवं वादळ'}</text>
</svg>`;
}

async function downloadFileCurl(url, destPath, placeholderData) {
  // If file exists and is larger than 1KB and NOT an SVG placeholder
  if (fs.existsSync(destPath)) {
    const stat = fs.statSync(destPath);
    if (stat.size > 1000) {
      const head = fs.readFileSync(destPath, { encoding: 'utf-8', flag: 'r' }).slice(0, 10);
      if (!head.startsWith('<svg')) {
        return { status: 'skipped', path: destPath };
      }
    }
  }

  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const cleanUrl = url.split('?')[0];

  try {
    // curl without arguments that have space issues
    await execFileAsync('curl.exe', [
      '-s',
      '-L',
      '-f',
      '--connect-timeout', '10',
      '--max-time', '30',
      '-o', destPath,
      cleanUrl,
    ]);

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return { status: 'success', path: destPath };
    }
    throw new Error('Downloaded file too small or missing');
  } catch (err) {
    console.warn(`[WARN] Failed to download ${cleanUrl}: ${err.message}. Writing placeholder.`);
    const placeholderSvg = createSvgPlaceholder(placeholderData?.name, placeholderData?.role);
    fs.writeFileSync(destPath, placeholderSvg);
    return { status: 'placeholder', path: destPath, error: err.message };
  }
}

async function run() {
  console.log('--- Starting Mandal Image Downloader ---');
  const baseDestDir = path.join(rootDir, 'public', 'images');
  let downloaded = 0;
  let skipped = 0;
  let placeholders = 0;

  const categoryFolders = {
    brand: 'brand',
    about: 'about',
    leadership: 'leadership',
    specialCooperation: 'special-cooperation',
    mentors: 'mentors',
    history: 'history',
    gallery2023: 'gallery-2023',
    galleryArchive: 'gallery-archive',
  };

  const tasks = [];

  for (const [catKey, items] of Object.entries(manifest)) {
    const folder = categoryFolders[catKey];
    for (const item of items) {
      const remoteUrl = `${BASE_URL}${item.remote}`;
      const destFile = path.join(baseDestDir, folder, item.local);
      tasks.push({
        remoteUrl,
        destFile,
        item,
        category: catKey,
      });
    }
  }

  console.log(`Total images to process: ${tasks.length}`);

  // Process in batches of 5
  const BATCH_SIZE = 5;
  for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
    const batch = tasks.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((t) => downloadFileCurl(t.remoteUrl, t.destFile, t.item))
    );

    for (const res of results) {
      if (res.status === 'success') downloaded++;
      else if (res.status === 'skipped') skipped++;
      else if (res.status === 'placeholder') placeholders++;
    }

    process.stdout.write(`Processed ${Math.min(i + BATCH_SIZE, tasks.length)} / ${tasks.length} (DL: ${downloaded}, Skip: ${skipped}, Ph: ${placeholders})\r`);
  }

  console.log('\n--- Image Download Summary ---');
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Placeholders created: ${placeholders}`);
}

run().catch((err) => {
  console.error('Fatal error in downloader:', err);
  process.exit(1);
});
