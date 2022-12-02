import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

export default {
    title:"Todolist-API"
}

const key = 'f267d306-2e26-49e4-8305-d841bf1e2061'
// export const GetApi = () => <TodolistGet/>;
const settings={
    withCredentials:true,
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
            .then(resolve=>{
                console.log(resolve)
                setState(resolve.data)
            }).catch((e)=>console.log(e))
    }, [])
    return <div>{state && state.map((e:any,i:number)=><li key={i}>id={e.id}|| title={e.title}</li>)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'New-TodoList1'},settings)
            .then(resolve=>{
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e)=>console.log(e))
    }, [])

    return <div>{state && JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let del = 'b580df2a-aca3-4473-999b-00e6a359848e'
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${del}`,settings)
            .then(resolve=>{
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e)=>console.log(e))
    }, [])

    return <div>{state && JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let changeId = 'abfc0fe5-20d6-4327-8bd6-d33b3a7769c1'
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${changeId}`,{title:'Changed from put request'},settings)
            .then(resolve=>{
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e)=>console.log(e))
    }, [])

    return <div>{state && JSON.stringify(state)}</div>
}
///----------------------------------------------------------------
export const GetTodolistsTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId='cf05020c-1fde-4333-822f-9338b0bf2c8c'
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,settings)
            .then(resolve=>{
                console.log(resolve)
                setState(resolve.data.items)
            }).catch((e)=>console.log(e))
    }, [])
    return <div>{state && state.map((e:any,i:number)=><li key={i}>id={e.id}|| title={e.title}</li>)}</div>
}
export const SetTodolistsTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId='cf05020c-1fde-4333-822f-9338b0bf2c8c'
    useEffect(() => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,{title:'testTask'},settings)
            .then(resolve=>{
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e)=>console.log(e))
    }, [])
    return <div>{state && state.map((e:any,i:number)=><li key={i}>id={e.id}|| title={e.title}</li>)}</div>
}
export const UpdateTodolistsTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId='cf05020c-1fde-4333-822f-9338b0bf2c8c'
    let taskId='5e08b78a-d134-4381-b838-c421a7d119b6'
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,{title:'Changed from put Task'},settings)
            .then(resolve=>{
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e)=>console.log(e))
    }, [])
    return <div>{state && state.map((e:any,i:number)=><li key={i}>id={e.id}|| title={e.title}</li>)}</div>
}
export const deleteTodolistsTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId='cf05020c-1fde-4333-822f-9338b0bf2c8c'
    let taskId='5e08b78a-d134-4381-b838-c421a7d119b6'
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,settings)
            .then(resolve=>{
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e)=>console.log(e))
    }, [])
    return <div>{state && state.map((e:any,i:number)=><li key={i}>id={e.id}|| title={e.title}</li>)}</div>
}
