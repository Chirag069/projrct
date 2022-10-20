import {HOME} from './types';
import Toast from 'react-native-toast-message';

export const HomeAction =
  (userToken = '') =>
  dispatch => {
    console.log(userToken);
    // dispatch(WishListLoadingAction(true));
    var myHeaders = new Headers();
    myHeaders.append('If-Range', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      token: userToken,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://rd.ragingdevelopers.com/svira/svira1api/home', requestOptions)
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;

        if (serverResponse.status == true) {
          dispatch({
            type: HOME,
            payload: serverResponse,
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
        Toast.show({
          text1: 'Server response failed',
          visibilityTime: 2000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };
