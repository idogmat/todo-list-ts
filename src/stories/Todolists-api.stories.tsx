import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

export default {
    title:"Todolist-api"
}


export const GetApi = () => <TodolistGet/>;
const settings={
    withCredentials:true
}
const TodolistGet=()=>{
    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
            .then(resolve=>{
                console.log(resolve)
                setState(resolve.data)
            })
    },[])
    return <div>{JSON.parse(state)}</div>
}
//  export const addTodolists=()=>{
//     const [state,setState]=useState<any>(null)
//     useEffect(()=>{
//         let promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists','text',settings)
//             .then(resolve=>{
//                 setState(resolve.data)
//             })
//     },[])
//
//     return <div>{JSON.parse(state)}</div>
// }
