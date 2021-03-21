import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableHighlight} from 'react-native';
import {UserContext} from '../providers/UserProvider';
import {capitalizeFirstLetter} from '../config/Util';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Profile = ({}) => {
  const user = useContext(UserContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (user) {
      const {email, displayName, photoURL} = user;
      setEmail(capitalizeFirstLetter(email));
      setDisplayName(capitalizeFirstLetter(displayName));
      setPhotoURL(photoURL);
    }
  }, [user]);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      {photoURL.length > 0 && (
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profilePic}
            source={{
              uri: photoURL,
            }}
          />
          <View
            style={{
              textAlign: 'center',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>{displayName}</Text>
            <Text style={styles.text2}>{email}</Text>
          </View>
        </View>
      )}

      <Text style={styles.subTitle}>Account Statistics</Text>
      <View style={styles.StatsContainer}>
        <View style={[styles.statContainer, styles.yellow]}>
          <Icon
            name={'plane'}
            style={{marginRight: 10}}
            size={40}
            color="white"
          />
          <Text style={styles.text}>82 Live Flights Tracked</Text>
        </View>
        <View style={[styles.statContainer, styles.red]}>
          <Icon
            name={'search'}
            style={{marginRight: 10}}
            size={40}
            color="white"
          />
          <Text style={styles.text}>200 Flights Searched</Text>
        </View>
        <View style={[styles.statContainer, styles.green]}>
          <Icon
            name={'virus'}
            style={{marginRight: 10}}
            size={40}
            color="white"
          />
          <Text style={styles.text}>30 Covid-19 Checks</Text>
        </View>
      </View>
      <Text style={styles.subTitle}>Account Settings</Text>
      <View style={styles.settingsContainer}>
        <View style={{marginTop: 10, borderRadius: 10}}>
          <TouchableHighlight
            style={styles.logOutButton}
            underlayColor="#ffd463"
            activeOpacity={0.6}
            onPress={() => logout()}>
            <Text style={styles.text}>Log Out</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profilePicContainer: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  StatsContainer: {
    borderTopWidth: 5,

    borderRadius: 15,
    borderColor: '#557acf',
    flex: 3,
  },
  settingsContainer: {
    borderTopWidth: 5,
    borderRadius: 15,
    borderColor: '#557acf',
    flex: 4,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#2B59C3',
  },
  logOutButton: {
    backgroundColor: '#557acf',
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  statContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10,
  },
  red: {
    backgroundColor: '#b81809',
  },
  green: {
    backgroundColor: '#09b80c',
  },
  yellow: {
    backgroundColor: '#ffc93c',
  },

  title: {
    marginLeft: 15,
    textAlign: 'center',
    fontSize: 50,
    color: '#2B59C3',
  },
  subTitle: {
    marginLeft: 15,
    textAlign: 'center',
    fontSize: 22,
    color: '#557acf',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  text2: {
    textAlign: 'center',
    color: '#2B59C3',
    fontSize: 20,
  },
});

export default Profile;
