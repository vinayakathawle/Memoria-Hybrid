/*
 * combines all th existing reducers
 */
import * as loginReducer from './loginReducer';
import * as optionReducer from './optionReducer';
import * as loadingReducer from './loadingReducer';
import * as themeReducer from './themeReducer';

export default Object.assign(
  loginReducer,
  optionReducer,
  loadingReducer,
  themeReducer,
);
