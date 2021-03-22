import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import axios from 'axios';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Callout,
} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../providers/UserProvider';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const MapTab = ({currentLatitude, currentLongitude}) => {
  const [planesInBound, setPlanesInBound] = useState([]);
  const [scanRegion, setScanRegion] = useState();
  var searchReturned = false;
  var viewingTooltip = false;
  const navigation = useNavigation();
  const [error, setError] = useState([]);
  const user = useContext(UserContext);

  var initRegion = {
    latitude: parseFloat(currentLatitude),
    longitude: parseFloat(currentLongitude),
    latitudeDelta: 1,
    longitudeDelta: 1,
  };
  useEffect(() => {
    console.log('coords recieved: ', currentLatitude, currentLongitude);
    setRegion(initRegion);
    console.log(initRegion);
  }, []);

  const setRegion = async (e) => {
    var scanRegionL = {
      latitudeMinBound: e.latitude - e.latitudeDelta / 2,
      latitudeMaxBound: e.latitude + e.latitudeDelta / 2,
      longitudeMinBound: e.longitude - e.longitudeDelta / 2,
      longitudeMaxBound: e.longitude + e.longitudeDelta / 2,
    };
    setScanRegion(scanRegionL);
    await axios
      .get(
        'https://opensky-network.org/api/states/all?lamin=' +
          scanRegionL.latitudeMinBound +
          '&lomin=' +
          scanRegionL.longitudeMinBound +
          '&lamax=' +
          scanRegionL.latitudeMaxBound +
          '&lomax=' +
          scanRegionL.longitudeMaxBound,
      )
      .then(function (response) {
        if (response.data.states != null) {
          setPlanesInBound(response.data.states);
        } else {
          console.log('No planes found');
        }
      })
      .catch(function (error) {
        console.log(
          'Axios erros: MapTab.js',
          error,
          latitudeMinBound,
          latitudeMaxBound,
          longitudeMinBound,
          longitudeMaxBound,
        );
      });
  };

  const navigateToFlight = (flightCode) => {
    console.log(flightCode.trim());
    const options = {
      method: 'GET',
      url: 'https://flight-data4.p.rapidapi.com/get_flight_info',
      params: {flight: flightCode.trim().toUpperCase()},
      headers: {
        'x-rapidapi-key': '0fc20f00e0msh4755d4ab30ecc56p14128ejsn344e954e3f0c',
        'x-rapidapi-host': 'flight-data4.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data[flightCode.trim().toUpperCase()] != null) {
          navigation.navigate('flight', {
            flight: response.data[flightCode.trim().toUpperCase()],
          });
          incrementFlightsSearched();
        } else {
          setError('Only passenger flights can be viewed in more detail');
          closeError();
          console.log('Flight was not found');
        }
      })
      .catch(function (error) {
        console.error(error);
        setError('Flight was not found');
      });
  };

  const closeError = () => {
    setTimeout(
      function () {
        setError('');
      }.bind(this),
      3000,
    );
  };

  const incrementFlightsClicked = () => {
    const userRef = firestore().doc(`Users/${user.uid}`);

    userRef
      .update({
        flightsClicked: firebase.firestore.FieldValue.increment(1),
      })
      .then(function () {})
      .catch(function (error) {
        console.error(error);
      });
  };
  const incrementFlightsSearched = () => {
    const userRef = firestore().doc(`Users/${user.uid}`);

    userRef
      .update({
        flightsSearched: firebase.firestore.FieldValue.increment(1),
      })
      .then(function () {})
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initRegion}
        onRegionChangeComplete={(e) => setRegion(e)}
        showsMyLocationButton={true}
        showsCompass={false}
        mapPadding={{top: 30, right: 0, bottom: 0, left: 0}}>
        {planesInBound.map((plane, key) => (
          <Marker
            key={plane[0]}
            coordinate={{
              latitude: plane[6],
              longitude: plane[5],
            }}
            onPress={() => incrementFlightsClicked()}
            image={require('../res/map_plane.png')}>
            <Callout
              style={{borderRadius: 15, overflow: 'hidden'}}
              onPress={() => navigateToFlight(plane[1])}>
              <Text style={{fontSize: 20}}>{plane[1]} </Text>
              <Text>Velocity: {plane[9]} m/s</Text>
              <Text>Landed: {plane[8] != null && plane[8].toString()}</Text>
              <Text>Altitude: {plane[13]}m</Text>
              <Text>Vertical rate: {plane[11]} m/s</Text>
              <Text>ICAO24: {plane[0]}</Text>
              <TouchableHighlight
                style={styles.logOutButton}
                underlayColor="#ffd463"
                activeOpacity={0.6}>
                <Text style={styles.text}>Go to Flight</Text>
              </TouchableHighlight>
            </Callout>
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          }}></Marker>
      </MapView>
      {error.length > 1 && (
        <Text style={{marginTop: 50, color: 'red'}}> {error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  logOutButton: {
    backgroundColor: '#557acf',
    padding: 5,
    marginVertical: 5,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});

export default MapTab;
