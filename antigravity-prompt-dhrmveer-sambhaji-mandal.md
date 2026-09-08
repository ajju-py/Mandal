# Build Prompt for Antigravity — धर्मवीर संभाजी क्रीडा मंडळ (Redesign)

Copy everything under the line **"PASTE INTO ANTIGRAVITY STARTS HERE"** and give it to Antigravity as your task prompt. I analyzed the live WordPress site first (homepage + `/gallery/`) so this prompt already contains the real Marathi copy, the real team roster, and a verified manifest of every photo URL — Antigravity doesn't have to guess or re-scrape blind, which is what makes this robust.

Two things I decided on your behalf — check them before sending:
1. The current footer text ("2009 Pendant © All Rights Reserved") looks like a leftover WordPress theme artifact, not real mandal content, so I replaced it with a normal copyright line. Say so if you want it kept verbatim.
2. Two "वद्यपूजन" videos (2023, 2024) are hosted on `video.wordpress.com`, which cannot be self-hosted on Vercel. I've instructed Antigravity to embed them via iframe as-is and flagged them as a risk (they'll break if the WordPress site is ever deleted) — ideally re-upload those two to the mandal's YouTube channel later and swap the embed.

---

## PASTE INTO ANTIGRAVITY STARTS HERE

### 0. Your task

You are rebuilding the website of **धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ)**, a Ganeshotsav mandal and dhol-tasha (percussion) troupe in Chhatrapati Sambhajinagar, Maharashtra. Their current site is a free WordPress.com site: `https://dhrmveersambhajikridamandal.wordpress.com/` (homepage) and `https://dhrmveersambhajikridamandal.wordpress.com/gallery/` (gallery page).

Visit both live URLs yourself, confirm the content below still matches, and extract/download every photo referenced. Then build a completely new site in **React + TypeScript + Next.js**, deployable on **Vercel**, that reproduces the same information architecture and content but with a real, deliberate design — not a generic AI-template look.

Do not invent content, names, or facts that aren't in this brief or on the live site. Where a name isn't given (see the Mentors section), do not fabricate one — use the photo with its existing generic label only.

---

### 1. Tech stack (non-negotiable, keep it lightweight)

- Next.js 14+, **App Router**, TypeScript, strict mode on.
- Tailwind CSS for styling. No CSS-in-JS libraries, no component kit unless it genuinely saves work (shadcn/ui is fine for primitives like dialog/carousel — nothing heavier).
- Fully static / SSG — this is a content site, not an app. No database, no CMS, no auth. All content lives in local TypeScript data files (e.g. `/data/team.ts`, `/data/gallery.ts`) so the client can edit text/photos later without touching components.
- `next/image` for every photo (automatic optimization, lazy loading, responsive `sizes`).
- No Redux/Zustand/React Query — plain React state is enough for a lightbox/carousel. Do not over-engineer this.
- Devanagari-safe font: use `next/font` with a Marathi-friendly typeface (e.g. Noto Sans Devanagari, Baloo 2, Mukta, or Tiro Devanagari Marathi for headings) paired with a clean Latin fallback. Set `<html lang="mr">`.
- Keep the whole codebase small: a handful of route files, a `/components` folder, a `/data` folder, a `/public/images` folder. No unnecessary abstraction layers, no premature "framework within the framework."

---

### 2. Design direction — it must NOT look AI-generated

This is a community/cultural site with real emotional weight (a 30+ year old Ganeshotsav mandal, a dhol-tasha troupe, real named elders and organizers). Avoid every generic-AI-site tell:

**Don't:**
- Generic purple-to-blue SaaS gradient hero.
- Cookie-cutter 3-icon "features grid" with Heroicons.
- Stock photography or generic illustrations — this mandal has 150+ real photos, use those.
- Centered-everything, one-font, one-shadow-style templated layout.
- Overused glassmorphism/neumorphism for no reason.

**Do:**
- Build the palette around **भगवं (bhagwa/saffron)** — the mandal's own name references it. Warm saffron/orange (~#FF7A1A–#FF9933) as the primary accent, deep maroon or red as a secondary, warm off-white/cream background, near-black for text. This should feel like a festival, not a fintech app.
- Let the real photography lead — a rotating/carousel hero built from actual dhol-tasha and Ganeshotsav photos, not a stock banner.
- Typography should have some character for headings (a strong Devanagari display face) while body text stays highly legible.
- Subtle cultural motifs are welcome if tasteful (e.g. a thin dhol/drum-beat pattern, a small saffron flag accent in the header) — but don't overdo it into clutter.
- Design mobile-first, since the brief is that most visitors will be on phones — see section 6.

---

### 3. Site structure

```
/                → Home (hero, about, leadership/team, mentors, media, videos)
/gallery         → Full photo gallery (2023 event photos + older archive photos)
```

Keep it a two-route site, matching the source. Don't invent extra pages (no fake "Blog", "Services" etc. — this mandal doesn't have that content).

Header nav (sticky, mobile hamburger menu): **मुख्यपृष्ठ (Home) · Gallery · YouTube · Telegram · Instagram** (the last three are external links, icon + label, opening in new tab).

---

### 4. Page content (extracted verbatim from the live site — reuse as-is)

#### Site identity
- Name: **धर्मवीर संभाजी क्रीडा मंडळ**
- Tagline/sub-brand: **भगवं वादळ**
- Address: **एन – ६ सिडको, ई सेक्टर, छत्रपती संभाजीनगर**
- Founded: **1991**
- Social links: YouTube `https://youtube.com/@bhgvvadal`, Telegram `https://t.me/bhgvvadal`, Instagram `https://instagram.com/bhgv__vadal`

#### Hero section
Logo/hero image + mandal name + tagline + address (see image manifest §7, "Logo/Brand"). Consider a soft-motion or swipeable carousel of 4–6 strong event photos behind or beside the hero text instead of a single static banner.

#### About Us (reproduce this copy in full, Marathi only — do not translate to English)

> **आमच्याबद्दल:**
> भगवं वादळं येथे, आम्ही अखंड भक्ती आणि उत्साहाने गणेशाचे दिव्य उपस्थिती साजरी करण्यासाठी समर्पित आहोत. 1991 मध्ये स्थापन झालेले आमचे मंडळ आपल्या समाजातील अध्यात्म, ऐक्य आणि सांस्कृतिक समृद्धीचे दीपस्तंभ आहे.
>
> **आमची दृष्टी:**
> भक्तांमध्ये खोल आध्यात्मिक संबंध वाढवणे आणि भगवान गणेशाच्या शिकवणी आणि मूल्यांना प्रोत्साहन देणे हे आमचे ध्येय आहे. गणेशोत्सवाची केवळ भव्यताच नव्हे तर एकोपा, सर्वसमावेशकता आणि सामाजिक जबाबदारीचा संदेश देणारे व्यासपीठ तयार करण्याचे आमचे ध्येय आहे.
>
> **ढोल ताशा पथक:**
> आमच्या उत्सवांच्या मध्यभागी, आमच्या ढोल ताशा पथकाच्या तालबद्ध बीट्स गुंजतात, आमच्या उत्सवांना एक दोलायमान आणि उत्साही परिमाण जोडतात. कुशल ढोलकी वादकांचा आमचा समर्पित गट आमच्या मिरवणुका आणि कार्यक्रमांमध्ये चैतन्य आणतो, जे साक्षीदार असलेल्या सर्वांना मोहित करणारे विद्युत् चैतन्यपूर्ण वातावरणात भरते.
>
> **आपण काय करतो:**
> वर्षभर, आम्ही विविध सांस्कृतिक, धार्मिक आणि सामाजिक उपक्रमांमध्ये व्यस्त असतो, ज्याचे वैशिष्ट्य म्हणजे भव्य गणेशोत्सव उत्सव. आमचे ढोल ताशा पथक, आमच्या समर्पित स्वयंसेवक संघासह, भगवान गणेशाच्या नावाने कार्यक्रम, निधी उभारणी आणि धर्मादाय उपक्रम आयोजित करण्यासाठी अथक परिश्रम करतात.
>
> **आमच्यात सामील व्हा:**
> आम्ही तुम्हाला आमच्या सतत वाढणाऱ्या कुटुंबाचा एक भाग होण्यासाठी, आमच्या कार्यक्रमांमध्ये सहभागी होण्यासाठी आणि आमच्या ढोल ताशा पथकाच्या आनंददायी तालांसह भगवान गणेशाच्या दिव्य उपस्थितीचा अनुभव घेण्यासाठी आमंत्रित करतो. तुम्ही प्रदीर्घ काळचे भक्त असाल किंवा नवागत असाल, आमच्यासोबत भगवान गणेशाच्या आनंदात आणि आशीर्वादात सहभागी होण्यासाठी प्रत्येकाचे स्वागत आहे.
>
> **आपल्या समुदायात सामील व्हा:**
> धर्मवीर संभाजी क्रीडा मंडळ आमच्या सदस्यांच्या आणि हितचिंतकांच्या पाठिंब्याने आणि योगदानाने भरभराट होते. तुम्हाला स्वयंसेवा, कार्यक्रम प्रायोजित करण्यात किंवा आमच्या ढोल ताशा पथकात सहभागी होण्यात स्वारस्य असल्यास, कृपया आमच्याशी संपर्क साधा. एकत्रितपणे, आपण आपल्या समुदायावर आणि त्यापलीकडे सकारात्मक प्रभाव पाडू शकतो.
>
> उत्सवात सामील व्हा, आणि भगवान गणेशाची दैवी उर्जा आणि आमच्या ढोल ताशा पथकाच्या स्पंदनात्मक ताल आम्हाला भक्ती आणि सेवेच्या या सुंदर प्रवासात प्रेरणा आणि मार्गदर्शन करू द्या.
>
> **आमच्याशी संपर्क साधा:**
> कोणत्याही चौकशीसाठी किंवा सहभागी होण्यासाठी, कृपया आमच्याशी संपर्क साधा.
>
> **श्रीगणेशाचा आशीर्वाद सदैव तुमच्या पाठीशी राहो!**

Lay this out as readable sections with subheadings (not one giant wall of text) — e.g. a set of stacked cards or an accordion on mobile, each with a small relevant icon (hands/diya for devotion, dhol for the pathak section, people for community, etc.), image from §7 "Logo/Brand" (the 1000136288-1.jpg image) can anchor this section.

#### Leadership / Team roster (named — build as photo + name + role cards, grid on desktop, stacked/scrollable on mobile)

| Photo (see §7 "Leadership") | Name | Role |
|---|---|---|
| kalyan-aute.jpg | कल्याण औटे | मंडळ ट्रस्ट अध्यक्ष |
| avinash-kulkarni.jpg | अविनाश कुलकर्णी | संस्थापक अध्यक्ष |
| manoj-kulkarni.jpg | मनोज कुलकर्णी | संस्थापक अध्यक्ष |
| vijay-tandale.jpg | विजय तांदळे | मंडळ सचिव |
| chandrakant-salunke.jpg | चंद्रकांत साळुंके | मंडळ संघटक |
| laxman-anna-thorat.jpg | कै. लक्ष्मण अण्णा थोरात | प्रेरणा स्थान |
| somnath-bhau-bomble.jpg | सोमनाथ भाऊ बोंबले | मंडळ संघटक |
| sunil-shankh.jpg | सुनील शंख | मंडळ संघटक |
| prakash-kadwade.jpg | प्रकाश काडवादे | मंडळ संघटक |
| nitin-kamble.jpg | नितीन कांबळे | मंडळ संपर्क प्रमुख |
| datta-devkar.jpg | दत्ता देवकर | मंडळ संपर्क प्रमुख |
| sushil-satdive-mangesh-thora.jpg | सुशील सातदिवे \|\| मंगेश थोरा | मंडळ ढोल ताशा गट पथक प्रमुख |

Note: "कै." before लक्ष्मण अण्णा थोरात means "late/deceased" — display this respectfully (e.g. small memorial note), don't strip it.

#### विशेष सहकार्य (Special Cooperation) — 3 photos, no individual names given on the source site. Build as a simple photo row/strip with the section heading "विशेष सहकार्य" — do not invent names.

#### मार्गदर्शक (Mentors/Guides) — ~30 photos, **no individual names given** on the source site, each just labeled "मार्गदर्शक". Build this as a photo grid/masonry under one heading "मार्गदर्शक" — do NOT fabricate names or captions per photo. If the client wants names added later, leave `name: undefined` in the data file with a `// TODO: get name from client` comment next to each entry, rather than guessing.

#### Media section
- Heading: "Instagram Reels and post" — embed or link out to the mandal's Instagram (`https://instagram.com/bhgv__vadal`) rather than trying to scrape reels; a simple "Follow us on Instagram" card with the handle is enough, since reels can't be reliably self-hosted.
- **वद्यपूजन २०२२**: single photo (see §7 "Event/History").
- **वद्यपूजन २०२३**: embedded video, currently hosted at `video.wordpress.com` (id `KizTL0iU`). Embed via iframe: `https://video.wordpress.com/embed/KizTL0iU`. Flag to the client that this should ideally move to YouTube for long-term reliability.
- **वद्यपूजन २०२४**: embedded video, currently hosted at `video.wordpress.com` (id `t6TKappg`). Same handling: `https://video.wordpress.com/embed/t6TKappg`.
- **"1991 चा भगवं वादळ पहिला फोटो"** — the mandal's first-ever photo, from 1991. Give this real prominence (it's their founding artifact) — a dedicated, slightly larger "Our Beginning" card, not buried in a generic grid.
- 3 YouTube videos, embed via standard `<iframe>` (YouTube nocookie domain preferred): `Ydu3i3PrxVQ`, `sAIonD8HHz8`, `Xff3XQ4Tq6c`.

#### Footer
Replace the WordPress theme leftover with a clean footer: mandal name, address, social icons, and `© {new Date().getFullYear()} धर्मवीर संभाजी क्रीडा मंडळ. सर्व हक्क राखीव.` Keep a small, optional "developed by" credit line if the client wants one — don't hardcode a name you're not given.

---

### 5. Gallery page (`/gallery`)

Two sections, matching the source:
1. **"2K23 PHOTO'S"** — ~70 event photos from the 2023 Ganeshotsav (see §7 "Gallery 2023").
2. **"Old Photo's"** — ~60 archive photos (see §7 "Gallery Archive").

Build this as a responsive masonry/grid (2 columns on mobile, 3–4 on tablet/desktop) with a lightbox on tap/click (swipe between photos on mobile). Given the volume (130+ images), this is the section most likely to hurt mobile performance if done carelessly — see §6 and §8 for hard requirements here.

---

### 6. Image extraction & placeholder rules

1. Crawl `https://dhrmveersambhajikridamandal.wordpress.com/` and `https://dhrmveersambhajikridamandal.wordpress.com/gallery/` yourself and download every image referenced. All images live under `https://dhrmveersambhajikridamandal.wordpress.com/wp-content/uploads/...` — fetch the **original file** (strip any `?w=` query parameter, it's just a WordPress resize parameter) so you get full resolution, then re-optimize yourself via `next/image` / a build step.
2. Cross-check your crawl against the manifest in §7 below — I've already extracted and verified every URL from both live pages, so treat §7 as the source of truth if your own crawl misses anything (WordPress.com galleries can lazy-load in ways that trip up naive scrapers).
3. Store downloaded images under `/public/images/<category>/<descriptive-slug>.<ext>` (categories: `brand`, `leadership`, `mentors`, `special-cooperation`, `history`, `gallery-2023`, `gallery-archive`).
4. **If any individual image genuinely fails to download** (broken link, 404, corrupted file), do not let the build fail and do not silently drop it — render a clean placeholder in its exact spot: a simple bordered box in the site's saffron/cream palette with a small icon (e.g. a photo/image icon) and, for named cards (leadership), the person's initials. Log which files fell back to placeholder in the console/build output so the client can supply replacements later.
5. Never invent or AI-generate a substitute photo for a missing real photo — placeholder means placeholder, not a fabricated image.

---

### 7. Verified image manifest

Base URL for every path below:
`https://dhrmveersambhajikridamandal.wordpress.com/wp-content/uploads/`

**Logo/Brand**
```
2022/08/img-20220828-wa0040.jpg
```

**About-us anchor image**
```
2023/09/1000136288-1.jpg
```

**Leadership (12 photos, in the same order as the roster table in §4)**
```
2023/09/1000136586-1.jpg
2023/09/img_20230916_104328.jpg
2023/09/1000134406-2.jpg
2023/09/1000136285-1.jpg
2023/09/1000136606.jpg
2023/09/1000136572.jpg
2023/09/1000136569.jpg
2023/09/1000136571.jpg
2023/09/1000136231-1.jpg
2023/09/1000136284.jpg
2023/09/1000136286.jpg
2023/09/1000138625-1.jpg
```

**Special Cooperation (3 photos)**
```
2023/09/1000138628.jpg
2022/08/img-20240909-wa0006.jpg
2025/08/img-20250816-wa0012-1-edited-1.jpg
```

**Mentors — मार्गदर्शक (30 photos, no names on source)**
```
2023/09/1000136754.jpg
2023/09/1000137048.jpg
2023/09/1000137053.jpg
2023/09/1000137049.jpg
2023/09/img_20230924_115738.jpg
2023/09/1000137047.jpg
2023/09/1000136361.jpg
2023/09/1000136585.jpg
2023/09/1000136589.jpg
2023/09/1000141682.jpg
2023/09/1000137144.jpg
2023/09/1000136584-1.jpg
2023/09/1000136755.webp
2023/09/1000136960.jpg
2023/09/1000136570-1.jpg
2022/08/img-20250826-wa0003-1.jpg
2022/08/img-20250826-wa0004.jpg
2022/08/img-20250827-wa0011.jpg
2022/08/img-20250829-wa0032.jpg
2022/08/img-20240905-wa0007.jpg
2023/09/1000138058.jpg
2023/09/1000138083.jpg
2023/09/1000138080.jpg
2023/09/1000138086.jpg
2023/09/1000138094.jpg
2023/09/1000138093.jpg
2023/09/1000138155.jpg
2023/09/1000141221.jpg
2023/10/1000145754.jpg
2023/09/1000138323.jpg
2023/09/1000138326.jpg
2023/09/1000138441.jpg
```

**Event/History**
```
2022/08/screenshot_2022-08-17-17-57-40-86_99c04817c0de5652397fc8b56c3b3817-10.jpg   (वद्यपूजन २०२२)
2022/08/screenshot_2022-08-22-00-45-46-12_1cdbe7dded7ec259ed1024b4ff1ae8db-4.jpg    (1991 first photo)
```

**Gallery — 2K23 PHOTO'S (~70 photos, all under `2023/09/` unless noted)**
```
img-20230929-wa0012.jpg
img-20230929-wa0159.jpg
img-20230928-wa0076.jpg
img-20230929-wa0149.jpg
img-20230929-wa0157.jpg
img-20230929-wa0146.jpg
img-20230929-wa0150.jpg
img-20230929-wa0147.jpg
img-20230929-wa0153.jpg
img-20230929-wa0148.jpg
img-20230929-wa0093.jpg
img-20230929-wa0107.jpg
img-20230929-wa0144.jpg
img-20230929-wa0137.jpg
img-20230929-wa0143.jpg
img-20230929-wa0145.jpg
img-20230929-wa0134.jpg
img-20230930-wa0031.jpg
img-20230929-wa0140.jpg
img-20230929-wa0126.jpg
img-20230929-wa0138.jpg
img-20230929-wa0127.jpg
img-20230929-wa0125.jpg
img-20230929-wa0114.jpg
img-20230929-wa0124.jpg
img-20230929-wa0117.jpg
img-20230929-wa0116.jpg
img-20230929-wa0112.jpg
img-20230929-wa0109.jpg
img-20230929-wa0097.jpg
img-20230929-wa0094.jpg
img-20230929-wa0083.jpg
img-20230929-wa0081.jpg
img-20230929-wa0082.jpg
img-20230929-wa0068.jpg
img-20230929-wa0065.jpg
img-20230929-wa0063.jpg
img-20230929-wa0060.jpg
img-20230929-wa0062.jpg
img-20230929-wa0059.jpg
img-20230929-wa0054.jpg
img-20230929-wa0057.jpg
img-20230929-wa0058.jpg
img-20230929-wa0056.jpg
img-20230929-wa0055.jpg
img-20230929-wa0051.jpg
img-20230929-wa0050.jpg
img-20230929-wa0049.jpg
img-20230929-wa0047.jpg
img-20230929-wa0048.jpg
img-20230929-wa0042.jpg
img-20230929-wa0041.jpg
img-20230929-wa0046.jpg
img-20230929-wa0045.jpg
img-20230929-wa0043.jpg
img-20230929-wa0039.jpg
img-20230929-wa0037.jpg
img-20230929-wa0038.jpg
img-20230929-wa0035.jpg
img-20230929-wa0032.jpg
img-20230929-wa0036.jpg
img-20230929-wa0033.jpg
img-20230929-wa0034.jpg
img-20230929-wa0031.jpg
img-20230929-wa0030.jpg
img-20230929-wa0029.jpg
img-20230929-wa0026.jpg
img-20230929-wa0022.jpg
img-20230929-wa0025.jpg
img-20230929-wa0024.jpg
img-20230929-wa0023.jpg
img-20230929-wa0028.jpg
img20230928192401.jpg
img20230928192352.jpg
img20230928192402.jpg
img20230928184439.jpg
img20230928184447.jpg
img20230928184442.jpg
img-20230928-wa0074.jpg
```

**Gallery — Old Photo's (~60 photos)**

Under `2022/08/`:
```
img_20220830_204745.jpg
img-20220828-wa0094.jpg
img-20220828-wa0093.jpg
img-20220828-wa0096.jpg
img-20220828-wa0100.jpg
img-20220828-wa0099.jpg
img-20220828-wa0078.jpg
img-20220828-wa0103.jpg
img-20220828-wa0081.jpg
img-20220828-wa0084.jpg
img-20220828-wa0086.jpg
img-20220828-wa0073.jpg
img-20220828-wa0075.jpg
img-20220828-wa0058.jpg
img-20220828-wa0056.jpg
img-20220828-wa0066.jpg
img-20220828-wa0041.jpg
img-20220828-wa0061.jpg
img-20220828-wa0062.jpg
img-20220828-wa0050.jpg
img-20220828-wa0051.jpg
img-20220828-wa0059.jpg
img-20220828-wa0042.jpg
img-20220828-wa0048.jpg
img-20220828-wa0035.jpg
img-20220828-wa0036.jpg
img-20220828-wa0046.jpg
img-20220828-wa0044.jpg
img-20220828-wa0052.jpg
img-20220828-wa0030.jpg
img-20220828-wa0014.jpg
img-20220828-wa0034.jpg
img-20220828-wa0001.jpg
img-20220828-wa0017.jpg
img-20220828-wa0020.jpg
img-20220828-wa0019.jpg
img-20220828-wa0027.jpg
img-20220828-wa0015.jpg
img-20220828-wa0009.jpg
img-20220828-wa0016.jpg
img-20220828-wa0023.jpg
img-20220828-wa0013.jpg
1661109220262.jpg
```

Under `2023/09/`:
```
1000134161.jpg
1000134162.jpg
1000134160.jpg
1000134158.jpg
1000134159.jpg
1000134157.jpg
1000134156.jpg
1000134179.jpg
1000134154.jpg
1000134176.jpg
1000134155.jpg
1000134177.jpg
1000134174.jpg
1000134175.jpg
1000134373.jpg
1000134172.jpg
1000134173.jpg
1000134170.jpg
1000134171.jpg
img_20230912_082349.jpg
dsc_0004.jpg
img_1132.jpg
img-20230914-wa0020.jpg
img-20230914-wa0021.jpg
img-20230914-wa0015.jpg
img-20230914-wa0016.jpg
img20230915214020.jpg
img20230915214018.jpg
screenshot_2023-09-16-09-45-26-904_com.facebook.katana.png
screenshot_2023-09-16-09-44-02-426_com.facebook.katana.png
screenshot_2023-09-16-09-45-07-138_com.facebook.katana.png
screenshot_2023-09-16-09-45-41-653_com.facebook.katana.png
screenshot_2023-09-16-09-44-48-130_com.facebook.katana.png
screenshot_2023-09-16-09-42-35-710_com.facebook.katana.png
screenshot_2023-09-16-09-42-09-361_com.facebook.katana.png
fb_img_1694837240358.jpg
```

---

### 8. Mobile-first requirements (this is the primary device — treat it that way, not as an afterthought)

- Design at a 375–390px viewport first, then scale up.
- Hamburger nav on mobile with large tap targets (min 44px).
- Gallery: lazy-load images below the fold (native `loading="lazy"` via `next/image` is enough), and paginate or "Load more" the ~130-image gallery in batches of ~20–30 rather than rendering all at once — this matters a lot on mobile data/CPU.
- Serve appropriately sized images per breakpoint via `next/image`'s `sizes` prop — don't ship a 1024px-wide image to a 180px mobile thumbnail.
- Test that YouTube/WordPress video iframes are responsive (16:9 wrapper, no fixed pixel widths).
- Keep total JS bundle lean — this is a content site, it shouldn't need heavy client-side hydration for anything except the lightbox/carousel/mobile nav.

---

### 9. Deployment (Vercel)

- Must build and deploy on Vercel with zero extra configuration — standard `next build`, no custom server.
- No environment variables required for the base site to function (no CMS/API keys needed since content is local data files).
- Confirm `next.config.js` doesn't need `images.domains`/`remotePatterns` for the WordPress source once images are self-hosted in `/public` (they should be, per §6 — don't hotlink WordPress.com in production).
- Add basic `metadata` (title, description, Open Graph image using the logo) matching the original site's meta so shared links still look right.

---

### 10. Acceptance checklist (build against this before calling it done)

- [ ] Every image in §7 either renders correctly or shows the defined placeholder (none silently missing, none crashing the build).
- [ ] Site is entirely in Marathi (Devanagari), no content translated to English.
- [ ] All named leadership entries show correct name + role; no मार्गदर्शक/विशेष सहकार्य entries have invented names.
- [ ] Site is usable one-handed on a 375px-wide phone: nav, gallery lightbox, video embeds all work.
- [ ] Lighthouse mobile performance is reasonable despite the 130+ photo gallery (lazy loading / pagination in place).
- [ ] `next build` succeeds and deploys cleanly to Vercel with no required env vars.
- [ ] Visual design uses the mandal's own photography and a saffron/cultural palette — not a generic SaaS template look.
