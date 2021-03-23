import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {UserContext} from '../providers/UserProvider';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Config from 'react-native-config';

const mainColor = '#070707';

function SearchFlight({navigation}) {
  const [textVal, setText] = useState('');
  const [apiReturn, setApiReturn] = useState();
  const [error, setError] = useState('');
  const user = useContext(UserContext);

  const navigateToFlight = (textVal) => {
    console.log(Config.FLIGHT_API_KEY);
    if (textVal && textVal.length > 0) {
      const options = {
        method: 'GET',
        url: 'https://flight-data4.p.rapidapi.com/get_flight_info',
        params: {flight: textVal.toUpperCase()},
        headers: {
          'x-rapidapi-key': Config.FLIGHT_API_KEY,
          'x-rapidapi-host': 'flight-data4.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          if (response.data[textVal.toUpperCase()] != null) {
            navigation.navigate('flight', {
              flight: response.data[textVal.toUpperCase()],
            });
            incrementFlightsSearched();
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
  const incrementFlightsSearched = () => {
    const userRef = firestore().doc(`Users/${user.uid}`);

    userRef
      .update({
        flightsSearched: firebase.firestore.FieldValue.increment(1),
      })
      .then(function () {})
      .catch(function (error) {
        console.error(error);
      });
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
