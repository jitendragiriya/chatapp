import {
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  MSG_WITH_USER_FAIL,
  MSG_WITH_USER_REQUEST,
  MSG_WITH_USER_SUCCESS,
  USER_MESSAGES_REQUEST,
  USER_MESSAGES_SUCCESS,
  USER_MESSAGES_FAIL,
  CLEAR_MSG_WINDOW_R,
} from "../constants/UserChatConstansts";

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

export const getMsgWithUsers = (state = { users: [] }, action) => {
  switch (action.type) {
    case MSG_WITH_USER_REQUEST:
      return {
        progress: 20,
        loading: true,
      };
    case MSG_WITH_USER_SUCCESS:
      return {
        progress: 100,
        loading: false,
        MsgUser: action.payload,
      };
    case MSG_WITH_USER_FAIL:
      return {
        ...state,
        progress: 100,
        loading: false,
        error: action.payload,
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
