import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlightTabNavigation from './navigators/FlightTabNavigation';
import CovidTracker from './screens/CovidTracker';
import MapTab from './screens/MapTab';
import Profile from './screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ImageBackground, StyleSheet, View} from 'react-native';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <NavigationContainer style={{backgroundColor: 'transparent'}}>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'MapTab') {
                  iconName = focused ? 'earth' : 'earth-outline';
                } else if (route.name === 'CovidTracker') {
                  iconName = focused ? 'fitness' : 'fitness-outline';
                } else if (route.name === 'Flights') {
                  iconName = focused ? 'airplane' : 'airplane-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused
                    ? 'person-circle'
                    : 'person-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              transparentCard: true,
            })}
            tabBarOptions={{
              activeTintColor: '#2B59C3',
              inactiveTintColor: 'gray',
              keyboardHidesTabBar: true,
              transparentCard: true,
            }}
            style={{backgroundColor: 'transparent'}}>
            <Tab.Screen name="MapTab" component={MapTab} />
            <Tab.Screen name="Flights" component={FlightTabNavigation} />
            <Tab.Screen name="CovidTracker" component={CovidTracker} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Navigator;
