import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { Logo } from '../components/Header';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { CITIES } from '../constants/cities';

const { width } = Dimensions.get('window');

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('CitySelection' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Logo size="large" />
        </View>

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>Your Medical Travel</Text>
          <Text style={styles.tagline}>Companion in China</Text>
        </View>

        {/* City Preview Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
          >
            {CITIES.map((city) => (
              <View key={city.id} style={styles.carouselItem}>
                <Image
                  source={{ uri: city.imageUrl }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
                <View style={styles.carouselOverlay}>
                  <Text style={styles.carouselCityName}>{city.name}</Text>
                  <Text style={styles.carouselCityChinese}>{city.nameChinese}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏥</Text>
            <Text style={styles.featureTitle}>Hospital Finder</Text>
            <Text style={styles.featureDescription}>
              Discover top hospitals with international departments
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📋</Text>
            <Text style={styles.featureTitle}>Step-by-Step Guide</Text>
            <Text style={styles.featureDescription}>
              Navigate China's healthcare system with ease
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureTitle}>Cost Estimates</Text>
            <Text style={styles.featureDescription}>
              Know what to expect before you go
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomContainer}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          variant="primary"
          size="large"
          style={styles.getStartedButton}
        />
        <Text style={styles.signInText}>
          Already have an account?{' '}
          <Text style={styles.signInLink}>Sign In</Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  taglineContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  tagline: {
    fontSize: typography.h2,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.h2,
  },
  carouselContainer: {
    marginBottom: spacing.xl,
  },
  carouselContent: {
    paddingHorizontal: spacing.md,
  },
  carouselItem: {
    width: width - spacing.md * 4,
    height: 180,
    marginRight: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  carouselCityName: {
    fontSize: typography.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  carouselCityChinese: {
    fontSize: typography.body,
    color: colors.white + 'CC',
  },
  featuresContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  featureTitle: {
    fontSize: typography.h4,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bottomContainer: {
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  getStartedButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
  signInText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  signInLink: {
    color: colors.primaryRed,
    fontWeight: typography.fontWeight.semiBold,
  },
});

export default WelcomeScreen;
