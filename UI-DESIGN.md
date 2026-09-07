# LAVA - UI/UX Design System

## Design Overview

This document defines the visual design system and UI components for the LAVA mobile application. The design follows a clean, professional aesthetic that builds trust while providing an excellent user experience for Western tourists navigating China's healthcare system.

---

## 1. Design Principles

### 1.1 Core Principles

1. **Trust & Credibility**: Medical content requires a professional, trustworthy appearance
2. **Clarity First**: Information-dense content must be scannable and easy to understand
3. **Cultural Sensitivity**: Design respects both Western and Chinese cultural contexts
4. **Accessibility**: WCAG 2.1 AA compliance for color contrast and readability
5. **Efficiency**: Minimize steps to complete tasks, especially guide generation

### 1.2 Design Language

**Visual Style**: Modern minimalist with warm accents
**Tone**: Professional yet approachable
**Feeling**: Safe, reliable, helpful

---

## 2. Color System

### 2.1 Primary Colors

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| 🔴 | LAVA Red | #C41E3A | 196, 30, 58 | Primary CTAs, brand color |
| 🔵 | Trust Blue | #1E3A5F | 30, 58, 95 | Headers, navigation, trust elements |
| ⚪ | Clean White | #FFFFFF | 255, 255, 255 | Backgrounds, cards |

### 2.2 Secondary Colors

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| 🟠 | Accent Orange | #FF6B35 | 255, 107, 53 | Highlights, secondary CTAs |
| 🟢 | Success Green | #28A745 | 40, 167, 69 | Success states, confirmations |
| 🟡 | Warning Yellow | #FFC107 | 255, 193, 7 | Warnings, attention |
| 🔴 | Error Red | #DC3545 | 220, 53, 69 | Errors, destructive actions |

### 2.3 Neutral Colors

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| ⬛ | Text Primary | #212529 | 33, 37, 41 | Primary text |
| ⬜ | Text Secondary | #6C757D | 108, 117, 125 | Secondary text, captions |
| ⬜ | Text Light | #ADB5BD | 173, 181, 189 | Placeholders, disabled |
| ⬜ | Background | #F8F9FA | 248, 249, 250 | Page background |
| ⬜ | Card Background | #FFFFFF | 255, 255, 255 | Cards, surfaces |
| ⬜ | Border | #DEE2E6 | 222, 226, 230 | Borders, dividers |
| ⬜ | Divider | #E9ECEF | 233, 236, 239 | Section dividers |

### 2.4 Dark Mode Colors

| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| #FFFFFF | #121212 | Background |
| #F8F9FA | #1E1E1E | Card background |
| #212529 | #FFFFFF | Primary text |
| #6C757D | #B0B0B0 | Secondary text |
| #DEE2E6 | #333333 | Borders |

---

## 3. Typography

### 3.1 Font Family

**Primary (English)**: Inter
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700

**Secondary (Chinese)**: PingFang SC / Noto Sans SC
- Regular: 400
- Medium: 500
- SemiBold: 600

### 3.2 Type Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| H1 | 32px | 40px | Bold | Screen titles |
| H2 | 24px | 32px | SemiBold | Section headers |
| H3 | 20px | 28px | SemiBold | Card titles |
| H4 | 18px | 24px | SemiBold | Subsection headers |
| Body | 16px | 24px | Regular | Body text |
| Body Small | 14px | 20px | Regular | Captions, labels |
| Caption | 12px | 16px | Regular | Fine print |
| Button | 16px | 24px | SemiBold | Button text |

### 3.3 Type Examples

```typescript
// Typography styles
export const typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    color: colors.textSecondary,
  },
};
```

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

| Name | Value | Usage |
|------|-------|-------|
| xs | 4px | Icon padding, tight spacing |
| sm | 8px | Small gaps, internal padding |
| md | 16px | Default spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large section spacing |
| xxl | 48px | Screen padding |

### 4.2 Layout Grid

**Screen Width**: 375px (iPhone) - 412px (Android)
**Content Width**: 343px (16px padding each side)
**Column System**: 4-column grid

```typescript
export const layout = {
  screenPadding: 16,
  contentWidth: 343,
  columnWidth: 80.75,
  gutter: 16,
};
```

### 4.3 Safe Areas

```typescript
export const safeAreas = {
  top: Platform.OS === 'ios' ? 44 : 24,
  bottom: Platform.OS === 'ios' ? 34 : 0,
};
```

---

## 5. Components

### 5.1 Buttons

#### Primary Button
```typescript
// Used for main actions (CTAs)
const PrimaryButton = {
  backgroundColor: colors.primaryRed,
  textColor: colors.white,
  height: 56,
  borderRadius: 12,
  paddingHorizontal: 24,
  fontSize: 16,
  fontWeight: '600',
  // States
  pressed: {
    backgroundColor: '#A3182D', // Darker red
  },
  disabled: {
    backgroundColor: colors.textLight,
    textColor: colors.white,
  },
};
```

#### Secondary Button
```typescript
// Used for secondary actions
const SecondaryButton = {
  backgroundColor: 'transparent',
  borderColor: colors.primaryRed,
  borderWidth: 2,
  textColor: colors.primaryRed,
  height: 56,
  borderRadius: 12,
  paddingHorizontal: 24,
};
```

#### Text Button
```typescript
// Used for low-emphasis actions
const TextButton = {
  backgroundColor: 'transparent',
  textColor: colors.primaryRed,
  height: 44,
  paddingHorizontal: 16,
};
```

### 5.2 Cards

#### City Card
```typescript
const CityCard = {
  width: '100%',
  height: 200,
  borderRadius: 16,
  backgroundColor: colors.white,
  shadow: {
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 8,
    color: colors.black,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 16,
  },
  content: {
    padding: 16,
  },
};
```

#### Hospital Card
```typescript
const HospitalCard = {
  width: '100%',
  borderRadius: 12,
  backgroundColor: colors.white,
  padding: 16,
  shadow: {
    offset: { width: 0, height: 1 },
    opacity: 0.05,
    radius: 4,
    color: colors.black,
  },
};
```

#### Info Card
```typescript
const InfoCard = {
  width: '100%',
  borderRadius: 12,
  backgroundColor: colors.background,
  padding: 16,
};
```

### 5.3 Input Fields

#### Text Input
```typescript
const TextInput = {
  height: 56,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.border,
  backgroundColor: colors.white,
  paddingHorizontal: 16,
  fontSize: 16,
  // States
  focused: {
    borderColor: colors.primaryRed,
    borderWidth: 2,
  },
  error: {
    borderColor: colors.errorRed,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
};
```

#### Radio Button Group
```typescript
const RadioButton = {
  size: 24,
  borderWidth: 2,
  borderColor: colors.border,
  selectedBorderColor: colors.primaryRed,
  innerCircle: {
    size: 12,
    color: colors.primaryRed,
  },
};
```

### 5.4 Navigation

#### Bottom Tab Bar
```typescript
const TabBar = {
  height: 84,
  backgroundColor: colors.white,
  borderTopWidth: 1,
  borderTopColor: colors.divider,
  // Tab item
  item: {
    iconSize: 24,
    fontSize: 10,
    activeColor: colors.primaryRed,
    inactiveColor: colors.textSecondary,
  },
};
```

#### Header
```typescript
const Header = {
  height: 56,
  backgroundColor: colors.white,
  borderBottomWidth: 1,
  borderBottomColor: colors.divider,
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    size: 24,
    color: colors.textPrimary,
  },
};
```

---

## 6. Iconography

### 6.1 Icon Set

**Primary**: React Native Vector Icons (MaterialCommunityIcons)
**Custom Icons**: SVG-based custom icons for brand elements

### 6.2 Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| xs | 16px | Inline icons |
| sm | 20px | Small buttons, tags |
| md | 24px | Standard icons, tab bar |
| lg | 32px | Feature icons |
| xl | 48px | Empty states, onboarding |

### 6.3 Core Icons

```typescript
const coreIcons = {
  // Navigation
  home: 'home',
  search: 'magnify',
  profile: 'account',
  settings: 'cog',
  
  // Actions
  arrowLeft: 'arrow-left',
  arrowRight: 'arrow-right',
  close: 'close',
  check: 'check',
  plus: 'plus',
  minus: 'minus',
  
  // Medical
  hospital: 'hospital-box',
  doctor: 'doctor',
  medicine: 'medical-bag',
  emergency: 'ambulance',
  
  // Travel
  city: 'city',
  map: 'map-marker',
  hotel: 'bed',
  transport: 'train',
  
  // Payment
  creditCard: 'credit-card',
  apple: 'apple',
  google: 'google',
  
  // Content
  download: 'download',
  share: 'share-variant',
  bookmark: 'bookmark',
  heart: 'heart',
};
```

---

## 7. Screen Designs

### 7.1 Welcome Screen

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│           [LAVA Logo]               │
│                                     │
│      Your Medical Travel            │
│       Companion in China            │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    [City Preview Carousel]  │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │       Get Started           │   │
│  └─────────────────────────────┘   │
│                                     │
│      Already have an account?       │
│              Sign In                │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:
- LAVA logo (centered)
- Tagline: "Your Medical Travel Companion in China"
- City preview carousel (auto-scrolling)
- Primary CTA: "Get Started"
- Secondary: "Sign In" link

### 7.2 City Selection Screen

```
┌─────────────────────────────────────┐
│  ← Back                    LAVA     │
├─────────────────────────────────────┤
│                                     │
│  Where are you traveling?           │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Beijing Image]            │   │
│  │  Beijing · 北京              │   │
│  │  China's capital with       │   │
│  │  world-class hospitals      │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Shanghai Image]           │   │
│  │  Shanghai · 上海             │   │
│  │  China's medical hub        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Guangzhou Image]          │   │
│  │  Guangzhou · 广州            │   │
│  │  Southern China's center    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Hangzhou Image]           │   │
│  │  Hangzhou · 杭州             │   │
│  │  Beautiful city with TCM    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Chengdu Image]            │   │
│  │  Chengdu · 成都              │   │
│  │  Western China's hub        │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:
- Header with back button
- Question: "Where are you traveling?"
- 5 city cards with images
- Each card shows: Image, Name (English + Chinese), Brief description

### 7.3 Questionnaire Screen

```
┌─────────────────────────────────────┐
│  ← Back                    LAVA     │
├─────────────────────────────────────┤
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Step 1 of 4                        │
├─────────────────────────────────────┤
│                                     │
│  What type of medical service       │
│  do you need?                       │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○  Dental                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○  Health Checkup          │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○  Traditional Chinese     │   │
│  │     Medicine (TCM)          │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○  Specialist Visit        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○  Emergency               │   │
│  └─────────────────────────────┘   │
│                                     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │          Next               │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:
- Progress indicator (step X of Y)
- Question text
- Radio button options (scrollable)
- Primary CTA: "Next"

### 7.4 Payment Screen

```
┌─────────────────────────────────────┐
│  ← Back                    LAVA     │
├─────────────────────────────────────┤
│                                     │
│  Complete Your Order                │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Shanghai Medical Guide     │   │
│  │                             │   │
│  │  • Personalized hospital    │   │
│  │    recommendations          │   │
│  │  • Step-by-step process     │   │
│  │  • Cost estimates           │   │
│  │  • Transportation guide     │   │
│  │                             │   │
│  │  ─────────────────────────  │   │
│  │  Total: $6.99               │   │
│  └─────────────────────────────┘   │
│                                     │
│  Payment Method                     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Apple Pay]                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Google Pay]               │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Credit or Debit Card       │   │
│  │  •••• •••• •••• 4242        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │    Pay $6.99                │   │
│  └─────────────────────────────┘   │
│                                     │
│  🔒 Secure payment powered by       │
│     Stripe                          │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:
- Order summary card
- Payment method selection
- Apple Pay / Google Pay buttons
- Credit card input
- Primary CTA: "Pay $6.99"
- Security badge

### 7.5 Guide Generation Screen

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│                                     │
│           [Loading Animation]       │
│                                     │
│      Generating your personalized   │
│           guide...                  │
│                                     │
│      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│      60% complete                   │
│                                     │
│      This may take 10-30 seconds    │
│                                     │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:
- Animated LAVA logo or custom loading animation
- Status text
- Progress bar
- Time estimate

### 7.6 Guide Display Screen

```
┌─────────────────────────────────────┐
│  ← Back     Shanghai Guide    ⬇ 📤 │
├─────────────────────────────────────┤
│                                     │
│  Your Shanghai Medical Guide        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [City Header Image]        │   │
│  │                             │   │
│  │  Shanghai · 上海             │   │
│  │  Generated for John D.      │   │
│  │  October 2026               │   │
│  └─────────────────────────────┘   │
│                                     │
│  📋 Table of Contents               │
│  ─────────────────────────────────  │
│  1. City Overview                   │
│  2. Recommended Hospitals           │
│  3. Step-by-Step Process            │
│  4. Cost Estimates                  │
│  5. Transportation                  │
│  6. Tips & Notes                    │
│                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                     │
│  1. City Overview                   │
│  ─────────────────────────────────  │
│                                     │
│  Shanghai is China's largest city   │
│  and a major medical hub with       │
│  world-class healthcare facilities. │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Hospital Image]           │   │
│  │                             │   │
│  │  Huashan Hospital           │   │
│  │  华山医院                    │   │
│  │                             │   │
│  │  ★★★★★ JCI Certified        │   │
│  │  Neurosurgery, Dermatology  │   │
│  │                             │   │
│  │  International Dept: Yes    │   │
│  │  English Staff: Yes         │   │
│  │                             │   │
│  │  [View Details →]           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Another Hospital Card]    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                     │
│  2. Cost Estimates                  │
│  ─────────────────────────────────  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Service        │ Cost     │   │
│  │  ───────────────┼──────────│   │
│  │  MRI            │ ¥500-900 │   │
│  │  CT Scan        │ ¥250-500 │   │
│  │  Blood Test     │ ¥50-150  │   │
│  │  Consultation   │ ¥100-300 │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │    Download PDF (Free)      │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │    Share Guide              │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:
- Header with download and share buttons
- Guide title and metadata
- Table of contents (collapsible)
- Section content with rich formatting
- Hospital cards with images and badges
- Cost comparison tables
- Download PDF button
- Share button

---

## 8. Animations & Transitions

### 8.1 Page Transitions

```typescript
// Slide from right (default)
const slideFromRight = {
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
  screenStyleInterpolator: ({ current }) => ({
    cardStyle: {
      transform: [
        { translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [screenWidth, 0],
        })},
      ],
    },
  }),
};
```

### 8.2 Loading Animations

```typescript
// Pulsing dot animation for guide generation
const pulsingDot = {
  0: { scale: 1, opacity: 1 },
  0.5: { scale: 1.2, opacity: 0.7 },
  1: { scale: 1, opacity: 1 },
};

// Progress bar animation
const progressBar = {
  from: { width: '0%' },
  to: { width: '100%' },
};
```

### 8.3 Micro-interactions

```typescript
// Button press feedback
const buttonPress = {
  0: { scale: 1 },
  0.5: { scale: 0.98 },
  1: { scale: 1 },
};

// Card hover effect (for web)
const cardHover = {
  rest: { y: 0, shadow: 4 },
  hover: { y: -4, shadow: 8 },
};
```

---

## 9. Accessibility

### 9.1 Color Contrast

| Element | Foreground | Background | Ratio | WCAG |
|---------|------------|------------|-------|------|
| Body text | #212529 | #FFFFFF | 16.1:1 | AAA |
| Secondary text | #6C757D | #FFFFFF | 5.7:1 | AA |
| Primary button | #FFFFFF | #C41E3A | 5.2:1 | AA |
| Link text | #C41E3A | #FFFFFF | 5.2:1 | AA |

### 9.2 Touch Targets

- Minimum touch target: 44x44px
- Button height: 56px
- Icon buttons: 48x48px with 24px icon

### 9.3 Screen Reader Support

```typescript
// Accessibility labels for all interactive elements
accessibilityLabel="Select Beijing as your destination"
accessibilityRole="button"
accessibilityState={{ selected: isSelected }}
```

### 9.4 Dynamic Type

```typescript
// Support for system font size
const dynamicType = {
  body: {
    fontSize: 16 * fontScale,
  },
};
```

---

## 10. Design Tokens

### 10.1 Complete Token List

```typescript
export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};
```

---

## 11. Figma Design Checklist

### 11.1 Required Frames

- [ ] Splash Screen
- [ ] Onboarding Flow (3 screens)
- [ ] Home / Welcome Screen
- [ ] City Selection Screen
- [ ] Questionnaire Flow (4-6 screens)
- [ ] Payment Screen
- [ ] Loading Screen
- [ ] Guide Display Screen
- [ ] Profile / Settings Screen

### 11.2 Required Components

- [ ] Buttons (Primary, Secondary, Text, Icon)
- [ ] Cards (City, Hospital, Info)
- [ ] Input Fields (Text, Radio, Checkbox)
- [ ] Navigation (Header, Tab Bar)
- [ ] Modals & Sheets
- [ ] Loading States
- [ ] Error States
- [ ] Empty States

### 11.3 Required Assets

- [ ] App Icon (iOS & Android)
- [ ] Splash Screen Image
- [ ] City Images (5 cities)
- [ ] Hospital Stock Photos (10-15)
- [ ] Illustrations (Onboarding, Empty States)
- [ ] Icons (Custom set)
- [ ] Logo Variations

---

## 12. Handoff Notes

### 12.1 Design Tool
- **Primary**: Figma
- **Component Library**: LAVA Design System
- **File Structure**: Organized by screen and component

### 12.2 Export Specifications

```typescript
// Image exports
const exports = {
  // @1x, @2x, @3x for iOS
  // mdpi, hdpi, xhdpi, xxhdpi for Android
  formats: ['png', 'svg'],
  quality: 100,
  compression: 'lossless',
};
```

### 12.3 Developer Notes

- All colors defined as design tokens
- Spacing follows 4px grid system
- Typography uses system fonts with fallbacks
- Shadows use platform-specific properties
- Animations use React Native Reanimated

---

**Document Version**: 1.0  
**Last Updated**: 2026-09-07  
**Status**: Ready for Development
