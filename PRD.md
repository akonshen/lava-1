# LAVA - Medical Travel Guide
## Product Requirements Document (PRD)

**Version**: 1.0  
**Date**: 2026-09-07  
**Author**: LAVA Product Team  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Target Users](#3-target-users)
4. [Core Features](#4-core-features)
5. [User Flow](#5-user-flow)
6. [UI/UX Design](#6-uiux-design)
7. [Technical Architecture](#7-technical-architecture)
8. [Data Model](#8-data-model)
9. [API Design](#9-api-design)
10. [Payment System](#10-payment-system)
11. [AI Integration](#11-ai-integration)
12. [City Coverage](#12-city-coverage)
13. [Compliance & Legal](#13-compliance--legal)
14. [Success Metrics](#14-success-metrics)
15. [Launch Strategy](#15-launch-strategy)

---

## 1. Executive Summary

### 1.1 Product Vision
LAVA is a mobile application that provides personalized medical travel guides for Western tourists visiting China. Using AI technology, LAVA generates comprehensive, image-rich travel guides that help users navigate China's healthcare system during their trips.

### 1.2 Problem Statement
Western tourists visiting China often face challenges when they need medical care:
- Language barriers in hospitals
- Unfamiliarity with Chinese healthcare system
- Concerns about costs and quality
- Difficulty finding appropriate hospitals
- Uncertainty about insurance coverage

### 1.3 Solution
LAVA provides AI-generated, personalized medical travel guides that include:
- Hospital recommendations based on user needs
- Step-by-step就医 process guides
- Cost estimates and comparisons
- Language support resources
- Transportation and accommodation suggestions

### 1.4 Business Model
- **Pricing**: $6.99 per guide (one-time purchase)
- **Target**: Western tourists (US, UK, Europe) visiting China
- **Differentiation**: AI-powered personalization, comprehensive guides, image-rich content

---

## 2. Product Overview

### 2.1 Product Name
**LAVA** - Medical Travel Guide

### 2.2 Platform
- **iOS**: iPhone (iOS 15.0+)
- **Android**: API Level 24+ (Android 7.0+)

### 2.3 Core Value Proposition
"Your Personal Medical Travel Companion in China"

### 2.4 Key Features
1. **AI-Powered Guide Generation**: Personalized guides based on user input
2. **5 Major City Coverage**: Beijing, Shanghai, Guangzhou, Hangzhou, Chengdu
3. **Comprehensive Information**: Hospitals, costs, processes, tips
4. **Image-Rich Content**: Hospital photos, process diagrams, cost comparisons
5. **Offline Access**: Download guides for offline viewing
6. **Multi-Language Support**: English interface, Chinese medical terms

### 2.5 Success Metrics
- **Primary**: Guide generation completion rate > 90%
- **Secondary**: User satisfaction score > 4.5/5
- **Business**: Monthly revenue > $10,000 within 6 months

---

## 3. Target Users

### 3.1 User Personas

#### Persona 1: Medical Tourist (Primary)
- **Demographics**: 35-55 years, middle-high income, US/UK/Europe
- **Scenario**: Planning to visit China for medical treatment (dental, checkup, TCM)
- **Pain Points**: 
  - Doesn't know which hospitals to choose
  - Worried about language barriers
  - Concerned about costs
- **Needs**: Reliable hospital recommendations, cost estimates, process guidance

#### Persona 2: Traveler with Emergency (Secondary)
- **Demographics**: 25-45 years, traveling in China
- **Scenario**: Needs medical care during trip (unexpected illness/injury)
- **Pain Points**:
  - Urgent need for medical help
  - Doesn't know where to go
  - Language barriers
- **Needs**: Quick access to nearby hospitals, emergency contacts, basic medical Chinese phrases

#### Persona 3: Health-Conscious Traveler (Tertiary)
- **Demographics**: 30-50 years, interested in TCM and wellness
- **Scenario**: Wants to experience Traditional Chinese Medicine
- **Pain Points**:
  - Doesn't know how to find legitimate TCM providers
  - Uncertain about what to expect
- **Needs**: TCM provider recommendations, process guides, cultural context

### 3.2 User Needs Analysis

| Need | Priority | Solution |
|------|----------|----------|
| Hospital recommendations | High | AI-curated hospital list based on specialty and user needs |
| Cost information | High | Detailed cost breakdowns and comparisons |
| Process guidance | High | Step-by-step就医 guides |
| Language support | Medium | Medical phrase book, translation tips |
| Transportation | Medium | Hospital location maps, transit directions |
| Accommodation | Low | Nearby hotel recommendations |

---

## 4. Core Features

### 4.1 Feature List

#### 4.1.1 User Information Collection (Hybrid Mode)
**Phase 1: Quick Questions**
- Destination city (5 options)
- Travel dates
- Medical need type
- Budget range

**Phase 2: Detailed Form**
- Specific health requirements
- Medical history (optional)
- Insurance information
- Language preferences
- Special requirements

#### 4.1.2 AI Guide Generation
**Guide Content Modules**:
1. City medical overview
2. Recommended hospitals (with JCI certification badges)
3. Step-by-step就医 process
4. Cost estimates and comparisons
5. Language support resources
6. Transportation guide
7. Accommodation suggestions
8. Important notes and tips

**Guide Format**:
- Rich text with images
- Downloadable PDF
- Shareable link

#### 4.1.3 Payment System
- Apple Pay integration
- Google Pay integration
- Credit/Debit card (Stripe)
- Payment history

#### 4.1.4 User Account
- Purchase history
- Saved guides
- Settings

### 4.2 Feature Prioritization

| Feature | Priority | Phase |
|---------|----------|-------|
| City selection | P0 | MVP |
| Basic questionnaire | P0 | MVP |
| AI guide generation | P0 | MVP |
| Payment processing | P0 | MVP |
| Guide display | P0 | MVP |
| PDF download | P1 | MVP |
| User accounts | P1 | Phase 2 |
| Guide sharing | P2 | Phase 2 |
| Offline access | P2 | Phase 2 |
| Multi-language UI | P2 | Phase 3 |

---

## 5. User Flow

### 5.1 Primary Flow: Guide Generation

```
┌─────────────┐
│  App Launch  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Welcome /  │
│  Onboarding │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ City Select │
│ (5 cities)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Quick Q&A  │
│  (3-5 Qs)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Detailed   │
│   Form      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Payment    │
│  $6.99      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ AI Generating│
│  (10-30s)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Guide      │
│  Display    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Download / │
│  Share      │
└─────────────┘
```

### 5.2 Secondary Flow: View Saved Guides

```
┌─────────────┐
│  Home       │
│  Screen     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  My Guides  │
│  List       │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Guide      │
│  Detail     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Download / │
│  Share      │
└─────────────┘
```

---

## 6. UI/UX Design

### 6.1 Design Principles

1. **Clean & Professional**: Medical credibility with modern aesthetics
2. **Trust-Building**: Use of certifications, ratings, and verified information
3. **Efficient**: Minimize steps to complete guide generation
4. **Accessible**: Clear typography, high contrast, intuitive navigation

### 6.2 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Red | #C41E3A | CTAs, key actions |
| Trust Blue | #1E3A5F | Headers, navigation |
| Background | #F8F9FA | Page backgrounds |
| Card Background | #FFFFFF | Cards, containers |
| Text Primary | #212529 | Body text |
| Text Secondary | #6C757D | Secondary text |
| Success Green | #28A745 | Confirmations |
| Warning Orange | #FF6B35 | Alerts, highlights |

### 6.3 Typography

- **Headers**: Inter Bold (24-32px)
- **Subheaders**: Inter SemiBold (18-20px)
- **Body**: Inter Regular (16px)
- **Caption**: Inter Regular (14px)
- **Chinese**: PingFang SC / Noto Sans SC

### 6.4 Core Screens

#### 6.4.1 Welcome Screen
- App logo and name
- Tagline: "Your Medical Travel Companion in China"
- "Get Started" CTA button
- City preview carousel

#### 6.4.2 City Selection Screen
- 5 city cards with images
- City name and brief description
- Tap to select

#### 6.4.3 Questionnaire Screen
- Progress indicator
- Question with multiple choice
- "Next" / "Back" buttons
- Option to skip detailed form

#### 6.4.4 Payment Screen
- Order summary
- Price: $6.99
- Payment methods (Apple Pay, Google Pay, Card)
- "Purchase" CTA

#### 6.4.5 Guide Generation Screen
- Loading animation
- Progress text: "Generating your personalized guide..."
- Estimated time remaining

#### 6.4.6 Guide Display Screen
- Scrollable content
- Table of contents
- Hospital cards with images
- Cost comparison tables
- Process flow diagrams
- "Download PDF" button
- "Share" button

### 6.5 Design Assets Needed

1. **App Icon**: LAVA logo (red/orange gradient)
2. **City Images**: High-quality photos of 5 cities
3. **Hospital Images**: Stock photos of modern Chinese hospitals
4. **Illustrations**: Medical/travel themed illustrations
5. **Icons**: Custom icon set for navigation and features

---

## 7. Technical Architecture

### 7.1 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React Native 0.73+ with TypeScript |
| **UI Library** | React Native Paper + Custom Components |
| **State Management** | Zustand |
| **Navigation** | React Navigation 6 |
| **Backend** | Node.js with Express/Fastify |
| **Database** | PostgreSQL + Redis |
| **AI Service** | OpenAI GPT-4 / Claude 3.5 |
| **Payment** | Stripe + Apple/Google Pay |
| **Storage** | AWS S3 / Cloudflare R2 |
| **Hosting** | AWS / Vercel |

### 7.2 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Mobile App (React Native)            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │  UI     │ │  State  │ │  API    │ │ Offline │     │
│  │Components│ │ Manager │ │ Client  │ │ Storage │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS/WSS
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    API Gateway (Express)                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │  Auth   │ │ Rate    │ │  Log    │ │  CORS   │     │
│  │  Middleware│ │ Limiter│ │ gger   │ │         │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Microservices Layer                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │  User   │ │  Order  │ │  Guide  │ │   AI    │     │
│  │ Service │ │ Service │ │ Service │ │ Service │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │PostgreSQL│ │  Redis  │ │   S3    │ │  Stripe │     │
│  │Database │ │  Cache  │ │ Images  │ │Payments │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
└─────────────────────────────────────────────────────────┘
```

### 7.3 Key Technical Decisions

1. **React Native**: Cross-platform development with native performance
2. **Hermes Engine**: Default JS engine for better performance
3. **TypeScript**: Type safety and better developer experience
4. **Zustand**: Lightweight state management
5. **Stripe**: Industry-standard payment processing
6. **GPT-4/Claude**: High-quality AI content generation

---

## 8. Data Model

### 8.1 Core Entities

#### User
```typescript
interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Guide
```typescript
interface Guide {
  id: string;
  userId: string;
  city: City;
  questionnaireData: QuestionnaireData;
  content: GuideContent;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### QuestionnaireData
```typescript
interface QuestionnaireData {
  city: City;
  travelDates: {
    arrival: Date;
    departure: Date;
  };
  medicalType: MedicalType;
  budgetRange: BudgetRange;
  specificNeeds?: string;
  medicalHistory?: string;
  insurance?: string;
  languagePreference: Language;
  specialRequirements?: string;
}
```

#### GuideContent
```typescript
interface GuideContent {
  title: string;
  overview: string;
  hospitals: Hospital[];
  process: ProcessStep[];
  costs: CostEstimate[];
  transportation: TransportationInfo;
  accommodation: AccommodationSuggestion[];
  tips: string[];
  emergencyContacts: EmergencyContact[];
}
```

#### Payment
```typescript
interface Payment {
  id: string;
  userId: string;
  guideId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'refunded';
  stripePaymentId: string;
  createdAt: Date;
}
```

### 8.2 Enums

```typescript
enum City {
  BEIJING = 'beijing',
  SHANGHAI = 'shanghai',
  GUANGZHOU = 'guangzhou',
  HANGZHOU = 'hangzhou',
  CHENGDU = 'chengdu'
}

enum MedicalType {
  DENTAL = 'dental',
  CHECKUP = 'checkup',
  TCM = 'tcm',
  SPECIALIST = 'specialist',
  EMERGENCY = 'emergency'
}

enum BudgetRange {
  BUDGET = 'budget',
  MODERATE = 'moderate',
  PREMIUM = 'premium'
}

enum Language {
  ENGLISH = 'english',
  SPANISH = 'spanish',
  FRENCH = 'french',
  GERMAN = 'german'
}
```

---

## 9. API Design

### 9.1 Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

#### Guides
- `POST /api/guides` - Create new guide
- `GET /api/guides/:id` - Get guide by ID
- `GET /api/guides` - List user's guides
- `GET /api/guides/:id/content` - Get guide content

#### Payment
- `POST /api/payments` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/:id` - Get payment status

#### Cities
- `GET /api/cities` - List available cities
- `GET /api/cities/:id/hospitals` - List hospitals in city

### 9.2 Request/Response Examples

#### Create Guide
```typescript
// POST /api/guides
// Request
{
  city: "shanghai",
  travelDates: {
    arrival: "2026-10-01",
    departure: "2026-10-15"
  },
  medicalType: "dental",
  budgetRange: "moderate",
  specificNeeds: "Root canal treatment",
  languagePreference: "english"
}

// Response
{
  id: "guide_123",
  status: "pending",
  paymentRequired: true,
  amount: 6.99
}
```

#### Get Guide Content
```typescript
// GET /api/guides/guide_123/content
// Response
{
  id: "guide_123",
  title: "Your Shanghai Dental Guide",
  overview: "...",
  hospitals: [...],
  process: [...],
  costs: [...],
  transportation: {...},
  tips: [...]
}
```

---

## 10. Payment System

### 10.1 Payment Flow

1. User completes questionnaire
2. App creates payment intent via backend
3. Backend calls Stripe to create PaymentIntent
4. App displays payment sheet (Apple Pay / Google Pay / Card)
5. User confirms payment
6. Stripe processes payment
7. Backend receives webhook confirmation
8. Guide generation starts
9. Guide delivered to user

### 10.2 Pricing

- **Single Guide**: $6.99 USD
- **Currency**: USD (primary), EUR, GBP supported
- **Refund Policy**: Full refund if guide generation fails

### 10.3 Integration

```typescript
// Stripe Configuration
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_...',
  merchantIdentifier: 'merchant.com.lava.app',
  urlScheme: 'lava-app'
};

// Payment Intent Creation
const createPaymentIntent = async (guideId: string) => {
  const response = await fetch('/api/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guideId })
  });
  return response.json();
};
```

---

## 11. AI Integration

### 11.1 AI Service Architecture

```
User Input → Prompt Engineering → AI Model → Content Processing → Guide Output
```

### 11.2 Prompt Template

```typescript
const GUIDE_GENERATION_PROMPT = `
You are a medical travel guide expert for China. Generate a comprehensive guide for a traveler visiting {city} who needs {medicalType} services.

Traveler Information:
- City: {city}
- Medical Need: {medicalType}
- Budget: {budgetRange}
- Specific Needs: {specificNeeds}
- Language: {languagePreference}

Generate a guide with the following sections:
1. City Medical Overview
2. Recommended Hospitals (3-5 hospitals)
3. Step-by-Step Process Guide
4. Cost Estimates
5. Language Support Tips
6. Transportation Guide
7. Accommodation Suggestions
8. Important Notes

For each hospital, include:
- Name (English and Chinese)
- Address
- Specialty
- International Department availability
- Estimated costs
- Why it's recommended

Format the response as JSON with the following structure:
${GUIDE_CONTENT_SCHEMA}
`;
```

### 11.3 Content Processing

1. **Validation**: Ensure AI response matches expected schema
2. **Enrichment**: Add hospital images, maps, and additional data
3. **Localization**: Translate medical terms to user's language
4. **Formatting**: Convert to display-ready format

### 11.4 Quality Assurance

- Response validation against schema
- Content accuracy checks
- Hospital data verification
- User feedback loop

---

## 12. City Coverage

### 12.1 City Data Structure

```typescript
const CITY_DATA = {
  beijing: {
    name: "Beijing",
    chinese: "北京",
    description: "China's capital with world-class hospitals",
    majorHospitals: [
      "Peking Union Medical College Hospital",
      "Peking University People's Hospital",
      "Beijing Hospital"
    ],
    specialties: ["Oncology", "Cardiology", "Orthopedics", "TCM"],
    averageCosts: {
      mri: "¥600-1000",
      ct: "¥300-600",
      checkup: "¥1500-3000"
    }
  },
  shanghai: {
    name: "Shanghai",
    chinese: "上海",
    description: "China's medical hub with cutting-edge technology",
    majorHospitals: [
      "Huashan Hospital",
      "Ruijin Hospital",
      "Shanghai Ninth People's Hospital"
    ],
    specialties: ["Neurosurgery", "Plastic Surgery", "Oncology"],
    averageCosts: {
      mri: "¥500-900",
      ct: "¥250-500",
      checkup: "¥1200-2500"
    }
  },
  guangzhou: {
    name: "Guangzhou",
    chinese: "广州",
    description: "Southern China's medical center",
    majorHospitals: [
      "The First Affiliated Hospital of Sun Yat-sen University",
      "Guangzhou中医药大学附属第一医院"
    ],
    specialties: ["Oncology", "TCM", "Rehabilitation"],
    averageCosts: {
      mri: "¥450-800",
      ct: "¥200-450",
      checkup: "¥1000-2000"
    }
  },
  hangzhou: {
    name: "Hangzhou",
    chinese: "杭州",
    description: "Beautiful city with excellent TCM facilities",
    majorHospitals: [
      "Zhejiang University School of Medicine Affiliated First Hospital",
      "Hangzhou第一人民医院"
    ],
    specialties: ["TCM", "Dermatology", "Ophthalmology"],
    averageCosts: {
      mri: "¥400-700",
      ct: "¥180-400",
      checkup: "¥800-1800"
    }
  },
  chengdu: {
    name: "Chengdu",
    chinese: "成都",
    description: "Western China's medical hub with famous TCM tradition",
    majorHospitals: [
      "West China Hospital of Sichuan University",
      "Chengdu中医药大学附属医院"
    ],
    specialties: ["Orthopedics", "TCM", "Rehabilitation"],
    averageCosts: {
      mri: "¥350-650",
      ct: "¥150-350",
      checkup: "¥700-1500"
    }
  }
};
```

### 12.2 Hospital Database

For each city, maintain a database of:
- Hospital name (English & Chinese)
- Address
- Phone number
- specialties
- International department availability
- JCI certification status
- Average costs for common procedures
- Images
- User ratings

---

## 13. Compliance & Legal

### 13.1 Medical Disclaimer

**Required in all guides and app screens**:

> IMPORTANT: LAVA provides general travel and healthcare information only. The content generated by AI is for reference purposes and should not be considered medical advice, diagnosis, or treatment recommendations. Always consult with qualified healthcare professionals for medical decisions. LAVA is not a medical provider and does not endorse any specific hospitals or treatments.

### 13.2 Data Privacy

- **GDPR Compliance**: For European users
- **CCPA Compliance**: For California users
- **Data Encryption**: AES-256 for data at rest, TLS 1.3 for data in transit
- **Data Retention**: User data deleted after account deletion
- **Third-Party Sharing**: No medical data shared with third parties

### 13.3 Payment Security

- **PCI DSS**: Stripe handles all card data
- **No Card Storage**: App never stores credit card information
- **Secure Transmission**: All payment data encrypted

### 13.4 Content Guidelines

- No medical advice or recommendations
- General information only
- Cost estimates are approximate
- Hospital recommendations based on public data
- User responsible for verifying information

---

## 14. Success Metrics

### 14.1 Key Performance Indicators (KPIs)

#### Product Metrics
- **Guide Generation Rate**: % of started questionnaires that result in guide generation (Target: >90%)
- **Guide Completion Time**: Average time from start to guide delivery (Target: <60 seconds)
- **User Satisfaction**: Post-generation survey score (Target: >4.5/5)
- **Guide Download Rate**: % of guides downloaded as PDF (Target: >40%)

#### Business Metrics
- **Conversion Rate**: % of app users who purchase a guide (Target: >5%)
- **Average Revenue Per User (ARPU)**: Target: $6.99
- **Monthly Recurring Revenue (MRR)**: Target: $10,000 within 6 months
- **Customer Acquisition Cost (CAC)**: Target: <$15

#### Technical Metrics
- **App Crash Rate**: Target: <0.5%
- **API Response Time**: Target: <500ms
- **Uptime**: Target: >99.9%

### 14.2 Analytics Events

```typescript
// Key events to track
analytics.track('app_opened');
analytics.track('city_selected', { city });
analytics.track('questionnaire_started');
analytics.track('questionnaire_completed', { duration });
analytics.track('payment_initiated', { amount });
analytics.track('payment_completed', { amount, method });
analytics.track('guide_generation_started');
analytics.track('guide_generation_completed', { duration });
analytics.track('guide_viewed', { guideId });
analytics.track('guide_downloaded', { guideId, format });
analytics.track('guide_shared', { guideId, platform });
```

---

## 15. Launch Strategy

### 15.1 Phase 1: MVP Launch (Month 1-2)

**Scope**:
- Core questionnaire flow
- AI guide generation
- Basic payment integration
- Single city support (Shanghai)

**Goal**: Validate core functionality and user interest

### 15.2 Phase 2: Full Launch (Month 3-4)

**Scope**:
- All 5 cities
- PDF download
- User accounts
- Payment optimization

**Goal**: Full market launch

### 15.3 Phase 3: Growth (Month 5-6)

**Scope**:
- User feedback integration
- Guide sharing features
- Offline access
- Marketing optimization

**Goal**: Scale user acquisition

### 15.4 Marketing Channels

1. **App Store Optimization (ASO)**: Keywords, screenshots, reviews
2. **Content Marketing**: Blog posts about medical travel in China
3. **Social Media**: Instagram, Facebook targeting travelers
4. **Partnerships**: Travel agencies, medical tourism facilitators
5. **Paid Ads**: Google Ads, Facebook Ads

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| TCM | Traditional Chinese Medicine |
| JCI | Joint Commission International |
| MRI | Magnetic Resonance Imaging |
| CT | Computed Tomography |
| CTA | Call to Action |
| ARPU | Average Revenue Per User |
| MRR | Monthly Recurring Revenue |
| CAC | Customer Acquisition Cost |

---

## Appendix B: References

1. China Medical Tourism Statistics 2026
2. React Native Documentation
3. Stripe Payment Integration Guide
4. OpenAI API Documentation
5. iOS Human Interface Guidelines
6. Material Design Guidelines

---

**Document Version**: 1.0  
**Last Updated**: 2026-09-07  
**Status**: Approved
