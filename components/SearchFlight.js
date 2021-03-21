import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const mainColor = '#070707';

function SearchFlight({navigation}) {
  const [textVal, setText] = useState('');
  const [apiReturn, setApiReturn] = useState();
  const [error, setError] = useState('');

  var clientID = 'O3BjrcxyQ0LC2hAj8ibJT0sIKmDqq6JC';
  var clientSecret = 'Ke6UlHPUs3i8yAhF';

  // useEffect(() => {
  //   axios('https://test.api.amadeus.com/v1/security/oauth2/token', {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization: 'Basic ' + btoa(clientID + ':' + clientSecret),
  //     },
  //     data: 'grant_type=client_credentials',
  //     method: 'POST',
  //   })
  //     .then((tokenResponse) => {
  //       axios(`test.api.amadeus.com/v2/schedule/flights`, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: 'Bearer ' + tokenResponse.data.access_token,
  //         },
  //       })
  //         .then((tracksResponse) => {
  //           if (tracksResponse.data.tracks.items.length > 0) {
  //             var songName = tracksResponse.data.tracks.items[0].name;
  //             var artistName =
  //               tracksResponse.data.tracks.items[0].artists[0].name;
  //             var id = tracksResponse.data.tracks.items[0].id;

  //             dispatch(setSongName(songName));
  //             dispatch(setArtistName(artistName));
  //             dispatch(setSpotifyID(id));
  //             saveSearch(songName, artistName);
  //             searchSuccess = true;
  //           } else {
  //             searchSuccess = false;
  //           }
  //         })
  //         .catch((error) => {
  //           console.log('Spotify Search API call problem', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log('Spotify access token problem', error);
  //     });
  // }, []);

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
