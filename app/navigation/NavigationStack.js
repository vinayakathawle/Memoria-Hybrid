import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStackNavigator from 'app/navigation/AuthStackNavigator';
import MainDrawerNavigator from 'app/navigation/MainDrawerNavigator';
import config from 'app/config/styles';
import { navigationRef } from './NavigationService';

function App() {
  const isLoggedIn = useSelector(state => state.optionReducer.isLoggedIn);
console.log('isLoggedIn', isLoggedIn)
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={config.color.COLOR_PRIMARY} />
      {isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default App;
