/**
 * SignUp reducer
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  meetings: []
};

export const meetingReducer = createReducer(initialState, {
  [types.REQUEST_MEETING](state) {
    return {
      ...state
    };
  },
  [types.MEETING_RESPONSE](state, action) {
    return {
      ...state,
      meetings: action.response
    };
  },
  [types.MEETING_FAILED](state) {
    return {
      ...state,
      meetings: []
    };
  },
});
