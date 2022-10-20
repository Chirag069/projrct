import {QRDATA, QRLOADING} from '../actions/types';

const initialState = {
  qrdata: [],
  qrLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QRDATA:
      return {
        ...state,
        qrdata: action.payload,
      };
    case QRLOADING:
      return {
        ...state,
        qrLoading: action.payload,
      };

    default:
      return state;
  }
};
