import axios from "axios";

const key = 'f267d306-2e26-49e4-8305-d841bf1e2061'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {'API-KEY': key}
});
export const API = {
    authMe: () => instance.get('/auth/me').then(response => response.data),
    addTodoList: (title:string) => instance.post('/todo-lists',{title}),
    getTodoLists: () => instance.get('/todo-lists').then(response=>response.data)
}
