import {
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  USER_MESSAGES_REQUEST,
  USER_MESSAGES_SUCCESS,
  USER_MESSAGES_FAIL,
  CLEAR_MSG_WINDOW_R,
  GET_CHAT_USER_REQ,
  GET_CHAT_USER_SUC,
  GET_CHAT_USER_FAIL,
} from "../constants/chat";

export const sendMessageReducer = (state = { messages: {} }, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
    case CLEAR_MSG_WINDOW_R:
      return {
        progress: 20,
        loading: true,
        newMessage: false,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        progress: 100,
        loading: false,
        messages: action.payload,
        newMessage: true,
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        progress: 100,
        loading: false,
        messages: [],
        newMessage: false,
      };
    case SEND_MESSAGE_FAIL:
      return {
        progress: 100,
        loading: false,
        chats: null,
        error: action.payload,
        newMessage: false,
      };
    default:
      return state;
  }
};

export const getAllMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case USER_MESSAGES_REQUEST:
      return {
        progress: 20,
        loading: true,
        newMessage: false,
      };
    case USER_MESSAGES_SUCCESS:
      return {
        progress: 100,
        loading: false,
        messages: action.payload,
        newMessage: true,
      };
    case USER_MESSAGES_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
        newMessage: false,
      };
    default:
      return state;
  }
};

//get other user chat with
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_CHAT_USER_REQ:
      return {
        loading: true,
      };
    case GET_CHAT_USER_SUC:
      return {
        loading: false,
        user: action.payload,
      };
    case GET_CHAT_USER_FAIL:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
