import dotenv from 'dotenv';
import { testAIConnection, generateGuideContent } from './src/services/aiService';
import { City, MedicalType, BudgetRange, Language } from './src/types';

dotenv.config();

async function testAPI() {
  console.log('=== LAVA AI API Test ===\n');
  
  console.log('Configuration:');
  console.log('- API Base URL:', process.env.AI_BASE_URL);
  console.log('- Text Model:', process.env.AI_TEXT_MODEL);
  console.log('- Image Model:', process.env.AI_IMAGE_MODEL);
  console.log('- API Key:', process.env.AI_API_KEY ? '***configured***' : 'NOT SET');
  console.log('');
  
  // Test 1: Connection test
  console.log('Test 1: Testing AI connection...');
  const isConnected = await testAIConnection();
  console.log('Result:', isConnected ? '✓ Connected' : '✗ Failed');
  console.log('');
  
  if (!isConnected) {
    console.log('Connection failed. Please check your API configuration.');
    return;
  }
  
  // Test 2: Generate guide content
  console.log('Test 2: Generating guide content...');
  const testQuestionnaire = {
    city: City.SHANGHAI,
    medicalType: MedicalType.DENTAL,
    budgetRange: BudgetRange.MODERATE,
    travelDates: {
      arrival: '2026-10-01',
      departure: '2026-10-15',
    },
    specificNeeds: 'Root canal treatment',
    languagePreference: Language.ENGLISH,
  };
  
  console.log('Input:', JSON.stringify(testQuestionnaire, null, 2));
  console.log('');
  
  try {
    const guideContent = await generateGuideContent(testQuestionnaire);
    console.log('Result: ✓ Guide generated successfully');
    console.log('Title:', guideContent.title);
    console.log('Overview length:', guideContent.overview.length, 'characters');
    console.log('Hospitals:', guideContent.hospitals.length);
    console.log('Process steps:', guideContent.process.length);
    console.log('Cost items:', guideContent.costs.length);
    console.log('Tips:', guideContent.tips.length);
  } catch (error) {
    console.log('Result: ✗ Failed to generate guide');
    console.error('Error:', error);
  }
  
  console.log('\n=== Test Complete ===');
}

testAPI().catch(console.error);
