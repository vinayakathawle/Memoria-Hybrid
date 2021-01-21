/**
 *  Redux saga class init
 */
import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import optionSaga from './optionSaga';

export default function* watch() {
  yield all([
    loginSaga(),
    optionSaga()
  ]);
}
