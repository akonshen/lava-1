import { create } from 'zustand';
import { City, MedicalType, BudgetRange, QuestionnaireData, GuideContent } from '../types';

interface AppStore {
  // Questionnaire
  currentStep: number;
  questionnaire: QuestionnaireData;
  
  // Guide
  isGenerating: boolean;
  guideContent: GuideContent | null;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCity: (city: City) => void;
  setMedicalType: (type: MedicalType) => void;
  setTravelDates: (dates: { arrival: string; departure: string }) => void;
  setBudgetRange: (range: BudgetRange) => void;
  setSpecificNeeds: (needs: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGuideContent: (content: GuideContent | null) => void;
  reset: () => void;
}

const initialQuestionnaire: QuestionnaireData = {
  city: null,
  medicalType: null,
  travelDates: {
    arrival: '',
    departure: '',
  },
  budgetRange: null,
  specificNeeds: '',
};

export const useAppStore = create<AppStore>((set) => ({
  currentStep: 1,
  questionnaire: initialQuestionnaire,
  isGenerating: false,
  guideContent: null,
  
  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  
  setCity: (city) => set((state) => ({
    questionnaire: { ...state.questionnaire, city },
  })),
  
  setMedicalType: (type) => set((state) => ({
    questionnaire: { ...state.questionnaire, medicalType: type },
  })),
  
  setTravelDates: (dates) => set((state) => ({
    questionnaire: { ...state.questionnaire, travelDates: dates },
  })),
  
  setBudgetRange: (range) => set((state) => ({
    questionnaire: { ...state.questionnaire, budgetRange: range },
  })),
  
  setSpecificNeeds: (needs) => set((state) => ({
    questionnaire: { ...state.questionnaire, specificNeeds: needs },
  })),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  setGuideContent: (content) => set({ guideContent: content }),
  
  reset: () => set({
    currentStep: 1,
    questionnaire: initialQuestionnaire,
    isGenerating: false,
    guideContent: null,
  }),
}));
