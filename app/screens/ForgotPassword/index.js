import React, { useRef,useState,useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
} from 'react-native';
import styles from './styles';
import { Button, Icon } from 'react-native-elements';
import * as forgotpasswordActions from 'app/actions/forgotpasswordActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'app/components/Spinner';
import * as ValidationController from 'app/components/ValidationController';
import Error from 'app/components/Error';
import DialogBox from 'react-native-dialogbox';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValidateEmail, setIsValidateEmail] = useState(true);

  const dialogbox = useRef(null);

  const {
    loadingReducer: { isForgotPasswordLoading },
    forgotPasswordReducer: { response },
  } = useSelector(state => state);

  useEffect(() => {
    console.log('response ->',response)

    if (response == "") {

      // dialogbox.tip({
      //   title: 'Success!',
      //   content: 'A message will be sent to below address containing a link to reset your password.',
      //   btn: {
      //       text: 'Login To My Account'
      //   }
      // }).then(() => (
      //   navigationActions.navigateToLogin()
      // ));
    } else {

    }
  }, [response]);

  
  const dispatch = useDispatch();

  const onForgotPassword = async () => {
    console.log("onForgotPassword");

    const validateEmail = ValidationController.validateEmail(email);
    
    if(!validateEmail) {
      setIsValidateEmail(false)
      return true
    } else {
      setIsValidateEmail(true)
    }
  
    console.log("validate");

    dispatch(forgotpasswordActions.enableLoader());

    try {
      console.log("try");

      dispatch(forgotpasswordActions.requestForgotPassword(email));

    } catch (e) {
      dispatch(loginActions.disableLoader());
      console.log(e);
    }
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
          <Spinner key={Math.random()} visible={isForgotPasswordLoading} />
          <View style={styles.subContainer}>
              <View style={styles.top}>
                <Text style={styles.welcomeTitle}>Forgot Password,</Text>
                <Text style={styles.subTitle}>Enter the email address used for registration</Text>
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

              <View style={styles.wrap}>
                {
                 
                      <Button
                        title="Continue"
                        onPress={onForgotPassword}
                        titleStyle={styles.buttonTitle}
                        buttonStyle={{
                          backgroundColor:'#00c6cc',
                          height: 40
                        }}
                      />
                }
              </View>
              
           
              <View style={styles.footer}>
                <Text style={styles.bottonText}> <Text onPress={() => {
                  navigation.goBack()
                }} style={styles.clickableText}>Back to Login</Text></Text>
                <Text style={styles.bottonSubText}> By logging in to Memoria, you agree to our <Text onPress={() => {
                  navigationActions.navigateToTermsCondition()
                }} style={styles.clickableText}>Terms & Conditions</Text> and <Text onPress={() => {
                  navigationActions.navigateToLegalPolicy()
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

export default ForgotPassword;
