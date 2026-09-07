import { create } from 'zustand';
import { City, MedicalType, BudgetRange, Language, GuideStatus, Guide, TravelDates } from '../types';

interface QuestionnaireState {
  // Current step
  currentStep: number;
  totalSteps: number;
  
  // Form data
  city: City | null;
  travelDates: TravelDates;
  medicalType: MedicalType | null;
  budgetRange: BudgetRange | null;
  specificNeeds: string;
  medicalHistory: string;
  insurance: string;
  languagePreference: Language;
  specialRequirements: string;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCity: (city: City) => void;
  setTravelDates: (dates: TravelDates) => void;
  setMedicalType: (type: MedicalType) => void;
  setBudgetRange: (range: BudgetRange) => void;
  setSpecificNeeds: (needs: string) => void;
  setMedicalHistory: (history: string) => void;
  setInsurance: (insurance: string) => void;
  setLanguagePreference: (lang: Language) => void;
  setSpecialRequirements: (req: string) => void;
  reset: () => void;
  canProceed: () => boolean;
}

const initialState = {
  currentStep: 1,
  totalSteps: 4,
  city: null,
  travelDates: {
    arrival: '',
    departure: '',
  },
  medicalType: null,
  budgetRange: null,
  specificNeeds: '',
  medicalHistory: '',
  insurance: '',
  languagePreference: Language.ENGLISH,
  specialRequirements: '',
};

export const useQuestionnaireStore = create<QuestionnaireState>((set, get) => ({
  ...initialState,
  
  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps),
  })),
  
  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 1),
  })),
  
  setCity: (city) => set({ city }),
  
  setTravelDates: (dates) => set({ travelDates: dates }),
  
  setMedicalType: (type) => set({ medicalType: type }),
  
  setBudgetRange: (range) => set({ budgetRange: range }),
  
  setSpecificNeeds: (needs) => set({ specificNeeds: needs }),
  
  setMedicalHistory: (history) => set({ medicalHistory: history }),
  
  setInsurance: (insurance) => set({ insurance }),
  
  setLanguagePreference: (lang) => set({ languagePreference: lang }),
  
  setSpecialRequirements: (req) => set({ specialRequirements: req }),
  
  reset: () => set(initialState),
  
  canProceed: () => {
    const state = get();
    switch (state.currentStep) {
      case 1:
        return state.city !== null;
      case 2:
        return state.medicalType !== null;
      case 3:
        return state.travelDates.arrival !== '' && state.travelDates.departure !== '';
      case 4:
        return state.budgetRange !== null;
      default:
        return false;
    }
  },
}));

interface GuideState {
  // Current guide
  currentGuide: Guide | null;
  guides: Guide[];
  isGenerating: boolean;
  error: string | null;
  
  // Actions
  setCurrentGuide: (guide: Guide | null) => void;
  addGuide: (guide: Guide) => void;
  updateGuide: (id: string, updates: Partial<Guide>) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  currentGuide: null,
  guides: [],
  isGenerating: false,
  error: null,
  
  setCurrentGuide: (guide) => set({ currentGuide: guide }),
  
  addGuide: (guide) => set((state) => ({
    guides: [guide, ...state.guides],
    currentGuide: guide,
  })),
  
  updateGuide: (id, updates) => set((state) => ({
    guides: state.guides.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    currentGuide: state.currentGuide?.id === id
      ? { ...state.currentGuide, ...updates }
      : state.currentGuide,
  })),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  setError: (error) => set({ error }),
}));

interface AppState {
  // User state
  isLoggedIn: boolean;
  userId: string | null;
  
  // Settings
  isDarkMode: boolean;
  language: string;
  
  // Actions
  setLoggedIn: (isLoggedIn: boolean) => void;
  setUserId: (userId: string | null) => void;
  toggleDarkMode: () => void;
  setLanguage: (language: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: false,
  userId: null,
  isDarkMode: false,
  language: 'en',
  
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  
  setUserId: (userId) => set({ userId }),
  
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  setLanguage: (language) => set({ language }),
}));
