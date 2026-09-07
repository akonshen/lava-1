# LAVA - Medical Travel Guide

A mobile application that provides personalized medical travel guides for Western tourists visiting China.

## Features

- AI-powered personalized guide generation
- 5 major city coverage (Beijing, Shanghai, Guangzhou, Hangzhou, Chengdu)
- Hospital recommendations with JCI certification badges
- Cost estimates and comparisons
- Step-by-step就医 process guides
- Transportation and accommodation suggestions
- Offline PDF download

## Tech Stack

### Frontend (Mobile)
- React Native 0.86.3 with Expo
- TypeScript
- React Navigation
- Zustand (State Management)
- React Native Paper (UI Components)

### Backend
- Node.js with Express
- TypeScript
- OpenAI API (GPT-4)
- Stripe (Payment Processing)

## Project Structure

```
lava-1/
├── lava-app/          # React Native mobile app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # App screens
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   ├── types/         # TypeScript types
│   │   └── constants/     # App constants
│   └── App.tsx
├── server/            # Backend API server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── package.json
├── PRD.md             # Product Requirements Document
└── UI-DESIGN.md       # UI/UX Design System
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app (for mobile testing)

### Mobile App Setup

```bash
cd lava-app
npm install
npm start
```

Scan the QR code with Expo Go app to run on your device.

### Backend Server Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

The server will start at http://localhost:3000

## API Endpoints

### Guides
- `POST /api/guides` - Create new guide
- `GET /api/guides/:id` - Get guide by ID
- `GET /api/guides/:id/content` - Get guide content

### Payments
- `POST /api/payments` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

### Cities
- `GET /api/cities` - List all cities
- `GET /api/cities/:id` - Get city details
- `GET /api/cities/:id/hospitals` - Get hospitals in city

## Environment Variables

### Server (.env)
```
PORT=3000
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4
```

## License

MIT
