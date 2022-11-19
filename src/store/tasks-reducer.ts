import {v1} from "uuid";
import {FilterValuesType} from "../App";
import {ActionType, TodoList} from "./todulists-reducer";


const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE='CHANGE-TASK-TITLE'
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = AddTaskACType | RemoveTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
let initialState: TasksStateType = {
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


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...el,isDone:!action.isDone}:el)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...el,title:action.text}:el)
            }
        //     return [...res];
        // case CHANGE_TODOLIST_FILTER:
        //     let res1 = [...state.map(el=>({...el}))]
        //     let todoList1 = res1.find(el => el.id === action.id)
        //     if (todoList1) {
        //         todoList1.filter = action.status
        //
        //     }
        //     return [...res1]
        default:
            return state


    }
}
export const addTaskAC = (text: string, todoListId: string) => {
    return {type: ADD_TASK, todoListId, text} as const
}
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: REMOVE_TASK, taskId, todoListId} as const
}
export const changeTaskStatusAC = (isDone: boolean, todoListId: string, taskId: string) => {
    return {type: CHANGE_TASK_STATUS, isDone, todoListId, taskId} as const
}
export const changeTaskTitleAC = (text: string, todoListId: string, taskId: string) => {
    return {type: CHANGE_TASK_TITLE, text, todoListId, taskId} as const
}
// export const changeTodoListFilter=(id:string,status:FilterValuesType)=>{
//     return{type:CHANGE_TODOLIST_FILTER, id,status}
// }