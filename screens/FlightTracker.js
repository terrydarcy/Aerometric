import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  Button,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight} from 'react-native-gesture-handler';

const mainColor = '#070707';
const accentColor = '#97c8ff';

function onPressButton() {}
const FlightTracker = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image source={require('../res/home.png')} style={styles.bg} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          alignItems: 'center',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableHighlight
          style={{
            padding: 10,
            borderRadius: 40,
          }}
          onPress={onPressButton}
          underlayColor="grey">
          <Icon name="user-circle" size={32} color={mainColor} />
        </TouchableHighlight>
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
        }}>
        <Text style={styles.header}>Aerometric</Text>
        <Text style={styles.body}>Search for a flight below</Text>
      </View>
      <View style={{marginTop: 80}}>
        <SearchBox />
      </View>
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  body: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    color: mainColor,
  },
});

export default FlightTracker;
