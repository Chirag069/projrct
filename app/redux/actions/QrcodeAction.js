import {
  QRDATA,
  QRLOADING,
  QRLIST,
  TOGGLE_CREATEBILL_MODEL,
  CUSTOMER_LIST,
  SUBMIT_BILL,
  BILLARRAY,
  QRDATA_CLEAR,
  QRDATA_DELETE,
} from './types';
import Toast from 'react-native-toast-message';

export const qrLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: QRLOADING,
      payload: loading,
    });
  };

export const qrListAction =
  (qrdata = '') =>
  dispatch => {
    dispatch({
      type: QRLIST,
      payload: qrdata,
    });
  };
export const qrdataclearAction = () => {
  return {
    type: QRDATA_CLEAR,
  };
};

export const qrdatadeleteAction =
  (productid = '') =>
  dispatch => {
    dispatch({
      type: QRDATA_DELETE,
      payload: productid,
    });
  };

export const qrdataAction =
  (userToken = '', barcode = '', billresponse) =>
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

        dispatch(qrLoadingAction());
        if (serverResponse?.success == 1) {
          dispatch({
            type: QRDATA,
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
          dispatch(qrLoadingAction());
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
        Toast.show({
          text1: 'Server response failed',
          visibilityTime: 2000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });
      });
  };

export const toggleCreateBillModelAction = () => dispatch => {
  dispatch({
    type: TOGGLE_CREATEBILL_MODEL,
  });
};

export const CustomerListAction =
  (userToken = '') =>
  dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://nts.dhyaravi.com/outward_ipa/home/get_only_customer',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        let serverResponse = result;
        dispatch(qrLoadingAction());
        if (serverResponse) {
          dispatch({
            type: CUSTOMER_LIST,
            payload: serverResponse.customers,
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

export const SubmiBillAction =
  (
    tokan = '',
    date = '',
    customerId = '',
    productId = '',
    qty = '',
    pieces = '',
    price = '',
    total = '',
  ) =>
  async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${tokan}`);

    var formdata = new FormData();
    formdata.append('date', date);
    formdata.append('customer_id', customerId);

    formdata.append('product_id[]', productId);
    formdata.append('quantity[]', qty);
    formdata.append('pieces[]', pieces);
    formdata.append('price[]', price);
    formdata.append('total[]', total);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://nts.dhyaravi.com/outward_ipa/home/submit_bill',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const serverResponse = result;
        if (serverResponse.success == 1) {
          dispatch({
            type: SUBMIT_BILL,
            payload: serverResponse.success,
          });

          Toast.show({
            text1: serverResponse.message,
            visibilityTime: 2000,
            autoHide: true,
            position: 'top',
            type: 'success',
          });
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
      .catch(error => console.log('error', error));
  };

export const billArrayAction =
  (arrayy = '') =>
  dispatch => {
    arrayy.map((item, index) => {
      const productlen = Object.keys(item.value).length;
      var a = item.value[0].pieces * productlen;
      var b = item.value[0].price;
      const c = a * b;
      const total = c.toFixed(2);

      dispatch({
        type: BILLARRAY,
        payloadproductid: item.productid,
        payloadqty: item.value[0].pieces * productlen,
        payloadpieces: item.value[0].pieces,
        payloadprice: b,
        payloadtotal: total,
      });
    });
  };
