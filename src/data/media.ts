export interface HistoricalPhoto {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  photo: string;
  year: string;
  isFoundingArtifact?: boolean;
}

export interface VideoEmbed {
  id: string;
  title: string;
  year?: string;
  type: "youtube" | "wordpress";
  embedUrl: string;
  videoId: string;
  thumbnail?: string;
  note?: string;
}

export const foundingArtifact: HistoricalPhoto = {
  id: "founding-1991",
  title: "१९९१ चा भगवं वादळ पहिला फोटो",
  subtitle: "मंडळाची ऐतिहासिक सुरवात",
  description: "१९९१ मधील मंडळाचा पहिला ऐतिहासिक फोटो. सिडको एन-६ येथे सुरू झालेला हा प्रवास आज अखंड भक्ती आणि परंपरेचे दीपस्तंभ बनला आहे.",
  photo: "/images/history/founding-1991-first-photo.jpg",
  year: "१९९१",
  isFoundingArtifact: true,
};

export const historicalPhotos: HistoricalPhoto[] = [
  {
    id: "vadyapujan-2022",
    title: "वद्यपूजन २०२२",
    subtitle: "ढोल ताशा वाद्यपूजन सोहळा",
    photo: "/images/history/vadyapujan-2022.jpg",
    year: "२०२२",
  },
];

export const mandalVideos: VideoEmbed[] = [
  {
    id: "vadyapujan-2024",
    title: "वद्यपूजन २०२४",
    year: "२०२४",
    type: "wordpress",
    embedUrl: "https://video.wordpress.com/embed/t6TKappg",
    videoId: "t6TKappg",
    note: "ढोल ताशा पथक वाद्यपूजन सोहळा",
  },
  {
    id: "vadyapujan-2023",
    title: "वद्यपूजन २०२३",
    year: "२०२३",
    type: "wordpress",
    embedUrl: "https://video.wordpress.com/embed/KizTL0iU",
    videoId: "KizTL0iU",
    note: "ढोल ताशा पथक वाद्यपूजन सोहळा",
  },
  {
    id: "yt-1",
    title: "भगवं वादळ ढोल ताशा पथक वादन",
    type: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/Ydu3i3PrxVQ",
    videoId: "Ydu3i3PrxVQ",
  },
  {
    id: "yt-2",
    title: "गणेशोत्सव मिरवणूक - भगवं वादळ",
    type: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/sAIonD8HHz8",
    videoId: "sAIonD8HHz8",
  },
  {
    id: "yt-3",
    title: "छत्रपती संभाजीनगर गणेशोत्सव वादन",
    type: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/Xff3XQ4Tq6c",
    videoId: "Xff3XQ4Tq6c",
  },
];

export const instagramInfo = {
  handle: "@bhgv__vadal",
  profileUrl: "https://instagram.com/bhgv__vadal",
  title: "Instagram Reels & Posts",
  description: "आमच्या अधिकृत इंस्टाग्राम पेजवर दररोजचे अपडेट्स, रील्स आणि मिरवणुकीचे थेट व्हिडिओ पाहा.",
};
