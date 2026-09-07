import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { CityCard } from '../components/Card';
import { colors, typography, spacing } from '../constants/theme';
import { CITIES } from '../constants/cities';
import { useQuestionnaireStore } from '../store';
import { City } from '../types';

export const CitySelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { city, setCity, nextStep } = useQuestionnaireStore();

  const handleSelectCity = (selectedCity: City) => {
    setCity(selectedCity);
  };

  const handleContinue = () => {
    if (city) {
      nextStep();
      navigation.navigate('MedicalType' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Select City"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>Where are you traveling?</Text>
        <Text style={styles.subtitle}>
          Select the city you'll be visiting in China
        </Text>

        <View style={styles.cityList}>
          {CITIES.map((cityData) => (
            <CityCard
              key={cityData.id}
              name={cityData.name}
              nameChinese={cityData.nameChinese}
              description={cityData.description}
              imageUrl={cityData.imageUrl}
              onPress={() => handleSelectCity(cityData.id)}
              selected={city === cityData.id}
            />
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <View
          style={[
            styles.continueButton,
            !city && styles.continueButtonDisabled,
          ]}
        >
          <Text
            style={[
              styles.continueButtonText,
              !city && styles.continueButtonTextDisabled,
            ]}
            onPress={city ? handleContinue : undefined}
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
  cityList: {
    gap: spacing.md,
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

export default CitySelectionScreen;
