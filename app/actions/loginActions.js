/*
 * Reducer actions related with login
 */
import * as types from './types';

export function requestLogin(uid, token) {
  return {
    type: types.LOGIN_REQUEST,
    uid,
    token
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response
  };
}

export function getUserAccounts() {
  return {
    type: types.GET_USER_ACCOUNT
  };
}

export function userAccountResponse(response) {
  return {
    type: types.USER_ACCOUNT_RESPONSE,
    response
  };
}

export function loginFailed(response) {
  return {
    type: types.LOGIN_FAILED,
    response
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

