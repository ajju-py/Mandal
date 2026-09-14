export interface MentorItem {
  id: string;
  image: string;
  photo?: string;
  name?: string;
  roleTitle: string;
}

export const specialCooperationList: MentorItem[] = [
  {
    id: "special_cooperation_01",
    image: "/images/people/special-cooperation/special_cooperation_01.png",
    photo: "/images/people/special-cooperation/special_cooperation_01.png",
    roleTitle: "विशेष सहकार्य",
  },
  {
    id: "special_cooperation_02",
    image: "/images/people/special-cooperation/special_cooperation_02.jpg",
    photo: "/images/people/special-cooperation/special_cooperation_02.jpg",
    roleTitle: "विशेष सहकार्य",
  },
  {
    id: "special_cooperation_03",
    image: "/images/people/special-cooperation/special_cooperation_03.png",
    photo: "/images/people/special-cooperation/special_cooperation_03.png",
    roleTitle: "विशेष सहकार्य",
  },
];

// Authoritative list of 32 mentors under /images/people/mentors/
export const mentorsList: MentorItem[] = Array.from({ length: 32 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  const filename = `mentor_${num}.jpg`;
  return {
    id: `mentor_${num}`,
    image: `/images/people/mentors/${filename}`,
    photo: `/images/people/mentors/${filename}`,
    roleTitle: "मार्गदर्शक",
  };
});
