import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// for development
// import { composeWithDevTools } from "redux-devtools-extension";

import { authUserReducer, loginWithOTPReducer } from "./reducers/auth";
import { verifyEmailReducer } from "./reducers/verifyEmail";
import { profileReducer } from "./reducers/profile";
import { getAllPleoplesReducer } from "./reducers/people";
import {
  getAllMessagesReducer,
  sendMessageReducer,
  userDetailsReducer,
} from "./reducers/chat";
import { LOGOUT } from "./constants/auth";

const appReducer = combineReducers({
  Auth: loginWithOTPReducer,
  User: authUserReducer,
  Profile: profileReducer,
  VerifyEmail: verifyEmailReducer,
  Peoples: getAllPleoplesReducer,
  Message: sendMessageReducer,
  Conversations: getAllMessagesReducer,
  Knowuser: userDetailsReducer,
});

//reset reducer
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

let initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
  // composeWithDevTools(applyMiddleware(thunk))
);

export default store;
