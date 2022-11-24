import {v1} from "uuid";
import {FilterValuesType} from "../TodoListContainer";

const ADD_TODOLIST="ADD_TODOLIST"
const REMOVE_TODOLIST="REMOVE-TODOLIST"
const CHANGE_TODOLIST_FILTER="CHANGE-TODOLIST-FILTER"
const CHANGE_TODOLIST_TITLE="CHANGE-TODOLIST-TITLE"
const CHANGE_TODOLIST_INPUT="CHANGE-TODOLIST-INPUT"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    error: boolean
    text: string
}
export type AddActionType={
    type:"ADD_TODOLIST"
    text:string
    todoListId:string

}
export type RemoveActionType={
    type:"REMOVE-TODOLIST"
    todoListId:string
}
export type ChangeActionType={
    todoListId:string
    type:"CHANGE-TODOLIST-TITLE"
    text:string

}
export type ChangeActionFilterType={
    todoListId:string
    type:"CHANGE-TODOLIST-FILTER"
    status:FilterValuesType

}

export type ChangeTodoListInputType={
    todoListId:string
    type:"CHANGE-TODOLIST-INPUT"
    text:string
}

export type ActionType = AddActionType | RemoveActionType |ChangeActionType | ChangeActionFilterType|ChangeTodoListInputType
const initialState:Array<TodoListType>=[
    // {id: 'todoListsId1', title: 'first', filter: 'all', error: false, text: ''},
    // {id: 'todoListsId2', title: 'first', filter: 'all', error: false, text: ''}
]

export const todoListsReducer=(state:Array<TodoListType>=initialState,action:ActionType):TodoListType[]=>{
    switch (action.type){
        case ADD_TODOLIST:
            return [{id: action.todoListId, title: action.text, filter: 'all', error: false, text: ''},
                ...state];
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todoListId);
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todoListId
                ? {...tl,filter: action.status}
                : {...tl})
        case CHANGE_TODOLIST_INPUT:
            return state.map(tl => tl.id === action.todoListId
                ?{...tl,text:action.text}
                : {...tl})
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todoListId
                ?{...tl,title:action.text}
                : {...tl})
            default:
                return state


    }
}
export const addTodoList=(text:string)=>{
    return{type: ADD_TODOLIST, text, todoListId:v1()} as const
}
//generate id for 2 reducers/important made action.type for both reducers
export const removeTodoList=(todoListId:string)=>{
    return{type:REMOVE_TODOLIST,todoListId}as const
}
export const changeTodoListInput=(todoListId:string,text:string)=>{
    return{type:CHANGE_TODOLIST_INPUT,todoListId, text}as const
}
export const changeTodoListFilter=(todoListId:string,status:FilterValuesType)=>{
    return{type:CHANGE_TODOLIST_FILTER, todoListId,status}as const
}
export const changeFieldTodolistTitle=(todoListId:string,text:string)=>{
    return{type:CHANGE_TODOLIST_TITLE, todoListId,text}as const
}