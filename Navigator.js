import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlightTabNavigation from './navigators/FlightTabNavigation';
import CovidTracker from './screens/CovidTracker';
import MapTab from './screens/MapTab';
import Profile from './screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Text, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const image = {uri: 'https://reactjs.org/logo-og.png'};

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state

        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
        setLocationStatus('You are Here');
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        console.log('testlat', currentLatitude);
        console.log('testLong', currentLongitude);
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
        setLocationStatus('You are Here');
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <ImageBackground source={image} style={styles.image}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Map') {
                iconName = focused ? 'earth' : 'earth-outline';
              } else if (route.name === 'Covid Check') {
                iconName = focused ? 'fitness' : 'fitness-outline';
              } else if (route.name === 'Flights') {
                iconName = focused ? 'airplane' : 'airplane-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            transparentCard: true,
          })}
          tabBarOptions={{
            activeTintColor: '#2D5EC6',
            inactiveTintColor: 'gray',
            keyboardHidesTabBar: true,
            transparentCard: true,
          }}
          style={{backgroundColor: 'transparent'}}>
          {/* removed location as it was buggy */}
          {/* {console.log(locationStatus)}
            {locationStatus === 'You are Here' ? (
              <Tab.Screen
                name="Map"
                children={() => (
                  <MapTab
                    currentLatitude={currentLatitude}
                    currentLongitude={currentLongitude}
                  />
                )}
              />
            ) : (
              <Tab.Screen
                name="Map"
                children={() => (
                  <MapTab
                    currentLatitude={'53.343027199999995'}
                    currentLongitude={'-6.3373311999999995'}
                  />
                )}
              />
            )} */}

          <Tab.Screen
            name="Map"
            children={() => (
              <MapTab
                currentLatitude={'53.34729144059421'}
                currentLongitude={'-6.259117126464845'}
              />
            )}
          />
          <Tab.Screen name="Flights" component={FlightTabNavigation} />
          <Tab.Screen name="Covid Check" component={CovidTracker} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
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
