import {combineReducers} from 'redux';

import authReducer from './authReducer.js';
import qrcodeReducer from './qrcodeReducer.js';
import editBillReducer from './editBillReducer';

export default combineReducers({
  authState: authReducer,
  qrState: qrcodeReducer,
  editbillState: editBillReducer,
});
