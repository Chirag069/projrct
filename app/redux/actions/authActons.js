import {
  USER_LOGIN,
  AUTH_LOADING,
  USER_LOGOUT,
  LOGGED,
  LOGGED_LOADING,
  LOGIN_ERROR,
} from './types';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

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
    dispatch({
      type: AUTH_LOADING,
    });
    try {
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

      fetch(
        'https://nts.dhyaravi.com/outward_ipa/register/login',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;

          if (serverResponse?.status) {
            if (serverResponse && serverResponse.token) {
              (async () => {
                await AsyncStorage.setItem('@user_token', serverResponse.token);
                await AsyncStorage.setItem(
                  '@user_id',
                  serverResponse.data.user_id,
                );
              })();
            }

            (async () => {
              const userToken = await AsyncStorage.getItem('@user_token');

              dispatch(LoggedAction(userToken));
            })();

            dispatch({
              type: USER_LOGIN,
              payload: serverResponse.token,
              payloaduserdata: serverResponse.data,
            });

            Toast.show({
              text1: 'User Login Successfully',
              visibilityTime: 2000,
              autoHide: true,
              position: 'top',
              type: 'success',
            });
          } else {
            dispatch({
              type: LOGIN_ERROR,
            });
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: 'Your Username or password is wrong',
                  visibilityTime: 3000,
                  autoHide: true,
                  position: 'top',
                  type: 'error',
                });
              } else {
                Toast.show({
                  text1: 'Check your Internet Connection',
                  visibilityTime: 3000,
                  autoHide: true,
                  position: 'top',
                  type: 'error',
                });
              }
            });
          }
        })
        .catch(error => {
          alert(error + '');
          dispatch({
            type: LOGIN_ERROR,
          });
        });
    } catch (err) {
      alert('error 2 login');
      dispatch({
        type: LOGIN_ERROR,
      });
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          Toast.show({
            text1: 'Your Username or password is wrong',
            visibilityTime: 3000,
            autoHide: true,
            position: 'top',
            type: 'error',
          });
        } else {
          Toast.show({
            text1: 'Check your Internet Connection',
            visibilityTime: 3000,
            autoHide: true,
            position: 'top',
            type: 'error',
          });
        }
      });
    }
  };
