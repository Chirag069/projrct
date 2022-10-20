import {FILTER, FILTER_LOADING} from './types';
import Toast from 'react-native-toast-message';

export const FilterLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: FILTER_LOADING,
      payload: loading,
    });
  };

export const FilterAction =
  (userToken = '') =>
  dispatch => {
    dispatch(FilterLoadingAction(true));
    var myHeaders = new Headers();
    myHeaders.append('If-Range', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      'http://rd.ragingdevelopers.com/svira/svira1api/filter',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        dispatch(FilterLoadingAction());
        if (serverResponse.status == true) {
          const responsedata = serverResponse.data;

          dispatch({
            type: FILTER,
            payload: responsedata,
          });

          // Toast.show({
          //   text1: serverResponse.message,
          //   visibilityTime: 2000,
          //   autoHide: true,
          //   position: 'top',
          //   type: 'success',
          // });
        } else {
          Toast.show({
            text1: serverResponse.msg,
            visibilityTime: 2000,
            autoHide: true,
            position: 'top',
            type: 'error',
          });
        }
      })
      .catch(error => {
        dispatch(FilterLoadingAction());
        Toast.show({
          text1: 'Server response failed',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };
