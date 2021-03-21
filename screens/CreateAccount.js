import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';
import splashIcon from '../res/splash_icon.png';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {generateUserDocument} from '../config/fire';

const CreateAccount = () => {
  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();
  const navigation = useNavigation();

  const createAccountEmailAndPassword = async () => {
    if (displayName.length > 2) {
      if (email.length > 2) {
        if (password.length >= 6) {
          const seed = Math.floor(Math.random() * Math.floor(5000));
          const photoURL = 'https://picsum.photos/seed/' + seed + '/200';
          try {
            const {user} = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            generateUserDocument(user, {displayName, photoURL});
          } catch (err) {
            setError(err);
            if (err.code === 'auth/email-already-in-use') {
              setError('That email address is already in use!');
              console.log('That email address is already in use!');
            }
            if (err.code === 'auth/invalid-email') {
              setError('That email address is invalid!');
              console.log('That email address is invalid!');
            }
            if (err.code === 'auth/invalid-email') {
              setError('That email address is invalid!');
              console.log('That email address is invalid!');
            }
            console.error(err);
          }
          auth().onAuthStateChanged(function (user) {
            if (user) {
              setEmail('');
              setPassword('');
              setDisplayName('');
              setError('');
              navigation.navigate('App');
            } else {
              // No user is signed in.
            }
          });

          // .then(() => {
          //   setUsername('');
          //   setEmail('');
          //   setPassword('');
          //   setError('');
          //   navigation.navigate('App');
          //   generateUserDocument(user, {displayName, photoURL});
          // })
          // .catch((error) => {
          //   if (error.code === 'auth/email-already-in-use') {
          //     setError('That email address is already in use!');
          //     console.log('That email address is already in use!');
          //   }
          //   if (error.code === 'auth/invalid-email') {
          //     setError('That email address is invalid!');
          //     console.log('That email address is invalid!');
          //   }
          //   if (error.code === 'auth/invalid-email') {
          //     setError('That email address is invalid!');
          //     console.log('That email address is invalid!');
          //   }
          //   console.error(error);
          // });
        } else {
          setError('Password must be at least 6 characters');
        }
      } else {
        setError('Email too short!');
      }
    } else {
      setError('Username too short!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={splashIcon} style={styles.splashImage} />
        <Text style={styles.title}> Aerometric</Text>
      </View>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 20,
        }}>
        <Text style={styles.subtitle}> Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setDisplayName}
            placeholder={'Username'}
            value={displayName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder={'Email'}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder={'Password'}
            value={password}
          />
        </View>
        <Text style={styles.error}>{error}</Text>
        <View style={{marginTop: 15, marginBottom: 5}}>
          <TouchableHighlight
            style={styles.loginButton}
            underlayColor="#3ac63d"
            activeOpacity={0.6}
            onPress={() => createAccountEmailAndPassword()}>
            <Text style={styles.text}>Create Account</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>or</Text>
        <View style={{marginTop: 10, borderRadius: 10}}>
          <TouchableHighlight
            style={styles.createAccountButton}
            underlayColor="#ffd463"
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}>Login to existing account</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#2B59C3',
  },
  input: {
    marginLeft: 5,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: 300,
    height: 40,
    borderRadius: 15,
    marginTop: 20,
  },
  splashImage: {
    width: 200,
    height: 200,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  createAccountButton: {
    backgroundColor: '#ffc93c',
    padding: 10,
    borderRadius: 15,
  },
  loginButton: {
    backgroundColor: '#09b80c',
    padding: 10,
    borderRadius: 15,
  },
  error: {
    color: 'red',
    margin: 5,
  },
});

export default CreateAccount;
