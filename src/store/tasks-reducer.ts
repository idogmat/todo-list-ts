import {AddTodoListType, RemoveTodoListType, setTodoLists, SetTodoListsType} from "./todolists-reducer";
import {API, TaskResponseType} from "../api/api";
import {AppThunkActionType} from "./store";


const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
export type RemoveTaskACType = ReturnType<typeof removeTask>
export type AddTaskACType = ReturnType<typeof addTask>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatus>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitle>
export type setTasksACType = ReturnType<typeof setTasksAC>

export type TaskActionType = AddTaskACType
    | RemoveTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodoListType
    | RemoveTodoListType
    | SetTodoListsType
    | setTasksACType
export type TaskStatusType = 0 | 1
export type TaskType = {
    addedDate: string
    deadline: string | null
    status: TaskStatusType
    id: string
    title: string,
    description: string | null,
    todoListId: string
    order: number
    priority: number
    startDate: string | null

}
export type TasksStateType = {
    [key: string]: TaskType[]
}
let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            let newTask = action.task
            return {
                ...state,
                [action.task.todoListId]: [newTask, ...state[action.todoListId]]
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
                    ? {...el, status: action.status}
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
                [action.todoList.id]: [],
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
export const addTask = (todoListId: string, task: TaskResponseType) => {
    return {type: ADD_TASK, todoListId, task} as const
}
export const removeTask = (todoListId: string, taskId: string,) => {
    return {type: REMOVE_TASK, taskId, todoListId} as const
}
export const changeTaskStatus = (todoListId: string, taskId: string, status: TaskStatusType,) => {
    return {type: CHANGE_TASK_STATUS, status, todoListId, taskId} as const
}
export const changeTaskTitle = (todoListId: string, taskId: string, text: string) => {
    return {type: CHANGE_TASK_TITLE, text, todoListId, taskId} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskResponseType[]) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}
//thunks
// export const fetchTasksTC=(todolistId: string)=>(dispatch:Dispatch<AppActionTypes>)=>{
//     API.getTasks(todolistId)
//         .then((data )=> {
//             dispatch(setTasksAC(todolistId, data.items))
//         }).catch(e=>console.log(e))
// }
export const fetchTasksTC = (todolistId: string): AppThunkActionType => async (dispatch) => {
    try {
        const res = await API.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, res.items))
    }catch (e){
        console.log(e)
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkActionType => async(dispatch) => {
    try {
        const res = await API.deleteTask(todolistId, taskId)
        if (res.resultCode === 0) {
            dispatch(removeTask(todolistId, taskId))
        }
    }catch (e){
        console.log(e)
    }
}
export const addTaskTC = (todolistId: string, title: string): AppThunkActionType => async(dispatch) => {
    try {
        const res = await API.addTask(todolistId, title)
        if (res.resultCode === 0) {
            dispatch(addTask(todolistId, res.data.item))
        }
    }catch (e){
        console.log(e)
    }
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunkActionType =>async (dispatch) => {
    try {
        const res = await API.updateTaskTitle(todolistId, taskId, title)
        if (res.resultCode === 0) {
            dispatch(changeTaskTitle(todolistId, taskId, res.data.item.title))
        }
    }catch (e){
        console.log(e)
    }
}
export const changeStatusTitleTC = (todolistId: string, taskId: string, task: TaskType): AppThunkActionType => async(dispatch) => {
    try {
        const res = await API.updateTaskStatus(todolistId, taskId, task)
        if (res.resultCode === 0) {
            dispatch(changeTaskStatus(todolistId, taskId, res.data.item.status))
        }
    }catch (e){
        console.log(e)
    }
}