// export action creators
import * as loginActions from './loginActions';
import * as forgotpasswordActions from './forgotpasswordActions';
import * as signupActions from './signupActions';
import * as optionActions from './optionActions';
import * as navigationActions from './navigationActions';
import * as themeActions from './themeActions';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  forgotpasswordActions,
  signupActions,
  optionActions,
  navigationActions,
  themeActions,
);
