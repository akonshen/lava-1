import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text' | 'outline' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const iconColor = variant === 'primary' || variant === 'danger' || variant === 'success'
    ? colors.white
    : colors.primaryRed;

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={iconColor}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <React.Fragment>
              {React.cloneElement(icon as React.ReactElement, { color: iconColor, size: 20 })}
              <Text style={[textStyles, styles.iconMargin]}>{title}</Text>
            </React.Fragment>
          )}
          {!icon && <Text style={textStyles}>{title}</Text>}
          {icon && iconPosition === 'right' && (
            <React.Fragment>
              <Text style={[textStyles, styles.iconMarginRight]}>{title}</Text>
              {React.cloneElement(icon as React.ReactElement, { color: iconColor, size: 20 })}
            </React.Fragment>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

// Icon Button (圆形)
interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}) => {
  const buttonStyles = [
    styles.iconButtonBase,
    styles[`iconButton${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`iconButton${size.charAt(0).toUpperCase() + size.slice(1)}`],
    disabled && styles.iconButtonDisabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.white : colors.primaryRed}
          size="small"
        />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

// 按钮组
interface ButtonGroupProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[styles.buttonGroup, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primaryRed,
    ...shadows.md,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primaryRed,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.errorRed,
    ...shadows.md,
  },
  success: {
    backgroundColor: colors.successGreen,
    ...shadows.md,
  },
  
  // Sizes
  smallButton: {
    height: 40,
    paddingHorizontal: spacing.md,
  },
  mediumButton: {
    height: 56,
    paddingHorizontal: spacing.lg,
  },
  largeButton: {
    height: 64,
    paddingHorizontal: spacing.xl,
  },
  
  // Disabled
  disabled: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
    shadowOpacity: 0,
  },
  
  // Text styles
  text: {
    fontWeight: typography.fontWeight.semiBold,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.primaryRed,
  },
  outlineText: {
    color: colors.textPrimary,
  },
  textText: {
    color: colors.primaryRed,
  },
  dangerText: {
    color: colors.white,
  },
  successText: {
    color: colors.white,
  },
  
  smallText: {
    fontSize: typography.bodySmall,
  },
  mediumText: {
    fontSize: typography.body,
  },
  largeText: {
    fontSize: typography.h4,
  },
  
  disabledText: {
    color: colors.white,
  },
  
  // Icon spacing
  iconMargin: {
    marginLeft: spacing.sm,
  },
  iconMarginRight: {
    marginRight: spacing.sm,
  },
  
  // Icon Button
  iconButtonBase: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
  },
  iconButtonPrimary: {
    backgroundColor: colors.primaryRed,
    ...shadows.md,
  },
  iconButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primaryRed,
  },
  iconButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconButtonSmall: {
    width: 40,
    height: 40,
  },
  iconButtonMedium: {
    width: 56,
    height: 56,
  },
  iconButtonLarge: {
    width: 64,
    height: 64,
  },
  iconButtonDisabled: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
    shadowOpacity: 0,
  },
  
  // Button Group
  buttonGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});

export default Button;
