import axios from "axios";
import {TaskStatusType, TaskType} from "../store/tasks-reducer";

export type TodoListsAPIType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type TaskResponseType = {
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
type CreateTaskResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TaskResponseType
    }
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    item: TodoListsAPIType

}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

type DeleteTaskResponseType = {
    data: {
        resultCode: number
        messages: Array<string>
        fieldsErrors: Array<string>
        data:{}
    }
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
        return instance.get<TodoListsAPIType[]>('todo-lists')
            .then(resolve => {
                console.log(resolve)
                return resolve.data
            })
    },
    addTodolist: (title: string) => {
        return instance.post<ResponseType<CreateTodolistResponseType>>('todo-lists', {Title: title})
            .then(resolve => {
                console.log(resolve)
                return resolve.data.data.item
            })
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<ResponseType<DeleteTaskResponseType>>(`todo-lists/${todolistId}`)
            .then(resolve => {
                console.log(resolve)
                return resolve
            })

    },
    updateTodolistTitle: (todolistId: string, title: string) => {
        return instance.put<ResponseType<UpdateTodolistResponseType>>(`todo-lists/${todolistId}`, {Title: title})
            .then(resolve => {
                console.log(resolve)
                return resolve.data.resultCode
            })
    },
    //Tasks
    getTasks: (todolistId: string) => {
        return instance.get<TasksObjType>(`todo-lists/${todolistId}/tasks`)
            .then(resolve => {
                console.log(resolve)
                return resolve.data
            })
    },
    addTask: (todolistId: string,title:string) => {
        return instance.post<CreateTaskResponseType>(`todo-lists/${todolistId}/tasks`, {Title: title})
            .then(resolve => {
                console.log(resolve)
                return resolve.data
            })
    },
    updateTaskTitle: (todolistId: string, taskId: string,title:string) => {
       return instance.put<CreateTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {Title:title})
            .then(resolve => {
                console.log(resolve)
                return resolve.data
            })
    },
    updateTaskStatus: (todolistId: string, taskId: string,task:TaskType) => {
        return instance.put<CreateTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, task)
            .then(resolve => {
                console.log(resolve)
                return resolve.data
            })
    },
    deleteTask: (todolistId: string, taskId: string) => {
       return instance.delete<ResponseType<DeleteTaskResponseType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(resolve => {
                console.log(resolve)
                return resolve.data.resultCode
            })

    },
}
