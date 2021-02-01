/*
 * combines all th existing reducers
 */
import * as loginReducer from './loginReducer';
import * as forgotPasswordReducer from './forgotPasswordReducer';
import * as signUpReducer from './signUpReducer';
import * as optionReducer from './optionReducer';
import * as loadingReducer from './loadingReducer';
import * as themeReducer from './themeReducer';
import * as meetingReducer from './meetingReducer';
import * as meetingByDateReducer from './meetingByDateReducer';
import * as refreshTokenReducer from './refreshTokenReducer';

export default Object.assign(
  loginReducer,
  forgotPasswordReducer,
  signUpReducer,
  optionReducer,
  loadingReducer,
  themeReducer,
  meetingReducer,
  meetingByDateReducer,
  refreshTokenReducer
);
