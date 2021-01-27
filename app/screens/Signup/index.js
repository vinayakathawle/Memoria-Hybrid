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
import styles from './styles';
import { Button, Icon } from 'react-native-elements';
import * as signupActions from 'app/actions/signupActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'app/components/Spinner';
import * as ValidationController from 'app/components/ValidationController';
import Error from 'app/components/Error';
import DialogBox from 'react-native-dialogbox';

const Signup = ({ navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [timezone, setTimeZone] = useState('');

  const [isValidateEmail, setIsValidateEmail] = useState(true);

  const dialogbox = useRef(null);

  const {
    loadingReducer: { isSignUpLoading },
    signUpReducer: { response },
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

  const onSignUp = async () => {
    console.log("onSignUp");
    console.log(timezone);

    const validateEmail = ValidationController.validateEmail(email);
    
    if(!validateEmail) {
      console.log("validateEmail");

      setIsValidateEmail(false)
      return true
    } else {
      setIsValidateEmail(true)
    } 
  
    console.log("validate");

    dispatch(signupActions.enableLoader());

    try {
      console.log("try");
      console.log(firstName);

      dispatch(signupActions.requestSignUp(firstName, lastName, email, company, timezone));

    } catch (e) {
      dispatch(signupActions.disableLoader());
      console.log(e);
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
          <Spinner key={Math.random()} visible={isSignUpLoading} />

          <View style={styles.subContainer}>
              <View style={styles.top}>
                <Text style={styles.welcomeTitle}>Create Account,</Text>
                <Text style={styles.subTitle}>Sign up to get started!</Text>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="FirstName"
                  placeholderTextColor="#DCDCDC"
                  value={firstName}
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="LastName"
                  placeholderTextColor="#DCDCDC"
                  value={lastName}
                  onChangeText={(lastName) => setLastName(lastName)}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="username.email.com"
                  placeholderTextColor="#DCDCDC"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Timezone"
                  placeholderTextColor="#DCDCDC"
                  value={timezone}
                  onChangeText={(timezone) => setTimeZone(timezone)}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Company"
                  placeholderTextColor="#DCDCDC"
                  value={company}
                  onChangeText={(company) => setCompany(company)}
                />
              </View>

              <View style={styles.wrap}>
                {
                      <Button
                        title="Sign Up"
                        titleStyle={styles.buttonTitle}
                        onPress={onSignUp}
                        buttonStyle={{
                          backgroundColor:'#00c6cc',
                          height: 40
                        }}
                      />
                }
              </View>
              
              <View style={styles.footer}>
                <Text style={styles.bottonText}> Already a user? Click here to <Text onPress={() => {
                  navigation.goBack()
                }} style={styles.clickableText}>Login</Text></Text>
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

export default Signup;
