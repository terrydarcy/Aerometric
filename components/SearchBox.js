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
  const [apiReturn, setApiReturn] = useState();

  const searchFlightCode = (flightCode) => {
    OpenSkyApiCall(flightCode);
  };

  const OpenSkyApiCall = (flightCode) => {
    var lowerCaseCode = flightCode.toLowerCase();
    return (
      fetch(
        'https://opensky-network.org/api/states/all?icao24=' + lowerCaseCode,
      )
        .then((response) => response.json())
        //TODO: check result
        .then((json) => {
          var apiData = {
            flightCode: flightCode,
            latitude: json.states[0][6],
            longitude: json.states[0][5],
            altitude: json.states[0][13],
          };
          setApiReturn(apiData);
          console.log(apiReturn);
        })
        .catch((error) => {
          console.error('ERROR: ' + error);
        })
    );
  };

  function createCard(apiData) {
    return <FlightDetails props={apiData} />;
  }

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
      {apiReturn != undefined ? createCard(apiReturn) : null}
    </View>
  );
}

const styles = StyleSheet.create({});

export default SearchBox;
