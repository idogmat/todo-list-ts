import {API} from "../api/api";
import {AppThunkActionType} from "./store";
import {changeStatusError, RequestStatusType} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListsFromAPIType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    error: boolean
    text: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
const initialState: Array<TodoListType> = [
    // {id:'todoListsId1',title:'React',addedDate:'1', order:1,filter:'all', error:false, text:''  },
    // {id:'todoListsId2',title:'React',addedDate:'1',order:1,filter:'all', error:false, text:''  }
]
export const fetchTodolist = createAsyncThunk('todolist/fetchTodolist', async (value,thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    try {
        const res = await API.getTodolists()
        thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (e: any) {
        console.log(e, 'errr')
        handleServerNetworkError(e.message, thunkAPI.dispatch)
    }
})
export const addTodolist = createAsyncThunk('todolist/addTodolist', async (title:string,thunkAPI) => {

    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    try {
            const res = await API.addTodolist(title)
            thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
           return {todolist: res}
    } catch (e: any) {
        handleServerNetworkError(e.message, thunkAPI.dispatch)

    }
})
export const removeTodolist =createAsyncThunk('todolist/removeTodolist',  async (todolistId: string,thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({status: 'loading'}))
    thunkAPI.dispatch(changeEntityStatusTodolist({todolistId, entityStatus: 'loading'}))
    try {
        const res = await API.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(changeEntityStatusTodolist({todolistId, entityStatus: 'succeeded'}))
            thunkAPI.dispatch(changeStatusError({status: 'succeeded'}))
            return {todolistId}
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, thunkAPI.dispatch)
    }
})
export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    dispatch(changeEntityStatusTodolist({todolistId, entityStatus: 'loading'}))
    try {
        const res = await API.updateTodolistTitle(todolistId, title)
        if (res === 0) {
            dispatch(changeEntityStatusTodolist({todolistId, entityStatus: 'succeeded'}))
            dispatch(changeStatusError({status: 'succeeded'}))
            dispatch(changeFieldTodolistTitle({todolistId, title}))

        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        addTodoList(state, action: PayloadAction<{ todolist: TodoListsFromAPIType }>) {

        },
        removeTodoList(state, action: PayloadAction<{ todolistId: string }>) {

        },
        changeTodoListInput(state, action: PayloadAction<{ todolistId: string, text: string }>) {
            state.forEach(tl => tl.id === action.payload.todolistId
                ? tl.text = action.payload.text
                : '')
        },
        changeTodoListFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            state.forEach(tl => tl.id === action.payload.todolistId ? tl.filter = action.payload.filter : '')

        },
        changeFieldTodolistTitle(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            state.forEach(tl => tl.id === action.payload.todolistId ? tl.title = action.payload.title : '')
        },
        changeEntityStatusTodolist(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            state.forEach(tl => tl.id === action.payload.todolistId
                ? tl.entityStatus = action.payload.entityStatus
                : '')
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist.fulfilled, (state, action ) => {
           !!action.payload && state.unshift({
               ...action.payload.todolist,
               filter: 'all',
               error: false,
               text: '',
               entityStatus: 'idle'
           })
        });
        builder.addCase(fetchTodolist.fulfilled, (state, action ) => {
            state.length=0
            !!action.payload && action.payload.todolists.forEach(tl => state.push({
                id: tl.id,
                title: tl.title,
                filter: 'all',
                error: false,
                text: '',
                order: tl.order,
                addedDate: tl.addedDate,
                entityStatus: 'idle'
            }))
        });
        builder.addCase(removeTodolist.fulfilled, (state, action ) => {
            if (action.payload) {
                const index = state.findIndex(tl => tl.id === action.payload?.todolistId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            }
        });
    }
})

export const changeTodoListInput = slice.actions.changeTodoListInput
export const changeTodoListFilter = slice.actions.changeTodoListFilter
export const changeFieldTodolistTitle = slice.actions.changeFieldTodolistTitle
export const changeEntityStatusTodolist = slice.actions.changeEntityStatusTodolist

export const todoListsReducer = slice.reducer



// export type ThunkAction<
//     R, // Return type of the thunk function
//     S, // state type used by getState
//     E, // any "extra argument" injected into the thunk
//     A extends Action // known types of actions that can be dispatched
//     > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
