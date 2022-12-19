import {addTodoList, removeTodoList, setTodoLists,} from "./todolists-reducer";
import {API, TaskResponseType} from "../api/api";
import {AppThunkActionType} from "./store";
import {changeStatusError, RequestStatusType} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginAC} from "./auth-reducer";

//
// export type RemoveTaskACType = ReturnType<typeof removeTask>
// export type AddTaskACType = ReturnType<typeof addTask>
// export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatus>
// export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitle>
// export type SetTasksACType = ReturnType<typeof setTasksAC>
// export type ChangeEntityStatusTask = ReturnType<typeof changeEntityStatusTask>
//
// export type TaskActionType = AddTaskACType
//     | RemoveTaskACType
//     | ChangeTaskStatusACType
//     | ChangeTaskTitleACType
//     | AddTodoListType
//     | RemoveTodoListType
//     | SetTodoListsType
//     | SetTasksACType
//     | ChangeEntityStatusTask
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
    entityStatus: RequestStatusType

}
export type TasksStateType = {
    [key: string]: TaskType[]
}
let initialState: TasksStateType = {}
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<{ todolistId: string, task: TaskResponseType }>) {
            state[action.payload.todolistId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        removeTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },
        changeTaskStatus(state, action: PayloadAction<{ todolistId: string, taskId: string, status: TaskStatusType }>) {
            state[action.payload.todolistId].forEach(task => task.id === action.payload.taskId ? task.status = action.payload.status : '')
        },
        changeTaskTitle(state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todolistId][index].title = action.payload.title
        },
        changeEntityStatusTask(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskResponseType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}))
        }

    },
    extraReducers: (builder) => {
        builder.addCase(addTodoList, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoList, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodoLists, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = [];
            })
        });
        builder.addCase(loginAC, (state, action) => {
            !action.payload.value && (state = {});
        });

    }
})
export const addTask = slice.actions.addTask
export const removeTask = slice.actions.removeTask
export const changeTaskStatus = slice.actions.changeTaskStatus
export const changeTaskTitle = slice.actions.changeTaskTitle
export const changeEntityStatusTask = slice.actions.changeEntityStatusTask
export const setTasksAC = slice.actions.setTasksAC


export const tasksReducer = slice.reducer


export const fetchTasksTC = (todolistId: string): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    try {
        const res = await API.getTasks(todolistId)
        dispatch(setTasksAC({todolistId, tasks: res.items}))
        dispatch(changeStatusError({status: 'succeeded'}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkActionType => async (dispatch) => {
    // console.log(todolistId,taskId)
    dispatch(changeStatusError({status: 'loading'}))
    dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'loading'}))
    try {
        const res = await API.deleteTask(todolistId, taskId)
        if (res.resultCode === 0) {
            dispatch(changeStatusError({status: 'succeeded'}))
            dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'succeeded'}))
            dispatch(removeTask({todolistId, taskId}))


        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
        dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'failed'}))

    }
}
export const addTaskTC = (todolistId: string, title: string): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    try {
        const res = await API.addTask(todolistId, title)
        if (res.resultCode === 0) {
            dispatch(addTask({todolistId, task: res.data.item}))
            dispatch(changeStatusError({status: 'succeeded'}))
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'loading'}))
    try {
        const res = await API.updateTaskTitle(todolistId, taskId, title)
        if (res.resultCode === 0) {
            dispatch(changeTaskTitle({todolistId, taskId, title: res.data.item.title}))
            dispatch(changeStatusError({status: 'succeeded'}))
            dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'succeeded'}))

        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
        dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'failed'}))


    }
}
export const changeStatusTitleTC = (todolistId: string, taskId: string, task: TaskType): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'failed'}))

    try {
        const res = await API.updateTaskStatus(todolistId, taskId, task)
        if (res.resultCode === 0) {
            dispatch(changeTaskStatus({todolistId, taskId, status: res.data.item.status}))
            dispatch(changeStatusError({status: 'succeeded'}))
            dispatch(changeEntityStatusTask({todolistId, taskId, entityStatus: 'succeeded'}))

        }
    } catch (e: any) {
        console.log(e)
        handleServerNetworkError(e, dispatch)

    }
}