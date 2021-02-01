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
import * as navigationActions from 'app/actions/navigationActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'app/components/Spinner';
import * as ValidationController from 'app/components/ValidationController';
import Error from 'app/components/Error';
import DialogBox from 'react-native-dialogbox';
import PickerModal from 'react-native-picker-modal-view';
import config from 'app/config/styles';

import data from '../../assets/CitiesAndTimeZones.json';

const Signup = ({ navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [timezone, setTimeZone] = useState('');
  const [selectedItem, setSelectedItem] = useState({});

  const [isValidateFirstname, setIsValidateFirstname] = useState(true);
  const [isValidateLastname, setIsValidateLastname] = useState(true);
  const [isValidateEmail, setIsValidateEmail] = useState(true);
  const [isValidateTimezone, setIsValidateTimezone] = useState(true);
  const [isValidateCompany, setIsValidateCompany] = useState(true);

  const dialogbox = useRef(null);

  const {
    loadingReducer: { isSignUpLoading },
    signUpReducer: { isSuccess, errorMessage },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signupActions.signupNull());
    
    if (isSuccess && isSuccess !== '') {
      dialogbox.current.tip({
        title: 'Success!',
        content: 'Successfully signup.',
        btn: {
          text: 'Login To My Account',
          callback: () => {
            navigationActions.navigateToLogin()
          }
        }
      });
    }
    if(!isSuccess && isSuccess !== '') {
      dialogbox.current.tip({
        content: errorMessage,
        btn: {
          text: 'Login To My Account',
          callback: () => {
            navigationActions.navigateToLogin()
          }
        }
      });
    }
  }, [isSuccess]);

  const onSignUp = async () => {
    const validateEmail = ValidationController.validateEmail(email);
    
    if(firstName === '' || lastName === '' || !validateEmail || company === '' || timezone === '') {
    
      let fieldErrorMessage = 'All fields are required.'

      dialogbox
        .current
        .alert(fieldErrorMessage);
      
      return true
    } else {
      setIsValidateFirstname(true)
      setIsValidateLastname(true)
      setIsValidateEmail(true)
      setIsValidateTimezone(true)
      setIsValidateCompany(true)
    }

    dispatch(signupActions.enableLoader());

    try {
      dispatch(signupActions.requestSignUp(firstName, lastName, email, company, timezone));
    } catch (e) {
      dispatch(signupActions.disableLoader());
      console.log(e);
    }
  }

  const onClosed = () => {
		setTimeZone('')
	}

	const onSelected = (selected) => {
    setSelectedItem(selected)
    setTimeZone(selected.Id)
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

              <View>
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) =>
                    <Text
                      onPress={showModal}
                      style={[styles.inputView, {color: selected.Id ? '#000' : '#DCDCDC'}]}
                    >
                      {selected.Id ? selected.Id : 'timezone'}
                    </Text>
                  }
                  onSelected={onSelected}
                  onClosed={onClosed}
                  items={data}
                  sortingLanguage={'tr'}
                  showToTopButton={true}
                  selected={selectedItem}
                  showAlphabeticalIndex={true}
                  autoGenerateAlphabeticalIndex={true}
                  selectPlaceholderText={'Choose one...'}
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText={'Search...'}
                  requireSelection={false}
                  autoSort={false}
                  backButtonDisabled={true}
                  showAlphabeticalIndex={false}
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
