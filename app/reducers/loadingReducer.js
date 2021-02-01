/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoginLoading: false,
  isForgotPasswordLoading: false,
  isSignUpLoading: false,
  isMeetingLoading: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.LOGIN_ENABLE_LOADER](state) {
    return { ...state, isLoginLoading: true };
  },
  [types.LOGIN_DISABLE_LOADER](state) {
    return { ...state, isLoginLoading: false };
  },
  [types.FORGOTPASS_ENABLE_LOADER](state) {
    return { ...state, isForgotPasswordLoading: true };
  },
  [types.FORGOTPASS_DISABLE_LOADER](state) {
    return { ...state, isForgotPasswordLoading: false };
  },
  [types.SIGNUP_ENABLE_LOADER](state) {
    return { ...state, isSignUpLoading: true };
  },
  [types.SIGNUP_DISABLE_LOADER](state) {
    return { ...state, isSignUpLoading: false };
  },
  [types.MEETING_ENABLE_LOADER](state) {
    return { ...state, isMeetingLoading: true };
  },
  [types.MEETING_DISABLE_LOADER](state) {
    return { ...state, isMeetingLoading: false };
  },
});
