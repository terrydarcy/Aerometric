import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const MapTab = ({}) => {
  return (
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapTab;
