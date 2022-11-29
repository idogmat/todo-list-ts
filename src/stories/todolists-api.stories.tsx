import React, {useEffect, useState} from "react";
import axios from "axios";

export default {
    title:'API',
}
const settings={
    withCredentials:true
}
export const getTodolists=()=>{
    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
            .then(resolve=>{
                setState(resolve.data)
            })
    },[])
    return <div>{JSON.parse(state)}</div>
}
export const addTodolists=()=>{
    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        let promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists','text',settings)
            .then(resolve=>{
                setState(resolve.data)
            })
    },[])
    return <div>{JSON.parse(state)}</div>
}




