import React, {useEffect, useState, createRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import SearchFlight from '../components/SearchFlight';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {UserContext} from '../providers/UserProvider';
import Swipeable from 'react-native-swipeable-row';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
const mainColor = '#070707';

const rightButtons = [
  <TouchableHighlight
    style={{
      backgroundColor: 'red',
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 20,
      borderRadius: 15,
    }}>
    <Icon name={'trash-alt'} size={30} color="white" />
  </TouchableHighlight>,
];

const FlightTab = ({navigation}) => {
  const user = useContext(UserContext);
  let swipeable = null;

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    firestore()
      .doc(`Users/${user.uid}`)
      .onSnapshot((doc) => {
        console.log(doc.data().flights);
        setFlights(doc.data().flights);
      });
    if (swipeable) swipeable.recenter();
  }, []);

  const removeFlightFromDB = (flight) => {
    const userRef = firestore().doc(`Users/${user.uid}`);

    userRef
      .update({
        flights: firebase.firestore.FieldValue.arrayRemove({
          flight: flight['flight'],
        }),
      })
      .then(function () {})
      .catch(function (error) {
        console.error(error);
      });
  };

  const navigateToFlight = (flight) => {
    const options = {
      method: 'GET',
      url: 'https://flight-data4.p.rapidapi.com/get_flight_info',
      params: {flight: flight['flight'].toUpperCase()},
      headers: {
        'x-rapidapi-key': '0fc20f00e0msh4755d4ab30ecc56p14128ejsn344e954e3f0c',
        'x-rapidapi-host': 'flight-data4.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if (response.data[flight['flight'].toUpperCase()] != null) {
          navigation.navigate('flight', {
            flight: response.data[flight['flight'].toUpperCase()],
          });
          incrementFlightsSearched();
        } else {
          removeFlightFromDB(flight);
          setError('Flight was not found');
        }
      })
      .catch(function (error) {
        console.error(error);
        setError('Flight was not found');
      });
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
    <View style={styles.container}>
      <View
        style={{
          marginTop: 30,
        }}>
        <Text style={styles.title}>Flights</Text>
        <Text style={styles.subTitle2}>Search for a flight below</Text>
      </View>
      <View style={{marginTop: 30, marginBottom: 10}}>
        <SearchFlight navigation={navigation} />
      </View>
      <Text style={styles.subTitle}>Saved Flights</Text>
      <FlatList
        contentContainerStyle={styles.flightsContainer}
        data={flights}
        keyExtractor={(flight) => flights.indexOf(flight)}
        renderItem={({item, index}) => (
          <Swipeable
            ref={(ref) => {
              swipeable = ref;
            }}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#EBEDEE',
              borderRadius: 15,
              overflow: 'hidden',
              marginTop: 10,
            }}
            rightButtons={rightButtons}
            onRightActionRelease={() => removeFlightFromDB(item)}
            key={index}>
            <TouchableOpacity
              onPress={() => navigateToFlight(item)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={{marginRight: 10}}
                  name={'plane'}
                  size={25}
                  color="#2B59C3"
                />

                <Text style={styles.subTitle}>{item.flight}</Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flightsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    borderTopWidth: 5,
    borderRadius: 15,
    borderColor: '#557acf',
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  bg: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    maxHeight: windowHeight + 50,
    maxWidth: windowWidth,
  },
  header: {
    fontFamily: 'Roboto-Black',
    fontSize: 45,
    color: mainColor,
  },
  title: {
    fontSize: 50,
    color: '#2B59C3',
  },
  subTitle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#557acf',
  },
  subTitle2: {
    fontSize: 22,
    color: '#557acf',
  },
  body: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    color: mainColor,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 30,
  },
});

export default FlightTab;
