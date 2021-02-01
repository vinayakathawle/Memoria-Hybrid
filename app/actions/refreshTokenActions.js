/*
 * Reducer actions related with refreshToken
 */
import * as types from './types';

export function requestRefreshToken() {
    return {
      type: types.REFRESH_TOKEN_REQUEST
    };
}
