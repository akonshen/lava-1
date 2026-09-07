import { City, CityData } from '../types';

export const CITIES: CityData[] = [
  {
    id: City.BEIJING,
    name: 'Beijing',
    nameChinese: '北京',
    description: "China's capital with world-class hospitals and cutting-edge medical technology",
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    majorHospitals: [
      'Peking Union Medical College Hospital',
      'Peking University People\'s Hospital',
      'Beijing Hospital',
    ],
    specialties: ['Oncology', 'Cardiology', 'Orthopedics', 'TCM'],
    averageCosts: {
      mri: '¥600-1000',
      ct: '¥300-600',
      checkup: '¥1500-3000',
    },
  },
  {
    id: City.SHANGHAI,
    name: 'Shanghai',
    nameChinese: '上海',
    description: "China's medical hub with the highest concentration of international hospitals",
    imageUrl: 'https://images.unsplash.com/photo-1537531383496-f4749b885795?w=800',
    majorHospitals: [
      'Huashan Hospital',
      'Ruijin Hospital',
      'Shanghai Ninth People\'s Hospital',
    ],
    specialties: ['Neurosurgery', 'Plastic Surgery', 'Oncology'],
    averageCosts: {
      mri: '¥500-900',
      ct: '¥250-500',
      checkup: '¥1200-2500',
    },
  },
  {
    id: City.GUANGZHOU,
    name: 'Guangzhou',
    nameChinese: '广州',
    description: "Southern China's medical center with excellent TCM facilities",
    imageUrl: 'https://images.unsplash.com/photo-1583243567239-381c00e4d106?w=800',
    majorHospitals: [
      'The First Affiliated Hospital of Sun Yat-sen University',
      'Guangzhou University of Chinese Medicine Affiliated Hospital',
    ],
    specialties: ['Oncology', 'TCM', 'Rehabilitation'],
    averageCosts: {
      mri: '¥450-800',
      ct: '¥200-450',
      checkup: '¥1000-2000',
    },
  },
  {
    id: City.HANGZHOU,
    name: 'Hangzhou',
    nameChinese: '杭州',
    description: 'Beautiful city renowned for Traditional Chinese Medicine and wellness',
    imageUrl: 'https://images.unsplash.com/photo-1598887142487-3c854d51eabb?w=800',
    majorHospitals: [
      'Zhejiang University School of Medicine Affiliated First Hospital',
      'Hangzhou First People\'s Hospital',
    ],
    specialties: ['TCM', 'Dermatology', 'Ophthalmology'],
    averageCosts: {
      mri: '¥400-700',
      ct: '¥180-400',
      checkup: '¥800-1800',
    },
  },
  {
    id: City.CHENGDU,
    name: 'Chengdu',
    nameChinese: '成都',
    description: "Western China's medical hub with a rich Traditional Chinese Medicine heritage",
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
    majorHospitals: [
      'West China Hospital of Sichuan University',
      'Chengdu University of Traditional Chinese Medicine Affiliated Hospital',
    ],
    specialties: ['Orthopedics', 'TCM', 'Rehabilitation'],
    averageCosts: {
      mri: '¥350-650',
      ct: '¥150-350',
      checkup: '¥700-1500',
    },
  },
];

export const getCityById = (id: City): CityData | undefined => {
  return CITIES.find((city) => city.id === id);
};

export const MEDICAL_TYPES = [
  { id: 'dental', label: 'Dental', icon: 'tooth', description: 'Dental checkup, cleaning, or treatment' },
  { id: 'checkup', label: 'Health Checkup', icon: 'heart-pulse', description: 'Comprehensive health screening' },
  { id: 'tcm', label: 'Traditional Chinese Medicine', icon: 'leaf', description: 'Acupuncture, herbal medicine, TCM therapy' },
  { id: 'specialist', label: 'Specialist Visit', icon: 'stethoscope', description: 'See a specialist doctor' },
  { id: 'emergency', label: 'Emergency', icon: 'ambulance', description: 'Urgent medical care needed' },
];

export const BUDGET_RANGES = [
  { id: 'budget', label: 'Budget-Friendly', description: 'Public hospitals, basic care' },
  { id: 'moderate', label: 'Moderate', description: 'Good balance of quality and cost' },
  { id: 'premium', label: 'Premium', description: 'Private hospitals, VIP services' },
];

export const EMERGENCY_CONTACTS = {
  police: { number: '110', name: 'Police' },
  ambulance: { number: '120', name: 'Ambulance' },
  fire: { number: '119', name: 'Fire' },
  touristHotline: { number: '12301', name: 'Tourist Hotline' },
};
