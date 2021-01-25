import React, { useRef, useState, useEffect } from 'react';
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
import DialogBox from 'react-native-dialogbox';
import * as ValidationController from 'app/components/ValidationController';
import Error from 'app/components/Error';

const Main = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('eye-slash');
  const [rememberMeIcon, setRememberMeIcon] = useState('square-o');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(true);
  const [isValidatePassword, setIsValidatePassword] = useState(true);

  const dialogbox = useRef(null);

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
    const validateEmail = ValidationController.validateEmail(email);
    const validatePassword = ValidationController.validatePassword(password);
    
    if(!validateEmail || !validatePassword) {
      if(!validateEmail) {
        setIsValidateEmail(false)
      } else {
        setIsValidateEmail(true)
      }

      if(!validatePassword) {
        setIsValidatePassword(false)
      } else {
        setIsValidatePassword(true)
      }
      return true
    } else {
      setIsValidateEmail(true)
      setIsValidatePassword(true)
    } 
  
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
        } else {
          AsyncStorage.setItem('rememberUsername', '');
          AsyncStorage.setItem('rememberPassword', '');
          AsyncStorage.setItem('rememberMe', 'false');
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

        dialogbox.current.confirm({
          content: message,
          ok: {
            text: 'Ok',
            style: {
              color: config.color.COLOR_BLUE,
              fontFamily: config.fonts.FONT_BOOK
            }
          },
          cancel: {
            text: 'Cancel',
            style: {
              color: config.color.COLOR_GRAY,
              fontFamily: config.fonts.FONT_BOOK
            }
          },
        }).then((event) => {
          if (event.button) {
            // dialogbox.current.alert(`You selected ${event.button.text}`);
          } else {
            // dialogbox.current.alert('Dialog cancelled');
          }
        });
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
    <SafeAreaView style={{ flex: 1, backgroundColor: config.color.COLOR_WHITE }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Spinner key={Math.random()} visible={isLoginLoading} />
            <View style={styles.subContainer}>
              <View style={styles.top}>
              <Text style={styles.welcomeTitle}>Welcome,</Text>
                <Text style={styles.subTitle}>Sign in to continue!</Text>
              </View>

              <View style={styles.inputViewContainer}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#DCDCDC"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
                {
                  !isValidateEmail &&
                  <Error message="Email must be valid."/>
                }
              </View>

              <View style={styles.inputViewContainer}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#DCDCDC"
                    secureTextEntry={showPassword}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                  />
                  <Icon
                    type="font-awesome"
                    name={eyeIcon}
                    size={20}
                    color="#00c6cc"
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
                {
                  !isValidatePassword &&
                  <Error message="Password must be valid."/>
                }
              </View>

              <View style={styles.rememberWrap}>
                <Icon
                  type="font-awesome"
                  name={rememberMeIcon}
                  size={20}
                  containerStyle={{
                    marginRight: 5
                  }}
                  onPress={onChangeRememberMeIcon}
                />
                <Text style={styles.remember}>Remember me</Text>
              </View>

              <View style={styles.wrap}>
                <Button
                  title="Login"
                  onPress={onLogin}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={{
                    backgroundColor:'#00c6cc',
                    height: 40
                  }}
                />
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
                }} style={styles.clickableText}>Privacy Policy</Text>.</Text>
              </View>

            </View>
          </View>
          <DialogBox ref={dialogbox} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Main;
