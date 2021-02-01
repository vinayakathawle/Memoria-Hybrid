/*
 * Reducer actions related with signup
 */
import * as types from './types';

export function requestMeeting() {
  return {
    type: types.REQUEST_MEETING
  };
}

export function onMeetingResponse(response) {
  return {
    type: types.MEETING_RESPONSE,
    response
  };
}

export function meetingFailed(response) {
  return {
    type: types.MEETING_FAILED,
    response
  };
}

export function enableLoader() {
  return {
    type: types.MEETING_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.MEETING_DISABLE_LOADER,
  };
}

