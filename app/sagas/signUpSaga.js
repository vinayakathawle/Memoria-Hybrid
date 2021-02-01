import { put, call, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import * as signupActions from 'app/actions/signupActions';
import * as navigationActions from 'app/actions/navigationActions';
import * as types from 'app/actions/types';
import apiconstants from 'app/config/apiconstants';
import { act } from 'react-test-renderer';


function signUpUser(firstName, lastName, email, company, timeZone) {
  const params =  {
    email: email,
    timezone: timeZone,    
    userName: firstName,
    accountName: company,
    firstName: firstName,
    lastName: lastName
  };
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  return axios.post( apiconstants.BASE_URL + apiconstants.SIGNUP, params, {
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

// Our worker Saga that signup the user
function* signUpAsync(action) {
  try {
    console.log('action firstname', action.firstName)

    const response = yield call(signUpUser, action.firstName, action.lastName, action.email, action.company, action.timeZone);
    console.log('signup - response', response)

    if (response.status === 200) {
      yield put(signupActions.disableLoader());
      
      yield put(signupActions.onSignUpResponse(response));
      yield call(storeUserInfo, response.data);
      return;
    } else {
      yield put(signupActions.disableLoader());
      yield put(signupActions.signUpFailed('SignUp Failed'));
    }

  } catch (error) {
    yield put(signupActions.disableLoader());
    yield put(signupActions.signUpFailed(error.message));
  }
}

function storeUserInfo(userInfo) {
  AsyncStorage.setItem('accountName', userInfo.accountName);
  AsyncStorage.setItem('email', userInfo.email);
  AsyncStorage.setItem('firstName', userInfo.firstName);
  AsyncStorage.setItem('lastName', userInfo.lastName);
  AsyncStorage.setItem('timezone', userInfo.timezone);
  AsyncStorage.setItem('userName', userInfo.userName);
  AsyncStorage.setItem('uuid', userInfo.uuid);
}

export default function* signUp() {
  yield takeEvery(types.SIGNUP_REQUEST, signUpAsync);
}
