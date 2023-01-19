import { combineReducers } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todoListsReducer } from "./todolists-reducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer,
  appStatus: appReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
export default store;

//@ts-ignore
// window.store = store
