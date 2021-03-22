import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const Weather = ({latitude, longitude}) => {
  const API_KEY = 'a99c3120f63fc97b496574b9c3a3380d';
  useEffect(() => {
    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    const countrySearchOptions = {
      method: 'GET',
      url:
        'http://api.geonames.org/countryCodeJSON?lat=' +
        latitude +
        '&lng=' +
        longitude +
        '&username=terryd98',
    };

    axios
      .request(countrySearchOptions)
      .then(function (response) {
        console.log(response.data.countryName);
        console.log(latitude);
        console.log(longitude);
        console.log(
          'https://api.openweathermap.org/data/2.5/onecall?lat=' +
            latitude +
            '&lon=' +
            longitude +
            '&appid=' +
            API_KEY,
        );
        const weatherSearchOptions = {
          method: 'GET',
          url:
            'https://api.openweathermap.org/data/2.5/onecall?lat=' +
            latitude +
            '&lon=' +
            longitude +
            '&appid=' +
            API_KEY,
        };
        axios
          .request(weatherSearchOptions)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <Text>Weather</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '90%',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 15,
    elevation: 7,
    padding: 2,
  },
  text: {
    marginVertical: 0,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    marginVertical: 0,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  title1: {
    marginVertical: 0,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  text1: {
    marginVertical: 0,
    fontSize: 15,
    color: 'black',
  },
  entryContainer: {
    flex: 1,
    backgroundColor: '#EBEDEE',
    padding: 10,
    margin: 3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryContainer1: {
    flex: 1,
    backgroundColor: 'white',
    margin: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 15,
  },
});
export default Weather;
