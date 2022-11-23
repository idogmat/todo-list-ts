import {v1} from "uuid";
import { AddActionType, RemoveActionType} from "./todulists-reducer";


const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE='CHANGE-TASK-TITLE'
export type RemoveTaskACType = ReturnType<typeof removeTask>
export type AddTaskACType = ReturnType<typeof addTask>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatus>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitle>

type ActionsType = AddTaskACType | RemoveTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddActionType|RemoveActionType
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
let initialState: TasksStateType = {
    // ['todoListsId1']: [{id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Hello world", isDone: true},
    //     {id: v1(), title: "I am Happy", isDone: false},
    // ],
    // ['todoListsId2']: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    // ]
}


export const tasksReducer = (state: TasksStateType=initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            let newTask = {id: v1(), title: action.text, isDone: false}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case REMOVE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
                    ? {...el,isDone:action.isDone}
                    :el)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...el,title:action.text}:el)
            }
        case "ADD_TODOLIST":
            return {
                [action.todoListId]:[],
                ...state
            }
        case "REMOVE-TODOLIST":
            const {[action.todoListId]:[],...rest} = {...state}
            return rest
        default:
            return state


    }
}
export const addTask = (todoListId: string,text: string ) => {
    return {type: ADD_TASK, todoListId, text} as const
}
export const removeTask = (taskId: string, todoListId: string) => {
    return {type: REMOVE_TASK, taskId, todoListId} as const
}
export const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean, ) => {
    return {type: CHANGE_TASK_STATUS, isDone, todoListId, taskId} as const
}
export const changeTaskTitle = (todoListId: string,taskId: string,text: string ) => {
    return {type: CHANGE_TASK_TITLE, text, todoListId, taskId} as const
}
// export const changeTodoListFilter=(id:string,status:FilterValuesType)=>{
//     return{type:CHANGE_TODOLIST_FILTER, id,status}
// }