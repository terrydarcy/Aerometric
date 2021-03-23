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

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const [error, setError] = React.useState();

  const signInWithEmailPassword = async () => {
    if (email.length > 2) {
      if (password.length >= 6) {
        await auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setEmail('');
            setPassword('');
            setError('');
            navigation.navigate('App');
          })
          .catch((error) => {
            setError(error);
            console.error(error);
          });
      } else {
        setError('Password must be at least 6 characters');
      }
    } else {
      setError('Email too short!');
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
        <Text style={styles.subtitle}> Login</Text>

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
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry={true}
            value={password}
          />
        </View>
        <Text style={styles.error}>{error}</Text>

        <View style={{marginTop: 15, marginBottom: 5}}>
          <TouchableHighlight
            style={styles.loginButton}
            underlayColor="#3ac63d"
            activeOpacity={0.6}
            onPress={() => signInWithEmailPassword()}>
            <Text style={styles.text}>Login</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>or</Text>
        <View style={{marginTop: 10, borderRadius: 10}}>
          <TouchableHighlight
            style={styles.createAccountButton}
            underlayColor="#ffd463"
            activeOpacity={0.6}
            onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.text}>Create New Account</Text>
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
    elevation: 7,
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
    elevation: 7,
  },
  loginButton: {
    backgroundColor: '#09b80c',
    padding: 10,
    borderRadius: 15,
    elevation: 7,
  },
  error: {
    color: 'red',
    margin: 5,
  },
});

export default Login;
