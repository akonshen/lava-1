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
  process: ProcessStep[];
  costs: CostEstimate[];
  transportation: TransportationInfo;
  accommodation: AccommodationSuggestion[];
  attractions: Attraction[];
  food: FoodSuggestion[];
  itinerary: ItineraryDay[];
  images: string[];
  tips: string[];
  culturalNotes?: string[];
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
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

export interface Payment {
  id: string;
  userId: string;
  guideId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  stripePaymentId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateGuideRequest {
  questionnaireData: QuestionnaireData;
}

export interface CreatePaymentRequest {
  guideId: string;
  paymentMethod: 'apple' | 'google' | 'card';
}
