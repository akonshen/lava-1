import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header, ProgressIndicator } from '../components/Header';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { MEDICAL_TYPES } from '../constants/cities';
import { useQuestionnaireStore } from '../store';
import { MedicalType } from '../types';

export const MedicalTypeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { medicalType, setMedicalType, nextStep, prevStep, currentStep, totalSteps } = useQuestionnaireStore();

  const handleSelectType = (type: MedicalType) => {
    setMedicalType(type);
  };

  const handleContinue = () => {
    if (medicalType) {
      nextStep();
      navigation.navigate('TravelDates' as never);
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
        title="Medical Need"
      />

      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>
          What type of medical service do you need?
        </Text>
        <Text style={styles.subtitle}>
          Select the option that best describes your needs
        </Text>

        <View style={styles.optionList}>
          {MEDICAL_TYPES.map((type) => (
            <View
              key={type.id}
              style={[
                styles.optionItem,
                medicalType === type.id && styles.optionItemSelected,
              ]}
            >
              <Text
                style={styles.optionIcon}
                onPress={() => handleSelectType(type.id as MedicalType)}
              >
                {type.icon === 'tooth' && '🦷'}
                {type.icon === 'heart-pulse' && '💓'}
                {type.icon === 'leaf' && '🌿'}
                {type.icon === 'stethoscope' && '🩺'}
                {type.icon === 'ambulance' && '🚑'}
              </Text>
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionLabel,
                    medicalType === type.id && styles.optionLabelSelected,
                  ]}
                  onPress={() => handleSelectType(type.id as MedicalType)}
                >
                  {type.label}
                </Text>
                <Text
                  style={styles.optionDescription}
                  onPress={() => handleSelectType(type.id as MedicalType)}
                >
                  {type.description}
                </Text>
              </View>
              {medicalType === type.id && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <View
          style={[
            styles.continueButton,
            !medicalType && styles.continueButtonDisabled,
          ]}
        >
          <Text
            style={[
              styles.continueButtonText,
              !medicalType && styles.continueButtonTextDisabled,
            ]}
            onPress={medicalType ? handleContinue : undefined}
          >
            Continue
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
  optionList: {
    gap: spacing.md,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
  },
  optionItemSelected: {
    borderColor: colors.primaryRed,
    backgroundColor: colors.primaryRed + '05',
  },
  optionIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  optionLabelSelected: {
    color: colors.primaryRed,
  },
  optionDescription: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
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

export default MedicalTypeScreen;
