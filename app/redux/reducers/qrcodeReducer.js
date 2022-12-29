import {
  QRDATA,
  QRLOADING,
  QRLIST,
  TOGGLE_CREATEBILL_MODEL,
  CUSTOMER_LIST,
  BILLARRAY,
  SUBMIT_BILL,
  QRDATA_CLEAR,
  QRDATA_DELETE,
  QTY_MODEL,
  UPDATE_QRDATA,
  PRICE_MODEL,
  EDIT_PRICE,
  EDIT_PRICEPID,
  QTY_INCRIMENT,
  BILL_SUBMIT_LOADING,
  BILL_REPORT,
  REPORT_LOADING,
  REPORT_ERROR,
  EDIT_PIECES,
  EDIT_Toggle,
  AFTER_EDIT,
  QR,
  QRDAATA,
  GET_QRDATA,
  DELETE_LOADING,
  DELETE_ERROR,
  UPDATE_LOADING,
  UPDATE_ERROR,
  BILL_SUBMIT_ERROR,
  RESTART_LOADING,
  RESTART_ERROR,
  DEFAULT_CUSTOMER,
} from '../actions/types';

const initialState = {
  qrdata: [],
  qrLoading: false,
  qrlist: [],
  qrrr: [],
  CreatebillModalShow: false,
  customerlist: [],
  createbillstatus: [],
  billcolor: [],
  billproductid: [],
  billpieces: [],
  billprice: [],
  billqty: [],
  billtotal: [],
  QtyModalShow: false,
  updateqty: [],
  updateqty: [],
  priceModalShow: false,
  editprice: [],
  editpricepid: [],
  billsubmitloading: false,
  billreport: [],
  billpdf: [],
  restartloading: false,
  reportloading: false,
  deleteloading: false,
  updateloading: false,
  price: [],
  pieces: [],
  firstqrdata: [],
  getqrdata: [],
  defaultcustomer: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QRDATA:
      return {
        ...state,
        getqrdata: action.payload,
        deleteloading: false,
        updateloading: false,
        restartloading: false,
      };

    case QRLOADING:
      return {
        ...state,
        qrLoading: action.payload,
      };
    case BILL_SUBMIT_LOADING:
      return {
        ...state,
        billsubmitloading: true,
      };

    case TOGGLE_CREATEBILL_MODEL:
      return {
        ...state,
        CreatebillModalShow: !state.CreatebillModalShow,
      };

    case CUSTOMER_LIST:
      return {
        ...state,
        customerlist: action.payload,
      };

    case SUBMIT_BILL:
      return {
        ...state,
        createbillstatus: action.payload,
        billsubmitloading: false,
      };

    case BILL_REPORT:
      return {
        ...state,
        billreport: action.payload,
        reportloading: false,
      };
    case REPORT_LOADING:
      return {
        ...state,
        reportloading: true,
      };
    case UPDATE_LOADING:
      return {
        ...state,
        updateloading: true,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        updateloading: false,
      };
    case DELETE_LOADING:
      return {
        ...state,
        deleteloading: true,
      };
    case RESTART_LOADING:
      return {
        ...state,
        restartloading: true,
      };
    case RESTART_ERROR:
      return {
        ...state,
        restartloading: false,
      };
    case REPORT_ERROR:
      return {
        ...state,
        reportloading: false,
      };
    case BILL_SUBMIT_ERROR:
      return {
        ...state,
        billsubmitloading: false,
      };
    case DELETE_ERROR:
      return {
        ...state,
        deleteloading: false,
      };
    case DEFAULT_CUSTOMER:
      return {
        ...state,
        defaultcustomer: action.payload,
      };

    default:
      return state;
  }
};
