import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  IS_USER_LOGEDIN_REQUEST,
  IS_USER_LOGEDIN_SUCCESS,
  IS_USER_LOGEDIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../constants/UserConstant";

export const userRegisterReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case IS_USER_LOGEDIN_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        progress: 20,
        loading: true,
        isAuthenticated: false,
      };

    case USER_LOGOUT_REQUEST:
      return {
        process: 20,
        loading: true,
        isAuthenticated: true,
      };
    case USER_REGISTER_SUCCESS:
    case IS_USER_LOGEDIN_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        progress: 100,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        process: 100,
        loading: false,
        isAuthenticated: false,
        user: null,
        message: action.payload,
      };
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case IS_USER_LOGEDIN_FAIL:
      return {
        loading: false,
        progress: 100,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        progress: 100,
        isAuthenticated: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
