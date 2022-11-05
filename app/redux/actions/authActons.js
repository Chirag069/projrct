import {
  USER_LOGIN,
  AUTH_LOADING,
  USER_LOGOUT,
  LOGGED,
  LOGGED_LOADING,
} from './types';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: AUTH_LOADING,
      payload: loading,
    });
  };

export const LoggedLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: LOGGED_LOADING,
      payload: loading,
    });
  };

export const LoggedAction =
  (usertoken = '') =>
  async dispatch => {
    dispatch(LoggedLoadingAction(false));
    dispatch({
      type: LOGGED,
      payload: usertoken,
    });
  };

export const authLogOutAction = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('@user_token');
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: USER_LOGOUT,
  });
};

export const userLoginAction =
  (userName = '', userPassword = '') =>
  dispatch => {
    dispatch(authLoadingAction(true));
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer thsJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uSwq',
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      username: userName,
      password: userPassword,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://nts.dhyaravi.com/outward_ipa/register/login', requestOptions)
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;

        if (serverResponse.status == true) {
          if (serverResponse && serverResponse.token) {
            (async () => {
              await AsyncStorage.setItem('@user_token', serverResponse.token);
            })();
          }

          (async () => {
            const userToken = await AsyncStorage.getItem('@user_token');
            dispatch(LoggedAction(userToken));
          })();

          dispatch(authLoadingAction());
          dispatch({
            type: USER_LOGIN,
            payload: serverResponse.token,
          });
          // dispatch(LoggedAction());
          Toast.show({
            text1: 'User Login Successfully',
            visibilityTime: 2000,
            autoHide: true,
            position: 'top',
            type: 'success',
          });
        } else {
          Toast.show({
            text1: 'User Login failed.',
            visibilityTime: 3000,
            autoHide: true,
            position: 'top',
            type: 'error',
          });
        }
      })
      .catch(error => {
        dispatch(authLoadingAction());
        Toast.show({
          text1: 'Server response failed',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };
