export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  isMemorial?: boolean;
  memorialNote?: string;
  badge?: string;
}

export const leadershipTeam: TeamMember[] = [
  {
    id: "kalyan-aute",
    name: "कल्याण औटे",
    role: "मंडळ ट्रस्ट अध्यक्ष",
    photo: "/images/leadership/kalyan-aute.jpg",
    badge: "ट्रस्ट अध्यक्ष",
  },
  {
    id: "avinash-kulkarni",
    name: "अविनाश कुलकर्णी",
    role: "संस्थापक अध्यक्ष",
    photo: "/images/leadership/avinash-kulkarni.jpg",
    badge: "संस्थापक",
  },
  {
    id: "manoj-kulkarni",
    name: "मनोज कुलकर्णी",
    role: "संस्थापक अध्यक्ष",
    photo: "/images/leadership/manoj-kulkarni.jpg",
    badge: "संस्थापक",
  },
  {
    id: "vijay-tandale",
    name: "विजय तांदळे",
    role: "मंडळ सचिव",
    photo: "/images/leadership/vijay-tandale.jpg",
  },
  {
    id: "chandrakant-salunke",
    name: "चंद्रकांत साळुंके",
    role: "मंडळ संघटक",
    photo: "/images/leadership/chandrakant-salunke.jpg",
  },
  {
    id: "laxman-anna-thorat",
    name: "कै. लक्ष्मण अण्णा थोरात",
    role: "प्रेरणा स्थान",
    photo: "/images/leadership/laxman-anna-thorat.jpg",
    isMemorial: true,
    memorialNote: "आदरणीय स्मृती व अखंड प्रेरणा स्थान",
    badge: "प्रेरणा स्थान",
  },
  {
    id: "somnath-bhau-bomble",
    name: "सोमनाथ भाऊ बोंबले",
    role: "मंडळ संघटक",
    photo: "/images/leadership/somnath-bhau-bomble.jpg",
  },
  {
    id: "sunil-shankh",
    name: "सुनील शंख",
    role: "मंडळ संघटक",
    photo: "/images/leadership/sunil-shankh.jpg",
  },
  {
    id: "prakash-kadwade",
    name: "प्रकाश काडवादे",
    role: "मंडळ संघटक",
    photo: "/images/leadership/prakash-kadwade.jpg",
  },
  {
    id: "nitin-kamble",
    name: "नितीन कांबळे",
    role: "मंडळ संपर्क प्रमुख",
    photo: "/images/leadership/nitin-kamble.jpg",
  },
  {
    id: "datta-devkar",
    name: "दत्ता देवकर",
    role: "मंडळ संपर्क प्रमुख",
    photo: "/images/leadership/datta-devkar.jpg",
  },
  {
    id: "sushil-satdive-mangesh-thora",
    name: "सुशील सातदिवे || मंगेश थोरा",
    role: "मंडळ ढोल ताशा गट पथक प्रमुख",
    photo: "/images/leadership/sushil-satdive-mangesh-thora.jpg",
    badge: "ढोल ताशा पथक प्रमुख",
  },
];
