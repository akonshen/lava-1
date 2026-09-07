import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

// 基础头部
interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
  transparent?: boolean;
  variant?: 'default' | 'elevated' | 'transparent';
  style?: any;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  leftAction,
  transparent = false,
  variant = 'default',
  style,
}) => {
  const containerStyles = [
    styles.container,
    transparent && styles.transparent,
    variant === 'elevated' && styles.elevated,
    style,
  ];

  return (
    <>
      <StatusBar
        barStyle={transparent ? 'light-content' : 'dark-content'}
        backgroundColor={transparent ? 'transparent' : colors.white}
      />
      <View style={containerStyles}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Text style={[styles.backIcon, transparent && styles.backIconTransparent]}>
                ←
              </Text>
            </TouchableOpacity>
          )}
          {leftAction && leftAction}
        </View>
        
        <View style={styles.center}>
          {title && (
            <View>
              <Text style={[styles.title, transparent && styles.titleTransparent]}>
                {title}
              </Text>
              {subtitle && (
                <Text style={[styles.subtitle, transparent && styles.subtitleTransparent]}>
                  {subtitle}
                </Text>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.right}>
          {rightAction}
        </View>
      </View>
    </>
  );
};

// Logo组件
interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  const sizeStyles = {
    small: styles.logoSmall,
    medium: styles.logoMedium,
    large: styles.logoLarge,
  };

  const textStyles = {
    small: styles.logoTextSmall,
    medium: styles.logoTextMedium,
    large: styles.logoTextLarge,
  };

  return (
    <View style={[styles.logo, sizeStyles[size]]}>
      {showText && (
        <Text style={[styles.logoText, textStyles[size]]}>LAVA</Text>
      )}
    </View>
  );
};

// 进度指示器
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  variant?: 'dots' | 'bar' | 'steps';
  showLabel?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  variant = 'dots',
  showLabel = true,
}) => {
  const renderDots = () => (
    <View style={styles.progressBar}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index < currentStep && styles.progressDotActive,
            index === currentStep - 1 && styles.progressDotCurrent,
          ]}
        />
      ))}
    </View>
  );

  const renderBar = () => (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${(currentStep / totalSteps) * 100}%` },
          ]}
        />
      </View>
    </View>
  );

  const renderSteps = () => (
    <View style={styles.stepsContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View key={index} style={styles.stepItem}>
          <View
            style={[
              styles.stepCircle,
              index < currentStep && styles.stepCircleActive,
              index === currentStep - 1 && styles.stepCircleCurrent,
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                index < currentStep && styles.stepNumberActive,
              ]}
            >
              {index < currentStep ? '✓' : index + 1}
            </Text>
          </View>
          {index < totalSteps - 1 && (
            <View
              style={[
                styles.stepLine,
                index < currentStep && styles.stepLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.progressContainer}>
      {variant === 'dots' && renderDots()}
      {variant === 'bar' && renderBar()}
      {variant === 'steps' && renderSteps()}
      {showLabel && (
        <Text style={styles.progressText}>
          Step {currentStep} of {totalSteps}
        </Text>
      )}
    </View>
  );
};

// 标题组件
interface TitleProps {
  title: string;
  subtitle?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  align?: 'left' | 'center' | 'right';
  style?: any;
}

export const Title: React.FC<TitleProps> = ({
  title,
  subtitle,
  variant = 'h2',
  align = 'left',
  style,
}) => {
  const titleStyles = [
    styles[`title${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    { textAlign: align },
    style,
  ];

  return (
    <View style={styles.titleContainer}>
      <Text style={titleStyles}>{title}</Text>
      {subtitle && (
        <Text style={[styles.titleSubtitle, { textAlign: align }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

// 分隔线组件
interface DividerProps {
  style?: any;
}

export const Divider: React.FC<DividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  // Header
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  elevated: {
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  left: {
    width: 48,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 48,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  backIconTransparent: {
    color: colors.white,
  },
  title: {
    fontSize: typography.h4,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  titleTransparent: {
    color: colors.white,
  },
  subtitle: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  subtitleTransparent: {
    color: colors.white + 'CC',
  },
  
  // Logo
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSmall: {
    width: 60,
    height: 24,
  },
  logoMedium: {
    width: 80,
    height: 32,
  },
  logoLarge: {
    width: 120,
    height: 48,
  },
  logoText: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryRed,
  },
  logoTextSmall: {
    fontSize: 18,
  },
  logoTextMedium: {
    fontSize: 24,
  },
  logoTextLarge: {
    fontSize: 36,
  },
  
  // Progress Indicator
  progressContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.primaryRed,
  },
  progressDotCurrent: {
    width: 24,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryRed,
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  stepCircleActive: {
    backgroundColor: colors.primaryRed,
    borderColor: colors.primaryRed,
  },
  stepCircleCurrent: {
    borderColor: colors.primaryRed,
  },
  stepNumber: {
    fontSize: typography.bodySmall,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
  },
  stepNumberActive: {
    color: colors.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.border,
  },
  stepLineActive: {
    backgroundColor: colors.primaryRed,
  },
  progressText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  
  // Title
  titleContainer: {
    marginBottom: spacing.md,
  },
  titleH1: {
    fontSize: typography.h1,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  titleH2: {
    fontSize: typography.h2,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  titleH3: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  titleH4: {
    fontSize: typography.h4,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  titleSubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
});

export default Header;
