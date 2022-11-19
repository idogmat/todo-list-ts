import {v1} from "uuid";
import {FilterValuesType} from "../App";

const ADD_TODOLIST="ADD_TODOLIST"
const CHANGE_TODOLIST_TITLE="CHANGE-TODOLIST-TITLE"
const REMOVE_TODOLIST="REMOVE-TODOLIST"
const CHANGE_TODOLIST_FILTER="CHANGE-TODOLIST-FILTER"


let todoListsId1 = v1();
let todoListsId2 = v1();
export type TodoList = {
    id: string
    title: string
    filter: FilterValuesType
    error: boolean
    text: string
}
export type AddActionType={
    type:"ADD_TODOLIST"
    text:string

}
export type RemoveActionType={
    type:"REMOVE-TODOLIST"
    id:string
}
export type ChangeActionType={
    id:string
    type:"CHANGE-TODOLIST-TITLE"
    text:string

}
export type ChangeActionFilterType={
    id:string
    type:"CHANGE-TODOLIST-FILTER"
    status:FilterValuesType

}
export type ActionType = AddActionType | RemoveActionType |ChangeActionType | ChangeActionFilterType
const initialState:Array<TodoList>=[
    {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
    {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
]

export const todoListsReducer=(state:Array<TodoList>,action:ActionType):TodoList[]=>{
    switch (action.type){
        case ADD_TODOLIST:
            let newTodoList: TodoList = {id: v1(), title: action.text, filter: 'all', error: false, text: ''}
            return [...state, newTodoList];
        case REMOVE_TODOLIST:
            let stateCopy = state.filter(tl => tl.id !== action.id)
            return stateCopy;
        case CHANGE_TODOLIST_TITLE:
            let res = [...state.map(el=>({...el}))]
            let todoList = res.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.text
            }
            return [...res];
        case CHANGE_TODOLIST_FILTER:
            let res1 = [...state.map(el=>({...el}))]
            let todoList1 = res1.find(el => el.id === action.id)
            if (todoList1) {
                todoList1.filter = action.status

            }
            return [...res1]
            default:
                return state


    }
}
export const addTodoListAC=(text:string)=>{
    return{type: ADD_TODOLIST, text}
}
export const removeTodoListAC=(id:string)=>{
    return{type:REMOVE_TODOLIST,id}
}
export const changeTodoListTitleAC=(text:string)=>{
    return{type:CHANGE_TODOLIST_TITLE, text}
}
export const changeTodoListFilter=(id:string,status:FilterValuesType)=>{
    return{type:CHANGE_TODOLIST_FILTER, id,status}
}