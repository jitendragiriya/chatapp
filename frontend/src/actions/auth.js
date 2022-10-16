import axios from "axios";
import { BASE_URL, TOKEN } from "../constants";
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  GENERATE_OTP_REQUEST,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAIL,
} from "../constants/auth";
import { getLocalData } from "../hooks/localStorage";

// login with otp
export const loginWithOTPAction = (email) => async (dispatch) => {
  const url = `${BASE_URL}/api/login`;
  try {
    dispatch({ type: GENERATE_OTP_REQUEST });
    const { data } = await axios.post(
      url,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: GENERATE_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_OTP_FAIL,
      payload: error.response.data.message,
    });
  }
};

// checking user is already loggein or not
export const authUser = () => async (dispatch) => {
  const token = await getLocalData(TOKEN);
  if (token) {
    const url = `${BASE_URL}/api/auth`;
    try {
      dispatch({ type: AUTH_REQUEST });
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch({
        type: AUTH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};
