import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as forgotpasswordActions from 'app/actions/forgotpasswordActions';
import * as types from 'app/actions/types';
import apiconstants from 'app/config/apiconstants';

function forgotPassword(email) {
  const params =  {
    email: email
  };
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.20.1',
    'Accept': '*/*',
    'Cache-Control': 'no-cache',
    'Postman-Token': 'add76099-401a-438f-84b3-8a2e44d79528,0d9b3c33-b81d-4ba7-a1c3-164b385bb3ff',
    'Host': 'kube.memoriadev.com',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Length': '41',
    'Connection': 'keep-alive',
    'cache-control': 'no-cache'
  }
  return axios.patch(apiconstants.BASE_URL + apiconstants.FORGOT_PASSWORD, params, {
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

// Our worker Saga that forgotpassword  user
function* forgotPasswordAsync(action) {
  try {
    yield put(forgotpasswordActions.enableLoader());

    const response = yield call(forgotPassword, action.email);

    if (response.status == 200) {

      yield put(forgotpasswordActions.onForgotPasswordResponse(response));
      yield put(forgotpasswordActions.disableLoader());
      return;
    } else if (response.status == 404) {

      yield put(forgotpasswordActions.forgotPasswordFailed(response.message));
      yield put(forgotpasswordActions.disableLoader());
    } else {

      yield put(forgotpasswordActions.forgotPasswordFailed(response.error));
      yield put(forgotpasswordActions.disableLoader());
    }

  } catch (error) {
    yield put(forgotpasswordActions.disableLoader());
    yield put(forgotpasswordActions.forgotPasswordFailed(error.message));
  }
}

export default function* forgotPasswordAction() {
  yield takeEvery(types.FORGOTPASS_REQUEST, forgotPasswordAsync);
}
