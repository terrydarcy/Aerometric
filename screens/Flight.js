import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import FlightDetails from '../components/FlightDetails';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Flight = ({navigation, route}) => {
  const [apiReturn, setApiReturn] = useState();
  const [searchFound, setSearchFound] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    var flightCode = route.params.flightCode;
    axios
      .get('https://opensky-network.org/api/states/all?icao24=' + flightCode)
      .then(function (response) {
        if (response.data.states && response.data.states.length > 0) {
          var apiData = {
            flightCode: flightCode,
            latitude: response.data.states[0][6],
            longitude: response.data.states[0][5],
            altitude: response.data.states[0][13],
          };
          setApiReturn(apiData);
        }
        console.log('axios: ', response.data);
      })
      .catch(function (error) {
        console.log('Axios erros: Flight.js', error);
      })
      .finally(function () {
        setSearchFound(true);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    var flightCode = route.params.flightCode;
    axios
      .get('https://opensky-network.org/api/states/all?icao24=' + flightCode)
      .then(function (response) {
        if (response.data.states && response.data.states.length > 0) {
          var apiData = {
            flightCode: flightCode,
            latitude: response.data.states[0][6],
            longitude: response.data.states[0][5],
            altitude: response.data.states[0][13],
          };
          setApiReturn(apiData);
          console.log('axios: ', response.data);
        }
      })
      .catch(function (error) {
        console.log('Axios erros: Flight.js', error);
      })
      .finally(function () {
        setSearchFound(true);
        setRefreshing(false);
      });
  }, [apiReturn]);

  return (
    <View style={styles.container}>
      <Image source={require('../res/flightbg.png')} style={styles.bg} />

      <View
        style={{
          marginTop: 60,
          marginHorizontal: 20,
        }}>
        <TouchableHighlight
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="black" size={30} />
        </TouchableHighlight>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {searchFound && apiReturn && <FlightDetails apiReturn={apiReturn} />}
      </ScrollView>
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  bg: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    maxHeight: windowHeight + 50,
    maxWidth: windowWidth,
  },
  scrollView: {
    height: '100%',
  },
});

export default Flight;
