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
  reportloading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QRDATA:
      const qrobj = [action.payload, ...state.qrdata];

      return {
        ...state,
        qrdata: qrobj,
        qrLoading: false,
      };
    case QRDATA_CLEAR:
      return {
        ...state,
        qrdata: [],
      };
    case QRDATA_DELETE:
      return {
        ...state,
        qrdata: state.qrdata.filter(item => item.productid !== action.payload),
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
        billcolor: action.payloadcolor,
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
        billsubmitloading: false,
      };
    case QTY_MODEL:
      return {
        ...state,
        QtyModalShow: !state.QtyModalShow,
      };
    case UPDATE_QRDATA:
      return {
        ...state,
        updateqty: action.payloadqty,
      };
    case PRICE_MODEL:
      return {
        ...state,
        priceModalShow: !state.priceModalShow,
      };
    case EDIT_PRICE:
      return {
        ...state,
        qrdata: state.qrdata.map(item =>
          item.product_id === action.payloadeditproductid
            ? {...item, price: action.payloadeditprice}
            : item,
        ),
      };
    case EDIT_PRICEPID:
      return {
        ...state,
        editpricepid: action.payload,
      };
    case QTY_INCRIMENT:
      return {
        ...state,
        qrdata: state.qrdata.map(item => {
          return action.payload === item.key
            ? {
                ...item,
                qty: parseInt(item.qty) + 1,
                pieces: parseInt(item.pieces) + parseInt(item.pc),
                total:
                  (parseInt(item.pieces) + parseInt(item.pc)) *
                  parseFloat(item.price),
              }
            : item;
        }),
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
    case REPORT_ERROR:
      return {
        ...state,
        reportloading: false,
      };

    default:
      return state;
  }
};
