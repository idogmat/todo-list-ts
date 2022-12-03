import {v1} from "uuid";
import {FilterValuesType} from "../TodoListContainer";
import {Dispatch} from "redux";
import {API, TodoListsAPIType} from "../api/api";

const ADD_TODOLIST = "ADD_TODOLIST"
const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
const CHANGE_TODOLIST_INPUT = "CHANGE-TODOLIST-INPUT"
const SET_TODOLISTS = "SET-TODOLISTS"
export type todoListsFromAPIType={
    addedDate:string
    id:string
    order:number
    title:string
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    error: boolean
    text: string
    order:number
    addedDate:string
}
export type AddTodoListType=ReturnType<typeof addTodoList>
export type RemoveTodoListType=ReturnType<typeof removeTodoList>
export type SetTodoListsType=ReturnType<typeof setTodoLists>
type ChangeTodoListInputType=ReturnType<typeof changeTodoListInput>
type ChangeTodoListFilterType=ReturnType<typeof changeTodoListFilter>
type ChangeFieldTodolistTitleType=ReturnType<typeof changeFieldTodolistTitle>

type ActionsType=
    AddTodoListType
    |RemoveTodoListType
|ChangeTodoListInputType
|ChangeTodoListFilterType
|ChangeFieldTodolistTitleType
|SetTodoListsType

const initialState: Array<TodoListType> = [
    // {id: 'todoListsId1', title: 'first', filter: 'all', error: false, text: ''},
    // {id: 'todoListsId2', title: 'first', filter: 'all', error: false, text: ''}
]

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{...action.todoList,filter:'all',error:false,text:''},
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
                ? {...tl, title: action.title}
                : {...tl})
        case SET_TODOLISTS:
            return action.todoLists.map(tl => ({
                id: tl.id,
                title: tl.title,
                filter: 'all',
                error: false,
                text: '',
                order:tl.order,
                addedDate:tl.addedDate
            }))
        default:
            return state


    }
}
export const addTodoList = (todoList: TodoListsAPIType) => {
    return {type: ADD_TODOLIST, todoList} as const
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
export const changeFieldTodolistTitle = (todoListId: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, todoListId, title} as const
}

export const setTodoLists = (todoLists: todoListsFromAPIType[]) => {
    return {type: SET_TODOLISTS, todoLists} as const
}

export const fetchTodolist=()=>(dispatch:Dispatch)=>{
    API.getTodolists()
        .then((data)=>dispatch(setTodoLists(data)))
}
export const addTodolistTC=(title:string)=>(dispatch:Dispatch)=>{
    API.addTodolist(title)
        .then((data)=>dispatch(addTodoList(data)))
}
export const removeTodolistTC=(todolistId:string)=>(dispatch:Dispatch)=>{
    API.deleteTodolist(todolistId)
        .then((data)=> {
            if(data.data.resultCode === 0)
            dispatch(removeTodoList(todolistId))
        }).catch(e=>console.log(e))
}
export const updateTodolistTitleTC=(todolistId:string,title:string)=>(dispatch:Dispatch)=>{
    API.updateTodolistTitle(todolistId,title)
        .then((resultCode)=> {
            if(resultCode === 0)
                dispatch(changeFieldTodolistTitle(todolistId,title))
        }).catch(e=>console.log(e))
}