import { OrderActionTypes } from "./types";
import axios from "axios";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: OrderActionTypes.ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/orders", order, config);
      dispatch({
        type: OrderActionTypes.ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionTypes.ORDER_CREATE_FAILURE,
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
      dispatch({
        type: OrderActionTypes.ORDER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
      dispatch({
        type: OrderActionTypes.ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionTypes.ORDER_DETAILS_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const payOrder = (orderId, paymentResults) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: OrderActionTypes.ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResults,
        config
      );
      dispatch({
        type: OrderActionTypes.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionTypes.ORDER_PAY_FAILURE,
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
      dispatch({
        type: OrderActionTypes.ORDER_LIST_MY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/myorders`, config);
      dispatch({
        type: OrderActionTypes.ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionTypes.ORDER_LIST_MY_FAILURE,
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
      dispatch({
        type: OrderActionTypes.ORDER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders`, config);

      dispatch({
        type: OrderActionTypes.ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionTypes.ORDER_LIST_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deliverOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: OrderActionTypes.ORDER_DELIVER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/deliver`,
        {},
        config
      );
      dispatch({
        type: OrderActionTypes.ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: OrderActionTypes.ORDER_DELIVER_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
