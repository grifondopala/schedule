import { combineReducers, createStore } from 'redux';
import { userReducer } from "./user-reducer.";
import { projectReducer } from "./project-reducer";

const combineReducer = combineReducers({user: userReducer, project: projectReducer})

export const store = createStore(combineReducer)