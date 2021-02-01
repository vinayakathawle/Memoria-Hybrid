import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as meetingActions from 'app/actions/meetingActions';
import AsyncStorage from '@react-native-community/async-storage';
import * as types from 'app/actions/types';
import apiconstants from 'app/config/apiconstants';
// import * as navigationActions from 'app/actions/navigationActions';
import moment from 'moment';

async function getMeeting() {
  const accountId = await AsyncStorage.getItem('accountId');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': await AsyncStorage.getItem('auth'),
    'accountId': accountId
  }
  return axios.get(apiconstants.BASE_URL+'accounts/'+accountId+'/meetings?page=0&size=150&pastdays=3&upcomingdays=-1', {
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

function* meetingAsync(action) {
  try {
    yield put(meetingActions.enableLoader());

    const response = yield call(getMeeting);

    if (response.status === 200) {

      yield put(meetingActions.onMeetingResponse(response));
      yield put(meetingActions.disableLoader());
      return;
    } else {
      yield put(meetingActions.meetingFailed(response));

      yield put(meetingActions.disableLoader());
    }

  } catch (error) {
    yield put(meetingActions.disableLoader());
    yield put(meetingActions.meetingFailed(error.message));
  }
}

export default function* meetingSaga() {
  yield takeEvery(types.REQUEST_MEETING, meetingAsync);
}
