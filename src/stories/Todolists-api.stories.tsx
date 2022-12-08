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
    const add=()=> {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: state}, settings)
            .then(resolve => {
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e) => console.log(e))
    }

    return <div>
        <input placeholder={'title'} type="text" value={state} onChange={(e)=>setState(e.currentTarget.value)}/>
        <button onClick={add}>CreateTodolist</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const remove=() => {
        console.log(state)
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${state}`, settings)
            .then(resolve => {
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e) => console.log(e))
    }

    return <div>
        TodoListId
        <input placeholder={'id'} type="text" value={state} onChange={(e)=>setState(e.currentTarget.value)}/>
        <button onClick={remove}>CreateTodolist</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const change=() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${state}`, {title: 'Changed from put request'}, settings)
            .then(resolve => {
                console.log(resolve)
                // setState(resolve.data)
            }).catch((e) => console.log(e))
    }

    return <div>
        TodoListId
        <input placeholder={'id'} type="text" value={state} onChange={(e)=>setState(e.currentTarget.value)}/>
        <button onClick={change}>CreateTodolist</button>
    </div>
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
export const DeleteTodolistsTask = () => {
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
