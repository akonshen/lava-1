import { City, Hospital } from '../types';

export const CITY_DATA = {
  [City.BEIJING]: {
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
    climate: 'Continental climate with four distinct seasons',
    bestTimeToVisit: 'September to November',
    language: 'Mandarin Chinese (Beijing dialect)',
    currency: 'Chinese Yuan (CNY)',
    timezone: 'UTC+8',
    emergencyNumber: '120',
    airport: 'Beijing Capital International Airport (PEK)',
    publicTransport: 'Extensive subway system and buses',
  },
  [City.SHANGHAI]: {
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
    climate: 'Subtropical monsoon climate',
    bestTimeToVisit: 'March to May, September to November',
    language: 'Mandarin Chinese (Shanghai dialect)',
    currency: 'Chinese Yuan (CNY)',
    timezone: 'UTC+8',
    emergencyNumber: '120',
    airport: 'Shanghai Pudong International Airport (PVG)',
    publicTransport: 'Extensive metro system and buses',
  },
  [City.GUANGZHOU]: {
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
    climate: 'Subtropical monsoon climate',
    bestTimeToVisit: 'October to December',
    language: 'Cantonese, Mandarin Chinese',
    currency: 'Chinese Yuan (CNY)',
    timezone: 'UTC+8',
    emergencyNumber: '120',
    airport: 'Guangzhou Baiyun International Airport (CAN)',
    publicTransport: 'Metro system and buses',
  },
  [City.HANGZHOU]: {
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
    climate: 'Subtropical monsoon climate',
    bestTimeToVisit: 'March to May, September to November',
    language: 'Mandarin Chinese (Hangzhou dialect)',
    currency: 'Chinese Yuan (CNY)',
    timezone: 'UTC+8',
    emergencyNumber: '120',
    airport: 'Hangzhou Xiaoshan International Airport (HGH)',
    publicTransport: 'Metro system and buses',
  },
  [City.CHENGDU]: {
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
    climate: 'Subtropical monsoon climate',
    bestTimeToVisit: 'March to June, September to November',
    language: 'Sichuanese, Mandarin Chinese',
    currency: 'Chinese Yuan (CNY)',
    timezone: 'UTC+8',
    emergencyNumber: '120',
    airport: 'Chengdu Shuangliu International Airport (CTU)',
    publicTransport: 'Metro system and buses',
  },
};

export const HOSPITALS: Hospital[] = [
  // Beijing
  {
    id: 'bj-001',
    name: 'Peking Union Medical College Hospital',
    nameChinese: '北京协和医院',
    address: '1 Shuaifuyuan, Wangfujing, Dongcheng District, Beijing',
    city: City.BEIJING,
    specialties: ['Oncology', 'Cardiology', 'Endocrinology'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: true,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'One of the most prestigious hospitals in China, known for excellent medical care.',
    phone: '+86-10-69156114',
  },
  {
    id: 'bj-002',
    name: 'Peking University People\'s Hospital',
    nameChinese: '北京大学人民医院',
    address: '11 Xizhimen South Street, Xicheng District, Beijing',
    city: City.BEIJING,
    specialties: ['Hematology', 'Hepatobiliary Surgery', 'Orthopedics'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Leading hospital in hematology and transplantation.',
    phone: '+86-10-88326666',
  },
  {
    id: 'bj-003',
    name: 'Beijing Hospital',
    nameChinese: '北京医院',
    address: '1 Dongdan North Street, Dongcheng District, Beijing',
    city: City.BEIJING,
    specialties: ['Geriatrics', 'Cardiology', 'Neurology'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Top hospital for elderly care and chronic disease management.',
    phone: '+86-10-85132266',
  },
  // Shanghai
  {
    id: 'sh-001',
    name: 'Huashan Hospital',
    nameChinese: '华山医院',
    address: '12 Wulumuqi Zhong Road, Xuhui District, Shanghai',
    city: City.SHANGHAI,
    specialties: ['Neurosurgery', 'Dermatology', 'Infectious Diseases'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: true,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Top-ranked hospital in Shanghai with world-class neurosurgery department.',
    phone: '+86-21-52888888',
  },
  {
    id: 'sh-002',
    name: 'Ruijin Hospital',
    nameChinese: '瑞金医院',
    address: '197 Ruijin Er Road, Huangpu District, Shanghai',
    city: City.SHANGHAI,
    specialties: ['Hematology', 'Cardiology', 'Orthopedics'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Leading hospital in hematology and transplantation.',
    phone: '+86-21-64370045',
  },
  {
    id: 'sh-003',
    name: 'Shanghai Ninth People\'s Hospital',
    nameChinese: '上海市第九人民医院',
    address: '639 Zhizaoju Road, Huangpu District, Shanghai',
    city: City.SHANGHAI,
    specialties: ['Plastic Surgery', 'Stomatology', 'Orthopedics'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Famous for plastic surgery and dental care.',
    phone: '+86-21-23271699',
  },
  // Guangzhou
  {
    id: 'gz-001',
    name: 'The First Affiliated Hospital of Sun Yat-sen University',
    nameChinese: '中山大学附属第一医院',
    address: '58 Zhongshan Er Road, Yuexiu District, Guangzhou',
    city: City.GUANGZHOU,
    specialties: ['Oncology', 'Cardiology', 'Transplantation'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Premier medical institution in Southern China.',
    phone: '+86-20-28823388',
  },
  {
    id: 'gz-002',
    name: 'Guangzhou University of Chinese Medicine Affiliated Hospital',
    nameChinese: '广州中医药大学附属医院',
    address: '13 Qiyi Road, Yuexiu District, Guangzhou',
    city: City.GUANGZHOU,
    specialties: ['TCM', 'Acupuncture', 'Herbal Medicine'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Leading TCM hospital with comprehensive herbal medicine treatments.',
    phone: '+86-20-81887233',
  },
  // Hangzhou
  {
    id: 'hz-001',
    name: 'Zhejiang University School of Medicine Affiliated First Hospital',
    nameChinese: '浙江大学医学院附属第一医院',
    address: '79 Qingchun Road, Hangzhou',
    city: City.HANGZHOU,
    specialties: ['TCM', 'Hepatology', 'Infectious Diseases'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Leading hospital in TCM and liver disease treatment.',
    phone: '+86-571-87236666',
  },
  {
    id: 'hz-002',
    name: 'Hangzhou First People\'s Hospital',
    nameChinese: '杭州市第一人民医院',
    address: '261 Yan\'an Road, Hangzhou',
    city: City.HANGZHOU,
    specialties: ['Ophthalmology', 'Dermatology', 'ENT'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Comprehensive hospital with excellent eye and skin care.',
    phone: '+86-571-87065701',
  },
  // Chengdu
  {
    id: 'cd-001',
    name: 'West China Hospital of Sichuan University',
    nameChinese: '四川大学华西医院',
    address: '37 Guoxue Alley, Wuhou District, Chengdu',
    city: City.CHENGDU,
    specialties: ['Orthopedics', 'TCM', 'Rehabilitation'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: true,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'One of the largest hospitals in Western China with excellent rehabilitation services.',
    phone: '+86-28-85422114',
  },
  {
    id: 'cd-002',
    name: 'Chengdu University of Traditional Chinese Medicine Affiliated Hospital',
    nameChinese: '成都中医药大学附属医院',
    address: '39 Shuangnan Road, Chengdu',
    city: City.CHENGDU,
    specialties: ['TCM', 'Acupuncture', 'Herbal Medicine'],
    internationalDepartment: true,
    englishStaff: true,
    jciCertified: false,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Premier TCM hospital with rich heritage in traditional treatments.',
    phone: '+86-28-87769902',
  },
];

export const getHospitalsByCity = (city: City): Hospital[] => {
  return HOSPITALS.filter((hospital) => hospital.city === city);
};

export const getHospitalById = (id: string): Hospital | undefined => {
  return HOSPITALS.find((hospital) => hospital.id === id);
};

export const getCityByName = (name: string): typeof CITY_DATA[keyof typeof CITY_DATA] | undefined => {
  return Object.values(CITY_DATA).find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
};

export const getSpecialtyHospitals = (specialty: string): Hospital[] => {
  return HOSPITALS.filter((hospital) =>
    hospital.specialties.some(
      (s) => s.toLowerCase() === specialty.toLowerCase()
    )
  );
};

export const searchHospitals = (query: string): Hospital[] => {
  const lowerQuery = query.toLowerCase();
  return HOSPITALS.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(lowerQuery) ||
      hospital.nameChinese.includes(query) ||
      hospital.specialties.some((s) => s.toLowerCase().includes(lowerQuery))
  );
};
