import axios from "axios";
import { BASE_URL } from "../constants";
import {
  CLEAR_MSG_WINDOW_R,
  CLEAR_MSG_WINDOW_S,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  USER_MESSAGES_FAIL,
  USER_MESSAGES_REQUEST,
  USER_MESSAGES_SUCCESS,
  GET_CHAT_USER_REQ,
  GET_CHAT_USER_SUC,
  GET_CHAT_USER_FAIL,
} from "../constants/chat";

export const sendMessage = (chatData) => async (dispatch) => {
  const url = `/api/conversation`;
  try {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    const { data } = await axios.post(url, chatData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get other user info
export const getChatUser = (id) => async (dispatch) => {
  const url = `/api/user/${id}`;
  try {
    dispatch({ type: GET_CHAT_USER_REQ });
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_CHAT_USER_SUC,
      payload: data,
    }); 
  } catch (error) {
    dispatch({
      type: GET_CHAT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllMessages = (id) => async (dispatch) => {
  const url = `/api/messages/all/${id}`;
  try {
    dispatch({ type: USER_MESSAGES_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({
      type: USER_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_MESSAGES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearAllmsg = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_MSG_WINDOW_R });
    dispatch({
      type: CLEAR_MSG_WINDOW_S,
    });
  } catch (error) {}
};
