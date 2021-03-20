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

const CreateAccount = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();
  const navigation = useNavigation();

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
        }}>
        <Text style={styles.subtitle}> Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            placeholder={'Username'}
            value={username}
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
            onPress={() => Alert.alert('Simple Button pressed')}>
            <Text style={styles.text}>Create Account</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>or</Text>
        <View style={{marginTop: 10, borderRadius: 10}}>
          <TouchableHighlight
            style={styles.createAccountButton}
            underlayColor="#ffd463"
            activeOpacity={0.6}
            onPress={() => navigation.navigate('login')}>
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
