import {QRDATA, QRLOADING} from './types';
import Toast from 'react-native-toast-message';

export const qrLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: QRLOADING,
      payload: loading,
    });
  };

export const qrdataAction =
  (userToken = '', barcode = '') =>
  dispatch => {
    dispatch(qrLoadingAction(true));
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    var formdata = new FormData();
    formdata.append('barcode', barcode);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://nts.dhyaravi.com/outward_ipa/home/barcodedata',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        console.log(serverResponse);
        dispatch(qrLoadingAction());
        if (serverResponse?.success == 1) {
          dispatch({
            type: QRDATA,
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
          dispatch(qrLoadingAction());
          Toast.show({
            text1: serverResponse.message,
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
