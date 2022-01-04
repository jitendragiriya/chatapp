import {
  USER_NEWPOST_REQUEST,
  USER_NEWPOST_SUCCESS,
  USER_NEWPOST_FAIL,
  FETCH_ALL_POST_FAIL,
  FETCH_ALL_POST_REQUEST,
  FETCH_ALL_POST_SUCCESS,
} from "../constants/PostConstants";

export const userPostsReducer = (state = { mypost: [] }, action) => {
  switch (action.type) {
    case USER_NEWPOST_REQUEST:
      return {
        progress: 20,
        loading: true,
      };
    case USER_NEWPOST_SUCCESS:
      return {
        progress: 100,
        loading: false,
        message: action.payload,
      };
    case USER_NEWPOST_FAIL:
      return {
        progress: 100,
        loading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export const allPostsReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_POST_REQUEST:
      return {
        progress: 20,
        loading: true,
      };
    case FETCH_ALL_POST_SUCCESS:
      return {
        progress: 100,
        loading: false,
        post: action.payload,
      };
    case FETCH_ALL_POST_FAIL:
      return {
        progress: 100,
        loading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};
