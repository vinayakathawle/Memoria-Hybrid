/**
 * SignUp reducer
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
    date: '',
    meetingByDate: []
};

export const meetingByDateReducer = createReducer(initialState, {
    [types.REQUEST_MEETING_BY_DATE](state, action) {
        return {
            ...state,
            date: action.date
        };
    },
    [types.MEETING_BY_DATE_RESPONSE](state, action) {
        return {
            ...state,
            meetingByDate: action.response
        };
    },
    [types.MEETING_BY_DATE_FAILED](state) {
        return {
            ...state,
            meetingByDate: []
        };
    },
});
