import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

// 基础卡片
interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  onPress,
  style,
  children,
  variant = 'default',
  header,
  footer,
}) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    style,
  ];

  const Content = () => (
    <>
      {header && <View style={styles.header}>{header}</View>}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
      </View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Content />
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyles}>
      <Content />
    </View>
  );
};

// 城市卡片
interface CityCardProps {
  name: string;
  nameChinese: string;
  description: string;
  imageUrl: string;
  onPress: () => void;
  selected?: boolean;
  badge?: string;
}

export const CityCard: React.FC<CityCardProps> = ({
  name,
  nameChinese,
  description,
  imageUrl,
  onPress,
  selected = false,
  badge,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.cityCard,
        selected && styles.cityCardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.cityImage}
        resizeMode="cover"
      />
      <View style={styles.cityOverlay} />
      <View style={styles.cityContent}>
        <View style={styles.cityNameRow}>
          <Text style={styles.cityName}>{name}</Text>
          <Text style={styles.cityNameChinese}>{nameChinese}</Text>
        </View>
        <Text style={styles.cityDescription} numberOfLines={2}>
          {description}
        </Text>
        {badge && (
          <View style={styles.cityBadge}>
            <Text style={styles.cityBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {selected && (
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedBadgeText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// 医院卡片
interface HospitalCardProps {
  name: string;
  nameChinese: string;
  specialties: string[];
  rating: number;
  jciCertified: boolean;
  internationalDepartment: boolean;
  imageUrl?: string;
  onPress?: () => void;
  distance?: string;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  name,
  nameChinese,
  specialties,
  rating,
  jciCertified,
  internationalDepartment,
  imageUrl,
  onPress,
  distance,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= Math.floor(rating) ? '★' : i - rating < 1 ? '★' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.hospitalCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.hospitalImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.hospitalContent}>
        <View style={styles.hospitalHeader}>
          <View style={styles.hospitalTitleContainer}>
            <Text style={styles.hospitalName}>{name}</Text>
            <Text style={styles.hospitalNameChinese}>{nameChinese}</Text>
          </View>
          {distance && (
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>{distance}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.ratingRow}>
          <View style={styles.stars}>{renderStars(rating)}</View>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
        
        <View style={styles.badgesRow}>
          {jciCertified && (
            <View style={[styles.badge, styles.jciBadge]}>
              <Text style={[styles.badgeText, styles.jciBadgeText]}>JCI Certified</Text>
            </View>
          )}
          {internationalDepartment && (
            <View style={[styles.badge, styles.intlBadge]}>
              <Text style={[styles.badgeText, styles.intlBadgeText]}>International Dept</Text>
            </View>
          )}
        </View>
        
        <View style={styles.specialtiesRow}>
          {specialties.slice(0, 3).map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
          {specialties.length > 3 && (
            <View style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>+{specialties.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// 选项卡片
interface OptionCardProps {
  title: string;
  description?: string;
  icon?: string;
  selected?: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  selected = false,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.optionCard,
        selected && styles.optionCardSelected,
        disabled && styles.optionCardDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && <Text style={styles.optionIcon}>{icon}</Text>}
      <View style={styles.optionContent}>
        <Text style={[
          styles.optionTitle,
          selected && styles.optionTitleSelected,
        ]}>
          {title}
        </Text>
        {description && (
          <Text style={styles.optionDescription}>{description}</Text>
        )}
      </View>
      {selected && (
        <View style={styles.optionCheckmark}>
          <Text style={styles.optionCheckmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// 信息卡片
interface InfoCardProps {
  title?: string;
  content: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: string;
  style?: ViewStyle;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  content,
  type = 'info',
  icon,
  style,
}) => {
  const typeStyles = {
    info: styles.infoCardInfo,
    success: styles.infoCardSuccess,
    warning: styles.infoCardWarning,
    error: styles.infoCardError,
  };

  const iconMap = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠️',
    error: '✕',
  };

  return (
    <View style={[styles.infoCard, typeStyles[type], style]}>
      <Text style={styles.infoIcon}>{icon || iconMap[type]}</Text>
      <View style={styles.infoContent}>
        {title && <Text style={styles.infoTitle}>{title}</Text>}
        <Text style={styles.infoText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Base Card
  base: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  default: {
    ...shadows.sm,
  },
  elevated: {
    ...shadows.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  content: {
    padding: spacing.md,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.body,
  },
  
  // City Card
  cityCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    height: 180,
    ...shadows.md,
  },
  cityCardSelected: {
    borderWidth: 3,
    borderColor: colors.primaryRed,
  },
  cityImage: {
    width: '100%',
    height: '100%',
  },
  cityOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cityContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  cityNameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  cityName: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginRight: spacing.sm,
  },
  cityNameChinese: {
    fontSize: typography.body,
    color: colors.white + 'CC',
  },
  cityDescription: {
    fontSize: typography.bodySmall,
    color: colors.white + 'EE',
    lineHeight: typography.lineHeight.bodySmall,
  },
  cityBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.primaryRed,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  cityBadgeText: {
    color: colors.white,
    fontSize: typography.caption,
    fontWeight: typography.fontWeight.semiBold,
  },
  selectedBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  selectedBadgeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
  },
  
  // Hospital Card
  hospitalCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  hospitalImage: {
    width: '100%',
    height: 140,
  },
  hospitalContent: {
    padding: spacing.md,
  },
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  hospitalTitleContainer: {
    flex: 1,
  },
  hospitalName: {
    fontSize: typography.h4,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  hospitalNameChinese: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  distanceBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  distanceText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stars: {
    flexDirection: 'row',
    marginRight: spacing.sm,
  },
  star: {
    fontSize: 16,
    color: colors.warningYellow,
  },
  ratingText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  jciBadge: {
    backgroundColor: colors.successGreen + '15',
  },
  intlBadge: {
    backgroundColor: colors.trustBlue + '15',
  },
  badgeText: {
    fontSize: typography.caption,
    fontWeight: typography.fontWeight.semiBold,
  },
  jciBadgeText: {
    color: colors.successGreen,
  },
  intlBadgeText: {
    color: colors.trustBlue,
  },
  specialtiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  specialtyText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  
  // Option Card
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  optionCardSelected: {
    borderColor: colors.primaryRed,
    backgroundColor: colors.primaryRed + '05',
  },
  optionCardDisabled: {
    opacity: 0.5,
  },
  optionIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  optionTitleSelected: {
    color: colors.primaryRed,
  },
  optionDescription: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  optionCheckmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCheckmarkText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
  },
  
  // Info Card
  infoCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  infoCardInfo: {
    backgroundColor: colors.trustBlue + '10',
  },
  infoCardSuccess: {
    backgroundColor: colors.successGreen + '10',
  },
  infoCardWarning: {
    backgroundColor: colors.warningYellow + '15',
  },
  infoCardError: {
    backgroundColor: colors.errorRed + '10',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.bodySmall,
  },
});

export default Card;
