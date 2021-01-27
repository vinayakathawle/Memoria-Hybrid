/**
 *  Redux saga class init
 */
import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import signUpSaga from './signUpSaga';
import forgotpasswordSaga from './forgotpasswordSaga';
import optionSaga from './optionSaga';

export default function* watch() {
  yield all([
    loginSaga(),
    forgotpasswordSaga(),
    signUpSaga(),
    optionSaga()
  ]);
}
