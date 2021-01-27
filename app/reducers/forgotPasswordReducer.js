/**
 * ForgotPassword reducer
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isSuccess: false,
  userInfo: {},
};

export const forgotPasswordReducer = createReducer(initialState, {
  [types.FORGOTPASS_REQUEST](state, action) {
    return {
      ...state,
      email: action.email,
    };
  },
  [types.FORGOTPASS_RESPONSE](state, action) {
    return {
      ...state,
      isSuccess: true,
      response: action.response,
    };
  },
  [types.FORGOTPASS_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      response: action.response,
    };
  },
});
