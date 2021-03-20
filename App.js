import React, {Fragment, useEffect, useState} from 'react';
import Navigator from './Navigator';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import Onboarding from './screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';

const AppStack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />

      <NavigationContainer>
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen name="Onboarding" component={Onboarding} />
          <AppStack.Screen name="App" component={Navigator} />
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="CreateAccount" component={CreateAccount} />
        </AppStack.Navigator>
      </NavigationContainer>

      {/* <Navigator /> */}
    </Fragment>
  );
};
export default App;
