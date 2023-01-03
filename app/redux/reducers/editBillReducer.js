import {
  DELETE_EDITBILL_ERROR,
  DELETE_EDITBILL_LOADING,
  GET_EDITBILL,
  EDIT_QRLOADING,
  EDIT_QR_ERROR,
} from '../actions/types';

const initialState = {
  geteditqrdata: [],
  deleteeditbillloading: false,
  editqrloading: false,
  tq: [],
  tp: [],
  tt: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EDITBILL:
      return {
        ...state,
        geteditqrdata: action.payload,

        deleteeditbillloading: false,
        tq: action.payloadtq,
        tp: action.payloadtp,
        tt: action.payloadtt,
        editqrloading: false,
      };
    case EDIT_QRLOADING:
      return {
        ...state,
        editqrloading: true,
      };
    case EDIT_QR_ERROR:
      return {
        ...state,
        editqrloading: false,
      };
    case DELETE_EDITBILL_LOADING:
      return {
        ...state,
        deleteeditbillloading: true,
      };
    case DELETE_EDITBILL_ERROR:
      return {
        ...state,
        deleteeditbillloading: false,
      };

    default:
      return state;
  }
};
