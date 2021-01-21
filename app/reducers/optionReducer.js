/**
 * Login reducer
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  option: {},
  isLoggedIn: false,
};

export const optionReducer = createReducer(initialState, {
  [types.OPTION_REQUEST](state, action) {
    return { 
        ...state,
        option: action.option,
        isLoggedIn: true
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
});
