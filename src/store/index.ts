import { combineReducers, createStore } from 'redux';
import { userReducer } from "./userReducer.";

const combineReducer = combineReducers({user: userReducer})

export const store = createStore(combineReducer)