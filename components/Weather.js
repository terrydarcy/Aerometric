import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Weather = ({latitude, longitude}) => {
  const [clouds, setClouds] = useState();
  const [temp, setTemp] = useState();
  const [windDeg, setWindDeg] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [description, setDescription] = useState();
  const [iconWeather, setIcon] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [main, setMain] = useState();
  const [countryName, setCountryName] = useState();

  useEffect(() => {
    const countryNameSearchOptions = {
      method: 'GET',
      url:
        'http://api.geonames.org/countryCodeJSON?lat=' +
        latitude +
        '&lng=' +
        longitude +
        '&username=terryd98',
    };

    axios
      .request(countryNameSearchOptions)
      .then(function (response) {
        setCountryName(response.data.countryName);
      })
      .catch(function (error) {
        console.error(error);
      });

    console.log(Config.WEATHER_API_KEY);
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
            Config.WEATHER_API_KEY,
        );
        const weatherSearchOptions = {
          method: 'GET',
          url:
            'https://api.openweathermap.org/data/2.5/onecall?lat=' +
            latitude +
            '&lon=' +
            longitude +
            '&appid=' +
            Config.WEATHER_API_KEY +
            '&units=metric',
        };
        axios
          .request(weatherSearchOptions)
          .then(function (response) {
            console.log(response.data);
            setClouds(response.data.current.clouds);
            setFeelsLike(response.data.current.feels_like);
            setTemp(response.data.current.temp);
            setDescription(response.data.current.weather['0'].description);
            setIcon(response.data.current.weather['0'].icon);
            setWindDeg(response.data.current.wind_deg);
            setMain(response.data.current.weather['0'].main);
            setWindSpeed(response.data.current.wind_speed);
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
      <Text style={styles.title1}>Weather {countryName}</Text>
      <View style={styles.entryContainer}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#2B59C3',
              alignItems: 'center',
              justifyContent: 'center',
              width: 55,
              height: 55,
              borderRadius: 50,
            }}>
            <Image
              source={
                'http://openweathermap.org/img/wn/' + iconWeather + '@8x.png'
                  ? {
                      uri:
                        'http://openweathermap.org/img/wn/' +
                        iconWeather +
                        '@2x.png',
                    }
                  : null
              }
              style={{width: 65, aspectRatio: 3 / 2}}></Image>
          </View>
        </View>
        <View style={{flex: 4, alignItems: 'center'}}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}> {main} </Text>
            </View>
            <Text style={styles.text1}>{description}</Text>
          </View>
        </View>
      </View>

      <View style={styles.entryContainer}>
        <View style={{flex: 2, alignItems: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#2B59C3',
              alignItems: 'center',
              justifyContent: 'center',
              width: 55,
              height: 55,
              borderRadius: 50,
            }}>
            <Icon name={'thermometer-half'} size={45} color="white" />
          </View>
        </View>
        <View style={{flex: 4, alignItems: 'center'}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.title}> {temp}&deg;C </Text>
            </View>
            <Text style={styles.text1}>feels like {feelsLike}&deg;C </Text>
          </View>
        </View>
      </View>

      <View style={styles.entryContainer}>
        <View style={{flex: 2, alignItems: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#2B59C3',
              alignItems: 'center',
              justifyContent: 'center',
              width: 55,
              height: 55,
              borderRadius: 50,
            }}>
            <Icon name={'wind'} size={40} color="white" />
          </View>
        </View>
        <View style={{flex: 4}}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.title}>{windSpeed} m/s </Text>
            </View>
            <Text style={styles.text1}>{windDeg}&deg;</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: '90%',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 15,
    elevation: 7,
    padding: 2,
    flexDirection: 'column',
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
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
