import * as actionTypes from "../actions/actionType";

const initialState = {
  orders: [],
  isLoading: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_START:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.PURCHASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.concat({
          id: action.orderID,
          ...action.orderData
        })
      };
    case actionTypes.PURCHASE_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.FETCH_ORDER_INIT:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        isLoading: false
      };
    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default orderReducer;
