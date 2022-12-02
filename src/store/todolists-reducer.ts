import {v1} from "uuid";
import {FilterValuesType} from "../TodoListContainer";
import {Dispatch} from "redux";
import {API} from "../api/api";

const ADD_TODOLIST = "ADD_TODOLIST"
const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
const CHANGE_TODOLIST_INPUT = "CHANGE-TODOLIST-INPUT"
const SET_TODOLISTS = "SET-TODOLISTS"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    error: boolean
    text: string
    order?:number
    addedDate?:string
}
export type AddActionType = {
    type: "ADD_TODOLIST"
    text: string
    todoListId: string

}
export type RemoveActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
export type ChangeActionType = {
    todoListId: string
    type: "CHANGE-TODOLIST-TITLE"
    text: string

}
export type ChangeActionFilterType = {
    todoListId: string
    type: "CHANGE-TODOLIST-FILTER"
    status: FilterValuesType

}

export type ChangeTodoListInputType = {
    todoListId: string
    type: "CHANGE-TODOLIST-INPUT"
    text: string
}
export type todoListsFromAPIType={
    addedDate:string
    id:string
    order:number
    title:string
}
export type setTodolistsType = {
    todoLists: todoListsFromAPIType[]
    type: "SET-TODOLISTS"
}

export type ActionType =
    AddActionType
    | RemoveActionType
    | ChangeActionType
    | ChangeActionFilterType
    | ChangeTodoListInputType
    | setTodolistsType
const initialState: Array<TodoListType> = [
    // {id: 'todoListsId1', title: 'first', filter: 'all', error: false, text: ''},
    // {id: 'todoListsId2', title: 'first', filter: 'all', error: false, text: ''}
]

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{id: action.todoListId, title: action.text, filter: 'all', error: false, text: '',order:0},
                ...state];
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todoListId);
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todoListId
                ? {...tl, filter: action.status}
                : {...tl})
        case CHANGE_TODOLIST_INPUT:
            return state.map(tl => tl.id === action.todoListId
                ? {...tl, text: action.text}
                : {...tl})
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todoListId
                ? {...tl, title: action.text}
                : {...tl})
        case SET_TODOLISTS:
            return action.todoLists.map(tl => ({
                id: tl.id,
                title: tl.title,
                filter: 'all',
                error: false,
                text: '',
                order:tl.order
            }))
        default:
            return state


    }
}
export const addTodoList = (text: string) => {
    return {type: ADD_TODOLIST, text, todoListId: v1()} as const
}
//generate id for 2 reducers/important made action.type for both reducers
export const removeTodoList = (todoListId: string) => {
    return {type: REMOVE_TODOLIST, todoListId} as const
}
export const changeTodoListInput = (todoListId: string, text: string) => {
    return {type: CHANGE_TODOLIST_INPUT, todoListId, text} as const
}
export const changeTodoListFilter = (todoListId: string, status: FilterValuesType) => {
    return {type: CHANGE_TODOLIST_FILTER, todoListId, status} as const
}
export const changeFieldTodolistTitle = (todoListId: string, text: string) => {
    return {type: CHANGE_TODOLIST_TITLE, todoListId, text} as const
}

export const setTodoLists = (todoLists: todoListsFromAPIType[]|any) => {
    return {type: SET_TODOLISTS, todoLists} as const
}

export const fetchTodolist=()=>(dispatch:Dispatch)=>{
    API.getTodolists()
        // .then((e:todoListsFromAPIType[])=>console.log(e))
        .then((data)=>dispatch(setTodoLists(data)))
}