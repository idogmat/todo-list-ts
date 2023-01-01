import {addTodolist, fetchTodolist, removeTodolist} from "./todolists-reducer";
import {API} from "../api/api";
import {AppDispatch, AppStateType} from "./store";
import {changeStatusError, RequestStatusType} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


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
export const fetchTasks = createAsyncThunk('tasks/fetchTasks',async(todolistId: string,thunkAPI)=>{
    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    try {
        const res = await API.getTasks(todolistId)
        thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
        return {todolistId, tasks: res.items}

    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask',async (param:{todolistId: string, taskId: string},thunkAPI)=> {
    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    thunkAPI.dispatch(changeEntityStatusTask({todolistId:param.todolistId, taskId:param.taskId, entityStatus: 'loading'}))
    try {
        const res = await API.deleteTask(param.todolistId, param.taskId)
        if (res.resultCode === 0) {
            thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
            thunkAPI.dispatch(changeEntityStatusTask({todolistId:param.todolistId, taskId:param.taskId, entityStatus: 'succeeded'}))
            return {todolistId:param.todolistId, taskId:param.taskId}
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)
        thunkAPI.dispatch(changeEntityStatusTask({todolistId:param.todolistId, taskId: param.taskId, entityStatus: 'failed'}))
    }
});
export const addTask = createAsyncThunk('tasks/addTask',async (param:{todolistId: string, title: string},thunkAPI)=> {
    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    try {
        const res = await API.addTask(param.todolistId, param.title)
        if (res.resultCode === 0) {

            thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
            return {todolistId:param.todolistId, task: res.data.item}
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    }
})

export const changeTaskTitle = createAsyncThunk('tasks/changeTaskTitle', async (params:{todolistId: string, taskId:string, title:string}, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    thunkAPI.dispatch(changeEntityStatusTask({todolistId:params.todolistId, taskId:params.taskId, entityStatus: 'loading'}))
    try {
        const res = await API.updateTaskTitle(params.todolistId, params.taskId, params.title)
        if (res.resultCode === 0) {

            thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
            thunkAPI.dispatch(changeEntityStatusTask({todolistId:params.todolistId, taskId:params.taskId, entityStatus: 'succeeded'}))
            return{todolistId:params.todolistId, taskId:params.taskId, title: res.data.item.title}
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)
        thunkAPI.dispatch(changeEntityStatusTask({todolistId:params.todolistId, taskId:params.taskId, entityStatus: 'failed'}))
    }
})
export const changeTaskStatus = createAsyncThunk('tasks/changeTaskStatus',  async(param: { todolistId: string, taskId: string, task: TaskType },thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    thunkAPI.dispatch(changeEntityStatusTask({todolistId:param.todolistId, taskId:param.taskId, entityStatus: 'failed'}))
    try {
        const res = await API.updateTaskStatus(param.todolistId, param.taskId, param.task)
        if (res.resultCode === 0) {
            thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
            thunkAPI.dispatch(changeEntityStatusTask({todolistId:param.todolistId, taskId:param.taskId, entityStatus: 'succeeded'}))
            return {todolistId:param.todolistId, taskId:param.taskId, status: res.data.item.status}
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)

    }
})
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        changeEntityStatusTask(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            action.payload && (state[action.payload.todolist.id] = [])
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            action.payload && delete state[action.payload.todolistId]
        });
        builder.addCase(fetchTodolist.fulfilled, (state, action) => {
            action.payload && action.payload.todolists.forEach(tl => {
                state[tl.id] = [];
            })
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            action.payload && state[action.payload.todolistId].unshift({...action.payload.task, entityStatus: 'idle'})
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
           if(action.payload) state[action.payload.todolistId] = action.payload.tasks.map((task) => ({...task, entityStatus: 'idle'}))
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            if(action.payload) {
                const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload?.taskId)
                if (index > -1) {
                    state[action.payload.todolistId].splice(index, 1)
                }
            }
        });
        builder.addCase(changeTaskTitle.fulfilled, (state, action) => {
            if(action.payload) {
                const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload?.taskId)
                state[action.payload.todolistId][index].title = action.payload.title
            }
        });
        builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
            if(action.payload) {
                state[action.payload.todolistId].forEach(task => task.id === action.payload?.taskId ? task.status = action.payload?.status : '')
            }
        });
    }
})

export const changeEntityStatusTask = slice.actions.changeEntityStatusTask



export const tasksReducer = slice.reducer


