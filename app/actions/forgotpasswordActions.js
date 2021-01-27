/*
 * Reducer actions related with forgotpassword
 */
import * as types from './types';

export function requestForgotPassword(email) {
  console.log(email)
  return {
    type: types.FORGOTPASS_REQUEST,
    email
  };
}

export function onForgotPasswordResponse(response) {
  return {
    type: types.FORGOTPASS_RESPONSE,
    response,
  };
}

export function forgotPasswordFailed(response) {
  return {
    type: types.FORGOTPASS_FAILED,
    response
  };
}

export function enableLoader() {
  return {
    type: types.FORGOTPASS_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.FORGOTPASS_DISABLE_LOADER,
  };
}

