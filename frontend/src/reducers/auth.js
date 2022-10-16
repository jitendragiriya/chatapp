import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  GENERATE_OTP_REQUEST,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAIL,
  GENERATE_OTP_RESET,
} from "../constants/auth";
import { CLEAR_ERROR } from "../constants/error";

export const loginWithOTPReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case GENERATE_OTP_REQUEST:
      return {
        loading: true,
      };
    case GENERATE_OTP_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case GENERATE_OTP_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      };
    case GENERATE_OTP_RESET:
      return {
        ...state,
        loading: false,
        message: null,
        error: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const authUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case AUTH_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_FAIL:
      return {
        loading: false,
        user: null,
        error: action.payload,
        isAuthenticated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
