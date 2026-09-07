import { City, CityData, MedicalType } from '../types';

export const CITIES: CityData[] = [
  {
    id: City.BEIJING,
    name: 'Beijing',
    nameChinese: '北京',
    description: "China's capital with world-class hospitals",
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
  },
  {
    id: City.SHANGHAI,
    name: 'Shanghai',
    nameChinese: '上海',
    description: "China's medical hub with international hospitals",
    imageUrl: 'https://images.unsplash.com/photo-1537531383496-f4749b885795?w=800',
  },
  {
    id: City.GUANGZHOU,
    name: 'Guangzhou',
    nameChinese: '广州',
    description: "Southern China's medical center",
    imageUrl: 'https://images.unsplash.com/photo-1583243567239-381c00e4d106?w=800',
  },
  {
    id: City.HANGZHOU,
    name: 'Hangzhou',
    nameChinese: '杭州',
    description: 'Beautiful city for TCM and wellness',
    imageUrl: 'https://images.unsplash.com/photo-1598887142487-3c854d51eabb?w=800',
  },
  {
    id: City.CHENGDU,
    name: 'Chengdu',
    nameChinese: '成都',
    description: "Western China's medical hub",
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
  },
];

export const MEDICAL_TYPES = [
  { id: MedicalType.DENTAL, label: 'Dental', icon: '🦷', description: 'Dental checkup, cleaning, or treatment' },
  { id: MedicalType.CHECKUP, label: 'Health Checkup', icon: '💓', description: 'Comprehensive health screening' },
  { id: MedicalType.TCM, label: 'Traditional Chinese Medicine', icon: '🌿', description: 'Acupuncture, herbal medicine, TCM therapy' },
  { id: MedicalType.SPECIALIST, label: 'Specialist Visit', icon: '🩺', description: 'See a specialist doctor' },
  { id: MedicalType.EMERGENCY, label: 'Emergency', icon: '🚑', description: 'Urgent medical care needed' },
];

export const BUDGET_RANGES = [
  { id: 'budget', label: 'Budget-Friendly', description: 'Public hospitals, basic care' },
  { id: 'moderate', label: 'Moderate', description: 'Good balance of quality and cost' },
  { id: 'premium', label: 'Premium', description: 'Private hospitals, VIP services' },
];

export const HOSPITALS = [
  {
    id: '1',
    name: 'Huashan Hospital',
    nameChinese: '华山医院',
    specialties: ['Neurosurgery', 'Dermatology'],
    rating: 4.8,
    jciCertified: true,
    internationalDepartment: true,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
  },
  {
    id: '2',
    name: 'Ruijin Hospital',
    nameChinese: '瑞金医院',
    specialties: ['Hematology', 'Cardiology'],
    rating: 4.7,
    jciCertified: false,
    internationalDepartment: true,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
  },
];
