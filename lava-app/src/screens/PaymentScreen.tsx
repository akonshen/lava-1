import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { useQuestionnaireStore, useGuideStore } from '../store';
import { getCityById } from '../constants/cities';
import { GuideStatus } from '../types';

export const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();
  const questionnaire = useQuestionnaireStore();
  const { setCurrentGuide, setIsGenerating } = useGuideStore();
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'google' | 'card'>('apple');
  const [isProcessing, setIsProcessing] = useState(false);

  const cityData = questionnaire.city ? getCityById(questionnaire.city) : null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock guide
    const mockGuide = {
      id: `guide_${Date.now()}`,
      userId: 'user_123',
      city: questionnaire.city!,
      questionnaireData: {
        city: questionnaire.city!,
        travelDates: questionnaire.travelDates,
        medicalType: questionnaire.medicalType!,
        budgetRange: questionnaire.budgetRange!,
        specificNeeds: questionnaire.specificNeeds,
        languagePreference: questionnaire.languagePreference,
      },
      status: GuideStatus.GENERATING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCurrentGuide(mockGuide);
    setIsGenerating(true);
    
    // Navigate to guide generation
    navigation.navigate('GuideGeneration' as never);
  };

  const getPrice = () => {
    return '$6.99';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Payment"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.orderTitle}>Order Summary</Text>
          
          <View style={styles.orderItem}>
            <Text style={styles.orderItemLabel}>Guide for</Text>
            <Text style={styles.orderItemValue}>
              {cityData?.name} {cityData?.nameChinese}
            </Text>
          </View>
          
          <View style={styles.orderItem}>
            <Text style={styles.orderItemLabel}>Medical Type</Text>
            <Text style={styles.orderItemValue}>
              {questionnaire.medicalType?.charAt(0).toUpperCase()}
              {questionnaire.medicalType?.slice(1)}
            </Text>
          </View>
          
          <View style={styles.orderItem}>
            <Text style={styles.orderItemLabel}>Travel Dates</Text>
            <Text style={styles.orderItemValue}>
              {questionnaire.travelDates.arrival} - {questionnaire.travelDates.departure}
            </Text>
          </View>
          
          <View style={styles.orderDivider} />
          
          <View style={styles.orderItem}>
            <Text style={styles.orderItemLabel}>Personalized Guide</Text>
            <Text style={styles.orderItemValue}>✓</Text>
          </View>
          <View style={styles.orderItem}>
            <Text style={styles.orderItemLabel}>Hospital Recommendations</Text>
            <Text style={styles.orderItemValue}>✓</Text>
          </View>
          <View style={styles.orderItem}>
            <Text style={styles.orderItemLabel}>Cost Estimates</Text>
            <Text style={styles.orderItemValue}>✓</Text>
          </View>
          <View style={styles.orderItem}>
            <Text style={styles.orderItemLabel}>Step-by-Step Process</Text>
            <Text style={styles.orderItemValue}>✓</Text>
          </View>
          
          <View style={styles.orderDivider} />
          
          <View style={styles.orderTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{getPrice()}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'apple' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('apple')}
            activeOpacity={0.7}
          >
            <Text style={styles.paymentIcon}>🍎</Text>
            <Text style={styles.paymentLabel}>Apple Pay</Text>
            {paymentMethod === 'apple' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'google' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('google')}
            activeOpacity={0.7}
          >
            <Text style={styles.paymentIcon}>🔵</Text>
            <Text style={styles.paymentLabel}>Google Pay</Text>
            {paymentMethod === 'google' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'card' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('card')}
            activeOpacity={0.7}
          >
            <Text style={styles.paymentIcon}>💳</Text>
            <Text style={styles.paymentLabel}>Credit or Debit Card</Text>
            {paymentMethod === 'card' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>
            Secure payment powered by Stripe
          </Text>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.bottomContainer}>
        <Button
          title={`Pay ${getPrice()}`}
          onPress={handlePayment}
          variant="primary"
          size="large"
          loading={isProcessing}
          disabled={isProcessing}
          style={styles.payButton}
        />
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
    paddingBottom: 120,
  },
  orderSummary: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  orderTitle: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  orderItemLabel: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  orderItemValue: {
    fontSize: typography.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  orderDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: typography.h4,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryRed,
  },
  paymentMethods: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.h4,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  paymentOptionSelected: {
    borderColor: colors.primaryRed,
    backgroundColor: colors.primaryRed + '05',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  paymentLabel: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  checkmark: {
    fontSize: 18,
    color: colors.primaryRed,
    fontWeight: typography.fontWeight.bold,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  securityIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  securityText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
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
  payButton: {
    width: '100%',
  },
});

export default PaymentScreen;
