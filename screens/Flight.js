import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapComponent from '../components/MapComponent';

const Flight = ({navigation, route}) => {
  const [delay, setDelay] = useState();

  useEffect(() => {
    // console.log(
    //   'test: ',
    //   route.params.flight['flight'].arr_estimated.indexOf() -
    //     route.params.flight['flight'].arr_scheduled,
    // );
    //if(route.params.flight["flight"].arr_estimated)
    //setDelay()
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../res/flightbg.png')} style={styles.bg} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <TouchableHighlight
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="black" size={30} />
        </TouchableHighlight>
        <View
          style={{
            flex: 5,
            marginRight: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>
            Flight {route.params.flight['flight'].iata}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mapInfo}>
          <View style={styles.mapContainer}>
            <MapComponent
              latitude={route.params.flight['flight'].latitude}
              longitude={route.params.flight['flight'].longitude}
              rot={route.params.flight['flight'].heading}
              arrivalAirport={route.params.flight['arr_airport']}
              departureAirport={route.params.flight['dep_airport']}
            />
          </View>
          <View style={styles.flightInfo}>
            <View style={styles.flightInfoArrivalDeparture}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#EBEDEE',
                  padding: 10,
                  marginRight: 5,
                  borderRadius: 15,
                }}>
                <Text>
                  {route.params.flight['dep_airport'].city}
                  {'\n'}
                  Departed {route.params.flight['flight'].dep_actual}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#EBEDEE',
                  padding: 10,
                  borderRadius: 15,
                }}>
                <Text>
                  {route.params.flight['arr_airport'].city}
                  {'\n'}
                  Estimated arrival{' '}
                  {route.params.flight['flight'].arr_estimated}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  bg: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    maxHeight: windowHeight + 50,
    maxWidth: windowWidth,
  },
  scrollView: {
    height: '100%',
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  mapInfo: {
    width: '90%',
    height: 500,

    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderColor: 'white',
  },
  mapContainer: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: 'white',
    overflow: 'hidden',

    flex: 1,
    height: 200,
  },
  flightInfo: {
    flex: 1,
    height: 250,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 5,
    flexDirection: 'column',
    borderColor: 'white',
  },
  title: {
    marginLeft: 15,
    marginVertical: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
  },
  flightInfoArrivalDeparture: {
    flexDirection: 'row',
  },
});

export default Flight;
