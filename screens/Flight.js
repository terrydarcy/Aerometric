import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapComponent from '../components/MapComponent';
import PlanePhoto from '../components/PlanePhoto';
import {UserContext} from '../providers/UserProvider';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Weather from '../components/Weather';
import Covid from '../components/Covid';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Flight = ({navigation, route}) => {
  const user = useContext(UserContext);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    console.log(route.params.flight);
    const userRef = firestore().doc(`Users/${user.uid}`);

    userRef.get().then(function (doc) {
      if (doc.exists) {
        for (var i = 0; i < doc.data().flights.length; i++) {
          if (
            doc.data().flights[i].flight == route.params.flight['flight'].iata
          ) {
            setSaved(true);
            break;
          }
        }
      }
    });
  }, []);

  const addtoDB = () => {
    var alreadyExists = false;
    const userRef = firestore().doc(`Users/${user.uid}`);

    userRef.get().then(function (doc) {
      if (doc.exists) {
        for (var i = 0; i < doc.data().flights.length; i++) {
          if (
            doc.data().flights[i].flight == route.params.flight['flight'].iata
          ) {
            setSaved(true);
            alreadyExists = true;
            break;
          }
        }
      }
    });

    if (!saved && !alreadyExists) {
      userRef
        .update({
          flights: firebase.firestore.FieldValue.arrayUnion({
            flight: route.params.flight['flight'].iata,
          }),
        })
        .then(function () {
          setSaved(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      userRef
        .update({
          flights: firebase.firestore.FieldValue.arrayRemove({
            flight: route.params.flight['flight'].iata,
          }),
        })
        .then(function () {
          setSaved(false);
          alreadyExists = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../res/flightbg.png')} style={styles.bg} /> */}

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 50,
          paddingBottom: 10,
          paddingHorizontal: 20,
          alignItems: 'center',
          backgroundColor: 'white',
          elevation: 7,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="black" size={30} />
        </TouchableOpacity>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>
            Flight {route.params.flight['flight'].iata}
          </Text>
        </View>
        {saved ? (
          <TouchableOpacity activeOpacity={0.6} onPress={() => addtoDB()}>
            <Icon
              name={'bookmark'}
              style={{marginRight: 10}}
              size={30}
              color="green"
              solid
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.6} onPress={() => addtoDB()}>
            <Icon
              name={'bookmark'}
              style={{marginRight: 10}}
              size={30}
              color="black"
            />
          </TouchableOpacity>
        )}
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
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginRight: 5,
                  borderRadius: 15,
                }}>
                <Text style={styles.subTitle}>Departure</Text>
                <Text style={styles.text1}>
                  {route.params.flight['dep_airport'].city}
                  {'\n'}
                  Scheduled {route.params.flight['flight'].dep_scheduled}
                  {'\n'}
                  Departed {route.params.flight['flight'].dep_actual}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#EBEDEE',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                }}>
                <Text style={styles.subTitle}>Arrival</Text>

                <Text style={styles.text1}>
                  {route.params.flight['arr_airport'].city}
                  {'\n'}
                  Scheduled {route.params.flight['flight'].arr_scheduled}
                  {'\n'}
                  Estimated {route.params.flight['flight'].arr_estimated}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#EBEDEE',
                marginTop: 5,
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={styles.text}>Flight Aerometrics</Text>
              <Text style={styles.text1}>
                Callsign: {route.params.flight['flight'].callsign}
              </Text>
              <Text style={styles.text1}>
                Latitude: {route.params.flight['flight'].latitude}
              </Text>
              <Text style={styles.text1}>
                Longitude: {route.params.flight['flight'].longitude}
              </Text>
              <Text style={styles.text1}>
                Flight Distance: {route.params.flight['flight'].distance}km
              </Text>
              <Text style={styles.text1}>
                Altitude: {route.params.flight['flight'].altitude}ft
              </Text>
              <Text style={styles.text1}>
                Ground Speed: {route.params.flight['flight'].groundspeed}mp/h
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#EBEDEE',
                marginTop: 5,
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={styles.text1}>
                <Text style={styles.text}>From </Text>
                {'\n'}
                {route.params.flight['dep_airport'].name}
                {'\n'}
                <Text style={styles.text}>To </Text>
                {'\n'}
                {route.params.flight['arr_airport'].name}
              </Text>
            </View>
          </View>
        </View>

        <Weather
          latitude={route.params.flight['arr_airport'].latitude}
          longitude={route.params.flight['arr_airport'].longitude}
        />
        <Covid
          latitude={route.params.flight['arr_airport'].latitude}
          longitude={route.params.flight['arr_airport'].longitude}
        />
        <PlanePhoto
          aircraft={route.params.flight['aircraft']}
          airline={route.params.flight['airline']}
        />

        <View style={styles.mapInfo}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#EBEDEE',
              marginTop: 5,
              borderRadius: 15,
              paddingVertical: 5,
              marginHorizontal: 5,
              paddingHorizontal: 10,
              marginBottom: 5,
            }}>
            <Text style={styles.text}>Data</Text>

            <Text style={styles.text1}>
              Sourced From: {route.params.flight.source}
            </Text>
            <Text style={styles.text1}>
              Station: {route.params.flight.station}
            </Text>
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

  text: {
    marginVertical: 0,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  text1: {
    marginVertical: 0,
    fontSize: 15,
    color: 'black',
  },
  mapInfo: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderColor: 'white',
    elevation: 7,
    marginBottom: 30,
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
  scrollView: {
    width: '100%',
    paddingTop: 20,
    alignItems: 'center',
  },
  flightInfo: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 5,
    flexDirection: 'column',
    borderColor: 'white',
  },
  title: {
    marginVertical: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
  },
  subTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  flightInfoArrivalDeparture: {
    flexDirection: 'row',
  },
});

export default Flight;
