import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header, ProgressIndicator } from '../components/Header';
import { TextInput } from '../components/Input';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { BUDGET_RANGES } from '../constants/cities';
import { useQuestionnaireStore } from '../store';
import { BudgetRange } from '../types';

export const BudgetScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    budgetRange,
    setBudgetRange,
    specificNeeds,
    setSpecificNeeds,
    nextStep,
    prevStep,
    currentStep,
    totalSteps,
  } = useQuestionnaireStore();

  const handleSelectBudget = (range: BudgetRange) => {
    setBudgetRange(range);
  };

  const handleContinue = () => {
    if (budgetRange) {
      nextStep();
      navigation.navigate('Payment' as never);
    }
  };

  const handleBack = () => {
    prevStep();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBack
        onBack={handleBack}
        title="Budget & Details"
      />

      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>What's your budget?</Text>
        <Text style={styles.subtitle}>
          This helps us recommend the right hospitals for you
        </Text>

        <View style={styles.budgetList}>
          {BUDGET_RANGES.map((range) => (
            <TouchableOpacity
              key={range.id}
              style={[
                styles.budgetItem,
                budgetRange === range.id && styles.budgetItemSelected,
              ]}
              onPress={() => handleSelectBudget(range.id as BudgetRange)}
              activeOpacity={0.7}
            >
              <View style={styles.budgetHeader}>
                <Text
                  style={[
                    styles.budgetLabel,
                    budgetRange === range.id && styles.budgetLabelSelected,
                  ]}
                >
                  {range.label}
                </Text>
                {budgetRange === range.id && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.budgetDescription}>{range.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.additionalSection}>
          <Text style={styles.additionalTitle}>Additional Information</Text>
          <Text style={styles.additionalSubtitle}>
            Help us customize your guide further (optional)
          </Text>

          <TextInput
            label="Specific Needs"
            placeholder="e.g., Root canal treatment, MRI scan, acupuncture..."
            value={specificNeeds}
            onChangeText={setSpecificNeeds}
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <View
          style={[
            styles.continueButton,
            !budgetRange && styles.continueButtonDisabled,
          ]}
        >
          <Text
            style={[
              styles.continueButtonText,
              !budgetRange && styles.continueButtonTextDisabled,
            ]}
            onPress={budgetRange ? handleContinue : undefined}
          >
            Continue to Payment
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 100,
  },
  question: {
    fontSize: typography.h2,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  budgetList: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  budgetItem: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
  },
  budgetItemSelected: {
    borderColor: colors.primaryRed,
    backgroundColor: colors.primaryRed + '05',
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  budgetLabel: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  budgetLabelSelected: {
    color: colors.primaryRed,
  },
  budgetDescription: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  additionalSection: {
    marginTop: spacing.md,
  },
  additionalTitle: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  additionalSubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  continueButton: {
    backgroundColor: colors.primaryRed,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.textLight,
  },
  continueButtonText: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  continueButtonTextDisabled: {
    color: colors.white,
  },
});

export default BudgetScreen;
