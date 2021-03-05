import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FlightTab from '../screens/FlightTab';
import Flight from '../screens/Flight';

const Stack = createStackNavigator();

function FlightTabNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="flights" component={FlightTab} />
      <Stack.Screen name="flight" component={Flight} />
    </Stack.Navigator>
  );
}

export default FlightTabNavigation;
