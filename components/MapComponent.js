import React, {useState, useEffect, createRef} from 'react';
import {View, StyleSheet, Image, AppRegistry} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import plane from '../res/map_plane_rot.png';
import departure from '../res/departure.png';
import arrival from '../res/arrival.png';

const MapComponent = ({
  latitude,
  longitude,
  rot,
  arrivalAirport,
  departureAirport,
}) => {
  const mapRef = createRef();

  var initRegion = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    latitudeDelta: 10,
    longitudeDelta: 15,
  };

  var coordinates = [
    {
      latitude: parseFloat(departureAirport.latitude),
      longitude: parseFloat(departureAirport.longitude),
    },
    {
      latitude: parseFloat(arrivalAirport.latitude),
      longitude: parseFloat(arrivalAirport.longitude),
    },
    {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
  ];
  useEffect(() => {
    mapRef.current.fitToCoordinates(coordinates, {
      animated: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={initRegion}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsMyLocationButton={true}
        showsCompass={true}
        onLayout={() =>
          mapRef.current.fitToCoordinates(coordinates, {
            animated: true,
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
          })
        }>
        <Marker
          coordinate={{
            latitude: parseFloat(arrivalAirport.latitude),
            longitude: parseFloat(arrivalAirport.longitude),
          }}></Marker>
        <Marker
          image={departure}
          coordinate={{
            latitude: parseFloat(departureAirport.latitude),
            longitude: parseFloat(departureAirport.longitude),
          }}></Marker>
        <Marker
          image={plane}
          style={{
            transform: [{rotateZ: rot + 'deg'}],
          }}
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
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
    borderRadius: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
