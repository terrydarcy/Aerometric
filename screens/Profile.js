import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {UserContext} from '../providers/UserProvider';

const Profile = ({}) => {
  const user = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (user) {
      const {email, displayName, photoURL} = user;
      setEmail(email);
      setDisplayName(displayName);
      setPhotoURL(photoURL);
    }
  }, [user]);
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
