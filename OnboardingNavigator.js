import React, {Fragment, useEffect, useContext, useState} from 'react';
import Navigator from './Navigator';
import {StatusBar} from 'react-native';
import Onboarding from './screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import {UserContext} from './providers/UserProvider';

const AppStack = createStackNavigator();

const App = () => {
  const user = useContext(UserContext);
  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer>
        <AppStack.Navigator headerMode="none">
          {!user && (
            <AppStack.Screen name="Onboarding" component={Onboarding} />
          )}
          <AppStack.Screen name="App" component={Navigator} />
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="CreateAccount" component={CreateAccount} />
        </AppStack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
};
export default App;
