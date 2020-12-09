import {loadPartialConfig} from '@babel/core';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withOrientation} from 'react-navigation';

const FlightDetails = ({navigation, props}) => {
  const [title, setTitle] = useState('');
  const [flightCode, setFlightCode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [altitude, setAltitude] = useState('');

  useEffect(() => {
    setTitle(props.title);
    setFlightCode(props.flightCode);
    setLatitude(props.latitude);
    setLongitude(props.longitude);
    setAltitude(props.altitude);
  });
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.text, styles.flight_title]}>
          Flight {flightCode}
        </Text>
        <Text style={[styles.text]}> longitude: {longitude}</Text>
        <Text style={[styles.text]}> latitude: {latitude}</Text>
        <Text style={[styles.text]}> altitude: {altitude}</Text>
        <Text style={[styles.text]}>
          {'\n'}
          Flight {flightCode} is cruising at an altitude {'\n'}
          of {altitude}m, with a longitude of {longitude} {'\n'}
          and a latitude of {latitude}.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    height: 200,
    flexDirection: 'column',

    justifyContent: 'center',
  },
  detailsContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flex: 1,
    margin: 20,
    minHeight: 200,
    borderRadius: 20,
  },
  flight_title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  text: {
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});

export default FlightDetails;
