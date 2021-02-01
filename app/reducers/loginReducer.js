/**
 * Login reducer
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoggedIn: false,
  userInfo: {},
  uid: '',
  token: '',
  auth: '',
  authRefresh: '',
  accountSet: []
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      uid: action.uid,
      token: action.token
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      isLoggedIn: true,
      userInfo: action.response.data.users,
      auth: action.response.headers.authorization,
      authRefresh: action.response.headers['x-authorization'],
      accountSet: action.response.data.accountSet
    };
  },
  [types.GET_USER_ACCOUNT](state) {
    return {
      ...state,
      accountid: state.userInfo.accountId,
      uid: state.userInfo.userUid
    };
  },
  [types.USER_ACCOUNT_RESPONSE](state, action) {
    return {
      ...state,
      accountSet: action.response
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
});
