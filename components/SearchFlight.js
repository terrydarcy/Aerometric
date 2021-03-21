import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const mainColor = '#070707';
import axios from 'axios';
import {set} from 'react-native-reanimated';

function SearchFlight({navigation}) {
  const [textVal, setText] = useState('');
  const [apiReturn, setApiReturn] = useState();
  const [error, setError] = useState('');

  const navigateToFlight = (textVal) => {
    if (textVal.length > 0) {
      const options = {
        method: 'GET',
        url: 'https://flight-data4.p.rapidapi.com/get_flight_info',
        params: {flight: textVal},
        headers: {
          'x-rapidapi-key':
            '0fc20f00e0msh4755d4ab30ecc56p14128ejsn344e954e3f0c',
          'x-rapidapi-host': 'flight-data4.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          if (response.data[textVal] != null) {
            navigation.navigate('flight', {
              flight: response.data[textVal],
            });
          } else {
            setError('Flight was not found');
          }
        })
        .catch(function (error) {
          console.error(error);
          setError('Flight was not found');
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
          placeholder="Enter flight code"
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
