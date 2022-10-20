import {PRODUCT_LIST, PRODUCTLIST_LOADING, PRODUCT_DETAIL} from './types';
import Toast from 'react-native-toast-message';

export const ProductListLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: PRODUCTLIST_LOADING,
      payload: loading,
    });
  };

export const ProductDetailAction = productdetaildata => dispatch => {
  dispatch({
    type: PRODUCT_DETAIL,
    payload: productdetaildata,
  });
};

export const ProductListAction =
  (userToken = '', limit = '10', category = '') =>
  dispatch => {
    // console.log(category);
    const {genderselect, categoryselect, itemgroupselect, subcategoryslelct} =
      category;

    dispatch(ProductListLoadingAction(true));
    var myHeaders = new Headers();
    myHeaders.append('If-Range', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      offset: 5,
      limit: limit,
      gender: genderselect?.join(),
      item_group: itemgroupselect?.join(),
      category: categoryselect ? categoryselect?.join() : category,
      search_text: '',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      'http://rd.ragingdevelopers.com/svira/svira1api/items',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        dispatch(ProductListLoadingAction());
        if (serverResponse.status == true) {
          dispatch({
            type: PRODUCT_LIST,
            payload: {serverResponse, category},
          });
        } else {
          dispatch(ProductListLoadingAction());
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
        dispatch(ProductListLoadingAction());
        Toast.show({
          text1: 'Server response failed',
          visibilityTime: 2000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };
