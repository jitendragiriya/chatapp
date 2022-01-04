import axios from "axios";
import {
  USER_NEWPOST_FAIL,
  USER_NEWPOST_REQUEST,
  USER_NEWPOST_SUCCESS,
  FETCH_ALL_POST_FAIL,
  FETCH_ALL_POST_REQUEST,
  FETCH_ALL_POST_SUCCESS,
} from "../constants/PostConstants";

// if user is logged in logout action
export const userNewPost = (text) => async (dispatch) => {
  const url = "/api/post/new";
  try {
    dispatch({ type: USER_NEWPOST_REQUEST });
    const { data } = await axios.post(
      url,
      text ,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: USER_NEWPOST_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: USER_NEWPOST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const fetchallPost = () => async (dispatch) => {
  const url = "/api/fetch/all/post";
  try {
    dispatch({ type: FETCH_ALL_POST_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        "content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: FETCH_ALL_POST_SUCCESS,
      payload: data.posts,
    });
    
  } catch (error) {
    dispatch({
      type: FETCH_ALL_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};
