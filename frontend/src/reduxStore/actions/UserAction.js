import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  IS_USER_LOGEDIN_REQUEST,
  IS_USER_LOGEDIN_SUCCESS,
  IS_USER_LOGEDIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  GET_OTHER_USER_REQUEST,
  GET_OTHER_USER_SUCCESS,
  GET_OTHER_USER_FAIL,
} from "../constants/UserConstant";

// new user register action
export const userRegister = (formData) => async (dispatch) => {
  const url = "http://localhost:5000/api/register";
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        "content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// user login action
export const userLogin = (formData) => async (dispatch) => {
  const url = "http://localhost:5000/api/login";
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

// checking user is already loggein or not
export const isAlreadyLogedin = () => async (dispatch) => {
  const url = "http://localhost:5000/api/me";
  try {
    dispatch({ type: IS_USER_LOGEDIN_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: IS_USER_LOGEDIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: IS_USER_LOGEDIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// if user is logged in logout action
export const userLogout = () => async (dispatch) => {
  const url = "http://localhost:5000/api/logout";
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get other user info
export const getOhteruserDetails = (id) => async (dispatch) => {
  const url = `http://localhost:5000/api/user/${id}`;
  try {
    dispatch({ type: GET_OTHER_USER_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_OTHER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: GET_OTHER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
