import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {TaskActionType, tasksReducer} from "./tasks-reducer";
import {TodolistActionType, todoListsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    appStatus: appReducer,
    auth: authReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
// const store = configureStore({
//     reducer:rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
// })
//for use thunk like pro add middleware type thunk
export default store
export type AppStateType = ReturnType<typeof rootReducer>
// console.log(rootReducer)
export type RootState = ReturnType<typeof store.getState>
//type for all thunks
// export type AppThunkActionType = ThunkAction<void,AppStateType,unknown,AppActionTypes>
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionTypes>


export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AppActionTypes>
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
//use that for dispatch without connect
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
//use that for select params without connect
//all actionTypes

export type AppActionTypes = TodolistActionType | TaskActionType | AppActionsType | AuthActionsType

//@ts-ignore
window.store = store

