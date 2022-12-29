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
  BILL_SUBMIT_LOADING,
  BILL_SUBMIT_ERROR,
  BILL_REPORT,
  REPORT_ERROR,
  REPORT_LOADING,
  UPDATE_LOADING,
  EDIT_PIECES,
  EDIT_Toggle,
  AFTER_EDIT,
  QR,
  QRDAATA,
  GET_QRDATA,
  DELETE_QRDATA,
  DELETE_LOADING,
  UPDATE_ERROR,
  RESTART_BILL,
  RESTART_LOADING,
} from './types';
import Toast from 'react-native-toast-message';
import qrcodeReducer from '../reducers/qrcodeReducer';
import NetInfo from '@react-native-community/netinfo';
import Sound from 'react-native-sound';

export const qrLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: QRLOADING,
      payload: loading,
    });
  };

export const deleteLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: QRLOADING,
      payload: loading,
    });
  };

export const billSubmitLoadingAction =
  (loading = false) =>
  dispatch => {
    dispatch({
      type: BILL_SUBMIT_LOADING,
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

export const qrdataAction =
  (userToken = '', barcode = '') =>
  dispatch => {
    dispatch(qrLoadingAction(true));
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
        'https://nts.dhyaravi.com/outward_ipa/home/barcodedata',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;

          dispatch(getqrdataAction(userToken));

          dispatch(qrLoadingAction());
          if (serverResponse.success) {
            if (serverResponse.sound == 1) {
              const track = new Sound(serverResponse.sound_link, null, e => {
                if (e) {
                  console.log('error loading track:', e);
                } else {
                  track.play();
                }
              });
            }

            Toast.show({
              text1: serverResponse.message,
              visibilityTime: 3000,
              autoHide: true,
              position: 'top',
              type: 'success',
            });

            dispatch({
              type: QRDATA,
            });
          } else {
            dispatch(qrLoadingAction());
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
          dispatch(qrLoadingAction());
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
      alert('error 2 login');
      dispatch(qrLoadingAction());
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

export const getqrdataAction =
  (userToken = '') =>
  dispatch => {
    // dispatch(qrLoadingAction(true));
    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        'https://nts.dhyaravi.com/outward_ipa/home/get_cart',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;

          // dispatch(qrLoadingAction());
          if (serverResponse) {
            dispatch({
              type: GET_QRDATA,
              payload: serverResponse.data,
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
          dispatch(qrLoadingAction());
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
      alert('error 2 login');
      dispatch(qrLoadingAction());
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

export const deleteqrdataAction =
  (userToken = '', id = '') =>
  dispatch => {
    // dispatch(qrLoadingAction(true));
    try {
      dispatch({
        type: DELETE_LOADING,
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
        'https://nts.dhyaravi.com/outward_ipa/home/delete_data',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;
          if (serverResponse) {
            dispatch({
              type: DELETE_QRDATA,
            });
            dispatch(getqrdataAction(userToken));
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
          dispatch(qrLoadingAction());
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
      alert('error 2 login');
      dispatch(qrLoadingAction());
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

export const toggleCreateBillModelAction = () => dispatch => {
  dispatch({
    type: TOGGLE_CREATEBILL_MODEL,
  });
};

export const CustomerListAction =
  (userToken = '') =>
  dispatch => {
    try {
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
          } else {
            dispatch(qrLoadingAction());
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: serverResponse.message,
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
      alert(err + '');
    }
  };

export const updataqrdataAction =
  (userToken = '', id = '', qty = '', price = '', pieces = '', total = '') =>
  dispatch => {
    try {
      dispatch({
        type: UPDATE_LOADING,
      });

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
        'https://nts.dhyaravi.com/outward_ipa/home/update_data',
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
              type: UPDATE_QRDATA,
            });
            dispatch(getqrdataAction(userToken));
          } else {
            dispatch({
              type: UPDATE_ERROR,
            });
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
          dispatch({
            type: UPDATE_ERROR,
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
        });
    } catch (err) {
      dispatch({
        type: UPDATE_ERROR,
      });
      alert(err + '');
    }
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
    dispatch({
      type: BILL_SUBMIT_LOADING,
    });

    try {
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
            dispatch(getqrdataAction(tokan));

            Toast.show({
              text1: serverResponse.message,
              visibilityTime: 2000,
              autoHide: true,
              position: 'top',
              type: 'success',
            });
          } else {
            dispatch({
              type: BILL_SUBMIT_ERROR,
            });
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: serverResponse.message,
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
        .catch(qrr => {
          dispatch({
            type: BILL_SUBMIT_ERROR,
          });
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              Toast.show({
                text1: 'Something wait wrong',
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
      alert(err + '');
      dispatch({
        type: BILL_SUBMIT_ERROR,
      });
    }
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

export const BillReportAction =
  (tokan = '', fromdate = '', todate = '') =>
  async dispatch => {
    dispatch({
      type: REPORT_LOADING,
    });

    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${tokan}`);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        from: fromdate,
        to: todate,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://nts.dhyaravi.com/outward_ipa/home/get_sales_report',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          const serverResponse = result;

          if (serverResponse.status) {
            dispatch({
              type: BILL_REPORT,
              payload: serverResponse.data,
            });

            Toast.show({
              text1: 'Report fetch successfully',
              visibilityTime: 2000,
              autoHide: true,
              position: 'top',
              type: 'success',
            });
          } else {
            dispatch({
              type: REPORT_ERROR,
            });
            NetInfo.fetch().then(state => {
              if (state.isConnected) {
                Toast.show({
                  text1: serverResponse.message,
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
        .catch(qrr => {
          dispatch({
            type: REPORT_ERROR,
          });
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              Toast.show({
                text1: 'Something wait wrong',
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
      alert(err + '');
      dispatch({
        type: REPORT_ERROR,
      });
    }
  };

export const restartBillAction =
  (userToken = '', userid = '') =>
  dispatch => {
    try {
      dispatch({
        type: RESTART_LOADING,
      });
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userToken}`);

      var formdata = new FormData();
      formdata.append('user_id', userid);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        'https://nts.dhyaravi.com/outward_ipa/home/restart_bill',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          let serverResponse = result;
          if (serverResponse) {
            dispatch({
              type: RESTART_BILL,
            });
            dispatch(getqrdataAction(userToken));
            Toast.show({
              text1: 'successfully restart ',
              visibilityTime: 3000,
              autoHide: true,
              position: 'top',
              type: 'success',
            });
            dispatch(toggleCreateBillModelAction());
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
            type: REPORT_ERROR,
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
        });
    } catch (err) {
      dispatch({
        type: REPORT_ERROR,
      });
      alert(err + '');
    }
  };
