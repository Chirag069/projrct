import {
  QRDATA,
  QRLOADING,
  QRLIST,
  TOGGLE_CREATEBILL_MODEL,
  CUSTOMER_LIST,
  BILLARRAY,
  SUBMIT_BILL,
} from '../actions/types';

const initialState = {
  qrdata: [],
  qrLoading: false,
  qrlist: [],
  qrrr: [],
  CreatebillModalShow: false,
  customerlist: [],
  billarray: [],
  createbillstatus: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QRDATA:
      return {
        ...state,

        qrdata: [...new Set([action.payload, ...state.qrdata])],
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
        billarray: action.payload,
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
