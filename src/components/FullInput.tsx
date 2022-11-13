import React from "react";
import Button from "./Button";
import {Input} from "../style/elements";
import s from './style.module.css'
type InputProps={
    addTasks:(text:string,todoListId:string)=>void
    taskTitle:string
    changeTaskTitle:(text:string,id:string)=>void
    error:boolean
    setError:(b:boolean,id:string)=>void
    id:string
}

const FullInput=(props:InputProps)=>{

    const changeInput=(text:string)=>{
        props.changeTaskTitle(text,props.id)
        if(props.taskTitle !== '' || props.taskTitle.trim() !== '') {
            props.setError(false,props.id)
        }
    }
    const addTask=()=>{
        if(props.taskTitle === '' || props.taskTitle.trim() === ''){
            props.setError(true,props.id)
        } else {
            props.setError(false,props.id)
            props.addTasks(props.taskTitle,props.id)
            props.changeTaskTitle('',props.id)
        }
    }
    return <div className={s.inputBlock}>
            <Input
                   value={props.taskTitle}
                   onChange={(e:any)=>changeInput(e.currentTarget.value)}
                   onKeyDown={(e:any)=>e.key==="Enter" && addTask()}
                   className={props.error ? s.inputError : ''}
            />
            <Button callBack={addTask}/>
        </div>
}
export default FullInput