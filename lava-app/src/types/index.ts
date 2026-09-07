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

export enum Language {
  ENGLISH = 'english',
  SPANISH = 'spanish',
  FRENCH = 'french',
  GERMAN = 'german',
}

export enum GuideStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TravelDates {
  arrival: string;
  departure: string;
}

export interface QuestionnaireData {
  city: City;
  travelDates: TravelDates;
  medicalType: MedicalType;
  budgetRange: BudgetRange;
  specificNeeds?: string;
  medicalHistory?: string;
  insurance?: string;
  languagePreference: Language;
  specialRequirements?: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameChinese: string;
  address: string;
  city: City;
  specialties: string[];
  internationalDepartment: boolean;
  englishStaff: boolean;
  jciCertified: boolean;
  rating: number;
  imageUrl: string;
  description: string;
  phone: string;
  website?: string;
}

export interface CostEstimate {
  service: string;
  minCost: number;
  maxCost: number;
  currency: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  tips?: string[];
  duration?: string;
}

export interface TransportationInfo {
  fromAirport: string;
  toHospital: string;
  publicTransit: string;
  taxiRide: string;
  estimatedCost: string;
}

export interface AccommodationSuggestion {
  name: string;
  type: string;
  distance: string;
  priceRange: string;
  description: string;
}

export interface GuideContent {
  title: string;
  overview: string;
  hospitals: Hospital[];
  process: ProcessStep[];
  costs: CostEstimate[];
  transportation: TransportationInfo;
  accommodation: AccommodationSuggestion[];
  tips: string[];
  emergencyContacts: EmergencyContact[];
}

export interface Guide {
  id: string;
  userId: string;
  city: City;
  questionnaireData: QuestionnaireData;
  content?: GuideContent;
  status: GuideStatus;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
}

export interface Payment {
  id: string;
  userId: string;
  guideId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded';
  stripePaymentId: string;
  createdAt: Date;
}

export interface CityData {
  id: City;
  name: string;
  nameChinese: string;
  description: string;
  imageUrl: string;
  majorHospitals: string[];
  specialties: string[];
  averageCosts: {
    mri: string;
    ct: string;
    checkup: string;
  };
}
