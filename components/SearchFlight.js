import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const mainColor = '#070707';

function SearchFlight({navigation}) {
  const [textVal, setText] = useState('');
  const [apiReturn, setApiReturn] = useState();
  const [error, setError] = useState('');

  // const OpenSkyApiCall = (flightCode) => {
  //   if (flightCode != undefined) {
  //     var lowerCaseCode = flightCode.toLowerCase();
  //     return (
  //       fetch(
  //         'https://opensky-network.org/api/states/all?icao24=' + lowerCaseCode,
  //       )
  //         .then((response) => response.json())
  //         //TODO: check result
  //         .then((json) => {
  //           console.log(json);
  //           var apiData = {
  //             flightCode: flightCode,
  //             latitude: json.states[0][6],
  //             longitude: json.states[0][5],
  //             altitude: json.states[0][13],
  //           };
  //           setApiReturn(apiData);
  //           console.log(apiReturn);
  //         })
  //         .catch((error) => {
  //           console.error('ERROR: ' + error);
  //         })
  //     );
  //   }
  // };

  const navigateToFlight = (textVal) => {
    if (textVal && textVal.length > 0) {
      navigation.navigate('flight', {
        flightCode: textVal.toLowerCase(),
      });
      setError('');
    } else {
      setError('Please enter a flight code to start searching');
    }
  };

  return (
    <View>
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
          placeholder="Enter ICAO24 code"
          placeholderTextColor={mainColor}
          onSubmitEditing={() => navigateToFlight(textVal.text)}
        />
      </View>
      <View style={styles.container}>
        {error.length > 0 && <Text style={styles.error}>{error} </Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
});

export default SearchFlight;
