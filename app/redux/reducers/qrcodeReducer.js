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
} from '../actions/types';

const initialState = {
  qrdata: [],
  qrLoading: false,
  qrlist: [],
  qrrr: [],
  CreatebillModalShow: false,
  customerlist: [],
  createbillstatus: [],
  billproductid: [],
  billpieces: [],
  billprice: [],
  billqty: [],
  billtotal: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QRDATA:
      return {
        ...state,
        qrdata: [action.payload, ...state.qrdata],
      };
    case QRDATA_CLEAR:
      return {
        ...state,
        qrdata: [],
      };
    case QRDATA_DELETE:
      return {
        ...state,
        qrdata: state.qrdata.filter(item => item.product_id !== action.payload),
      };
    case QRLOADING:
      return {
        ...state,
        qrLoading: action.payload,
      };
    case QRLIST:
      return {
        ...state,
        qrlist: [...new Set([action.payload, ...state.qrlist])],
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
    case BILLARRAY:
      return {
        ...state,
        billproductid: action.payloadproductid,
        billqty: action.payloadqty,
        billpieces: action.payloadpieces,
        billprice: action.payloadprice,
        billtotal: action.payloadtotal,
      };
    case SUBMIT_BILL:
      return {
        ...state,
        createbillstatus: action.payload,
      };

    default:
      return state;
  }
};
