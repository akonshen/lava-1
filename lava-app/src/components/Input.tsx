import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/theme';

// 文本输入框
interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  clearable?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  error,
  helperText,
  disabled = false,
  required = false,
  maxLength,
  showCharCount = false,
  clearable = false,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [
    styles.container,
    style,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
    disabled && styles.inputContainerDisabled,
    multiline && styles.inputContainerMultiline,
  ];

  const inputStyles = [
    styles.input,
    multiline && styles.inputMultiline,
    leftIcon && styles.inputWithLeftIcon,
    (rightIcon || clearable) && styles.inputWithRightIcon,
    inputStyle,
  ];

  return (
    <View style={containerStyles}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}
      <View style={inputContainerStyles}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <RNTextInput
          style={inputStyles}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        {clearable && value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => onChangeText('')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {(error || helperText || showCharCount) && (
        <View style={styles.bottomRow}>
          {(error || helperText) && (
            <Text style={[styles.helperText, error && styles.errorText]}>
              {error || helperText}
            </Text>
          )}
          {showCharCount && maxLength && (
            <Text style={styles.charCount}>
              {value.length}/{maxLength}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

// 搜索输入框
interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  style?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onClear,
  autoFocus = false,
  style,
}) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <View style={styles.searchIcon}>
        <Text style={styles.searchIconText}>🔍</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        style={styles.searchInput}
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.searchClearButton}
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
        >
          <Text style={styles.searchClearButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// 数字输入框
interface NumberInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChangeText,
  min = 0,
  max = 999,
  step = 1,
  suffix,
  error,
  disabled = false,
  style,
}) => {
  const handleDecrease = () => {
    const newValue = Math.max(min, parseInt(value || '0', 10) - step);
    onChangeText(newValue.toString());
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, parseInt(value || '0', 10) + step);
    onChangeText(newValue.toString());
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.numberInputContainer}>
        <TouchableOpacity
          style={[styles.numberButton, disabled && styles.numberButtonDisabled]}
          onPress={handleDecrease}
          disabled={disabled || parseInt(value || '0', 10) <= min}
        >
          <Text style={styles.numberButtonText}>−</Text>
        </TouchableOpacity>
        <View style={styles.numberInputWrapper}>
          <TextInput
            value={value}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, '');
              const num = parseInt(numericValue, 10);
              if (!isNaN(num) && num >= min && num <= max) {
                onChangeText(numericValue);
              } else if (numericValue === '') {
                onChangeText('');
              }
            }}
            style={styles.numberInput}
            keyboardType="numeric"
            disabled={disabled}
          />
          {suffix && <Text style={styles.numberSuffix}>{suffix}</Text>}
        </View>
        <TouchableOpacity
          style={[styles.numberButton, disabled && styles.numberButtonDisabled]}
          onPress={handleIncrease}
          disabled={disabled || parseInt(value || '0', 10) >= max}
        >
          <Text style={styles.numberButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={[styles.helperText, styles.errorText]}>{error}</Text>}
    </View>
  );
};

// 单选按钮组
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
}

interface RadioButtonGroupProps {
  label?: string;
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  options,
  value,
  onChange,
  style,
  disabled = false,
}) => {
  return (
    <View style={[styles.radioGroup, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.radioOption,
            value === option.value && styles.radioOptionSelected,
            (disabled || option.disabled) && styles.radioOptionDisabled,
          ]}
          onPress={() => !disabled && !option.disabled && onChange(option.value)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.radioCircle,
            value === option.value && styles.radioCircleSelected,
          ]}>
            {value === option.value && <View style={styles.radioInner} />}
          </View>
          <View style={styles.radioContent}>
            <Text
              style={[
                styles.radioLabel,
                value === option.value && styles.radioLabelSelected,
                (disabled || option.disabled) && styles.radioLabelDisabled,
              ]}
            >
              {option.label}
            </Text>
            {option.description && (
              <Text style={styles.radioDescription}>{option.description}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// 复选框组
interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  values,
  onChange,
  style,
  disabled = false,
}) => {
  const handleToggle = (optionValue: string) => {
    if (disabled) return;
    const newValues = values.includes(optionValue)
      ? values.filter((v) => v !== optionValue)
      : [...values, optionValue];
    onChange(newValues);
  };

  return (
    <View style={[styles.checkboxGroup, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.checkboxOption,
            values.includes(option.value) && styles.checkboxOptionSelected,
            (disabled || option.disabled) && styles.checkboxOptionDisabled,
          ]}
          onPress={() => handleToggle(option.value)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.checkbox,
            values.includes(option.value) && styles.checkboxSelected,
          ]}>
            {values.includes(option.value) && (
              <Text style={styles.checkboxCheckmark}>✓</Text>
            )}
          </View>
          <View style={styles.checkboxContent}>
            <Text
              style={[
                styles.checkboxLabel,
                values.includes(option.value) && styles.checkboxLabelSelected,
                (disabled || option.disabled) && styles.checkboxLabelDisabled,
              ]}
            >
              {option.label}
            </Text>
            {option.description && (
              <Text style={styles.checkboxDescription}>{option.description}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// 日期选择器
interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  error,
  disabled = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        error={error}
        disabled={disabled}
        leftIcon={<Text style={styles.calendarIcon}>📅</Text>}
      />
    </View>
  );
};

// 下拉选择器
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  disabled = false,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.selectContainer,
          isOpen && styles.selectContainerOpen,
          error && styles.selectContainerError,
          disabled && styles.selectContainerDisabled,
        ]}
        onPress={() => !disabled && setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.selectText,
          !selectedOption && styles.selectPlaceholder,
        ]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={[styles.selectArrow, isOpen && styles.selectArrowOpen]}>
          ▼
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.selectDropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.selectOption,
                value === option.value && styles.selectOptionSelected,
              ]}
              onPress={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text style={[
                styles.selectOptionText,
                value === option.value && styles.selectOptionTextSelected,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {error && <Text style={[styles.helperText, styles.errorText]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  // Base styles
  container: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.bodySmall,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  required: {
    color: colors.primaryRed,
    marginLeft: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
  },
  inputContainerFocused: {
    borderColor: colors.primaryRed,
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: colors.errorRed,
  },
  inputContainerDisabled: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  inputContainerMultiline: {
    height: 120,
    alignItems: 'flex-start',
    paddingTop: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  inputMultiline: {
    height: '100%',
  },
  inputWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  inputWithRightIcon: {
    marginRight: spacing.sm,
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  clearButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  helperText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  errorText: {
    color: colors.errorRed,
  },
  charCount: {
    fontSize: typography.caption,
    color: colors.textLight,
  },
  
  // Search Input
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchIconText: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
  },
  searchClearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchClearButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  
  // Number Input
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonDisabled: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  numberButtonText: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  numberInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
  },
  numberInput: {
    textAlign: 'center',
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.semiBold,
  },
  numberSuffix: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  
  // Radio Button Group
  radioGroup: {
    marginBottom: spacing.md,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  radioOptionSelected: {
    borderColor: colors.primaryRed,
    backgroundColor: colors.primaryRed + '05',
  },
  radioOptionDisabled: {
    opacity: 0.5,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  radioCircleSelected: {
    borderColor: colors.primaryRed,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryRed,
  },
  radioContent: {
    flex: 1,
  },
  radioLabel: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  radioLabelSelected: {
    color: colors.primaryRed,
  },
  radioLabelDisabled: {
    color: colors.textLight,
  },
  radioDescription: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  
  // Checkbox Group
  checkboxGroup: {
    marginBottom: spacing.md,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  checkboxOptionSelected: {
    borderColor: colors.primaryRed,
    backgroundColor: colors.primaryRed + '05',
  },
  checkboxOptionDisabled: {
    opacity: 0.5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxSelected: {
    backgroundColor: colors.primaryRed,
    borderColor: colors.primaryRed,
  },
  checkboxCheckmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
  },
  checkboxContent: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  checkboxLabelSelected: {
    color: colors.primaryRed,
  },
  checkboxLabelDisabled: {
    color: colors.textLight,
  },
  checkboxDescription: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  
  // Date Picker
  calendarIcon: {
    fontSize: 18,
  },
  
  // Select
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
  },
  selectContainerOpen: {
    borderColor: colors.primaryRed,
    borderWidth: 2,
  },
  selectContainerError: {
    borderColor: colors.errorRed,
  },
  selectContainerDisabled: {
    backgroundColor: colors.background,
  },
  selectText: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  selectPlaceholder: {
    color: colors.textLight,
  },
  selectArrow: {
    fontSize: 12,
    color: colors.textSecondary,
    transform: [{ rotate: '0deg' }],
  },
  selectArrowOpen: {
    transform: [{ rotate: '180deg' }],
  },
  selectDropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 1000,
  },
  selectOption: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  selectOptionSelected: {
    backgroundColor: colors.primaryRed + '10',
  },
  selectOptionText: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  selectOptionTextSelected: {
    color: colors.primaryRed,
    fontWeight: typography.fontWeight.medium,
  },
});

export default TextInput;
