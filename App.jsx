import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/theme';
import { ROUTES } from './src/constants/routes';

import SplashScreen from './src/screens/Splashscreen';
import GenderSelectScreen from './src/screens/GenderSelectScreen';
import BottomBarTabs from './src/navigation/BottomBarTabs';
import Loginscreen from './src/screens/Loginscreen';
import Signupscreen from './src/screens/Signupscreen';
import Filterscreen from './src/screens/Filterscreen';
import SalonDetailscreen from './src/screens/SalonDetailscreen';
import BookingFlowscreen from './src/screens/BookingFlowscreen';
import BookingDonescreen from './src/screens/BookingDonescreen';
import MyBookingScreen from './src/screens/MyBookingScreen';
import PersonalDetailscreen from './src/screens/PersonalDetailscreen';
import Favoritescreen from './src/screens/Favoritescreen';
import LoyaltyPointscreen from './src/screens/LoyaltyPointscreen';
import Notificationscreen from './src/screens/Notificationscreen';
import Promotionscreen from './src/screens/Promotionscreen';
import PrivacySecurity from './src/screens/PrivacySecurity';
import ChangePasswordscreen from './src/screens/ChangePasswordscreen';
import DeleteAccountscreen from './src/screens/DeleteAccountscreen';

const Stack = createStackNavigator();

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={ROUTES.SPLASH}
            screenOptions={{ headerShown: false, animationEnabled: true }}
          >
          <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
          <Stack.Screen name={ROUTES.GENDER_SELECT} component={GenderSelectScreen} />
          <Stack.Screen name={ROUTES.TABS} component={BottomBarTabs} />
          <Stack.Screen name={ROUTES.LOGIN} component={Loginscreen} />
          <Stack.Screen name={ROUTES.SIGNUP} component={Signupscreen} />
          <Stack.Screen name={ROUTES.FILTER} component={Filterscreen} />
          <Stack.Screen name={ROUTES.SALON_DETAIL} component={SalonDetailscreen} />
          <Stack.Screen name={ROUTES.BOOKING_FLOW} component={BookingFlowscreen} />
          <Stack.Screen name={ROUTES.BOOKING_SUCCESS} component={BookingDonescreen} />
          <Stack.Screen name={ROUTES.MY_BOOKINGS} component={MyBookingScreen} />
          <Stack.Screen name={ROUTES.PERSONAL_DETAILS} component={PersonalDetailscreen} />
          <Stack.Screen name={ROUTES.FAVORITES} component={Favoritescreen} />
          <Stack.Screen name={ROUTES.LOYALTY} component={LoyaltyPointscreen} />
          <Stack.Screen name={ROUTES.NOTIFICATIONS} component={Notificationscreen} />
          <Stack.Screen name={ROUTES.PROMOTIONS} component={Promotionscreen} />
          <Stack.Screen name={ROUTES.PRIVACY} component={PrivacySecurity} />
          <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePasswordscreen} />
          <Stack.Screen name={ROUTES.DELETE_ACCOUNT} component={DeleteAccountscreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
