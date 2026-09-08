export interface MentorItem {
  id: string;
  photo: string;
  name?: string; // TODO: get name from client if needed; do NOT fabricate names
  roleTitle: string;
}

export const specialCooperationList: MentorItem[] = [
  {
    id: "coop-1",
    photo: "/images/special-cooperation/coop-1.jpg",
    name: undefined, // TODO: get name from client
    roleTitle: "विशेष सहकार्य",
  },
  {
    id: "coop-2",
    photo: "/images/special-cooperation/coop-2.jpg",
    name: undefined, // TODO: get name from client
    roleTitle: "विशेष सहकार्य",
  },
  {
    id: "coop-3",
    photo: "/images/special-cooperation/coop-3.jpg",
    name: undefined, // TODO: get name from client
    roleTitle: "विशेष सहकार्य",
  },
];

// Manifest of 32 mentors from the original WordPress site
export const mentorsList: MentorItem[] = [
  { id: "mentor-01", photo: "/images/mentors/mentor-01.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-02", photo: "/images/mentors/mentor-02.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-03", photo: "/images/mentors/mentor-03.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-04", photo: "/images/mentors/mentor-04.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-05", photo: "/images/mentors/mentor-05.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-06", photo: "/images/mentors/mentor-06.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-07", photo: "/images/mentors/mentor-07.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-08", photo: "/images/mentors/mentor-08.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-09", photo: "/images/mentors/mentor-09.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-10", photo: "/images/mentors/mentor-10.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-11", photo: "/images/mentors/mentor-11.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-12", photo: "/images/mentors/mentor-12.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-13", photo: "/images/mentors/mentor-13.webp", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-14", photo: "/images/mentors/mentor-14.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-15", photo: "/images/mentors/mentor-15.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-16", photo: "/images/mentors/mentor-16.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-17", photo: "/images/mentors/mentor-17.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-18", photo: "/images/mentors/mentor-18.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-19", photo: "/images/mentors/mentor-19.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-20", photo: "/images/mentors/mentor-20.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-21", photo: "/images/mentors/mentor-21.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-22", photo: "/images/mentors/mentor-22.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-23", photo: "/images/mentors/mentor-23.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-24", photo: "/images/mentors/mentor-24.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-25", photo: "/images/mentors/mentor-25.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-26", photo: "/images/mentors/mentor-26.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-27", photo: "/images/mentors/mentor-27.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-28", photo: "/images/mentors/mentor-28.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-29", photo: "/images/mentors/mentor-29.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-30", photo: "/images/mentors/mentor-30.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-31", photo: "/images/mentors/mentor-31.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
  { id: "mentor-32", photo: "/images/mentors/mentor-32.jpg", name: undefined, roleTitle: "मार्गदर्शक" },
];
