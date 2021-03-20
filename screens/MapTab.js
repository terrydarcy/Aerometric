import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import axios from 'axios';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Callout,
} from 'react-native-maps';

const MapTab = ({currentLatitude, currentLongitude}) => {
  const [planesInBound, setPlanesInBound] = useState([]);
  const [scanRegion, setScanRegion] = useState();
  var searchReturned = false;
  var viewingTooltip = false;

  var initRegion = {
    latitude: parseFloat(currentLatitude),
    longitude: parseFloat(currentLongitude),
    latitudeDelta: 1,
    longitudeDelta: 1,
  };
  useEffect(() => {
    setRegion(initRegion);
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
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initRegion}
        onRegionChangeComplete={(e) => setRegion(e)}
        showsMyLocationButton={true}
        showsCompass={true}
        mapPadding={{top: 30, right: 0, bottom: 0, left: 0}}>
        {/* {scanRegion && (
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
        )} */}
        {planesInBound.map((plane, key) => (
          <Marker
            key={plane[0]}
            coordinate={{
              latitude: plane[6],
              longitude: plane[5],
            }}
            image={require('../res/map_plane.png')}>
            <Callout>
              <Text style={{fontSize: 20}}>{plane[1]} </Text>
              <Text>Velocity: {plane[9]} m/s</Text>
              <Text>Landed: {plane[8] != null && plane[8].toString()}</Text>
              <Text>Altitude: {plane[13]}m</Text>
              <Text>Vertical rate: {plane[11]} m/s</Text>
              <Text>ICAO24: {plane[0]}</Text>
              <Button title={'go to flight'} />
            </Callout>
          </Marker>
        ))}
        {console.log(currentLatitude)}
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
