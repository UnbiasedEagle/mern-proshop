import axios from 'axios';
import { ProductActionTypes } from './types';

export const listProducts = (keyword = '', page = '') => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&page=${page}`
      );
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listTopProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_TOP_REQUEST });
      const { data } = await axios.get('/api/products/top');
      dispatch({
        type: ProductActionTypes.PRODUCT_TOP_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_TOP_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listProductDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_DETAILS_FAIL,
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
      dispatch({ type: ProductActionTypes.PRODUCT_DELETE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE_FAIL,
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
      dispatch({ type: ProductActionTypes.PRODUCT_CREATE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/products', {}, config);

      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_FAIL,
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
      dispatch({ type: ProductActionTypes.PRODUCT_UPDATE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
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
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const createReview = (productId, review) => {
  return async (dispatch, getState) => {
    try {
      console.log(review);
      dispatch({ type: ProductActionTypes.PRODUCT_CREATE_REVIEW_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
