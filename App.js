import React, {Fragment, useEffect} from 'react';
import Navigator from './Navigator';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {}, []);

  return (
    <Fragment>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Navigator />
    </Fragment>
  );
};
export default App;
