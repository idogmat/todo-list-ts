import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import thunk from "redux-thunk";
const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolists:todoListsReducer
})
const store=createStore(rootReducer,applyMiddleware(thunk))
//for use thunk like pro add middleware type thunk
export default store
export type AppStateType= ReturnType<typeof rootReducer>

