/*
 * Reducer actions related with meeting by date
 */
import * as types from './types';

export function requestMeetingByDate(date) {
  return {
    type: types.REQUEST_MEETING_BY_DATE,
    date
  };
}

export function onMeetingByDateResponse(response) {
  return {
    type: types.MEETING_BY_DATE_RESPONSE,
    response
  };
}

export function meetingByDateFailed(response) {
  return {
    type: types.MEETING_BY_DATE_FAILED,
    response
  };
}

export function enableLoader() {
  return {
    type: types.MEETING_BY_DATE_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.MEETING_BY_DATE_DISABLE_LOADER,
  };
}

