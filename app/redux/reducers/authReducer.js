import {
  USER_LOGOUT,
  USER_LOGIN,
  AUTH_LOADING,
  USER_DATA,
  LOGGED,
  LOGGED_LOADING,
  LOGIN_ERROR,
} from '../actions/types';

const initialState = {
  userToken: null,
  authLoading: false,
  loggedLoading: false,
  userdata: null,
  Token: null,
  userdata: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED:
      return {
        ...state,
        Token: action.payload,
        userdata: action.payloaduserdata,
        loggedLoading: false,
        authLoading: false,
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
        authLoading: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authLoading: false,
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
