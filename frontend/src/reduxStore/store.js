import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// for development 
import { composeWithDevTools } from 'redux-devtools-extension'

import { userRegisterReducer } from './reducers/UserReducer'

const reducer = combineReducers({
    user:userRegisterReducer
});

let initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;