export interface MentorItem {
  id: string;
  image: string;
  photo?: string;
  name?: string;
  roleTitle: string;
  objectPosition?: string;
  scale?: number;
  translateY?: string;
}

export const specialCooperationList: MentorItem[] = [
  {
    id: "special_cooperation_01",
    image: "/images/people/special-cooperation/special_cooperation_01.png",
    photo: "/images/people/special-cooperation/special_cooperation_01.png",
    roleTitle: "विशेष सहकार्य",
    objectPosition: "center 14%",
    scale: 1.0,
  },
  {
    id: "special_cooperation_02",
    image: "/images/people/special-cooperation/special_cooperation_02.jpg",
    photo: "/images/people/special-cooperation/special_cooperation_02.jpg",
    roleTitle: "विशेष सहकार्य",
    objectPosition: "center 8%",
    scale: 1.0,
  },
  {
    id: "special_cooperation_03",
    image: "/images/people/special-cooperation/special_cooperation_03.png",
    photo: "/images/people/special-cooperation/special_cooperation_03.png",
    roleTitle: "विशेष सहकार्य",
    objectPosition: "center 10%",
    scale: 1.0,
  },
  {
    id: "special_cooperation_04",
    image: "/images/people/special-cooperation/special_cooperation_04.png",
    photo: "/images/people/special-cooperation/special_cooperation_04.png",
    roleTitle: "विशेष सहकार्य",
    objectPosition: "center 10%",
    scale: 1.0,
  },
];

interface MentorFraming {
  objectPosition: string;
  scale?: number;
  translateY?: string;
}

// Individual framing calibration for all 32 mentors:
// Ensures hair, forehead, chin, and shoulders are naturally inside the circular frame with breathing room.
const mentorFramingConfig: Record<number, MentorFraming> = {
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
  33: { objectPosition: "50% 10%" },
};

// Authoritative list of 33 mentors under /images/people/mentors/
export const mentorsList: MentorItem[] = Array.from({ length: 33 }, (_, i) => {
  const numIndex = i + 1;
  const num = String(numIndex).padStart(2, "0");
  const ext = numIndex === 14 ? "png" : "jpg";
  const filename = `mentor-${num}.${ext}`;
  const framing = mentorFramingConfig[numIndex] || { objectPosition: "center 10%" };

  return {
    id: `mentor-${num}`,
    image: `/images/people/mentors/${filename}`,
    photo: `/images/people/mentors/${filename}`,
    roleTitle: "मार्गदर्शक",
    objectPosition: framing.objectPosition,
    scale: framing.scale,
    translateY: framing.translateY,
  };
});
