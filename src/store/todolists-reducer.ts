import {API} from "../api/api";
import {AppThunkActionType} from "./store";
import {changeStatusError, RequestStatusType} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginAC} from "./auth-reducer";


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
// export type AddTodoListType = ReturnType<typeof addTodoList>
// export type RemoveTodoListType = ReturnType<typeof removeTodoList>
// export type SetTodoListsType = ReturnType<typeof setTodoLists>
// type ChangeTodoListInputType = ReturnType<typeof changeTodoListInput>
// type ChangeTodoListFilterType = ReturnType<typeof changeTodoListFilter>
// type ChangeFieldTodolistTitleType = ReturnType<typeof changeFieldTodolistTitle>
// type ChangeEntityStatusTodolist = ReturnType<typeof changeEntityStatusTodolist>
//
// export type TodolistActionType =
//     AddTodoListType
//     | RemoveTodoListType
//     | ChangeTodoListInputType
//     | ChangeTodoListFilterType
//     | ChangeFieldTodolistTitleType
//     | SetTodoListsType
//     | ChangeEntityStatusTodolist

const initialState: Array<TodoListType> = [
    // {id:'todoListsId1',title:'React',addedDate:'1', order:1,filter:'all', error:false, text:''  },
    // {id:'todoListsId2',title:'React',addedDate:'1',order:1,filter:'all', error:false, text:''  }
]
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        addTodoList(state, action: PayloadAction<{ todolist: TodoListsFromAPIType }>) {
            state.unshift({
                ...action.payload.todolist,
                filter: 'all',
                error: false,
                text: '',
                entityStatus: 'idle'
            })
        },
        removeTodoList(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
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
        setTodoLists(state, action: PayloadAction<{ todolists: TodoListsFromAPIType[] }>) {
            action.payload.todolists.forEach(tl => state.push({
                id: tl.id,
                title: tl.title,
                filter: 'all',
                error: false,
                text: '',
                order: tl.order,
                addedDate: tl.addedDate,
                entityStatus: 'idle'
            }))
        },
        changeEntityStatusTodolist(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            state.forEach(tl => tl.id === action.payload.todolistId
                ? tl.entityStatus = action.payload.entityStatus
                : '')
        },

    },
    extraReducers: (builder) => {
        builder.addCase(loginAC, (state, action) => {
            !action.payload.value && (state.length = 0);

        });
    }
})
export const addTodoList = slice.actions.addTodoList
export const removeTodoList = slice.actions.removeTodoList
export const changeTodoListInput = slice.actions.changeTodoListInput
export const changeTodoListFilter = slice.actions.changeTodoListFilter
export const changeFieldTodolistTitle = slice.actions.changeFieldTodolistTitle
export const setTodoLists = slice.actions.setTodoLists
export const changeEntityStatusTodolist = slice.actions.changeEntityStatusTodolist

export const todoListsReducer = slice.reducer


export const fetchTodolist = (): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    try {
        const res = await API.getTodolists()
        dispatch(changeStatusError({status: 'succeeded'}))
        dispatch(setTodoLists({todolists: res.data}))

    } catch (e: any) {
        console.log(e, 'errr')
        handleServerNetworkError(e.message, dispatch)
    }
}
// export type ThunkAction<
//     R, // Return type of the thunk function
//     S, // state type used by getState
//     E, // any "extra argument" injected into the thunk
//     A extends Action // known types of actions that can be dispatched
//     > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
export const addTodolistTC = (title: string): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    try {
        const res = await API.addTodolist(title)
        dispatch(changeStatusError({status: 'succeeded'}))
        dispatch(addTodoList({todolist: res}))

    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)

    }
}
export const removeTodolistTC = (todolistId: string): AppThunkActionType => async (dispatch) => {
    dispatch(changeStatusError({status: 'loading'}))
    dispatch(changeEntityStatusTodolist({todolistId, entityStatus: 'loading'}))
    try {
        const res = await API.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(changeEntityStatusTodolist({todolistId, entityStatus: 'succeeded'}))
            dispatch(changeStatusError({status: 'succeeded'}))
            dispatch(removeTodoList({todolistId}))

        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}
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