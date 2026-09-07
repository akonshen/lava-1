import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../components/Header';
import { colors, typography, spacing } from '../constants/theme';
import { useGuideStore, useQuestionnaireStore } from '../store';
import { GuideStatus, GuideContent } from '../types';

export const GuideGenerationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentGuide, updateGuide, setIsGenerating } = useGuideStore();
  const questionnaire = useQuestionnaireStore();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');
  
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Simulate guide generation progress
    const generateGuide = async () => {
      const steps = [
        { progress: 15, text: 'Analyzing your requirements...' },
        { progress: 30, text: 'Searching hospital database...' },
        { progress: 45, text: 'Generating cost estimates...' },
        { progress: 60, text: 'Creating step-by-step process...' },
        { progress: 75, text: 'Compiling transportation guide...' },
        { progress: 90, text: 'Finalizing your guide...' },
        { progress: 100, text: 'Guide complete!' },
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProgress(step.progress);
        setStatusText(step.text);
      }

      // Create mock guide content
      const mockContent: GuideContent = {
        title: `Your ${questionnaire.city?.charAt(0).toUpperCase()}${questionnaire.city?.slice(1)} Medical Guide`,
        overview: `This personalized guide will help you navigate ${questionnaire.city}'s healthcare system during your visit. Based on your requirements, we've curated the best hospitals, estimated costs, and step-by-step processes.`,
        hospitals: [
          {
            id: '1',
            name: 'Huashan Hospital',
            nameChinese: '华山医院',
            address: '12 Wulumuqi Zhong Road, Shanghai',
            city: questionnaire.city!,
            specialties: ['Neurosurgery', 'Dermatology'],
            internationalDepartment: true,
            englishStaff: true,
            jciCertified: true,
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
            description: 'One of the top hospitals in Shanghai with excellent international patient services.',
            phone: '+86-21-52888888',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Research & Preparation',
            description: 'Review this guide and prepare your medical documents.',
            tips: ['Bring your passport', 'Prepare a list of current medications'],
            duration: '1-2 days before',
          },
        ],
        costs: [
          { service: 'Consultation', minCost: 100, maxCost: 300, currency: 'CNY' },
          { service: 'MRI', minCost: 500, maxCost: 900, currency: 'CNY' },
        ],
        transportation: {
          fromAirport: 'Metro Line 2 from Pudong Airport',
          toHospital: 'Taxi or Metro',
          publicTransit: 'Metro available',
          taxiRide: 'Approximately ¥50-100',
          estimatedCost: '¥20-100',
        },
        accommodation: [
          {
            name: 'Hotel Example',
            type: 'Hotel',
            distance: '0.5 km from hospital',
            priceRange: '$80-150/night',
            description: 'Convenient location near hospital',
          },
        ],
        tips: [
          'Bring your passport for registration',
          'International departments usually have English-speaking staff',
          'Payment via Alipay, WeChat Pay, or credit card',
        ],
        emergencyContacts: [
          { name: 'Ambulance', number: '120', description: 'Emergency medical services' },
          { name: 'Police', number: '110', description: 'Police emergency' },
        ],
      };

      // Update guide with content
      if (currentGuide) {
        updateGuide(currentGuide.id, {
          status: GuideStatus.COMPLETED,
          content: mockContent,
        });
      }

      setIsGenerating(false);

      // Navigate to guide display
      setTimeout(() => {
        navigation.navigate('GuideDisplay' as never);
      }, 500);
    };

    generateGuide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Animated Logo */}
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Logo size="large" />
        </Animated.View>

        {/* Progress Text */}
        <Text style={styles.progressText}>{statusText}</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>

        {/* Estimated Time */}
        <Text style={styles.estimatedTime}>
          {progress < 100 ? 'This may take 10-30 seconds' : 'Almost done!'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.xxl,
  },
  progressText: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryRed,
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  estimatedTime: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default GuideGenerationScreen;
