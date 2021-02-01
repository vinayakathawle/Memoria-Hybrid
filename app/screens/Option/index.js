import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import RadioButtonRN from 'radio-buttons-react-native';
import { Icon } from 'react-native-elements';
import * as optionActions from 'app/actions/optionActions';
import * as loginActions from 'app/actions/loginActions';
import config from 'app/config/styles';

const Option = ({ navigation }) => {
  const [options, setOptions] = useState([]);

  const {
    loginReducer: { accountSet }
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (accountSet.length === 0) {
      dispatch(loginActions.getUserAccounts());
    } else {
      let accountSetArray = [];
      accountSet.map((item) => {
        accountSetArray.push({label: item.accountName, value: item.accountId})
      })
      setOptions(accountSetArray);
    }
  }, [accountSet]);

  const onOptionSelection = (option) => {
    setTimeout(() => {
      dispatch(optionActions.requestOption(option));
    }, 100);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
          <View style={styles.top}>
                <Text style={styles.welcomeTitle}>Select Account,</Text>
                <Text style={styles.subTitle}>Choose the team you'd like to work with for now. It's easy to switch between teams whenever you need to later on</Text>
              </View>
            <RadioButtonRN
              data={options}
              selectedBtn={onOptionSelection}
              animationTypes={["pulse"]}
              icon={
                <Icon
                  name="check"
                  size={50}
                  color={config.color.COLOR_GREEN}
                />
              }
              textStyle={{
                fontFamily: config.fonts.FONT_BOLD,
                fontSize: 16,
                paddingBottom: 5
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Option;
