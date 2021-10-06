/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthUserContext} from '../context/AuthUserProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {COLORS} from '../assets/colors';

export default function Routes() {
  const {user, setUser} = useContext(AuthUserContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // inscreve um handler para o user state changes
    const unsubscriber = auth().onAuthStateChanged((authUser) => {
      //console.log(authUser);
      authUser ? setUser(authUser) : setUser(null);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscriber; //unsubscribe o handler ao desmontar
  }, []);

  if (initializing) {
    //se está inicializando, aguarda o Firebase responder
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
