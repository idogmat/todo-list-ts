import {AnyAction, combineReducers} from 'redux'
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    appStatus: appReducer,
    auth: authReducer
})

//for use thunk like pro add middleware type thunk
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})
export default store
export type AppStateType = ReturnType<typeof rootReducer>

//type for all thunks
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>

export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
//use that for dispatch without connect
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
//use that for select params without connect
//all actionTypes


//@ts-ignore
window.store = store

