import React, {createContext, useEffect, useState} from 'react';
import {generateUserDocument} from '../config/fire';
import auth from '@react-native-firebase/auth';

export const UserContext = createContext({user: null});

function UserProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
export default UserProvider;
