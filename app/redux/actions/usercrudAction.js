import {USER_UPDATE} from './types';

export const UserCRUDAction =
  (updateid = '') =>
  dispatch => {
    dispatch({
      type: USER_UPDATE,
      payload: updateid,
    });
  };
