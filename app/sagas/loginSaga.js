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

async function getUserAccounts(accountid, uid) {
  const headers = {
    'Authorization': await AsyncStorage.getItem('auth'),
    'AccountId': accountid
  }
  return axios.get( apiconstants.BASE_URL + 'accounts/' + accountid + '/users/' + uid + '/user-accounts', headers)
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

// Our worker Saga that logins the user
function* loginAsync(action) {
  try {
    // yield put(loginActions.enableLoader());

    const response = yield call(loginUser, action.uid, action.token);
    console.log('response', response)

    if (response.status === 200) {
      yield put(loginActions.disableLoader());
      
      yield put(loginActions.onLoginResponse(response));
      yield call(storeUserInfo, response.data.users);
      yield call(storeAuth, response.headers.authorization);
      yield call(storeAuthRefresh, response.headers['x-authorization']);
      
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

// Our worker Saga that get accounts
function* getUserAccountAsync(action) {
  try {
    yield put(optionActions.enableLoader());

    const response = yield call(getUserAccounts, action.accountid, action.uid);

    if (response.status === 200) {
      yield put(optionActions.disableLoader());
      yield put(loginActions.userAccountResponse(response));
      return;
    } else if(response.status === 401) {
      yield put(refreshTokenActions.requestRefreshToken());
    } else {
      yield put(optionActions.disableLoader());
    }
  } catch (error) {
    yield put(optionActions.disableLoader());
  }
}

function storeUserInfo(userInfo) {
  AsyncStorage.setItem('userName', userInfo.userName);
  AsyncStorage.setItem('role', userInfo.role);
  AsyncStorage.setItem('firstName', userInfo.firstName);
  AsyncStorage.setItem('lastName', userInfo.lastName);
  AsyncStorage.setItem('accountId', userInfo.accountId);
}

function storeAuth(auth) {
  AsyncStorage.setItem('auth', auth);
}

function storeAuthRefresh(authRefresh) {
  AsyncStorage.setItem('authRefresh', authRefresh);
}

export default function* login() {
  yield takeEvery(types.LOGIN_REQUEST, loginAsync);
}

export function* getAccounts() {
  yield takeEvery(types.GET_USER_ACCOUNT, getUserAccountAsync);
}
