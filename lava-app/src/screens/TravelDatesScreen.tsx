import React, { useState } from 'react';
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
import { colors, typography, spacing } from '../constants/theme';
import { useQuestionnaireStore } from '../store';

export const TravelDatesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { travelDates, setTravelDates, nextStep, prevStep, currentStep, totalSteps } = useQuestionnaireStore();
  const [arrivalDate, setArrivalDate] = useState(travelDates.arrival);
  const [departureDate, setDepartureDate] = useState(travelDates.departure);

  const handleContinue = () => {
    if (arrivalDate && departureDate) {
      setTravelDates({ arrival: arrivalDate, departure: departureDate });
      nextStep();
      navigation.navigate('BudgetSelection' as never);
    }
  };

  const handleBack = () => {
    prevStep();
    navigation.goBack();
  };

  const canProceed = arrivalDate && departureDate;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBack
        onBack={handleBack}
        title="Travel Dates"
      />

      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>When are you traveling?</Text>
        <Text style={styles.subtitle}>
          Enter your travel dates so we can plan your guide accordingly
        </Text>

        <TextInput
          label="Arrival Date"
          placeholder="e.g., October 15, 2026"
          value={arrivalDate}
          onChangeText={setArrivalDate}
        />

        <TextInput
          label="Departure Date"
          placeholder="e.g., October 25, 2026"
          value={departureDate}
          onChangeText={setDepartureDate}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            Your guide will be customized based on your travel duration. Longer stays may include more comprehensive coverage.
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <View
          style={[
            styles.continueButton,
            !canProceed && styles.continueButtonDisabled,
          ]}
        >
          <Text
            style={[
              styles.continueButtonText,
              !canProceed && styles.continueButtonTextDisabled,
            ]}
            onPress={canProceed ? handleContinue : undefined}
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
    marginBottom: spacing.xl,
  },
  infoBox: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.trustBlue + '10',
    borderRadius: 12,
    marginTop: spacing.md,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: typography.bodySmall,
    color: colors.trustBlue,
    lineHeight: typography.lineHeight.bodySmall,
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

export default TravelDatesScreen;
