export enum City {
  BEIJING = 'beijing',
  SHANGHAI = 'shanghai',
  GUANGZHOU = 'guangzhou',
  HANGZHOU = 'hangzhou',
  CHENGDU = 'chengdu',
}

export enum MedicalType {
  DENTAL = 'dental',
  CHECKUP = 'checkup',
  TCM = 'tcm',
  SPECIALIST = 'specialist',
  EMERGENCY = 'emergency',
}

export enum BudgetRange {
  BUDGET = 'budget',
  MODERATE = 'moderate',
  PREMIUM = 'premium',
}

export interface QuestionnaireData {
  city: City | null;
  medicalType: MedicalType | null;
  travelDates: {
    arrival: string;
    departure: string;
  };
  budgetRange: BudgetRange | null;
  specificNeeds: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameChinese: string;
  specialties: string[];
  rating: number;
  jciCertified: boolean;
  internationalDepartment: boolean;
  imageUrl: string;
}

export interface Attraction {
  name: string;
  nameChinese: string;
  category: string;
  description: string;
  duration: string;
  imageUrl?: string;
}

export interface FoodSuggestion {
  name: string;
  category: string;
  description: string;
  priceRange: string;
  mustTry: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  imageUrl?: string;
}

export interface GuideContent {
  title: string;
  subtitle: string;
  overview: string;
  heroImage?: string;
  hospitals: Hospital[];
  beforeYouDepart: {
    visa: string;
    simCard: string;
    vpn: string;
    paymentApps: string;
    currency: string;
    powerAdapter: string;
    travelInsurance: string;
    documents: string;
    appsToDownload: string;
  };
  paymentAndMoney: {
    cardUsage: string;
    settingUpAlipay: string;
    settingUpWeChat: string;
    cashAndAtms: string;
    foreignerFees: string;
    talkingPayment: string;
  };
  medicalVisit: {
    registration: string;
    interpreter: string;
    paymentAtHospital: string;
    records: string;
    pharmacy: string;
    englishSupport: string;
  };
  process: {
    step: number;
    title: string;
    description: string;
    tips: string[];
    duration: string;
  }[];
  costs: {
    service: string;
    minCost: number;
    maxCost: number;
    currency: string;
  }[];
  transportation: {
    fromAirport: string;
    metro: string;
    didi: string;
    taxiRide: string;
    hotelArrival: string;
    estimatedCost: string;
  };
  attractions: Attraction[];
  food: FoodSuggestion[];
  itinerary: ItineraryDay[];
  images: string[];
  tips: string[];
  emergencyContacts: {
    name: string;
    number: string;
    description: string;
  }[];
}

export interface CityData {
  id: City;
  name: string;
  nameChinese: string;
  description: string;
  imageUrl: string;
}
