import axios from "axios";
import {
  CLEAR_MSG_WINDOW_R,
  CLEAR_MSG_WINDOW_S,
  MSG_WITH_USER_FAIL,
  MSG_WITH_USER_REQUEST,
  MSG_WITH_USER_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  USER_MESSAGES_FAIL,
  USER_MESSAGES_REQUEST,
  USER_MESSAGES_SUCCESS,
} from "../constants/UserChatConstansts";

export const sendMessage = (chatData) => async (dispatch) => {
  const url = `http://localhost:5000/api/conversation`;
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
      payload: data.conversation,
    });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMsgWithUsers = () => async (dispatch) => {
  const url = `http://localhost:5000/api/m/users/all`;
  try {
    dispatch({ type: MSG_WITH_USER_REQUEST });
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: MSG_WITH_USER_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: MSG_WITH_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllMessages = (id) => async (dispatch) => {
  const url = `http://localhost:5000/api/messages/all/${id}`;
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
      payload: data.conversation,
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
