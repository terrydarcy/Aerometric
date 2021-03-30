import {View, StyleSheet, Image, Text, TouchableHighlight} from 'react-native';
import {capitalizeFirstLetter} from '../config/Util';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../providers/UserProvider';

const Profile = ({}) => {
  const user = useContext(UserContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const [flightsSearched, setFlightsSearched] = useState();
  const [flightsClicked, setFlightsClicked] = useState();

  useEffect(() => {
    if (user) {
      const {email, displayName, photoURL} = user;
      setEmail(capitalizeFirstLetter(email));
      setDisplayName(capitalizeFirstLetter(displayName));
      setPhotoURL(photoURL);
      firestore()
        .doc(`Users/${user.uid}`)
        .onSnapshot((doc) => {
          if (doc.data().flightsClicked)
            setFlightsClicked(doc.data().flightsClicked);
          if (doc.data().flightsSearched)
            setFlightsSearched(doc.data().flightsSearched);
        });
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
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>{displayName}</Text>
            <Text style={styles.textEmail}>{email}</Text>
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
            color="#2B59C3"
          />
          {flightsClicked ? (
            <Text style={styles.text}>
              {flightsClicked} Live Flights Tracked
            </Text>
          ) : (
            <Text style={styles.text}>0 Live Flights Tracked</Text>
          )}
        </View>
        <View style={[styles.statContainer, styles.red]}>
          <Icon
            name={'search'}
            style={{marginRight: 10}}
            size={40}
            color="#2B59C3"
          />
          {flightsSearched ? (
            <Text style={styles.text}>{flightsSearched} Flights Searched</Text>
          ) : (
            <Text style={styles.text}>0 Flights Searched</Text>
          )}
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
            <Text style={styles.text3}>Log Out</Text>
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
    justifyContent: 'flex-start',
  },
  StatsContainer: {
    borderTopWidth: 5,

    borderRadius: 15,
    borderColor: '#2B59C3',
    flex: 3,
  },
  settingsContainer: {
    borderTopWidth: 5,
    borderRadius: 15,
    borderColor: '#2B59C3',
    flex: 4,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'black',
  },
  logOutButton: {
    backgroundColor: '#557acf',
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 7,
  },
  statContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10,
    elevation: 7,
  },
  red: {
    backgroundColor: 'white',
  },
  green: {
    backgroundColor: 'white',
  },
  yellow: {
    backgroundColor: 'white',
  },

  title: {
    marginLeft: 15,
    textAlign: 'center',
    fontSize: 50,
    color: 'black',
  },
  subTitle: {
    marginLeft: 15,
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  text3: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  text2: {
    color: 'black',
    fontSize: 20,
  },
  textEmail: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
  },
});

export default Profile;
