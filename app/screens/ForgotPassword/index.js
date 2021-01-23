import React, { useState } from 'react';
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

const ForgotPassword = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
          <View style={styles.subContainer}>
              <View style={styles.top}>
                <Text style={styles.welcomeTitle}>Forgot Password,</Text>
                <Text style={styles.subTitle}>Enter the email address used for registration</Text>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="username@email.com"
                  placeholderTextColor="#DCDCDC"
                />
              </View>



              <View style={styles.wrap}>
                {
                 
                      <Button
                        title="Continue"
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
                  navigationActions.navigateToSignup()
                }} style={styles.clickableText}>Back to Login</Text></Text>
                <Text style={styles.bottonSubText}> By logging in to Memoria, you agree to our <Text onPress={() => {
                  navigationActions.navigateToTermsCondition()
                }} style={styles.clickableText}>Terms & Conditions</Text> and <Text onPress={() => {
                  navigationActions.navigateToLegalPolicy()
                }} style={styles.clickableText}>Privacy Policy</Text>.</Text>
              </View>

            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ForgotPassword;
