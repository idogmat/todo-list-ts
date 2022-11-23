import {combineReducers, legacy_createStore as createStore} from 'redux'
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todulists-reducer";
const rootReducer=combineReducers({
    tasks:tasksReducer,
    todolists:todoListsReducer
})
const store=createStore(rootReducer)
export default store
export type AppStateType= ReturnType<typeof rootReducer>

