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
import Icon from 'react-native-vector-icons/FontAwesome';
const mainColor = '#070707';
const accentColor = '#97c8ff';

function SearchBox() {
  const [textVal, setText] = useState('');

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
    </View>
  );
}
function searchOpenSky(flightCode) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      //var result = JSON.parse(xhr.responseText);
      console.log(xhr.responseText);
    }
  };
  xhr.open(
    'GET',
    'https://TERRYD98:OPENSKYPASSWORD123@opensky-network.org/api/tracks/all?icao24=4CA9D1&time=0',
    //    'https://opensky-network.org/api/tracks/all?icao24=4CA9D1&time=0',
    true,
  );
  xhr.send(null);
}

function searchFlightCode(flightCode) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var result = JSON.parse(xhr.responseText);
      //console.log(xhr.responseText);
      console.log(result.data[0]);
      console.log(
        'Flight ' +
          flightCode +
          ' is cruising at an altitude of ' +
          result.data[0].live.altitude +
          'ft with a latitude of ' +
          result.data[0].live.latitude +
          ' and a longitude of ' +
          result.data[0].live.longitude,
      );
    }
  };
  xhr.open(
    'GET',
    'http://api.aviationstack.com/v1/flights?access_key=fe5b0803e28dda490dbb66b78ec409e6&flight_iata=' +
      flightCode,
    true,
  );
  xhr.send(null);
}

const styles = StyleSheet.create({});

export default SearchBox;
