import axios from "axios";
import React, {useEffect, useState} from "react";

type TodoListsFromAPIType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type TaskResponseType = {
    addedDate: string
    deadline: string | null
    status: number
    id: string
    title: string,
    description: string | null,
    todoListId: string
    order: number
    priority: number
    startDate: string | null
}
export type TasksObjType = {
    error: any
    items: TaskResponseType[]
    totalCount: number
}
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
        item: TodoListsFromAPIType
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
    authMe: () => instance.get('/auth/me').then(response => response.data),
    //todolists
    getTodolists: () => {
        return instance.get<TodoListsFromAPIType[]>('todo-lists')
            .then(resolve => {
                console.log(resolve)
                return resolve.data
            }).catch((e) => console.warn(e))
    },
    addTodolist: (newTodolist: string) => {
        return instance.post<CreateTodolistResponseType>('todo-lists', newTodolist)
            .then(resolve => {
                console.log(resolve)
                return resolve
            }).catch((e) => console.warn(e))
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
            .then(resolve => {
                console.log(resolve)
                return resolve
            }).catch((e) => console.warn(e))

    },
    updateTodolistTitle: (todolistId: string, title: string) => {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, title)
            .then(resolve => {
                console.log(resolve)
                return resolve
            }).catch((e) => console.warn(e))
    },
    //Tasks
    getTasks: (todolistId: string) => {
        return instance.get<TasksObjType>(`todo-lists/${todolistId}/tasks`)
            .then(resolve => {
                console.log(resolve)
                return resolve.data.items
            }).catch((e) => console.log(e))
    },
    addTask: (todolistId: string) => {
        instance.post(`todo-lists/${todolistId}/tasks`, {title: 'testTask'})
            .then(resolve => {
                console.log(resolve)
                // return resolve.data
            }).catch((e) => console.log(e))
    },
    updateTask: (todolistId: string, taskId: string) => {
        instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title: 'Changed from put Task'})
            .then(resolve => {
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e) => console.log(e))
    },
    deleteTask: (todolistId: string, taskId: string) => {
        instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(resolve => {
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e) => console.log(e))

    },
}
