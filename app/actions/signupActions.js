/*
 * Reducer actions related with signup
 */
import * as types from './types';

export function requestSignUp(firstName, lastName, email, company, timeZone) {
  return {
    type: types.SIGNUP_REQUEST,
    firstName,
    lastName,
    company,
    email,
    timeZone
  };
}

export function onSignUpResponse(response) {
  return {
    type: types.SIGNUP_RESPONSE,
    response,
  };
}

export function signUpFailed(response) {
  return {
    type: types.SIGNUP_FAILED,
    response
  };
}

export function signupNull() {
  return {
    type: types.SIGNUP_NULL
  };
}

export function enableLoader() {
  return {
    type: types.SIGNUP_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.SIGNUP_DISABLE_LOADER,
  };
}

