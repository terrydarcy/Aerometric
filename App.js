import React from 'react';
import {View, Text, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigator from './Navigator';

const Stack = createStackNavigator();

const App = () => {
  return <Navigator />;
};

export default App;
