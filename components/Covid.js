import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';

const Covid = ({latitude, longitude}) => {
  const [activeCases, setActiveCases] = useState();
  const [activePerOneMillion, setActivePerOneMillion] = useState();
  const [cases, setCases] = useState();
  const [casesPerOneMillion, setCasesPerOneMillion] = useState();
  const [deaths, setDeaths] = useState();
  const [deathsPerOneMillion, setDeathsPerOneMillion] = useState();
  const [population, setPopulation] = useState();
  const [recovered, setRecovered] = useState();
  const [tests, setTests] = useState();
  const [flagImage, setFlagImage] = useState();
  const [todayCases, setTodayCases] = useState();
  const [todayDeaths, setTodayDeaths] = useState();
  const [todayRecovered, setTodayRecovered] = useState();
  const [countryName, setCountryName] = useState();

  useEffect(() => {
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
        setCountryName(response.data.countryName);
        const weatherSearchOptions = {
          method: 'GET',
          url:
            'https://corona.lmao.ninja/v2/countries/' +
            response.data.countryName,
        };
        axios
          .request(weatherSearchOptions)
          .then(function (response) {
            setActiveCases(response.data.active);
            setActivePerOneMillion(response.data.activePerOneMillion);
            setCases(response.data.cases);
            setCasesPerOneMillion(response.data.casesPerOneMillion);
            setDeaths(response.data.deaths);
            setDeathsPerOneMillion(response.data.deathsPerOneMillion);
            setPopulation(response.data.population);
            setRecovered(response.data.recovered);
            setTests(response.data.tests);
            setFlagImage(response.data.countryInfo.flag);
            setTodayCases(response.data.todayCases);
            setTodayDeaths(response.data.todayDeaths);
            setTodayRecovered(response.data.todayRecovered);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  function numberWithCommas(x) {
    if (x != undefined || x === null) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return x;
    }
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.entryContainer1} flex={1}>
          <Image
            source={flagImage ? {uri: flagImage} : null}
            style={{width: 40, aspectRatio: 3 / 2, marginRight: 10}}
          />
          <Text style={styles.title1}>{countryName} Covid-19 Statistics</Text>
        </View>
      </View>

      <Text style={styles.title}>Today</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Cases</Text>
          <Text style={styles.text1}>{numberWithCommas(todayCases)}</Text>
        </View>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Recovered</Text>
          <Text style={styles.text1}>{numberWithCommas(todayRecovered)}</Text>
        </View>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Deaths</Text>
          <Text style={styles.text1}>{numberWithCommas(todayDeaths)}</Text>
        </View>
      </View>

      <Text style={styles.title}>Total</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Cases</Text>
          <Text style={styles.text1}>{numberWithCommas(cases)}</Text>
        </View>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Recovered</Text>
          <Text style={styles.text1}>{numberWithCommas(recovered)}</Text>
        </View>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Deaths</Text>
          <Text style={styles.text1}>{numberWithCommas(deaths)}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Active Cases</Text>
          <Text style={styles.text1}>{numberWithCommas(activeCases)}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Population</Text>
          <Text style={styles.text1}>{numberWithCommas(population)}</Text>
        </View>
        <View style={styles.entryContainer}>
          <Text style={styles.text}>Tests Taken</Text>
          <Text style={styles.text1}>{numberWithCommas(tests)}</Text>
        </View>
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
export default Covid;
