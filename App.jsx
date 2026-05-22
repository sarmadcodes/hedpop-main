import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/screens/Splashscreen';
import BottomBarTabs from './src/navigation/BottomBarTabs';
import Loginscreen from './src/screens/Loginscreen'
import Filterscreen from './src/screens/Filterscreen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splashscreen" component={SplashScreen} />
        <Stack.Screen name="BottomBarTabs" component={BottomBarTabs} />
        <Stack.Screen name="Loginscreen" component={Loginscreen} />
        <Stack.Screen name="Filterscreen" component={Filterscreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
