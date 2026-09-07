import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

// 基础加载指示器
interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  style?: ViewStyle;
  variant?: 'spinner' | 'dots' | 'pulse';
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  color = colors.primaryRed,
  text,
  style,
  variant = 'spinner',
}) => {
  const sizeMap = {
    small: 20,
    medium: 40,
    large: 60,
  };

  const renderSpinner = () => (
    <ActivityIndicator size={sizeMap[size]} color={color} />
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: color },
            { animationDelay: `${index * 0.2}s` },
          ]}
        />
      ))}
    </View>
  );

  const renderPulse = () => (
    <View style={[styles.pulse, { backgroundColor: color + '20' }]}>
      <View style={[styles.pulseInner, { backgroundColor: color }]} />
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {variant === 'spinner' && renderSpinner()}
      {variant === 'dots' && renderDots()}
      {variant === 'pulse' && renderPulse()}
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

// 全屏加载
interface FullScreenLoadingProps {
  text?: string;
  visible?: boolean;
}

export const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({
  text = 'Loading...',
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.fullScreenContent}>
        <Loading size="large" text={text} />
      </View>
    </View>
  );
};

// 加载按钮
interface LoadingButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  style,
}) => {
  return (
    <View style={[styles.loadingButton, style]}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={colors.white} />
        </View>
      )}
      {children}
    </View>
  );
};

// 骨架屏
interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  return (
    <View
      style={[
        styles.skeleton,
        { width, height, borderRadius },
        style,
      ]}
    />
  );
};

// 骨架屏卡片
interface SkeletonCardProps {
  lines?: number;
  showImage?: boolean;
  style?: ViewStyle;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  lines = 3,
  showImage = true,
  style,
}) => {
  return (
    <View style={[styles.skeletonCard, style]}>
      {showImage && <Skeleton height={150} borderRadius={borderRadius.xl} />}
      <View style={styles.skeletonCardContent}>
        <Skeleton width="60%" height={20} />
        <Skeleton width="100%" height={16} style={{ marginTop: spacing.sm }} />
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            width={index === lines - 1 ? '70%' : '100%'}
            height={16}
            style={{ marginTop: spacing.sm }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  text: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  
  // Dots variant
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  
  // Pulse variant
  pulse: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  
  // Full screen loading
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  fullScreenContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.lg,
  },
  
  // Loading button
  loadingButton: {
    position: 'relative',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Skeleton
  skeleton: {
    backgroundColor: colors.background,
  },
  skeletonCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  skeletonCardContent: {
    padding: spacing.md,
  },
});

export default Loading;
