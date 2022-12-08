import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {TaskActionType, tasksReducer} from "./tasks-reducer";
import {TodolistActionType, todoListsReducer} from "./todolists-reducer";
import thunk, {ThunkAction} from "redux-thunk";
const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolists:todoListsReducer
})
const store=createStore(rootReducer,applyMiddleware(thunk))
//for use thunk like pro add middleware type thunk
export default store
export type AppStateType= ReturnType<typeof rootReducer>

export type RootState= ReturnType<typeof store.getState>
//type for all thunks
// export type AppThunkActionType = ThunkAction<void,AppStateType,unknown,AppActionTypes>
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType,AppStateType,unknown,AppActionTypes>
export type AppDispatch = typeof store.dispatch
//all actionTypes
export type AppActionTypes =TodolistActionType | TaskActionType
//@ts-ignore
window.store=store

