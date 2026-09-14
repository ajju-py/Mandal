import type { Metadata, Viewport } from "next";
import { Yatra_One, Baloo_2 } from "next/font/google";
import "./globals.css";

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-heading",
  display: "swap",
});

const baloo2 = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["devanagari", "latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FF6F00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dhrmveersambhajikridamandal.com"),
  title: "धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ) | CIDCO N-6, छत्रपती संभाजीनगर",
  description:
    "धर्मवीर संभाजी क्रीडा मंडळ व ढोल ताशा पथक (भगवं वादळ), एन – ६ सिडको, ई सेक्टर, छत्रपती संभाजीनगर. स्थापना १९९१. अखंड भक्ती, संस्कृती, ऐक्य आणि तालबद्ध गणेशोत्सव सोहळा.",
  keywords: [
    "धर्मवीर संभाजी क्रीडा मंडळ",
    "भगवं वादळ",
    "गणेशोत्सव",
    "ढोल ताशा पथक",
    "छत्रपती संभाजीनगर",
    "सिडको एन-६",
    "Ganeshotsav Mandal",
    "Dhol Tasha Pathak Sambhajinagar",
  ],
  authors: [{ name: "धर्मवीर संभाजी क्रीडा मंडळ" }],
  openGraph: {
    title: "धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ)",
    description:
      "छत्रपती संभाजीनगरमधील मानाचा गणेशोत्सव आणि प्रख्यात ढोल ताशा पथक. स्थापना १९९१. अखंड भक्ती आणि परंपरेचा ३०+ वर्षांचा वारसा.",
    url: "https://dhrmveersambhajikridamandal.com",
    siteName: "धर्मवीर संभाजी क्रीडा मंडळ",
    locale: "mr_IN",
    type: "website",
    images: [
      {
        url: "/images/branding/mandal-logo.png",
        width: 800,
        height: 800,
        alt: "धर्मवीर संभाजी क्रीडा मंडळ लोगो",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ)",
    description: "एन – ६ सिडको, ई सेक्टर, छत्रपती संभाजीनगर. स्थापना १९९१.",
    images: ["/images/branding/mandal-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mr"
      translate="no"
      className={`notranslate ${yatraOne.variable} ${baloo2.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
