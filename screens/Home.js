import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight} from 'react-native-gesture-handler';

const mainColor = '#070707';
const accentColor = '#97c8ff';

const Home = ({navigation}) => {
  const searchAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: 500,
      duration: 10000,
    }).start();
  }, [searchAnim]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image
        source={require('../res/flightTracker_bg_top.png')}
        style={styles.bg}
      />

      <Animated.View
        style={{
          left: searchAnim, // Bind opacity to animated value
        }}>
        <Image
          id="bottom_background"
          source={require('../res/flightTracker_bg_bottom.png')}
          style={styles.bg}
        />
      </Animated.View>

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
            flex: 1,
          }}
          onPress={() => navigation.openDrawer}
          underlayColor="grey">
          <Icon name="bars" size={32} color={mainColor} />
        </TouchableHighlight>

        <TouchableHighlight
          style={{
            padding: 10,
            borderRadius: 40,
          }}
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

export default Home;
