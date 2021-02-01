/**
 * SignUp reducer
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isSuccess: '',
  userInfo: {},
};

export const signUpReducer = createReducer(initialState, {
  [types.SIGNUP_REQUEST](state, action) {
    return {
      ...state,
      firstName: action.firstName,
      lastName: action.lastName,
      email: action.email,
      company: action.company,
      timezone: action.timezone
    };
  },
  [types.SIGNUP_RESPONSE](state, action) {
    return {
      ...state,
      isSuccess: true,
      userInfo: action.response
    };
  },
  [types.SIGNUP_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      userInfo: action.response
    };
  },
  [types.SIGNUP_NULL](state) {
    return {
      ...state,
      isSuccess: ''
    };
  }
});
