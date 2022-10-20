import {
  USER_LOGOUT,
  USER_LOGIN,
  AUTH_LOADING,
  USER_DATA,
  LOGGED,
  LOGGED_LOADING,
} from '../actions/types';

const initialState = {
  userToken: null,
  authLoading: false,
  loggedLoading: false,
  userdata: null,
  Token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED:
      return {
        ...state,
        Token: action.payload,
        loggedLoading: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        userToken: action.payload,
      };
    case USER_DATA:
      return {
        ...state,
        userdata: action.payload,
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };
    case LOGGED_LOADING:
      return {
        ...state,
        loggedLoading: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userToken: null,
      };
    default:
      return state;
  }
};
