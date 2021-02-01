/**
 * Refresh token reducer
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {};

export const refreshRequestReducer = createReducer(initialState, {
  [types.REFRESH_TOKEN_REQUEST](state) {
    return { 
      ...state
    };
  }
});
