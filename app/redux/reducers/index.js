import {combineReducers} from 'redux';

import authReducer from './authReducer.js';
import qrcodeReducer from './qrcodeReducer.js';

export default combineReducers({
  authState: authReducer,
  qrState: qrcodeReducer,
});
