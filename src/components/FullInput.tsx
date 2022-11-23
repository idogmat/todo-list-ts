import React from "react";
import Button from "./Button";
import {Input} from "../style/elements";
import s from './style.module.css'
type InputProps={
    addTasks:(todoListId: string,text: string) =>void
    taskTitle:string
    onChangedTodolistInput:(todoListId:string,text:string)=>void
    error:boolean
    id:string
}

const FullInput=(props:InputProps)=>{
    const changeInput=(text:string)=>{
        props.onChangedTodolistInput(props.id,text)
        if(props.taskTitle !== '' || props.taskTitle.trim() !== '') {

        }
    }
    const addTask=()=>{
        if(props.taskTitle === '' || props.taskTitle.trim() === ''){
        } else {
            props.addTasks(props.id,props.taskTitle)
            props.onChangedTodolistInput(props.id,'')
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