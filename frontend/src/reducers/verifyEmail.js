import {
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_RESET,
  VERIFY_EMAIL_SUCCUSS,
} from "../constants/auth";
import { CLEAR_ERROR } from "../constants/error";

// verify owner email
export const verifyEmailReducer = (state = { token: "" }, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_EMAIL_SUCCUSS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case VERIFY_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: null,
      };
    case VERIFY_EMAIL_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
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
