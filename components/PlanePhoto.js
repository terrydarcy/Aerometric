import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import {encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

import Config from 'react-native-config';
const PlanePhoto = (data) => {
  const [image, setImage] = useState();
  var url = data.aircraft.photo2;

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://flight-data4.p.rapidapi.com/get_aircraft_photo',
      params: {image: url},
      headers: {
        'x-rapidapi-key': Config.FLIGHT_API_KEY,
        'x-rapidapi-host': 'flight-data4.p.rapidapi.com',
      },
      responseType: 'arraybuffer',
    };

    axios
      .request(options)
      .then(function (response) {
        setImage(
          btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          ),
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [image]);

  return (
    <View
      style={{
        marginVertical: 20,
        width: '90%',
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 15,
        elevation: 7,
      }}>
      {image && (
        <Image
          style={{
            width: '100%',
            height: 250,
            borderRadius: 15,
            borderWidth: 5,
            borderColor: 'white',
          }}
          resizeMode={'cover'}
          source={
            'data:image/png;base64,' + image
              ? {uri: 'data:image/png;base64,' + image}
              : null
          }></Image>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: '#EBEDEE',
          padding: 10,
          margin: 5,
          borderRadius: 15,
        }}>
        <Text style={styles.text}>{data.aircraft.desc}</Text>
        <Text style={styles.text1}>Functional {data.aircraft.ff}</Text>
        <Text style={styles.text1}>Registration {data.aircraft.reg}</Text>
        <Text style={styles.text1}>Type {data.aircraft.type}</Text>
        <Text style={styles.text1}>{data.airline.name} Airline</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    marginVertical: 0,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  text1: {
    marginVertical: 0,
    fontSize: 15,
    color: 'black',
  },
});
export default PlanePhoto;
