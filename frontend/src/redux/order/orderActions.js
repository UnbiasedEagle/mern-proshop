import axios from 'axios';
import { OrderActionsTypes } from './types';

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionsTypes.ORDER_CREATE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/orders', order, config);

      dispatch({ type: OrderActionsTypes.ORDER_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: OrderActionsTypes.ORDER_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionsTypes.ORDER_DETAILS_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);

      dispatch({
        type: OrderActionsTypes.ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionsTypes.ORDER_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionsTypes.ORDER_PAY_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

      dispatch({
        type: OrderActionsTypes.ORDER_PAY_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: OrderActionsTypes.ORDER_PAY_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deliverOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionsTypes.ORDER_DELIVER_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

      dispatch({
        type: OrderActionsTypes.ORDER_DELIVER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: OrderActionsTypes.ORDER_DELIVER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listMyOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionsTypes.ORDER_LIST_MY_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/myorders`, config);

      dispatch({
        type: OrderActionsTypes.ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionsTypes.ORDER_LIST_MY_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionsTypes.ORDER_LIST_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders`, config);

      dispatch({
        type: OrderActionsTypes.ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionsTypes.ORDER_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
