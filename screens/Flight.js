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

const Flight = ({navigation, route}) => {
  const user = useContext(UserContext);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
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
      <Image source={require('../res/flightbg.png')} style={styles.bg} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          marginBottom: 10,
          marginHorizontal: 20,
          alignItems: 'center',
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
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.addActive}
            onPress={() => addtoDB()}>
            <Ionicons name="checkmark-outline" color="white" size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.back}
            onPress={() => addtoDB()}>
            <Ionicons name="add-outline" color="black" size={30} />
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
                  padding: 10,
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
                  padding: 10,
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
                padding: 10,
              }}>
              <Text style={styles.text}>Flight Aerometrics</Text>
              <Text style={styles.text1}>
                Latitude {route.params.flight['flight'].latitude}
              </Text>
              <Text style={styles.text1}>
                Flight distance {route.params.flight['flight'].distance}km
              </Text>
              <Text style={styles.text1}>
                Longitude {route.params.flight['flight'].longitude}
              </Text>
              <Text style={styles.text1}>
                Altitude {route.params.flight['flight'].altitude}ft
              </Text>
            </View>
          </View>
        </View>
        <PlanePhoto
          aircraft={route.params.flight['aircraft']}
          airline={route.params.flight['airline']}
        />
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
  addActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'green',
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
  scrollView: {
    width: '100%',
    alignItems: 'center',
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
    marginVertical: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
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
