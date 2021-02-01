import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import * as meetingActions from 'app/actions/meetingActions';
import * as meetingByDateActions from 'app/actions/meetingByDateActions';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import config from 'app/config/styles';
import metrics from 'app/config/metrics';
import moment from 'moment';

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn'
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar'
  },
  calendarList: { CONTAINER: 'calendarList' },
  horizontalList: { CONTAINER: 'horizontalList' },
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item'
  },
  expandableCalendar: { CONTAINER: 'expandableCalendar' },
  weekCalendar: { CONTAINER: 'weekCalendar' }
};

const getCurrentMonth = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

const Dashboard = ({ route, navigation }) => {
  const [userDetails, setUserDetails] = useState({});
  const [dateSelected, setDateSelected] = useState({});
  const [meetingDate, setMeetingDate] = useState([]);
  const [items, setItems] = useState({
    '2020-06-17': [{ name: 'item 1 - any js object' }],
    '2020-06-18': [{ name: 'item 2 - any js object', height: 80 }],
    '2020-06-19': [],
    '2020-06-20': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
  });
  
  const {
    loginReducer: { userInfo },
    optionReducer: { option },
    meetingByDateReducer: { meetingByDate },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    getStorageValue();
  }, []);

  async function getStorageValue() {
    try {
      dispatch(meetingActions.requestMeeting());
    } catch (e) {
      // handle here
    } finally {

    }
  }

  useEffect(() => {
    if (userInfo) {
      setUserDetails(userInfo)
    }

    if(meetingByDate.length > 0) {
      setMeetingDate(meetingByDate);
    } else {
      setMeetingDate([]);
    }
  }, [userInfo, meetingByDate]);

  const loadItems = (day) => {
    const time = day.timestamp + 0 * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    if(meetingDate.length > 0) {
      var dataArray = [];
      meetingDate.map((item) => {
        dataArray.push({
          name: item.title,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          createdBy: item.createdBy,
          startTime: item.startTime,
          endTime: item.endTime,
        })
      })
      
      var newItems = {
        [strTime]: dataArray
      };
    }
    setItems(newItems)
  }

  const renderItem = (item) => {
    console.log('item', item)
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
        <Text>{moment(item.startTime).format('h:mm')} - {moment(item.endTime).format('h:mm')}</Text>
        <Text>Host: {item.createdBy}</Text>
      </TouchableOpacity>
    );
  }

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const onDayChange = (day) => {
    console.log('day change', day)
    const time = day.timestamp + 0 * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    dispatch(meetingByDateActions.requestMeetingByDate(day.timestamp));

    if(meetingDate.length > 0) {
      console.log('day change sdsd', meetingDate)
      var dataArray = [];
      meetingDate.map((item) => {
        dataArray.push({
          name: item.title,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          createdBy: item.createdBy,
          startTime: item.startTime,
          endTime: item.endTime,
        })
      })
      
      var newItems = {
        [strTime]: dataArray
      };
      setItems(newItems)
    } else {
      setItems([])
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Agenda
            testID={testIDs.agenda.CONTAINER}
            items={items}
            loadItemsForMonth={loadItems}
            selected={getCurrentMonth()}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            onDayPress={onDayChange}
            disabledByDefault={false}
            pastScrollRange={2}
            futureScrollRange={10}
            markedDates={{
              '2021-01-4': { marked: true, dotColor: 'blue' },
              '2021-01-7': { marked: true, dotColor: 'blue' },
              '2021-01-18': { marked: true, dotColor: 'blue' },
              '2021-01-27': { marked: true, dotColor: 'blue' }
            }}
            theme={{
              agendaKnobColor: 'green'
            }}
          // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Dashboard;
