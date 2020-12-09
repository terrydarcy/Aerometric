import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  blurRadius,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import {material, sanFranciscoSpacing} from 'react-native-typography';
import image from '../res/plane.jpg';
import FlightDetails from '../components/FlightDetails';
import Icon from 'react-native-vector-icons/FontAwesome';
const mainColor = '#070707';
const accentColor = '#97c8ff';

function SearchBox() {
  const [textVal, setText] = useState('');
  var resultReturned = false;

  var apiData = {
    title: 'Test',
  };

  const searchFlightCode = (flightCode) => {
    OpenSkyApiCall(flightCode);
  };

  const OpenSkyApiCall = (flightCode) => {
    var lowerCaseCode = flightCode.toLowerCase();
    return fetch(
      'https://opensky-network.org/api/states/all?time=1458564121&icao24=3c6444',
    )
      .then((response) => response.json())
      .then((json) => {
        resultReturned = true;
        apiData = {
          flightCode: flightCode,
          latitude: json.states[0][6],
          longitude: json.states[0][5],
          altitude: json.states[0][13],
        };
        console.log(
          'Flight ' +
            flightCode +
            ' is cruising at an altitude of ' +
            json.states[0][13] +
            'm, with a latitude of ' +
            json.states[0][6] +
            ' and a longitude of ',
          json.states[0][5],
        );
      })
      .catch((error) => {
        console.error('ERROR: ' + error);
      });
  };

  console.log(resultReturned);
  return (
    <View style={styles.searchArea}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 40,
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 20,
          margin: 20,
        }}>
        <Icon name="search" size={20} color={mainColor} />
        <TextInput
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 15,
            paddingHorizontal: 20,
            color: mainColor,
          }}
          onChangeText={(text) => setText({text})}
          placeholder="Enter flight code"
          placeholderTextColor={mainColor}
          onSubmitEditing={() => searchFlightCode(textVal.text)}
        />
      </View>
      <FlightDetails props={apiData} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default SearchBox;
