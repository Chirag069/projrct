import {
  GET_WISHLIST,
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  WISHLIST_LOADING,
} from './types';
import Toast from 'react-native-toast-message';

export const WishListLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: WISHLIST_LOADING,
      payload: loading,
    });
  };

export const GetWishlistAction =
  (userToken = '') =>
  dispatch => {
    dispatch(WishListLoadingAction(true));
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
      'http://rd.ragingdevelopers.com/svira/svira1api/home/wishlist',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        dispatch(WishListLoadingAction());
        if (serverResponse.status == true) {
          dispatch({
            type: GET_WISHLIST,
            payload: serverResponse.data,
          });

          // Toast.show({
          //   text1: serverResponse.message,
          //   visibilityTime: 2000,
          //   autoHide: true,
          //   position: 'top',
          //   type: 'success',
          // });
        } else {
          dispatch(WishListLoadingAction());
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

export const RemoveWishlistAction =
  (userToken = '', wishlistid = '') =>
  dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('If-Range', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: wishlistid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      'http://rd.ragingdevelopers.com/svira/svira1api/home/remove_wishlist',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;

        if (serverResponse.status == true) {
          dispatch({
            type: REMOVE_WISHLIST,
            payload: serverResponse,
          });

          Toast.show({
            text1: serverResponse.message,
            visibilityTime: 2000,
            autoHide: true,
            position: 'top',
            type: 'error',
          });
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

export const AddWishlistAction =
  (userToken = '', wishlistid = '') =>
  dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('If-Range', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: wishlistid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://rd.ragingdevelopers.com/svira/svira1api/home/add_wishlist',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;

        if (serverResponse.status == true) {
          dispatch({
            type: ADD_WISHLIST,
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
