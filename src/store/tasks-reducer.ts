import {v1} from "uuid";
import {AddActionType, RemoveActionType, setTodoLists, setTodolistsType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {API, TaskResponseType} from "../api/api";


const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
export type RemoveTaskACType = ReturnType<typeof removeTask>
export type AddTaskACType = ReturnType<typeof addTask>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatus>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitle>
export type setTasksACType = ReturnType<typeof setTasksAC>

type ActionsType = AddTaskACType
    | RemoveTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddActionType
    | RemoveActionType
    | setTodolistsType
    | setTasksACType
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
    todoListId:string
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            let newTask = {id: v1(), title: action.text, isDone: false,todoListId:action.todoListId}
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
                    ? {...el, isDone: action.isDone}
                    : el)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
                    ? {...el, title: action.text}
                    : el)
            }
        case "ADD_TODOLIST":
            return {
                [action.todoListId]: [],
                ...state
            }
        case "REMOVE-TODOLIST":
            const {[action.todoListId]: [], ...rest} = {...state}
            return rest
        case "SET-TODOLISTS":
            const copyTl = {...state}
            action.todoLists.forEach(tl => {
                copyTl[tl.id] = [];
            })
            return copyTl
        case "SET-TASKS":
            const copyTs = {...state}
            copyTs[action.todolistId] = action.tasks
            return copyTs
        default:
            return state
    }
}
export const addTask = (todoListId: string, text: string) => {
    return {type: ADD_TASK, todoListId, text} as const
}
export const removeTask = (todoListId: string, taskId: string,) => {
    return {type: REMOVE_TASK, taskId, todoListId} as const
}
export const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean,) => {
    return {type: CHANGE_TASK_STATUS, isDone, todoListId, taskId} as const
}
export const changeTaskTitle = (todoListId: string, taskId: string, text: string) => {
    return {type: CHANGE_TASK_TITLE, text, todoListId, taskId} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]|any) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}
export const fetchTasksTC=(todolistId: string)=>(dispatch:Dispatch)=>{
    API.getTasks(todolistId)
        .then(data=> {
            dispatch(setTasksAC(todolistId, data))
        })
}