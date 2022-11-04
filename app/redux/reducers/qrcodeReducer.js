import {QRDATA, QRLOADING, QRLIST} from '../actions/types';

const initialState = {
  qrdata: [],
  qrLoading: false,
  qrlist: [],
  qrrr: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QRDATA:
      return {
        ...state,

        qrdata: [...new Set([action.payload, ...state.qrdata])],
        //  state.qrdata.map(item =>
        //     item.product_id === action.payload.product_id
        //       ? [...new Set([...state.qrdata])]
        //       : [...new Set([action.payload, ...state.qrdata])],
        //   ),

        qrrr: state.qrdata.map(item =>
          item.product_id === action.payload.product_id
            ? [...new Set([...state.qrdata])]
            : [...new Set([action.payload, ...state.qrdata])],
        ),
        // [...state.qrdata],
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

    default:
      return state;
  }
};
