import React, { useState } from 'react';
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

const Option = ({ navigation }) => {
  const [options, setOptions] = useState([
    {
      label: 'Option 1'
    },
    {
      label: 'Option 2'
    },
    {
      label: 'Option 3'
    },
    {
      label: 'Option 4'
    },
    {
      label: 'Option 5'
    }
  ]);

  const dispatch = useDispatch();

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
            <Text style={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
            <RadioButtonRN
                data={options}
                selectedBtn={onOptionSelection}
                icon={
                    <Icon
                        name="check-circle"
                        size={25}
                        color="#2c9dd1"
                    />
                }
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Option;
