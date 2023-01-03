import Toast from 'react-native-toast-message';
import qrcodeReducer from '../reducers/qrcodeReducer';
import NetInfo from '@react-native-community/netinfo';
import Sound from 'react-native-sound';
import {
  DELETE_EDITBILL,
  DELETE_EDITBILL_ERROR,
  DELETE_EDITBILL_LOADING,
  EDIT_BILL_UPDATE,
  EDIT_QRLOADING,
  EDIT_QR_ERROR,
  GET_EDITBILL,
  SET_EDITBILL,
} from '../actions/types';

export const editqrLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: EDIT_QRLOADING,
      payload: loading,
    });
  };

export const editSetqrdataAction =
  (userToken = '', barcode = '', invoiceid = '') =>
  dispatch => {
    // dispatch(qrLoadingAction(true));
    try {
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
        `https://nts.dhyaravi.com/outward_ipa/home/update_barcodedata/${invoiceid}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;

          dispatch(geteditqrdataAction(userToken, invoiceid));

          //   dispatch(qrLoadingAction());
          if (serverResponse.success) {
            Toast.show({
              text1: serverResponse.message,
              visibilityTime: 3000,
              autoHide: true,
              position: 'top',
              type: 'success',
            });

            dispatch({
              type: SET_EDITBILL,
            });
          } else {
            // dispatch(qrLoadingAction());
            alert(serverResponse.message);
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: 'something wait wrong',
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
          //   dispatch(qrLoadingAction());
          alert(error);
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              Toast.show({
                text1: 'something wait wrong',
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
        });
    } catch (err) {
      alert(err);
      //   dispatch(qrLoadingAction());
    }
  };

export const geteditqrdataAction =
  (userToken = '', invoiceid = '') =>
  dispatch => {
    dispatch({
      type: EDIT_QRLOADING,
    });
    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        `https://nts.dhyaravi.com/outward_ipa/home/get_sales_list/${invoiceid}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;
          // dispatch(qrLoadingAction());
          if (serverResponse) {
            dispatch({
              type: GET_EDITBILL,
              payload: serverResponse.data,
              payloadtq: serverResponse.tq,
              payloadtp: serverResponse.tp,
              payloadtt: serverResponse.tt,
            });
          } else {
            // dispatch(qrLoadingAction());
            alert(serverResponse.message);
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: 'something wait wrong',
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
          dispatch({
            type: EDIT_QR_ERROR,
          });
          alert(error);
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              Toast.show({
                text1: 'something wait wrong',
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
        });
    } catch (err) {
      alert(err);
      dispatch({
        type: EDIT_QR_ERROR,
      });
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          Toast.show({
            text1: 'something wait wrong',
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

export const deleteeditqrdataAction =
  (userToken = '', id = '', invoiceid = '') =>
  dispatch => {
    // dispatch(qrLoadingAction(true));
    try {
      dispatch({
        type: DELETE_EDITBILL_LOADING,
      });
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userToken}`);

      var formdata = new FormData();
      formdata.append('id', id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `https://nts.dhyaravi.com/outward_ipa/home/update_delete_data/${invoiceid}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;
          if (serverResponse) {
            dispatch({
              type: DELETE_EDITBILL,
            });
            dispatch(geteditqrdataAction(userToken, invoiceid));
            Toast.show({
              text1: 'item successfully deleted',
              visibilityTime: 3000,
              autoHide: true,
              position: 'top',
              type: 'error',
            });
          } else {
            alert(serverResponse.message);
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: 'something wait wrong',
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
          dispatch({
            type: DELETE_EDITBILL_ERROR,
          });
          alert(error);
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              Toast.show({
                text1: 'something wait wrong',
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
        });
    } catch (err) {
      alert(err);
      dispatch({
        type: DELETE_EDITBILL_ERROR,
      });
    }
  };

export const editBillUpdateAction =
  (
    userToken = '',
    id = '',
    qty = '',
    price = '',
    pieces = '',
    total = '',
    invoiceid = '',
  ) =>
  dispatch => {
    try {
      //   dispatch({
      //     type: UPDATE_LOADING,
      //   });

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userToken}`);

      var formdata = new FormData();
      formdata.append('id', id);
      formdata.append('qty', qty);
      formdata.append('price', price);
      formdata.append('pieces', pieces);
      formdata.append('total', total);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `https://nts.dhyaravi.com/outward_ipa/home/update_sales_data/${invoiceid}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;
          // dispatch(qrLoadingAction());
          if (serverResponse) {
            Toast.show({
              text1: 'Successfully update',
              visibilityTime: 3000,
              autoHide: true,
              position: 'top',
              type: 'success',
            });
            dispatch({
              type: EDIT_BILL_UPDATE,
            });
            dispatch(geteditqrdataAction(userToken, invoiceid));
          } else {
            // dispatch({
            //   type: UPDATE_ERROR,
            // });
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: serverResponse.message,
                  visibilityTime: 3000,
                  autoHide: true,
                  position: 'top',
                  type: '',
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
            // Toast.show({
            //   text1: serverResponse.message,
            //   visibilityTime: 2000,
            //   autoHide: true,
            //   position: 'top',
            //   type: 'error',
            // });
          }
        })
        .catch(error => {
          console.log(error);
          //   dispatch({
          //     type: UPDATE_ERROR,
          //   });
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              Toast.show({
                text1: 'something wait wrong',
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
        });
    } catch (err) {
      //   dispatch({
      //     type: UPDATE_ERROR,
      //   });
      alert(err + '');
    }
  };
