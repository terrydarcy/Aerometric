import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FlightTab from '../screens/FlightTab';
import Flight from '../screens/Flight';
import {TransitionSpecs} from '@react-navigation/stack';

const Stack = createStackNavigator();

function FlightTabNavigation() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 500,
      damping: 200,
      mass: 5,
      overshootClamping: true,
      restDisplacementThreshold: 0.02,
      restSpeedThreshold: 0.03,
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="flights"
        component={FlightTab}
        options={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      />
      <Stack.Screen
        name="flight"
        component={Flight}
        options={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default FlightTabNavigation;
