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
  QTY_MODEL,
  UPDATE_QRDATA,
  EDIT_PRICE,
  PRICE_MODEL,
  EDIT_PRICEPID,
  QTY_INCRIMENT,
} from './types';
import Toast from 'react-native-toast-message';
import qrcodeReducer from '../reducers/qrcodeReducer';

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

export const qtyincrimentAction =
  (incrimentid = '') =>
  dispatch => {
    dispatch({
      type: QTY_INCRIMENT,
      payload: incrimentid,
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

        dispatch(qrLoadingAction());
        if (serverResponse?.success == 1) {
          const data = serverResponse.data;

          const qr = {
            key: barcode,
            price: data.price,
            pieces: data.pieces,
            color: data.color,
            productid: data.product_id,
            qty: 1,
            pname: data.pname,
            total: (data.price * data.pieces).toFixed(2),
            pc: data.pieces,
          };

          dispatch({
            type: QRDATA,
            payload: qr,
            payloadscncode: barcode,
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

export const toggleQtyModelAction = () => dispatch => {
  dispatch({
    type: QTY_MODEL,
  });
};

export const togglepriceModelAction = () => dispatch => {
  dispatch({
    type: PRICE_MODEL,
  });
};

export const editPriceAction =
  (editprice = '', productid = '') =>
  dispatch => {
    dispatch({
      type: EDIT_PRICE,
      payloadeditprice: editprice,
      payloadeditproductid: productid,
    });
  };

export const editpricepidAction =
  (productid = '') =>
  dispatch => {
    dispatch({
      type: EDIT_PRICEPID,
      payload: productid,
    });
  };

export const UpdateQrdataAction =
  (qty = '') =>
  dispatch => {
    dispatch({
      type: UPDATE_QRDATA,
      payloadqty: qty,
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
    color = '',
  ) =>
  async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${tokan}`);

    var formdata = new FormData();
    formdata.append('date', date);
    formdata.append('customer_id', customerId);
    formdata.append('product_id[]', productId);
    formdata.append('total[]', color);
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
      dispatch({
        type: BILLARRAY,
        payloadcolor: item.color,
        payloadproductid: item.productid,
        payloadqty: item.qty,
        payloadpieces: item.pieces,
        payloadprice: item.price,
        payloadtotal: item.total,
      });
    });
  };
