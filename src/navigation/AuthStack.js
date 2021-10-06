import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassWord from '../screens/ForgotPassWord';
import {COLORS} from '../assets/colors';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
      <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
      <Stack.Screen
        name="ForgotPassWord"
        component={ForgotPassWord}
        options={forgotPassWordStyle}
      />
    </Stack.Navigator>
  );
}

const signInStyle = {
  headerLeft: false,
  title: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};

const signUpStyle = {
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};

const forgotPassWordStyle = {
  title: 'Recuperar Senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};
