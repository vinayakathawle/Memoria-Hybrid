import React, { createContext, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import styles from './styles';
import config from 'app/config/styles';
import AsyncStorage from '@react-native-community/async-storage';
import * as navigationActions from 'app/actions/navigationActions';
import * as loginActions from 'app/actions/loginActions';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import credentials from 'app/config/firebase';
import Spinner from 'app/components/Spinner';
import Modal from 'app/components/Modal';

const Main = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('eye-slash');
  const [rememberMeIcon, setRememberMeIcon] = useState('square-o');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getStorageValue();
  }, []);

  async function getStorageValue() {
    try {
      let rememberUsername  = await AsyncStorage.getItem('rememberUsername');
      let rememberPassword  = await AsyncStorage.getItem('rememberPassword');
      let rememberMe  = await AsyncStorage.getItem('rememberMe');
      setEmail(rememberUsername)
      setPassword(rememberPassword)
      console.log('rememberMe', rememberMe)
      if(rememberMe === 'true'){
        setIsRememberMe(true)
        setRememberMeIcon('check-square-o')
      }
    } catch (e) {
      // handle here
    } finally {
   
    }
  }

  const {
    loadingReducer: { isLoginLoading },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const onLogin = async () => {

    dispatch(loginActions.enableLoader());

    try {
      if (!firebase.apps.length) {
        await firebase.initializeApp(credentials);
      } else {
        await firebase.app();
      }

      await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        let userInfo = auth().currentUser

        const uid = userInfo?.uid
        const tokenResult = await firebase.auth().currentUser.getIdTokenResult();

        dispatch(loginActions.requestLogin(uid, tokenResult.token));

        if(isRememberMe) {
          AsyncStorage.setItem('rememberUsername', email);
          AsyncStorage.setItem('rememberPassword', password);
          AsyncStorage.setItem('rememberMe', 'true');
        }
      })
      .catch(error => {
        dispatch(loginActions.disableLoader());
        let message;
        switch (error.code) {
          case 'auth/too-many-requests':
            message = 'Too many requests.';
            break;
          case 'auth/operation-not-allowed':
            message = 'Indicates that email and password accounts are not enabled. Enable them in the Auth section of the Firebase console.';
            break;
          case 'auth/user-disabled':
            message = 'The user account has been disabled by an administrator.';
            break;
          case 'auth/wrong-password':
            message = 'The password is invalid or the user does not have a password.';
            break;
          case 'auth/invalid-email':
            message = 'Indicates the email address is malformed.';
            break;
          case 'auth/user-not-found':
            message = 'The entered email or password is invalid';
            break;
        }
        setErrorMessage(message);
        setModalVisible(true);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const onPasswordIconChange = () => {
    if(showPassword) {
      setShowPassword(false);
      setEyeIcon('eye');
    } else {
      setShowPassword(true);
      setEyeIcon('eye-slash');
    }
  }

  const onChangeRememberMeIcon = () => {
    if(rememberMeIcon === 'square-o'){
      setIsRememberMe(true);
      setRememberMeIcon('check-square-o');
    } else {
      AsyncStorage.setItem('rememberMe', 'false');
      setIsRememberMe(false);
      setRememberMeIcon('square-o');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {
              isLoginLoading &&
              <Spinner />
            }
            <View style={styles.subContainer}>
              <View style={styles.top}>
                <Text style={styles.welcomeTitle}> Welcome,</Text>
                <Text style={styles.subTitle}> Sign in to continue!</Text>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Email."
                  placeholderTextColor="#003f5c"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password."
                  placeholderTextColor="#003f5c"
                  secureTextEntry={showPassword}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
                <Icon
                  type="font-awesome"
                  name={eyeIcon}
                  size={20}
                  color="blue"
                  containerStyle={{
                    position: 'absolute',
                    right: 12,
                    height: 45,
                    flex: 1,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={onPasswordIconChange}
                />
              </View>

              <View style={styles.rememberWrap}>
                <Icon
                  type="font-awesome"
                  name={rememberMeIcon}
                  size={20}
                  color={config.color.COLOR_BLUE}
                  containerStyle={{
                    marginRight: 5
                  }}
                  onPress={onChangeRememberMeIcon}
                />
                <Text>Remember me</Text>
              </View>

              <View style={styles.wrap}>
                {
                  isLoginLoading ? (
                    <Button
                      title="Loading button"
                      loading
                    />
                  ) : (
                      <Button
                        title="Login"
                        onPress={onLogin}
                        titleStyle={styles.buttonTitle}
                      />
                    )
                }
              </View>
              
              <Text onPress={() => {
                navigationActions.navigateToForgotPassword()
              }} style={styles.forgotPassClickableText}>Forgot Password?</Text>

              <View style={styles.footer}>
                <Text style={styles.bottonText}> Not a Memoria user? Click here to <Text onPress={() => {
                  navigationActions.navigateToSignup()
                }} style={styles.clickableText}>Sign up!</Text></Text>
                <Text style={styles.bottonSubText}> By logging in to Memoria, you agree to our <Text onPress={() => {
                  navigationActions.navigateToTermsCondition()
                }} style={styles.clickableText}>Terms & Conditions</Text> and <Text onPress={() => {
                  navigationActions.navigateToTermsCondition()
                }} style={styles.clickableText}>Privacy Policy</Text>.</Text>
              </View>

            </View>

            <Modal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              message={errorMessage}
              onOkPress={() => {
                setModalVisible(false)
              }}
              error={true}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Main;
