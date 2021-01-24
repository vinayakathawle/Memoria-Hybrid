import React, {useRef} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStackNavigator from 'app/navigation/AuthStackNavigator';
import MainDrawerNavigator from 'app/navigation/MainDrawerNavigator';
import config from 'app/config/styles';
import { navigationRef } from './NavigationService';
import DialogBox from 'react-native-dialogbox';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import credentials from 'app/config/firebase';
import * as optionActions from 'app/actions/optionActions';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.optionReducer.isLoggedIn);

  const dialogbox = useRef(null);

  const onLogout = async () => {
    if (!firebase.apps.length) {
      await firebase.initializeApp(credentials);
    } else {
      await firebase.app();
    }

    dialogbox.current.confirm({
      content: 'Are you sure you want to logout?',
      ok: {
        text: 'Yes',
        style: {
          color: config.color.COLOR_BLUE,
          fontFamily: config.fonts.FONT_BOOK
        }
      },
      cancel: {
        text: 'No',
        style: {
          color: config.color.COLOR_GRAY,
          fontFamily: config.fonts.FONT_BOOK
        }
      },
    }).then((event) => {
      if (event.index === 1) {
        auth()
          .signOut()
          .then(() => {
            dispatch(optionActions.logOut());
          });
      } else {
        // dialogbox.current.alert('Dialog cancelled');
      }
    });
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={config.color.COLOR_PRIMARY} />
      {isLoggedIn ? <MainDrawerNavigator onLogout={onLogout}/> : <AuthStackNavigator />}
      <DialogBox ref={dialogbox}/>
    </NavigationContainer>
  );
}

export default App;
