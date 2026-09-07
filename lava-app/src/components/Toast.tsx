import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  Platform,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

// Toast类型
type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast位置
type ToastPosition = 'top' | 'bottom';

// Toast配置
interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    onPress: () => void;
  };
}

// Toast状态
interface ToastState extends ToastConfig {
  visible: boolean;
}

// 全局Toast管理器
class ToastManager {
  private static instance: ToastManager;
  private listeners: Array<(state: ToastState) => void> = [];
  private currentState: ToastState = {
    message: '',
    visible: false,
  };
  private timeout: NodeJS.Timeout | null = null;

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  subscribe(listener: (state: ToastState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  show(config: ToastConfig) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.currentState = {
      ...config,
      visible: true,
    };
    this.notify();

    const duration = config.duration || 3000;
    this.timeout = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.currentState = {
      ...this.currentState,
      visible: false,
    };
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.currentState }));
  }
}

// Toast组件
interface ToastProps {
  state: ToastState;
}

const Toast: React.FC<ToastProps> = ({ state }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(state.position === 'top' ? -100 : 100));

  useEffect(() => {
    if (state.visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: state.position === 'top' ? -100 : 100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state.visible]);

  if (!state.visible) return null;

  const iconMap: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const typeStyles: Record<ToastType, ViewStyle> = {
    success: styles.toastSuccess,
    error: styles.toastError,
    warning: styles.toastWarning,
    info: styles.toastInfo,
  };

  const containerStyles: ViewStyle[] = [
    styles.toast,
    typeStyles[state.type || 'info'],
    state.position === 'bottom' && styles.toastBottom,
  ];

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={containerStyles}>
        <Text style={styles.toastIcon}>{iconMap[state.type || 'info']}</Text>
        <Text style={styles.toastMessage} numberOfLines={2}>
          {state.message}
        </Text>
        {state.action && (
          <Text style={styles.toastAction} onPress={state.action.onPress}>
            {state.action.label}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

// Toast Provider
interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastState, setToastState] = useState<ToastState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    const manager = ToastManager.getInstance();
    const unsubscribe = manager.subscribe(setToastState);
    return unsubscribe;
  }, []);

  return (
    <>
      {children}
      <Toast state={toastState} />
    </>
  );
};

// Toast Hook
export const useToast = () => {
  const show = (config: ToastConfig) => {
    ToastManager.getInstance().show(config);
  };

  const hide = () => {
    ToastManager.getInstance().hide();
  };

  const success = (message: string, duration?: number) => {
    show({ message, type: 'success', duration });
  };

  const error = (message: string, duration?: number) => {
    show({ message, type: 'error', duration });
  };

  const warning = (message: string, duration?: number) => {
    show({ message, type: 'warning', duration });
  };

  const info = (message: string, duration?: number) => {
    show({ message, type: 'info', duration });
  };

  return {
    show,
    hide,
    success,
    error,
    warning,
    info,
  };
};

// 静态Toast方法
export const Toast = {
  show: (config: ToastConfig) => ToastManager.getInstance().show(config),
  hide: () => ToastManager.getInstance().hide(),
  success: (message: string, duration?: number) =>
    ToastManager.getInstance().show({ message, type: 'success', duration }),
  error: (message: string, duration?: number) =>
    ToastManager.getInstance().show({ message, type: 'error', duration }),
  warning: (message: string, duration?: number) =>
    ToastManager.getInstance().show({ message, type: 'warning', duration }),
  info: (message: string, duration?: number) =>
    ToastManager.getInstance().show({ message, type: 'info', duration }),
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: spacing.md,
    right: spacing.md,
    zIndex: 9999,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    maxWidth: 400,
    width: '100%',
    ...shadows.md,
  },
  toastBottom: {
    top: undefined,
    bottom: Platform.OS === 'ios' ? 40 : 20,
  },
  toastSuccess: {
    borderLeftWidth: 4,
    borderLeftColor: colors.successGreen,
  },
  toastError: {
    borderLeftWidth: 4,
    borderLeftColor: colors.errorRed,
  },
  toastWarning: {
    borderLeftWidth: 4,
    borderLeftColor: colors.warningYellow,
  },
  toastInfo: {
    borderLeftWidth: 4,
    borderLeftColor: colors.trustBlue,
  },
  toastIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  toastMessage: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  toastAction: {
    fontSize: typography.body,
    color: colors.primaryRed,
    fontWeight: typography.fontWeight.semiBold,
    marginLeft: spacing.md,
  },
});

export default Toast;
