import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomBar from '../components/CustomBottombar';
import Homescreen from './Tabscreens/Homescreen';
import Searchscreen from './Tabscreens/Searchscreen';
import Bookingscreen from './Tabscreens/Bookingscreen';
import ProfileScreen from './Tabscreens/Profilescreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomBottomBar {...props} />}
    >

      <Tab.Screen name="Home" component={Homescreen} />
      <Tab.Screen name="Search" component={Searchscreen} />
      <Tab.Screen name="Bookings" component={Bookingscreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
};

export default BottomTabs;
