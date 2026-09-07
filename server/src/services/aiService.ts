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
  return `You are an expert medical travel guide for China. You generate comprehensive, accurate, and helpful guides for Western tourists seeking medical services in China.

Key guidelines:
1. Always respond with valid JSON only, no additional text
2. Provide practical, actionable information
3. Include specific cost estimates in CNY with USD equivalents
4. Consider cultural differences and language barriers
5. Emphasize safety and quality assurance
6. Be helpful and informative
7. Generate content in ${language} language

Your guides should be detailed, well-structured, and provide real value to travelers.`;
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
  return `Generate a comprehensive, illustrated TRAVEL AND MEDICAL guide for a Western tourist visiting ${cityName}, China. This must be a full travel guide that combines tourism with medical services - NOT a purely medical guide.

Traveler Information:
- City: ${cityName} (${cityData.nameChinese})
- Medical Need: ${medicalTypeName}
- Budget Level: ${budgetName}
- Travel Dates: ${travelDates.arrival} to ${travelDates.departure}
- Preferred Language: ${languageName}
${specificNeeds ? `- Specific Needs: ${specificNeeds}` : ''}

This guide is for a tourist who is also a patient. They want to explore the city AND access medical care. Balance BOTH aspects equally.

Available Hospitals in ${cityName}:
${hospitals.map(h => `- ${h.name} (${h.nameChinese}): ${h.specialties.join(', ')} | JCI: ${h.jciCertified ? 'Yes' : 'No'} | English Staff: ${h.englishStaff ? 'Yes' : 'No'}`).join('\n')}

Generate a detailed guide with the following JSON structure:
{
  "title": "Your ${cityName} Travel & Medical Guide",
  "subtitle": "Explore ${cityName} while accessing world-class medical care",
  "overview": "A balanced overview of experiencing ${cityName} as a tourist while accessing ${medicalTypeName} medical care",
  "process": [
    {
      "step": 1,
      "title": "Step title",
      "description": "Detailed, actionable description",
      "tips": ["Practical tip 1", "Practical tip 2"],
      "duration": "Estimated time"
    }
  ],
  "costs": [
    {
      "service": "Service name",
      "minCost": 100,
      "maxCost": 500,
      "currency": "CNY",
      "usdEquivalent": "USD equivalent"
    }
  ],
  "transportation": {
    "fromAirport": "Detailed instructions from airport to city center",
    "toHospital": "Detailed instructions to hospital",
    "publicTransit": "Public transit options with specifics",
    "taxiRide": "Taxi information including apps",
    "estimatedCost": "Cost estimate in CNY and USD"
  },
  "accommodation": [
    {
      "name": "Hotel name",
      "type": "Hotel type",
      "distance": "Distance from hospital",
      "priceRange": "Price range",
      "description": "Brief description"
    }
  ],
  "attractions": [
    {
      "name": "Attraction name",
      "nameChinese": "中文名",
      "category": "Landmark/Museum/Historical/Entertainment/Scenic",
      "description": "What to see and do",
      "duration": "Recommended visit time",
      "imageUrl": "https://example.com/attraction-image.jpg"
    }
  ],
  "food": [
    {
      "name": "Dish/restaurant name",
      "category": "Local specialty/Restaurant type",
      "description": "What it is and why to try it",
      "priceRange": "Price range in CNY",
      "mustTry": true
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 title",
      "activities": ["Morning activity", "Afternoon activity", "Medical appointment"],
      "meals": ["Breakfast recommendation", "Lunch recommendation", "Dinner recommendation"],
      "imageUrl": "https://example.com/day1-image.jpg"
    }
  ],
  "images": [
    "https://example.com/hero-image.jpg",
    "https://example.com/cityscape.jpg",
    "https://example.com/food.jpg"
  ],
  "tips": [
    "Important practical tip 1",
    "Important practical tip 2",
    "Important practical tip 3"
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

Critical Requirements:
1. This is a TRAVEL guide first. Include must-see attractions, landmarks, and experiences for ${cityName}.
2. Integrate medical visits into the travel itinerary naturally (e.g. "Morning: visit The Bund, Afternoon: hospital appointment").
3. Recommend local food and restaurants the tourist must try.
4. Provide a day-by-day itinerary that mixes sightseeing with medical appointments.
5. Include ${medicalTypeName} medical cost estimates in CNY with USD equivalents.
6. Suggest accommodation convenient to BOTH hospitals and tourist attractions.
7. Keep emergency medical contacts prominent.

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
    process: parsed.process || [],
    costs: parsed.costs || [],
    transportation: parsed.transportation || {
      fromAirport: '',
      toHospital: '',
      publicTransit: '',
      taxiRide: '',
      estimatedCost: '',
    },
    accommodation: parsed.accommodation || [],
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
    transportation: {
      fromAirport: 'Take the airport express train or taxi to the city center',
      toHospital: 'Use DiDi (Chinese Uber) or taxi to reach the hospital',
      publicTransit: 'Metro and buses are available and affordable',
      taxiRide: 'Taxis are readily available; use DiDi app for convenience',
      estimatedCost: '¥50-150 ($7-21 USD)',
    },
    accommodation: [
      {
        name: 'Hotels near hospital',
        type: 'Various options',
        distance: 'Within 1-2 km',
        priceRange: '$50-200/night',
        description: 'Multiple hotels available near major hospitals',
      },
    ],
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
