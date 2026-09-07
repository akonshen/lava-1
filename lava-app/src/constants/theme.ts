export const colors = {
  // Primary Colors
  primaryRed: '#C41E3A',
  primaryRedDark: '#A3182D',
  primaryRedLight: '#E8354F',
  
  trustBlue: '#1E3A5F',
  trustBlueDark: '#142A45',
  trustBlueLight: '#2A5080',
  
  white: '#FFFFFF',
  
  // Secondary Colors
  accentOrange: '#FF6B35',
  successGreen: '#28A745',
  warningYellow: '#FFC107',
  errorRed: '#DC3545',
  
  // Neutral Colors
  textPrimary: '#212529',
  textSecondary: '#6C757D',
  textLight: '#ADB5BD',
  
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  
  border: '#DEE2E6',
  divider: '#E9ECEF',
  
  // Dark Mode
  darkBackground: '#121212',
  darkCardBackground: '#1E1E1E',
  darkTextPrimary: '#FFFFFF',
  darkTextSecondary: '#B0B0B0',
  darkBorder: '#333333',
  
  // Transparency
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const typography = {
  // Font Families
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  
  // Font Sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  bodySmall: 14,
  caption: 12,
  
  // Line Heights
  lineHeight: {
    h1: 40,
    h2: 32,
    h3: 28,
    h4: 24,
    body: 24,
    bodySmall: 20,
    caption: 16,
  },
  
  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const layout = {
  screenPadding: 16,
  headerHeight: 56,
  tabBarHeight: 84,
  buttonHeight: 56,
  cardHeight: 200,
  inputHeight: 56,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
};
