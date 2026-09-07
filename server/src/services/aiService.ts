import OpenAI from 'openai';
import { QuestionnaireData, GuideContent, City, MedicalType, BudgetRange, Language } from '../types';
import { CITY_DATA, getHospitalsByCity } from '../utils/cityData';

// Initialize AI client with Agnes AI configuration
const aiClient = new OpenAI({
  apiKey: process.env.AI_API_KEY || process.env.OPENAI_API_KEY || 'placeholder-key',
  baseURL: process.env.AI_BASE_URL || 'https://api.agnes-ai.cn/v1',
});

// AI Configuration
const AI_CONFIG = {
  textModel: process.env.AI_TEXT_MODEL || 'agnes-2.0-flash',
  imageModel: process.env.AI_IMAGE_MODEL || 'agnes-image-2.5-flash',
  temperature: 0.7,
  maxTokens: 3000,
  retryAttempts: 3,
  retryDelay: 1000,
};

const CITY_NAMES: Record<City, string> = {
  [City.BEIJING]: 'Beijing',
  [City.SHANGHAI]: 'Shanghai',
  [City.GUANGZHOU]: 'Guangzhou',
  [City.HANGZHOU]: 'Hangzhou',
  [City.CHENGDU]: 'Chengdu',
};

const MEDICAL_TYPE_NAMES: Record<MedicalType, string> = {
  [MedicalType.DENTAL]: 'Dental Care',
  [MedicalType.CHECKUP]: 'Health Checkup',
  [MedicalType.TCM]: 'Traditional Chinese Medicine',
  [MedicalType.SPECIALIST]: 'Specialist Visit',
  [MedicalType.EMERGENCY]: 'Emergency Care',
};

const BUDGET_NAMES: Record<BudgetRange, string> = {
  [BudgetRange.BUDGET]: 'Budget-Friendly',
  [BudgetRange.MODERATE]: 'Moderate',
  [BudgetRange.PREMIUM]: 'Premium',
};

const LANGUAGE_NAMES: Record<Language, string> = {
  [Language.ENGLISH]: 'English',
  [Language.SPANISH]: 'Spanish',
  [Language.FRENCH]: 'French',
  [Language.GERMAN]: 'German',
};

// Generate guide content with retry logic
export async function generateGuideContent(
  questionnaireData: QuestionnaireData
): Promise<GuideContent> {
  const { city, medicalType, budgetRange, specificNeeds, travelDates, languagePreference } = questionnaireData;
  
  const cityName = CITY_NAMES[city];
  const medicalTypeName = MEDICAL_TYPE_NAMES[medicalType];
  const budgetName = BUDGET_NAMES[budgetRange];
  const languageName = LANGUAGE_NAMES[languagePreference];
  
  const hospitals = getHospitalsByCity(city);
  const cityData = CITY_DATA[city];

  const prompt = createGuidePrompt(cityName, cityData, medicalTypeName, budgetName, languageName, travelDates, specificNeeds, hospitals);

  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= AI_CONFIG.retryAttempts; attempt++) {
    try {
      console.log(`Calling AI API (attempt ${attempt}/${AI_CONFIG.retryAttempts}) with model:`, AI_CONFIG.textModel);
      
      const completion = await aiClient.chat.completions.create({
        model: AI_CONFIG.textModel,
        messages: [
          {
            role: 'system',
            content: getSystemPrompt(languageName),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.maxTokens,
      });

      const responseContent = completion.choices[0]?.message?.content;
      
      if (!responseContent) {
        throw new Error('No response from AI');
      }

      console.log('AI response received, length:', responseContent.length);

      // Parse JSON response
      const parsed = parseAIResponse(responseContent);
      
      // Merge with hospital data
      const guideContent = createGuideContent(parsed, cityName, hospitals);

      return guideContent;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`AI generation attempt ${attempt} failed:`, lastError.message);
      
      if (attempt < AI_CONFIG.retryAttempts) {
        await delay(AI_CONFIG.retryDelay * attempt);
      }
    }
  }
  
  console.error('All AI generation attempts failed:', lastError?.message);
  return generateFallbackContent(questionnaireData);
}

// Create system prompt based on language
function getSystemPrompt(language: string): string {
  return `You are the world's most meticulous and practical medical travel guide for Western tourists visiting China. You think like a first-time Western visitor and anticipate EVERY real-world obstacle they will face. Your job is to remove all uncertainty so the traveler never has to wonder "how do I do this?".

You must ALWAYS think from the perspective of a Western tourist who:
- Does NOT speak or read Chinese
- Does NOT have WeChat Pay or Alipay set up
- Does NOT have a Chinese phone number
- Is used to Visa/Mastercard/Apple Pay, which barely work in China
- Will be shocked that Google/WhatsApp/Instagram are blocked
- Does not know Chinese hotel regulations for foreigners
- Is unfamiliar with the metro, DiDi, and mobile payment culture

Core operating rules:
1. Always respond with valid JSON only, no additional text
2. Anticipate and explicitly answer the practical "how do I..." questions Westerners will ask
3. Provide SPECIFIC, actionable answers - never vague ("use public transit" is forbidden; you must say the exact line numbers and app names)
4. Give exact app names (e.g. DiDi, Trip.com, Alipay, WeChat) and exact procedures
5. Warn about pitfalls (e.g. "most hotels cannot host foreigners" - explain the exact solution)
6. Give exact CNY costs with USD equivalents
7. Generate content in ${language} language

The absolute priority is that the guide is 100% practical and removes every doubt a confused Western tourist would have. No question goes unanswered in your guide.`;
}

// Create guide prompt
function createGuidePrompt(
  cityName: string,
  cityData: any,
  medicalTypeName: string,
  budgetName: string,
  languageName: string,
  travelDates: any,
  specificNeeds: string | undefined,
  hospitals: any[]
): string {
  return `Generate the most detailed, practical TRAVEL AND MEDICAL guide possible for a Western tourist visiting ${cityName}, China. This guide must anticipate and solve EVERY practical problem a confused Westerner will face. Do NOT assume prior knowledge of Chinese apps, payment, or customs.

Traveler Information:
- City: ${cityName} (${cityData.nameChinese})
- Medical Need: ${medicalTypeName}
- Budget Level: ${budgetName}
- Travel Dates: ${travelDates.arrival} to ${travelDates.departure}
- Preferred Language: ${languageName}
${specificNeeds ? `- Specific Needs: ${specificNeeds}` : ''}

This guide is for a first-time Western tourist who is also a patient. They are confused and need hand-holding. Solve their problems before they even ask.

AVAILABLE HOSPITALS IN ${cityName} (real, JCI-certified international hospitals):
${hospitals.map(h => `- ${h.name} (${h.nameChinese}): Address: ${h.address} | Phone: ${h.phone} | Specialties: ${h.specialties.join(', ')} | JCI: ${h.jciCertified ? 'Yes' : 'No'} | English Staff: ${h.englishStaff ? 'Yes' : 'No'} | International Dept: ${h.internationalDepartment ? 'Yes' : 'No'}`).join('\n')}

Generate a guide with the following EXACT JSON structure. Fill every field with extremely specific, actionable detail. For hotels, restaurants, hospitals, and transportation, give real, well-known examples where possible:

{
  "title": "Your ${cityName} Travel & Medical Guide",
  "subtitle": "The complete practical handbook for ${cityName} as a medical traveler",
  "overview": "A warm, reassuring overview that this guide solves all their practical problems and combines tourism with medical care",
  "beforeYouDepart": {
    "visa": "Exact visa requirements for visiting China from the US/UK/EU (e.g. 15-day visa-free for many passport holders, or single-entry visa process)",
    "simCard": "How to get a Chinese SIM (中国移动/联通/电信) at the airport - documents needed (passport), estimated cost (50-100 CNY), or eSIM options",
    "vpn": "Critical warning that Google, WhatsApp, Instagram, Facebook are BLOCKED in China. Recommend a VPN like Astrill/LetsVPN/ExpressVPN - install BEFORE arriving",
    "paymentApps": "How to set up Alipay or WeChat Pay - international card support, linking Visa/Mastercard, passport verification steps",
    "currency": "How much cash to bring (essential), where to exchange (airport/5-star hotels), which ATMs accept international cards (Bank of China, ICBC)",
    "powerAdapter": "China uses Type A/C sockets at 220V - which adapter/voltage converter to bring",
    "travelInsurance": "Why medical travel insurance is essential and what to look for",
    "documents": "What documents to carry - passport, visa, medical records, prescriptions translated, emergency contacts, hotel booking confirmation",
    "appsToDownload": "Essential apps to install before/during: DiDi, Alipay, WeChat, Baidu Maps or Amap, Trip.com, Metroman, Google Translate (with offline Chinese), VPN"
  },
  "paymentAndMoney": {
    "cardUsage": "Reality check: Visa/Mastercard are NOT widely accepted in China. You MUST use Alipay/WeChat or cash. How to get Alipay working with a foreign card.",
    "settingUpAlipay": "Step-by-step: download Alipay app, register with foreign phone, link Visa/Mastercard, passport identity verification",
    "settingUpWeChat": "Step-by-step: download WeChat, register, link card, WeChat Pay wallet setup",
    "cashAndAtms": "Where to get cash - airport exchange, hotel exchange, Bank of China ATMs. Daily ATM withdrawal limits and fees.",
    "foreignerFees": "Which merchants may charge extra for foreign cards, or decline them entirely",
    "talkingPayment": "Useful Chinese phrases: 'Shuākǎ' (card), 'Xiànjīn' (cash), 'Wǒ kěyǐ shuā qiǎ ma?' (can I pay by card?)"
  },
  "transportation": {
    "fromAirport": "EXACT instructions from ${cityName}'s airport to city center: metro line numbers and stops, or DiDi price estimate (exact range), or taxi price. Name the specific airport.",
    "metro": "How to use the metro: buy a ticket at the machine (accepts cash/cards, has English), or buy a transport card. Which lines serve the main attractions and hospitals. Exact line numbers.",
    "did: "Didichuxing (滴滴出行) exact name and setup: it needs a Chinese phone number and often Alipay. The workaround: Alipay's built-in Didi mini-program works for foreigners. Exact steps.",
    "taxiRide": "How to flag a taxi, the green/yellow taxi types, show the destination in Chinese characters, meter etiquette, rough price range per km.",
    "hotelArrival": "Exact instruction when arriving at hotel: you MUST confirm the hotel can host foreigners (涉外酒店). Most Chinese hotels legally cannot host foreigners. Ask for 'HOTEL FOREIGNER APPROVED' or use Booking.com/Agoda which only list foreigner-friendly hotels.",
    "estimatedCost": "Exact daily transport budget: metro single fare (2-6 CNY), DiDi average fare (20-50 CNY), etc."
  },
  "accommodation": [
    {
      "name": "Specific real hotel name that hosts foreigners",
      "type": "5-star / business / boutique / hostel",
      "distance": "Exact distance to nearest major hospital and city center (km + minutes)",
      "priceRange": "Exact CNY price range per night",
      "bookingPlatform": "Booking.com, Agoda, or Trip.com link",
      "foreignerFriendly": "CONFIRMED - accepts international guests with passport registration",
      "description": "What makes it good for a medical traveler (proximity to hospital, English staff, etc.)",
      "imageUrl": "https://example.com/hotel.jpg"
    }
  ],
  "attractions": [
    {
      "name": "Real, well-known attraction name",
      "nameChinese": "中文名",
      "category": "Landmark/Museum/Historical/Entertainment/Scenic",
      "description": "What to see and do, why it matters, and practical visit tips",
      "duration": "Exact recommended visit time",
      "ticketPrice": "Exact CNY admission price if any, or 'Free'",
      "imageUrl": "https://example.com/attraction.jpg"
    }
  ],
  "food": [
    {
      "name": "Specific famous dish or restaurant",
      "chineseName": "中文菜名",
      "category": "Local specialty/Restaurant type",
      "description": "What it is, why to try it, and how to order (show Chinese characters)",
      "priceRange": "Exact CNY price range",
      "mustTry": true
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 - theme",
      "activities": ["Exact morning activity (with metro line/station)", "Exact afternoon activity", "Medical appointment at [hospital name] - how to get there, what to bring"],
      "meals": ["Breakfast recommendation with location", "Lunch recommendation", "Dinner recommendation"],
      "imageUrl": "https://example.com/day1.jpg"
    }
  ],
  "medicalVisit": {
    "registration": "Exact steps for hospital registration: go to International Department (国际部), bring passport, estimated wait time, which forms to fill",
    "interpreter": "How to get an interpreter: hospitals may provide one, or use apps, or hire a medical interpreter. Costs.",
    "paymentAtHospital": "Exact payment process: pay upfront or by card/Alipay/WeChat, which hospitals take foreign cards, estimated deposit for outpatient vs. procedures",
    "records": "What medical records to bring, whether you need them translated, how to get records translated",
    "pharmacy": "How to fill prescriptions: hospital pharmacy, big chain pharmacies (Hepo/国大药房), show the prescription in Chinese, pay via Alipay/cash",
    "englishSupport": "Which of the listed hospitals have confirmed English-speaking staff and international departments"
  },
  "images": [
    "https://example.com/hero-image.jpg",
    "https://example.com/cityscape.jpg",
    "https://example.com/food.jpg",
    "https://example.com/metro.jpg"
  ],
  "tips": [
    "Specific critical tip 1 (e.g. 'Download a VPN BEFORE arriving - Google is blocked')",
    "Specific critical tip 2 (e.g. 'Carry 500-1000 CNY cash - cards are rejected everywhere')",
    "Specific critical tip 3",
    "Specific critical tip 4"
  ],
  "culturalNotes": [
    "Cultural consideration 1",
    "Cultural consideration 2"
  ],
  "emergencyContacts": [
    { "name": "Ambulance", "number": "120", "description": "Emergency medical services" },
    { "name": "Police", "number": "110", "description": "Police emergency" },
    { "name": "Fire", "number": "119", "description": "Fire emergency" },
    { "name": "Tourist Hotline", "number": "12301", "description": "Tourist assistance" }
  ]
}

MANDATORY: You must answer every single "how do I..." question a Westerner would have. If the user worries about hotels rejecting foreigners - solve it. If they worry about payment - solve it. If they worry about the metro - solve it. Be exhaustive and specific. Real establishment names, real app names, real procedures BELONG in your guide.

Return ONLY the JSON object, no additional text.`;
}

// Parse AI response with error handling
function parseAIResponse(response: string): any {
  // Try to extract JSON from the response
  let jsonStr = response;
  
  // Remove any markdown code block markers
  jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  
  // Try to find JSON object in the response
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonStr = jsonMatch[0];
  }
  
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse AI response as JSON:', error);
    throw new Error('Invalid JSON response from AI');
  }
}

// Create guide content from parsed AI response
function createGuideContent(parsed: any, cityName: string, hospitals: any[]): GuideContent {
  return {
    title: parsed.title || `Your ${cityName} Travel & Medical Guide`,
    subtitle: parsed.subtitle || `Explore ${cityName} while accessing world-class medical care`,
    overview: parsed.overview || '',
    heroImage: parsed.heroImage || parsed.images?.[0],
    hospitals: hospitals,
    beforeYouDepart: parsed.beforeYouDepart || {
      visa: '',
      simCard: '',
      vpn: '',
      paymentApps: '',
      currency: '',
      powerAdapter: '',
      travelInsurance: '',
      documents: '',
      appsToDownload: '',
    },
    paymentAndMoney: parsed.paymentAndMoney || {
      cardUsage: '',
      settingUpAlipay: '',
      settingUpWeChat: '',
      cashAndAtms: '',
      foreignerFees: '',
      talkingPayment: '',
    },
    medicalVisit: parsed.medicalVisit || {
      registration: '',
      interpreter: '',
      paymentAtHospital: '',
      records: '',
      pharmacy: '',
      englishSupport: '',
    },
    process: parsed.process || [],
    costs: parsed.costs || [],
    transportation: parsed.transportation || {
      fromAirport: '',
      metro: '',
      didi: '',
      taxiRide: '',
      hotelArrival: '',
      estimatedCost: '',
    },
    attractions: parsed.attractions || [],
    food: parsed.food || [],
    itinerary: parsed.itinerary || [],
    images: parsed.images || [],
    tips: parsed.tips || [],
    culturalNotes: parsed.culturalNotes || [],
    emergencyContacts: parsed.emergencyContacts || [
      { name: 'Ambulance', number: '120', description: 'Emergency medical services' },
      { name: 'Police', number: '110', description: 'Police emergency' },
      { name: 'Fire', number: '119', description: 'Fire emergency' },
      { name: 'Tourist Hotline', number: '12301', description: 'Tourist assistance' },
    ],
  };
}

// Generate image for hospital or city
export async function generateImage(
  prompt: string,
  size: '256x256' | '512x512' | '1024x1024' = '512x512'
): Promise<string | null> {
  try {
    console.log('Generating image with model:', AI_CONFIG.imageModel);
    
    const response = await aiClient.images.generate({
      model: AI_CONFIG.imageModel,
      prompt: prompt,
      n: 1,
      size: size,
    });

    return response.data?.[0]?.url ?? null;
  } catch (error) {
    console.error('Image generation error:', error);
    return null;
  }
}

// Generate multiple images for a guide
export async function generateGuideImages(
  cityName: string,
  medicalType: string
): Promise<{ hero?: string; hospitals?: string[]; city?: string }> {
  try {
    // Generate hero image
    const heroPrompt = `Beautiful modern hospital in ${cityName}, China, professional medical facility, clean and welcoming, high quality architectural photography, wide angle`;
    const hero = await generateImage(heroPrompt, '512x512');
    
    // Generate city image
    const cityPrompt = `Beautiful skyline of ${cityName}, China, modern cityscape, professional photography, high quality`;
    const city = await generateImage(cityPrompt, '512x512');
    
    return { hero: hero || undefined, city: city || undefined };
  } catch (error) {
    console.error('Guide images generation error:', error);
    return {};
  }
}

// Generate hospital image
export async function generateHospitalImage(
  hospitalName: string,
  cityName: string
): Promise<string | null> {
  const prompt = `Modern hospital building ${hospitalName} in ${cityName}, China, professional medical facility, clean and welcoming, high quality architectural photography`;
  return generateImage(prompt, '512x512');
}

// Generate medical illustration
export async function generateMedicalIllustration(
  medicalType: string
): Promise<string | null> {
  const prompts: Record<string, string> = {
    dental: 'Professional dental care illustration, modern dental clinic, clean and welcoming',
    checkup: 'Health checkup illustration, modern medical equipment, professional healthcare',
    tcm: 'Traditional Chinese Medicine illustration, acupuncture, herbal medicine',
    specialist: 'Medical specialist consultation, professional healthcare',
    emergency: 'Emergency medical care illustration, professional healthcare',
  };
  
  const prompt = prompts[medicalType] || 'Medical care illustration, professional healthcare';
  return generateImage(prompt, '512x512');
}

// Test AI connection
export async function testAIConnection(): Promise<boolean> {
  try {
    const completion = await aiClient.chat.completions.create({
      model: AI_CONFIG.textModel,
      messages: [
        {
          role: 'user',
          content: 'Hello, respond with "OK" only.',
        },
      ],
      max_tokens: 10,
    });

    return completion.choices[0]?.message?.content === 'OK';
  } catch (error) {
    console.error('AI connection test failed:', error);
    return false;
  }
}

// Get AI configuration
export function getAIConfig() {
  return {
    textModel: AI_CONFIG.textModel,
    imageModel: AI_CONFIG.imageModel,
    temperature: AI_CONFIG.temperature,
    maxTokens: AI_CONFIG.maxTokens,
  };
}

// Helper function for delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate fallback content
function generateFallbackContent(data: QuestionnaireData): GuideContent {
  const { city, medicalType } = data;
  const cityName = CITY_NAMES[city];
  const hospitals = getHospitalsByCity(city);

  return {
    title: `Your ${cityName} Travel & Medical Guide`,
    subtitle: `Explore ${cityName} while accessing world-class medical care`,
    overview: `This guide provides essential information for your ${cityName} travel and medical visit. ${cityName} offers world-class healthcare facilities with international departments that cater to foreign patients, alongside incredible attractions and experiences.`,
    hospitals: hospitals,
    process: [
      {
        step: 1,
        title: 'Research & Preparation',
        description: 'Review hospital options and prepare your medical documents.',
        tips: ['Bring your passport', 'Prepare a list of current medications'],
        duration: '1-2 days before',
      },
      {
        step: 2,
        title: 'Hospital Selection',
        description: 'Choose a hospital based on your medical needs and preferences.',
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
      { service: 'Basic Checkup', minCost: 200, maxCost: 800, currency: 'CNY' },
      { service: 'MRI', minCost: 500, maxCost: 1000, currency: 'CNY' },
      { service: 'CT Scan', minCost: 300, maxCost: 600, currency: 'CNY' },
      { service: 'Blood Test', minCost: 50, maxCost: 200, currency: 'CNY' },
    ],
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
      registration: 'Go to the International Department (国际部). Bring your passportcars, fill registration forms, expect to wait 15-60 minutes.',
      interpreter: 'Ask the hospital if they provide an interpreter. Otherwise use a translation app or hire a medical interpreter (~200-500 CNY/hour).',
      paymentAtHospital: 'Most hospitals require upfront payment for outpatient care. They accept Alipay, WeChat Pay, and some accept foreign cards at international departments.',
      records: 'Bring your translated medical records. Most international departments accept English records; otherwise get them translated in advance.',
      pharmacy: 'Fill prescriptions at the hospital pharmacy or big chains like Hepo (国大药房). Show the prescription in Chinese and pay via Alipay/cash.',
      englishSupport: 'The listed hospitals have international departments with English-speaking staff - confirm when booking.',
    },
    transportation: {
      fromAirport: 'Take the airport express/metro line to the city center, or a DiDi/taxi (~100-200 CNY from the airport).',
      metro: 'Buy a single-journey ticket at the machine (cash/card, English interface) or a transport card. Know the exact line and station for your hotel and hospital.',
      didi: 'Use Didi Chuxing (滴滴出行) - foreigners can use the Alipay mini-program to book rides. Set up Alipay first, then access Didi inside it.',
      taxiRide: 'Flag a taxi, show the Chinese destination characters, use the meter, and pay cash or via Alipay/WeChat.',
      hotelArrival: 'Confirm your hotel can host foreigners (涉外酒店) before booking - use Booking.com/Agoda which only list foreigner-friendly hotels.',
      estimatedCost: 'Budget ~30-100 CNY/day: metro single fare 2-6 CNY, DiDi 20-50 CNY per trip.',
    },
    attractions: [],
    food: [],
    itinerary: [],
    images: [],
    tips: [
      'Bring your passport for hospital registration',
      'International departments usually have English-speaking staff',
      'Payment via Alipay, WeChat Pay, or credit card is accepted',
      'Medical records from your home country are helpful',
      'Consider travel insurance for coverage',
    ],
    culturalNotes: [
      'Chinese hospitals may have different procedures than Western hospitals',
      'Communication can be challenging; consider a translator app',
      'Payment is often required upfront in Chinese hospitals',
    ],
    emergencyContacts: [
      { name: 'Ambulance', number: '120', description: 'Emergency medical services' },
      { name: 'Police', number: '110', description: 'Police emergency' },
      { name: 'Fire', number: '119', description: 'Fire emergency' },
      { name: 'Tourist Hotline', number: '12301', description: 'Tourist assistance' },
    ],
  };
}
