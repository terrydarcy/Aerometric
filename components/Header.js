import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  blurRadius,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import {material} from 'react-native-typography';
import image from '../res/plane.jpg';

const Header = () => {
  return (
    <View style={styles.header}>
      <ImageBackground
        source={image}
        blurRadius={2}
        style={styles.image}></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 150,
  },
  text: {
    color: '#000000',
    fontSize: 35,
    textAlign: 'center',
    padding: 10,
  },
  image: {
    height: 150,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  searchArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    width: 200,
    height: 40,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
  },
});

export default Header;
