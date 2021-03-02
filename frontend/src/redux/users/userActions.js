import axios from "axios";
import { UserActionTypes } from "./types";

// Logging the user
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UserActionTypes.USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_LOGIN_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const logout = () => {
  return {
    type: UserActionTypes.USER_LOGOUT,
  };
};

export const clearUserRegister = () => {
  return {
    type: UserActionTypes.USER_REGISTER_RESET,
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UserActionTypes.USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );
      dispatch({
        type: UserActionTypes.USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_REGISTER_FAILURE,
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
      dispatch({
        type: UserActionTypes.USER_DETAILS_REQUEST,
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
      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch({
        type: UserActionTypes.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_DETAILS_FAILURE,
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
      dispatch({
        type: UserActionTypes.USER_UPDATE_PROFILE_REQUEST,
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

      const { data } = await axios.put("/api/users/profile", user, config);
      dispatch({
        type: UserActionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_UPDATE_PROFILE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const resetProfile = () => {
  return {
    type: UserActionTypes.USER_UPDATE_PROFILE_RESET,
  };
};

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: UserActionTypes.USER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/users/", config);

      dispatch({
        type: UserActionTypes.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_LIST_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: UserActionTypes.USER_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/users/${id}`, config);

      dispatch({
        type: UserActionTypes.USER_DELETE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_DELETE_FAILURE,
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
      dispatch({
        type: UserActionTypes.USER_UPDATE_REQUEST,
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

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({
        type: UserActionTypes.USER_UPDATE_SUCCESS,
      });

      dispatch({
        type: UserActionTypes.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.USER_UPDATE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
