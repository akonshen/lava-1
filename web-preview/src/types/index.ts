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

export interface GuideContent {
  title: string;
  overview: string;
  hospitals: Hospital[];
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
    toHospital: string;
    publicTransit: string;
    taxiRide: string;
    estimatedCost: string;
  };
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
