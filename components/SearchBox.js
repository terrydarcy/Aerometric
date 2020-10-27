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
import {material, sanFranciscoSpacing} from 'react-native-typography';
import image from '../res/plane.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';

const mainColor = '#070707';
const accentColor = '#97c8ff';

const SearchBox = () => {
  return (
    <View style={styles.searchArea}>
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
          placeholder="Enter flight code"
          placeholderTextColor={mainColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchBox;
