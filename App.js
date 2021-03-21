import React, {Fragment, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import UserProvider from './providers/UserProvider';
import OnboardingNavigator from './OnboardingNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <UserProvider>
      <OnboardingNavigator />
    </UserProvider>
  );
};
export default App;
