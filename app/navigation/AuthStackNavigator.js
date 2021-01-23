import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from 'app/screens/Login';
import Signup from 'app/screens/Signup';
import ForgotPassword from 'app/screens/ForgotPassword';
import TermsCondition from 'app/screens/TermsCondition';
import LegalPolicy from 'app/screens/LegalPolicy';
import Option from 'app/screens/Option';

const Stack = createStackNavigator();

const AuthStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    <Stack.Screen name="Signup" component={Signup} options={{title: ''}}/>
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: ''}}/>
    <Stack.Screen name="TermsCondition" component={TermsCondition} options={{title: ''}}/>
    <Stack.Screen name="LegalPolicy" component={LegalPolicy} options={{title: ''}}/>
    <Stack.Screen name="Option" component={Option} options={{headerShown: false}}/>
  </Stack.Navigator>
);

export default AuthStackNavigator;
