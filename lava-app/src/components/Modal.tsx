import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';
import { Button } from './Button';

// 基础模态框
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'center' | 'bottom' | 'full';
  showCloseButton?: boolean;
  style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  variant = 'center',
  showCloseButton = true,
  style,
}) => {
  const modalStyles = [
    styles.modal,
    variant === 'bottom' && styles.modalBottom,
    variant === 'full' && styles.modalFull,
    style,
  ];

  return (
    <RNModal
      visible={visible}
      transparent
      animationType={variant === 'bottom' ? 'slide' : 'fade'}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={modalStyles}>
              {variant === 'center' && (
                <View style={styles.handle} />
              )}
              
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  {title && <Text style={styles.title}>{title}</Text>}
                  {showCloseButton && (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClose}
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              
              <View style={styles.content}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// 确认对话框
interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  loading = false,
}) => {
  const iconMap = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '⚠️',
  };

  const buttonVariant = variant === 'danger' ? 'danger' : 'primary';

  return (
    <Modal visible={visible} onClose={onClose} title={title}>
      <View style={styles.confirmContainer}>
        <Text style={styles.confirmIcon}>{iconMap[variant]}</Text>
        <Text style={styles.confirmMessage}>{message}</Text>
        
        <View style={styles.confirmActions}>
          <Button
            title={cancelText}
            variant="outline"
            onPress={onClose}
            style={styles.confirmButton}
            disabled={loading}
          />
          <Button
            title={confirmText}
            variant={buttonVariant}
            onPress={onConfirm}
            style={styles.confirmButton}
            loading={loading}
          />
        </View>
      </View>
    </Modal>
  );
};

// 底部操作表
interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  actions: ActionSheetAction[];
}

interface ActionSheetAction {
  label: string;
  icon?: string;
  onPress: () => void;
  variant?: 'default' | 'danger' | 'success';
  disabled?: boolean;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  title,
  actions,
}) => {
  return (
    <Modal visible={visible} onClose={onClose} variant="bottom" title={title}>
      <View style={styles.actionSheetContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.actionSheetItem,
              action.disabled && styles.actionSheetItemDisabled,
            ]}
            onPress={() => {
              action.onPress();
              onClose();
            }}
            disabled={action.disabled}
          >
            {action.icon && <Text style={styles.actionSheetIcon}>{action.icon}</Text>}
            <Text
              style={[
                styles.actionSheetLabel,
                action.variant === 'danger' && styles.actionSheetLabelDanger,
                action.variant === 'success' && styles.actionSheetLabelSuccess,
                action.disabled && styles.actionSheetLabelDisabled,
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

// 信息模态框
interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content: string;
  icon?: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  onClose,
  title,
  content,
  icon = 'ℹ️',
}) => {
  return (
    <Modal visible={visible} onClose={onClose} title={title}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoIcon}>{icon}</Text>
        <Text style={styles.infoContent}>{content}</Text>
        <Button
          title="Got it"
          onPress={onClose}
          fullWidth
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    maxHeight: '80%',
    ...shadows.lg,
  },
  modalBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    maxWidth: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalFull: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    fontSize: typography.h4,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  content: {
    padding: spacing.md,
  },
  
  // Confirm Modal
  confirmContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
  confirmIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  confirmMessage: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.body,
    marginBottom: spacing.xl,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  confirmButton: {
    flex: 1,
  },
  
  // Action Sheet
  actionSheetContainer: {
    padding: spacing.sm,
  },
  actionSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
  },
  actionSheetItemDisabled: {
    opacity: 0.5,
  },
  actionSheetIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  actionSheetLabel: {
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  actionSheetLabelDanger: {
    color: colors.errorRed,
  },
  actionSheetLabelSuccess: {
    color: colors.successGreen,
  },
  actionSheetLabelDisabled: {
    color: colors.textLight,
  },
  
  // Info Modal
  infoContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
  infoIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  infoContent: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.body,
    marginBottom: spacing.xl,
  },
});

export default Modal;
