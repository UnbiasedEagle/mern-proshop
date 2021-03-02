import axios from "axios";
import { ProductActionTypes } from "./types.js";

export const listProducts = (keyword = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_REQUEST,
      });
      const { data } = await axios.get(`/api/products?keyword=${keyword}`);
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
        payload: data.products,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ProductActionTypes.PRODUCT_DETAILS_REQUEST,
      });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_DETAILS_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const createProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/products`, {}, config);

      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductActionTypes.PRODUCT_UPDATE_REQUEST,
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
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: ProductActionTypes.PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_UPDATE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const createProductReview = (id, review) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/products/${id}/reviews`, review, config);

      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_REVIEW_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
