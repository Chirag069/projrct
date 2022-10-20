import {GET_CART, UPDATE_CART, REMOVE_CART, CART_LOADING} from './types';
import Toast from 'react-native-toast-message';

export const CartLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: CART_LOADING,
      payload: loading,
    });
  };

export const GetCartAction =
  (userToken = '') =>
  dispatch => {
    dispatch(CartLoadingAction(true));
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
      'http://rd.ragingdevelopers.com/svira/svira1api/home/cart',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        dispatch(CartLoadingAction());
        if (serverResponse.status == true) {
          dispatch({
            type: GET_CART,
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
          dispatch(CartLoadingAction());
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
        dispatch(CartLoadingAction());
        Toast.show({
          text1: 'Server response failed',
          visibilityTime: 2000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };

export const RemoveCartAction =
  (userToken = '', removeitemid = '') =>
  dispatch => {
    dispatch(CartLoadingAction(true));
    var myHeaders = new Headers();
    myHeaders.append('If-Range', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: removeitemid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      'http://rd.ragingdevelopers.com/svira/svira1api/home/remove_cart',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        dispatch(CartLoadingAction(false));
        if (serverResponse.status == true) {
          dispatch({
            type: REMOVE_CART,
            payload: serverResponse,
          });

          Toast.show({
            text1: serverResponse.message,
            visibilityTime: 2000,
            autoHide: true,
            position: 'top',
            type: 'success',
          });
        } else {
          dispatch(CartLoadingAction());
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

export const UpdateCartAction =
  (userToken = '', qty = '', item_config_id = '') =>
  dispatch => {
    dispatch(CartLoadingAction(true));
    console.log(qty, item_config_id);
    var myHeaders = new Headers();
    myHeaders.append('If-Range', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      item_config_id: item_config_id,
      qty: qty,
      action: 'add',
      group_id: 1,
      size_id: 1,
      remark: 'Remark',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      'http://rd.ragingdevelopers.com/svira/svira1api/home/update_cart',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        console.log(qty, item_config_id);
        dispatch(CartLoadingAction());
        if (serverResponse.status == true) {
          dispatch({
            type: REMOVE_CART,
            payload: serverResponse,
          });

          Toast.show({
            text1: serverResponse.message,
            visibilityTime: 2000,
            autoHide: true,
            position: 'top',
            type: 'success',
          });
        } else {
          dispatch(CartLoadingAction());
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
