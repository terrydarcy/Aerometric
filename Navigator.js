import React from 'react';
import {View, Text, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import FlightTracker from './screens/FlightTracker';
import HomeScreen from './screens/Home';
import NavigationMenu from './screens/NavigationMenu';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FlightTracker"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="FlightTracker" component={FlightTracker} />
        <Stack.Screen name="NavigationMenu" component={NavigationMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
