import React from 'react'
import {Provider} from "react-redux";
import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "../src/store/tasks-reducer";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todoListsReducer} from "../src/store/todulists-reducer";
import {AppStateType} from "../src/store/store";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})
let initialState: AppStateType = {
    todolists:
        [{id: 'todoListsId1', title: 'first', filter: 'all', error: false, text: ''},
            {id: 'todoListsId2', title: 'first', filter: 'all', error: false, text: ''}],

    tasks: {
        ['todoListsId1']: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
        ],
        ['todoListsId2']: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ]
    }
}
const storeForStory = createStore(rootReducer, initialState as AppStateType)
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storeForStory}>{story()}</Provider>
}