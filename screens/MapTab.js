import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import MapView, {PROVIDER_GOOGLE, Marker, Polygon} from 'react-native-maps';

const MapTab = ({currentLatitude, currentLongitude}) => {
  const [planesInBound, setPlanesInBound] = useState([0]);
  const [scanRegion, setScanRegion] = useState({});
  var searchReturned = false;

  var initRegion = {
    latitude: parseFloat(currentLatitude),
    longitude: parseFloat(currentLongitude),
    latitudeDelta: 1,
    longitudeDelta: 1,
  };
  useEffect(() => {
    var scanRegionL = {
      latitudeMinBound: initRegion.latitude - initRegion.latitudeDelta / 2,
      latitudeMaxBound: initRegion.latitude + initRegion.latitudeDelta / 2,
      longitudeMinBound: initRegion.longitude - initRegion.longitudeDelta / 2,
      longitudeMaxBound: initRegion.longitude + initRegion.longitudeDelta / 2,
    };

    setScanRegion(scanRegionL);
  }, []);

  // useEffect(() => {
  //   const planeBoundCheck = async () => {
  //     await axios
  //       .get(
  //         'https://opensky-network.org/api/states/all?lamin=' +
  //           initRegion.latitude +
  //           '&lomin=' +
  //           initRegion.longitude +
  //           '&lamax=' +
  //           (initRegion.latitude + initRegion.latitudeDelta) +
  //           '&lomax=' +
  //           (initRegion.longitude + initRegion.longitudeDelta),
  //       )
  //       .then(function (response) {
  //         console.log('init: ', response.data);
  //         if (response.data.states != null) {
  //           setPlanesInBound(response.data);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(
  //           'Axios erros: MapTab.js',
  //           error,
  //           currentLatitude,
  //           currentLatitude + 1,
  //           currentLongitude,
  //           currentLongitude + 1,
  //         );
  //       })
  //       .then(function () {
  //         searchReturned = true;
  //       });
  //   };

  //   console.log(
  //     initRegion.latitude,
  //     initRegion.longitude,
  //     initRegion.latitude + initRegion.latitudeDelta,
  //     initRegion.longitude + initRegion.longitudeDelta,
  //   );
  //   planeBoundCheck();
  // }, []);

  const setRegion = (e) => {
    var scanRegionL = {
      latitudeMinBound: e.latitude - e.latitudeDelta / 2,
      latitudeMaxBound: e.latitude + e.latitudeDelta / 2,
      longitudeMinBound: e.longitude - e.longitudeDelta / 2,
      longitudeMaxBound: e.longitude + e.longitudeDelta / 2,
    };

    setScanRegion(scanRegionL);

    axios
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
          console.log(response.data.states);
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

  const renderItem = ({plane}) => (
    <View>
      {console.log(plane)}
      <Marker coordinate={{latitude: 3, longitude: 3}}></Marker>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initRegion}
        onRegionChangeComplete={(e) => setRegion(e)}>
        <Polygon
          coordinates={[
            {
              // BL
              latitude: scanRegion.latitudeMinBound,
              longitude: scanRegion.longitudeMinBound,
            },
            {
              //TL
              latitude: scanRegion.latitudeMaxBound,
              longitude: scanRegion.longitudeMinBound,
            },
            {
              //TR
              latitude: scanRegion.latitudeMaxBound,
              longitude: scanRegion.longitudeMaxBound,
            },
            {
              //BL
              latitude: scanRegion.latitudeMinBound,
              longitude: scanRegion.longitudeMaxBound,
            },
          ]}
        />
        <Marker
          coordinate={{
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          }}></Marker>
      </MapView>
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
});

export default MapTab;
