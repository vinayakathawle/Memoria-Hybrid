import React, { useLayoutEffect, useState,useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
} from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import config from 'app/config/styles';

const Dashboard = ({ route,navigation }) => {
  const [userDetails, setUserDetails] = useState({});
  const [dateSelected, setDateSelected] = useState({});
  const {
    loginReducer: { userInfo },
    optionReducer: { option },
  } = useSelector(state => state);

  useEffect(() => {
    if (userInfo) {
      setUserDetails(userInfo)
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Calendar
                onDayPress={(day) => {
                  setDateSelected({[day.dateString]: { selected: true, selectedColor: config.color.COLOR_PRIMARY }})
                }}
                markedDates={dateSelected}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Dashboard;
