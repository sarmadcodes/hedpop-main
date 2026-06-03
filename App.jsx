import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';

import SplashScreen from './src/screens/Splashscreen';
import BottomBarTabs from './src/navigation/BottomBarTabs';
import Loginscreen from './src/screens/Loginscreen'
import Signupscreen from './src/screens/Signupscreen';
import Filterscreen from './src/screens/Filterscreen';
import SalonDetailscreen from './src/screens/SalonDetailscreen'
import BookingFlowscreen from './src/screens/BookingFlowscreen';
import BookingDonescreen from './src/screens/BookingDonescreen';
import MyBookingScreen from './src/screens/MyBookingScreen';
import PersonalDetailscreen from './src/screens/PersonalDetailscreen';
import PaymentMethodscreen from './src/screens/PaymentMethodscreen';
import Favoritescreen from './src/screens/Favoritescreen'
import LoyaltyPointscreen from './src/screens/LoyaltyPointscreen';
import Notificationscreen from './src/screens/Notificationscreen';  
import Promotionscreen from './src/screens/Promotionscreen';
import PrivacySecurity from './src/screens/PrivacySecurity'; 
import ChangePasswordscreen from './src/screens/ChangePasswordscreen';
import TwoFactorAuthScreen from './src/screens/TwoFactorAuthScreen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splashscreen" component={SplashScreen} />
        <Stack.Screen name="BottomBarTabs" component={BottomBarTabs} />
        <Stack.Screen name="Loginscreen" component={Loginscreen} />
        <Stack.Screen name="Signupscreen" component={Signupscreen} />
        <Stack.Screen name="Filterscreen" component={Filterscreen} />
        <Stack.Screen name="SalonDetailscreen" component={SalonDetailscreen} />
        <Stack.Screen name="BookingFlowscreen" component={BookingFlowscreen} />
        <Stack.Screen name="BookingSuccessScreen" component={BookingDonescreen} />
        <Stack.Screen name="MyBookingScreen" component={MyBookingScreen} />

        <Stack.Screen name="PersonalDetailscreen" component={PersonalDetailscreen} />
        <Stack.Screen name="PaymentMethodscreen" component={PaymentMethodscreen} />
        <Stack.Screen name="Favoritescreen" component={Favoritescreen} />
        <Stack.Screen name="LoyaltyPointscreen" component={LoyaltyPointscreen} />
        <Stack.Screen name="Notificationscreen" component={Notificationscreen} />
        <Stack.Screen name="Promotionscreen" component={Promotionscreen} />
        <Stack.Screen name="PrivacySecurity" component={PrivacySecurity} />
        <Stack.Screen name="ChangePasswordscreen" component={ChangePasswordscreen} />
        <Stack.Screen name="TwoFactorAuthScreen" component={TwoFactorAuthScreen} />

        

      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  )
}

export default App
