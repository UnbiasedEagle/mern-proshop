import axios from 'axios';
import { UserActionTypes } from './types';

export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UserActionTypes.USER_LOGIN_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        {
          email,
          password,
        },
        config
      );

      dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const register = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UserActionTypes.USER_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      dispatch({ type: UserActionTypes.USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UserActionTypes.USER_DETAILS_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({ type: UserActionTypes.USER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UserActionTypes.USER_UPDATE_PROFILE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put('/api/users/profile', user, config);

      dispatch({
        type: UserActionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_UPDATE_PROFILE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UserActionTypes.USER_LIST_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/users', config);

      dispatch({
        type: UserActionTypes.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UserActionTypes.USER_DELETE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      await axios.delete(`/api/users/${userId}`, config);

      dispatch({
        type: UserActionTypes.USER_DELETE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UserActionTypes.USER_UPDATE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({
        type: UserActionTypes.USER_UPDATE_SUCCESS,
      });

      dispatch({ type: UserActionTypes.USER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.USER_LOGOUT });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
};
