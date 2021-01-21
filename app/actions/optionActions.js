/*
 * Reducer actions related with login
 */
import * as types from './types';

export function requestOption(option) {
    return {
      type: types.OPTION_REQUEST,
      option,
    };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
