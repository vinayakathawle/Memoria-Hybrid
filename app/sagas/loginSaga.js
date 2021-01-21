import { put, call, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import * as loginActions from 'app/actions/loginActions';
import * as navigationActions from 'app/actions/navigationActions';
import * as types from 'app/actions/types';
import apiconstants from 'app/config/apiconstants';

function loginUser(uid, token) {
  const params =  {
    userUid: uid,
    token: token
  };
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  return axios.post( apiconstants.BASE_URL + apiconstants.LOGIN, params, {
    headers: headers
  })
  .then((response) => response.data)
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

// Our worker Saga that logins the user
function* loginAsync(action) {
  try {
    // yield put(loginActions.enableLoader());

    const response = yield call(loginUser, action.uid, action.token);
    console.log('response', response)

    if (response.users) {
      yield put(loginActions.disableLoader());
      
      yield put(loginActions.onLoginResponse(response.users));
      yield call(storeUserInfo, response.users);
      yield call(navigationActions.navigateToOption);
      return;
    } else {
      yield put(loginActions.disableLoader());
      yield put(loginActions.loginFailed('Login Failed'));
    }

  } catch (error) {
    yield put(loginActions.disableLoader());
    yield put(loginActions.loginFailed(error.message));
  }
}

function storeUserInfo(userInfo) {
  AsyncStorage.setItem('userName', userInfo.userName);
  AsyncStorage.setItem('role', userInfo.role);
  AsyncStorage.setItem('firstName', userInfo.firstName);
  AsyncStorage.setItem('lastName', userInfo.lastName);
}

export default function* login() {
  yield takeEvery(types.LOGIN_REQUEST, loginAsync);
}
