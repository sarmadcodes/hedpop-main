import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/screens/Splashscreen';
import BottomBarTabs from './src/navigation/BottomBarTabs';
import Loginscreen from './src/screens/Loginscreen'
import Signupscreen from './src/screens/Signupscreen';
import Filterscreen from './src/screens/Filterscreen';
import SalonDetailscreen from './src/screens/SalonDetailscreen'
import BookingFlowscreen from './src/screens/BookingFlowscreen';
import BookingDonescreen from './src/screens/BookingDonescreen';
import MyBookingScreen from './src/screens/MyBookingScreen';

const App = () => {
  const Stack = createStackNavigator();
  return (
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
        

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
