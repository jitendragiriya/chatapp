import { CLEAR_ERROR } from "../constants/error";
import {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
} from "../constants/profile";

export const profileReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        isupdated: false,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        isupdated: false,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
        isupdated: false,
      };
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        isupdated: false,
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
