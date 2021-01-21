import { put, call, takeEvery } from 'redux-saga/effects';
import * as types from 'app/actions/types';
import * as navigationActions from 'app/actions/navigationActions';

// Our worker Saga that logins the user
function* optionAsync() {
  try {
    yield call(navigationActions.navigateToDashboard);
  } catch (error) {
    console.log(error);
  }
}

export default function* option() {
  yield takeEvery(types.OPTION_REQUEST, optionAsync);
}
