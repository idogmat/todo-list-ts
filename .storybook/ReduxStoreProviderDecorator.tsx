import React from 'react'
import {Provider} from "react-redux";
import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "../src/store/tasks-reducer";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todoListsReducer} from "../src/store/todolists-reducer";
import {AppStateType} from "../src/store/store";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})
let initialState: AppStateType = {
    todolists:
        [{id:'1',title:'React',addedDate:'1', order:1,filter:'all', error:false, text:''  },
            {id:'1',title:'React',addedDate:'1',order:1,filter:'all', error:false, text:''  }],

    tasks: {
        ['todoListsId1']: [{id:'1',status:1,title:'React',addedDate:'1', deadline:'1', description:'1', todoListId:'todoListsId1',order:1, priority:1, startDate:'1'},
            {id:'1',status:1,title:'React',addedDate:'1', deadline:'1', description:'1', todoListId:'todoListsId1',order:1, priority:1, startDate:'1'},
            {id:'1',status:1,title:'React',addedDate:'1', deadline:'1', description:'1', todoListId:'todoListsId1',order:1, priority:1, startDate:'1'},
            {id:'1',status:1,title:'React',addedDate:'1', deadline:'1', description:'1', todoListId:'todoListsId1',order:1, priority:1, startDate:'1'},

        ],
        ['todoListsId2']: [
            {id:'1',status:1,title:'React',addedDate:'1', deadline:'1', description:'1', todoListId:'todoListsId2',order:1, priority:1, startDate:'1'},
            {id:'1',status:1,title:'React',addedDate:'1', deadline:'1', description:'1', todoListId:'todoListsId2',order:1, priority:1, startDate:'1'}
        ]
    }
}
const storeForStory = createStore(rootReducer, initialState as AppStateType)
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storeForStory}>{story()}</Provider>
}