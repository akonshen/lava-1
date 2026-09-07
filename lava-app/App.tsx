import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { CitySelectionScreen } from './src/screens/CitySelectionScreen';
import { MedicalTypeScreen } from './src/screens/MedicalTypeScreen';
import { TravelDatesScreen } from './src/screens/TravelDatesScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { PaymentScreen } from './src/screens/PaymentScreen';
import { GuideGenerationScreen } from './src/screens/GuideGenerationScreen';
import { GuideDisplayScreen } from './src/screens/GuideDisplayScreen';

// Types
export type RootStackParamList = {
  Welcome: undefined;
  CitySelection: undefined;
  MedicalType: undefined;
  TravelDates: undefined;
  BudgetSelection: undefined;
  Payment: undefined;
  GuideGeneration: undefined;
  GuideDisplay: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CitySelection" component={CitySelectionScreen} />
          <Stack.Screen name="MedicalType" component={MedicalTypeScreen} />
          <Stack.Screen name="TravelDates" component={TravelDatesScreen} />
          <Stack.Screen name="BudgetSelection" component={BudgetScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="GuideGeneration" component={GuideGenerationScreen} />
          <Stack.Screen name="GuideDisplay" component={GuideDisplayScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
