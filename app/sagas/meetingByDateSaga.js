import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as meetingByDateActions from 'app/actions/meetingByDateActions';
import AsyncStorage from '@react-native-community/async-storage';
import * as types from 'app/actions/types';
import apiconstants from 'app/config/apiconstants';
import moment from 'moment';

async function getMeetingByDate(date) {
  const accountId = await AsyncStorage.getItem('accountId');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': await AsyncStorage.getItem('auth'),
    'accountId': accountId
  }
  return axios.get(apiconstants.BASE_URL + 'accounts/' + accountId + '/meetings/getMeetingByDate?page=0&size=150&meetingDate=' + moment(date).format('MM-DD-yyyy'), {
    headers: headers
  })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        return error.response.data
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
}

// Our worker Saga that get meeting by date
function* meetingByDateAsync(action) {
  
  try {
    yield put(meetingByDateActions.enableLoader());

    const response = yield call(getMeetingByDate, action.date);
    
    if (response.status === 200) {

      yield put(meetingByDateActions.onMeetingByDateResponse(response.data.data));
      yield put(meetingByDateActions.disableLoader());
      return;
    } else {
      yield put(meetingByDateActions.meetingByDateFailed(response));

      yield put(meetingByDateActions.disableLoader());
    }

  } catch (error) {
    yield put(meetingByDateActions.disableLoader());
    yield put(meetingByDateActions.meetingByDateFailed(error.message));
  }
}

export default function* meetingByDateSaga() {
  yield takeEvery(types.REQUEST_MEETING_BY_DATE, meetingByDateAsync);
}
