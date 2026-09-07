import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { CITIES } from '../constants';

export const GuideGenerationPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaire, setGuideContent } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');

  const city = CITIES.find(c => c.id === questionnaire.city);

  useEffect(() => {
    const generateGuide = async () => {
      const steps = [
        { progress: 15, text: 'Analyzing your requirements...' },
        { progress: 30, text: 'Searching hospital database...' },
        { progress: 45, text: 'Generating cost estimates...' },
        { progress: 60, text: 'Creating step-by-step process...' },
        { progress: 75, text: 'Compiling transportation guide...' },
        { progress: 90, text: 'Finalizing your guide...' },
        { progress: 100, text: 'Guide complete!' },
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setProgress(step.progress);
        setStatusText(step.text);
      }

      // Generate mock guide content
      setGuideContent({
        title: `Your ${city?.name} Travel & Medical Guide`,
        subtitle: `Explore ${city?.name} while accessing world-class medical care`,
        overview: `This personalized travel and medical guide will help you explore ${city?.name} while accessing its healthcare system. We've combined must-see attractions, local food, and top hospitals into one comprehensive itinerary.`,
        heroImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
        beforeYouDepart: {
          visa: 'Check if you need a visa; many passports get 15-day visa-free entry, otherwise apply for an L visa in advance.',
          simCard: 'Buy a Chinese SIM at the airport (China Mobile/Unicom/Telecom) with your passport, ~50-100 CNY, or use an eSIM.',
          vpn: 'Google, WhatsApp, Instagram, Facebook are BLOCKED in China. Install a VPN (Astrill, LetsVPN, ExpressVPN) BEFORE you depart.',
          paymentApps: 'Set up Alipay and WeChat Pay with your foreign card and passport before or right after arrival.',
          currency: 'Carry 500-1000 CNY cash. Exchange at the airport or 5-star hotels. Use Bank of China/ICBC ATMs for international cards.',
          powerAdapter: 'China uses Type A/C sockets at 220V. Bring a universal adapter and check voltage compatibility.',
          travelInsurance: 'Medical travel insurance is essential - ensure it covers emergency care and repatriation in China.',
          documents: 'Carry your passport, visa, translated medical records, prescriptions, emergency contacts, and hotel confirmation.',
          appsToDownload: 'Install before/after arrival: DiDi, Alipay, WeChat, Baidu Maps or Amap, Trip.com, Metroman, Google Translate (offline), and your VPN.',
        },
        paymentAndMoney: {
          cardUsage: 'Visa/Mastercard are NOT widely accepted in China. You MUST use Alipay/WeChat Pay or cash in most places.',
          settingUpAlipay: 'Download Alipay, register with your foreign phone number, link a Visa/Mastercard, and complete passport identity verification.',
          settingUpWeChat: 'Download WeChat, register with your phone number, then set up WeChat Pay by linking a card and verifying identity.',
          cashAndAtms: 'Get cash at the airport exchange, hotel exchange, or Bank of China ATMs. Withdrawals usually allow ~2500 CNY per day.',
          foreignerFees: 'Some merchants may decline foreign cards or charge fees. Carry cash as a reliable backup.',
          talkingPayment: 'Useful phrases: Shuākǎ (card), Xiànjīn (cash), Wǒ kěyǐ shuā qiǎ ma? (can I pay by card?)',
        },
        medicalVisit: {
          registration: 'Go to the International Department (国际部). Bring your passport, fill registration forms, expect to wait 15-60 minutes.',
          interpreter: 'Ask the hospital if they provide an interpreter. Otherwise use a translation app or hire a medical interpreter (~200-500 CNY/hour).',
          paymentAtHospital: 'Most hospitals require upfront payment for outpatient care. They accept Alipay, WeChat Pay, and some accept foreign cards at international departments.',
          records: 'Bring your translated medical records. Most international departments accept English records; otherwise get them translated in advance.',
          pharmacy: 'Fill prescriptions at the hospital pharmacy or big chains like Hepo (国大药房). Show the prescription in Chinese and pay via Alipay/cash.',
          englishSupport: 'The listed hospitals have international departments with English-speaking staff - confirm when booking.',
        },
        hospitals: [
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
        ],
        process: [
          {
            step: 1,
            title: 'Research & Preparation',
            description: 'Review this guide and prepare your medical documents.',
            tips: ['Bring your passport', 'Prepare a list of current medications'],
            duration: '1-2 days before',
          },
          {
            step: 2,
            title: 'Hospital Selection',
            description: 'Choose a hospital based on your medical needs.',
            tips: ['Consider international departments', 'Check English staff availability'],
            duration: '30 minutes',
          },
          {
            step: 3,
            title: 'Appointment Booking',
            description: 'Contact the hospital to schedule your appointment.',
            tips: ['Call ahead or use online booking', 'Confirm English service availability'],
            duration: '15-30 minutes',
          },
          {
            step: 4,
            title: 'Hospital Visit',
            description: 'Arrive at the hospital for your appointment.',
            tips: ['Arrive 30 minutes early', 'Bring all medical documents'],
            duration: '2-4 hours',
          },
        ],
        costs: [
          { service: 'Consultation', minCost: 100, maxCost: 500, currency: 'CNY' },
          { service: 'MRI', minCost: 500, maxCost: 1000, currency: 'CNY' },
          { service: 'CT Scan', minCost: 300, maxCost: 600, currency: 'CNY' },
          { service: 'Blood Test', minCost: 50, maxCost: 200, currency: 'CNY' },
        ],
        transportation: {
          fromAirport: 'Take the airport express/metro line to the city center, or a DiDi/taxi (~100-200 CNY from the airport).',
          metro: 'Buy a single-journey ticket at the machine (cash/card, English interface) or a transport card. Know the exact line and station for your hotel and hospital.',
          didi: 'Use Didi Chuxing (滴滴出行) - foreigners can use the Alipay mini-program to book rides. Set up Alipay first, then access Didi inside it.',
          taxiRide: 'Flag a taxi, show the Chinese destination characters, use the meter, and pay cash or via Alipay/WeChat.',
          hotelArrival: 'Confirm your hotel can host foreigners (涉外酒店) before booking - use Booking.com/Agoda which only list foreigner-friendly hotels.',
          estimatedCost: 'Budget ~30-100 CNY/day: metro single fare 2-6 CNY, DiDi 20-50 CNY per trip.',
        },
        attractions: [
          {
            name: 'The Bund',
            nameChinese: '外滩',
            category: 'Scenic',
            description: 'Walk along the historic waterfront and admire the colonial architecture across from the Pudong skyline.',
            duration: '2 hours',
            imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
          },
          {
            name: 'Yu Garden',
            nameChinese: '豫园',
            category: 'Historical',
            description: 'A classical Ming dynasty garden with beautiful rockeries, pavilions and koi ponds.',
            duration: '1.5 hours',
            imageUrl: 'https://images.unsplash.com/photo-1590603667614-8a2447d7b6b3?w=800',
          },
          {
            name: 'Shanghai Tower',
            nameChinese: '上海中心大厦',
            category: 'Landmark',
            description: 'Visit the observation deck of China\u2019s tallest building for panoramic views.',
            duration: '2 hours',
            imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800',
          },
        ],
        food: [
          {
            name: 'Xiaolongbao (Soup Dumplings)',
            category: 'Local Specialty',
            description: 'Steamed dumplings filled with hot broth and pork \u2014 a Shanghai must-try.',
            priceRange: '30-60 CNY',
            mustTry: true,
          },
          {
            name: 'Shengjianbao',
            category: 'Local Specialty',
            description: 'Pan-fried pork buns with a crispy bottom, often found at breakfast stalls.',
            priceRange: '10-25 CNY',
            mustTry: true,
          },
          {
            name: 'Benbang Cuisine',
            category: 'Restaurant',
            description: 'Traditional Shanghai cuisine featuring red-braised pork and freshwater fish.',
            priceRange: '100-300 CNY',
            mustTry: false,
          },
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival & The Bund',
            activities: [
              'Arrive at Shanghai, check in to hotel',
              'Afternoon: Walk along The Bund',
              'Evening: Dinner at a local restaurant',
            ],
            meals: ['Breakfast at hotel', 'Lunch at Nanxiang Steamed Bun Restaurant', 'Dinner near the Bund'],
            imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
          },
          {
            day: 2,
            title: 'Hospital Visit & Yu Garden',
            activities: [
              'Morning: Hospital appointment at Huashan or Ruijin Hospital',
              'Afternoon: Explore Yu Garden and nearby bazaar',
              'Evening: Cruise on the Huangpu River',
            ],
            meals: ['Breakfast at hotel', 'Lunch near Yu Garden', 'Dinner at a Shanghai restaurant'],
            imageUrl: 'https://images.unsplash.com/photo-1590603667614-8a2447d7b6b3?w=800',
          },
        ],
        images: [
          'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
          'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800',
        ],
        tips: [
          'Bring your passport for hospital registration',
          'International departments usually have English-speaking staff',
          'Payment via Alipay, WeChat Pay, or credit card is accepted',
          'Medical records from your home country are helpful',
          'Download a translation app like Google Translate for easier communication',
        ],
        emergencyContacts: [
          { name: 'Ambulance', number: '120', description: 'Emergency medical services' },
          { name: 'Police', number: '110', description: 'Police emergency' },
          { name: 'Tourist Hotline', number: '12301', description: 'Tourist assistance' },
        ],
      });

      setTimeout(() => {
        navigate('/guide');
      }, 500);
    };

    generateGuide();
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-logo">
        <div className="logo" style={{ fontSize: '48px' }}>LAVA</div>
      </div>
      
      <div className="loading-text">{statusText}</div>
      
      <div className="progress-bar-container">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-percentage">{progress}%</div>
      </div>
      
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        {progress < 100 ? 'This may take 10-30 seconds' : 'Almost done!'}
      </p>
    </div>
  );
};
