/**
 *  Redux saga class init
 */
import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import signUpSaga from './signUpSaga';
import forgotpasswordSaga from './forgotpasswordSaga';
import optionSaga from './optionSaga';
import meetingSaga from './meetingSaga';
import meetingByDateSaga from './meetingByDateSaga';
import refreshTokenSaga from './refreshTokenSaga';

export default function* watch() {
  yield all([
    loginSaga(),
    forgotpasswordSaga(),
    signUpSaga(),
    optionSaga(),
    meetingSaga(),
    meetingByDateSaga(),
    refreshTokenSaga()
  ]);
}
