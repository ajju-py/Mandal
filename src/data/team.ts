export interface TeamMember {
  id: string;
  name?: string;
  names?: string[];
  role: string;
  image: string;
  photo?: string;
  isMemorial?: boolean;
  memorialNote?: string;
  badge?: string;
  objectPosition?: string;
  scale?: number;
}

export const leadershipTeam: TeamMember[] = [
  {
    id: "01_kalyan_aute",
    name: "कल्याण औटे",
    role: "मंडळ ट्रस्ट अध्यक्ष",
    image: "/images/people/leadership/01_kalyan_aute.png",
    photo: "/images/people/leadership/01_kalyan_aute.png",
    badge: "ट्रस्ट अध्यक्ष",
    objectPosition: "center 10%",
    scale: 1.0,
  },
  {
    id: "02_avinash_kulkarni",
    name: "अविनाश कुलकर्णी",
    role: "संस्थापक अध्यक्ष",
    image: "/images/people/leadership/02_avinash_kulkarni.png",
    photo: "/images/people/leadership/02_avinash_kulkarni.png",
    badge: "संस्थापक",
    objectPosition: "center 8%",
    scale: 1.0,
  },
  {
    id: "03_manoj_kulkarni",
    name: "मनोज कुलकर्णी",
    role: "संस्थापक अध्यक्ष",
    image: "/images/people/leadership/03_manoj_kulkarni.png",
    photo: "/images/people/leadership/03_manoj_kulkarni.png",
    badge: "संस्थापक",
    objectPosition: "center 10%",
    scale: 1.0,
  },
  {
    id: "04_vijay_tandale",
    name: "विजय तांदळे",
    role: "मंडळ सचिव",
    image: "/images/people/leadership/04_vijay_tandale.png",
    photo: "/images/people/leadership/04_vijay_tandale.png",
    objectPosition: "center 12%",
    scale: 1.1,
  },
  {
    id: "05_chandrakant_salunke",
    name: "चंद्रकांत साळुंके",
    role: "मंडळ संघटक",
    image: "/images/people/leadership/05_chandrakant_salunke.png",
    photo: "/images/people/leadership/05_chandrakant_salunke.png",
    objectPosition: "center 14%",
    scale: 1.12,
  },
  {
    id: "06_laxman_anna_thorat",
    name: "कै. लक्ष्मण अण्णा थोरात",
    role: "प्रेरणा स्थान",
    image: "/images/people/leadership/06_laxman_anna_thorat.png",
    photo: "/images/people/leadership/06_laxman_anna_thorat.png",
    isMemorial: true,
    memorialNote: "आदरणीय स्मृती व अखंड प्रेरणा स्थान",
    badge: "प्रेरणा स्थान",
    objectPosition: "center 3%",
    scale: 1.0,
  },
  {
    id: "07_somnath_bhau_bombale",
    name: "सोमनाथ भाऊ बोंबले",
    role: "मंडळ संघटक",
    image: "/images/people/leadership/07_somnath_bhau_bombale.png",
    photo: "/images/people/leadership/07_somnath_bhau_bombale.png",
    objectPosition: "center 10%",
    scale: 1.0,
  },
  {
    id: "08_sunil_shankh",
    name: "सुनील शंख",
    role: "मंडळ संघटक",
    image: "/images/people/leadership/08_sunil_shankh.png",
    photo: "/images/people/leadership/08_sunil_shankh.png",
    objectPosition: "center 6%",
    scale: 1.0,
  },
  {
    id: "09_prakash_kadwade",
    name: "प्रकाश काडवदे",
    role: "मंडळ संघटक",
    image: "/images/people/leadership/09_prakash_kadwade.png",
    photo: "/images/people/leadership/09_prakash_kadwade.png",
    objectPosition: "center 10%",
    scale: 1.0,
  },
  {
    id: "10_nitin_kamble",
    name: "नितीन कांबळे",
    role: "मंडळ संपर्क प्रमुख",
    image: "/images/people/leadership/10_nitin_kamble.png",
    photo: "/images/people/leadership/10_nitin_kamble.png",
    objectPosition: "center 10%",
    scale: 1.0,
  },
  {
    id: "11_datta_devkar",
    name: "दत्ता देवकर",
    role: "मंडळ संपर्क प्रमुख",
    image: "/images/people/leadership/11_datta_devkar.png",
    photo: "/images/people/leadership/11_datta_devkar.png",
    objectPosition: "center 12%",
    scale: 1.0,
  },
  {
    id: "12_sushil_satdive_mangesh_thorat",
    names: ["सुशील सातदिवे", "मंगेश थोरात"],
    role: "मंडळ ढोल ताशा गट पथक प्रमुख",
    image: "/images/people/leadership/12_sushil_satdive_mangesh_thorat.png",
    photo: "/images/people/leadership/12_sushil_satdive_mangesh_thorat.png",
    badge: "ढोल ताशा पथक प्रमुख",
    objectPosition: "center 8%",
    scale: 1.0,
  },
];
