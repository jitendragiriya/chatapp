import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// for development
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userDetailsReducer,
  userRegisterReducer,
} from "./reducers/UserReducer";
import { allPostsReducer, userPostsReducer } from "./reducers/PostReducer";
import { getAllMessagesReducer, getMsgWithUsers, sendMessageReducer } from "./reducers/ChatingReducer";

const reducer = combineReducers({
  user: userRegisterReducer,
  mypost: userPostsReducer,
  allpost: allPostsReducer,
  knowuser: userDetailsReducer,
  message: sendMessageReducer,
  msgUsers:getMsgWithUsers,
  conversations:getAllMessagesReducer
});

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
