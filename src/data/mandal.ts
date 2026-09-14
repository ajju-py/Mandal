export interface MandalInfo {
  name: string;
  tagline: string;
  shortName: string;
  establishedYear: number;
  establishedMarathi: string;
  address: string;
  city: string;
  pincode?: string;
  description: string;
  social: {
    youtube: string;
    telegram: string;
    instagram: string;
  };
  contact: {
    addressMarathi: string;
    instagramHandle: string;
    telegramHandle: string;
    youtubeHandle: string;
  };
}

export const mandalData: MandalInfo = {
  name: "धर्मवीर संभाजी क्रीडा मंडळ",
  tagline: "भगवं वादळ",
  shortName: "भगवं वादळ",
  establishedYear: 1991,
  establishedMarathi: "१९९१",
  address: "एन - ६ सिडको, ई सेक्टर, छत्रपती संभाजीनगर",
  city: "छत्रपती संभाजीनगर",
  description: "छत्रपती संभाजीनगरमधील मानाचा गणेशोत्सव आणि प्रख्यात ढोल ताशा पथक. अखंड भक्ती, परंपरा आणि सामाजिक ऐक्य.",
  social: {
    youtube: "https://youtube.com/@bhgvvadal",
    telegram: "https://t.me/bhgvvadal",
    instagram: "https://instagram.com/bhgv__vadal",
  },
  contact: {
    addressMarathi: "एन - ६ सिडको, ई सेक्टर, छत्रपती संभाजीनगर, महाराष्ट्र",
    instagramHandle: "@bhgv__vadal",
    telegramHandle: "@bhgvvadal",
    youtubeHandle: "@bhgvvadal",
  },
};

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const navItems: NavItem[] = [
  { label: "मुख्यपृष्ठ", href: "/" },
  { label: "आमच्याबद्दल", href: "/#about" },
  { label: "मंडळ परिवार", href: "/#team" },
  { label: "मार्गदर्शक", href: "/#mentors" },
  { label: "व्हिडिओ व आठवणी", href: "/#media" },
  { label: "गॅलरी", href: "/gallery" },
];
