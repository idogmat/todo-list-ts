import axios from "axios";
import {todoListsFromAPIType} from "../store/todulists-reducer";

const key = 'f267d306-2e26-49e4-8305-d841bf1e2061'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {'API-KEY': key}
});
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: todoListsFromAPIType
    }
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export const API = {
    authMe: () => instance.get<todoListsFromAPIType[]>('/auth/me').then(response => response.data),
    getTodolists: () => {
        return instance.get('todo-lists')
            .then(resolve => {
                console.log(resolve)
                return resolve.data
            }).catch((e) => console.warn(e))
    },
    addTodolist: (newTodolist:string) => {
        return instance.post<CreateTodolistResponseType>('todo-lists', newTodolist)
            .then(resolve => {
                console.log(resolve)
                return resolve
            }).catch((e) => console.warn(e))
    },
    deleteTodolist: (todolistId:string) => {

        return instance.delete<DeleteTodolistResponseType >(`todo-lists/${todolistId}`)
            .then(resolve => {
                console.log(resolve)
                return resolve
            }).catch((e) => console.warn(e))

    },
    updateTodolistTitle: (todolistId:string,title:string) => {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, title)
            .then(resolve => {
                console.log(resolve)
                return resolve
            }).catch((e) => console.warn(e))
    }
}
