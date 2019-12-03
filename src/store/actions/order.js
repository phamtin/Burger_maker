import * as actionTypes from "../actions/actionType";
import instance from "firebase/axios-order";

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderID: id,
    orderData: orderData
  };
};

export const purchaseFail = error => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error
  };
};

export const purchaseStart = (orderData, token) => {
  return dispatch => {
    instance
      .post("/order.json?auth=" + token, orderData)
      .then(res => {
        dispatch(purchaseSuccess(res.data));
      })
      .catch(error => dispatch(purchaseFail(error)));
  };
};

export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFail = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    orders: error
  };
};

export const fetchOrderStart = () => {
  return { type: actionTypes.FETCH_ORDER_INIT };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    instance
      .get("/order.json" + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ id: key, ...res.data[key] });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch(e => dispatch(fetchOrderFail(e)));
  };
};
