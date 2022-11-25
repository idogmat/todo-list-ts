import React, {ChangeEvent, useCallback} from "react";
import Button from "./Button";
import {Input} from "../style/elements";
import s from './style.module.css'
type InputProps={
    addTasks:(todoListId: string,text: string) =>void
    todolistInput:string
    onChangedTodolistInput:(todoListId:string,text:string)=>void
    error:boolean
    id:string
}

const FullInput=(props:InputProps)=>{
    const changeInput=useCallback((text:string)=>{
        props.onChangedTodolistInput(props.id,text)
        if(props.todolistInput !== '' || props.todolistInput.trim() !== '') {

        }
    },[props.id])
    const addTask=useCallback(()=>{
        if(props.todolistInput === '' || props.todolistInput.trim() === ''){
        } else {
            props.addTasks(props.id,props.todolistInput)
            props.onChangedTodolistInput(props.id,'')
        }
    },[props.id,props.todolistInput])
    return <div className={s.inputBlock}>
            <Input
                   value={props.todolistInput}
                   onChange={(e:ChangeEvent<HTMLInputElement>)=>changeInput(e.currentTarget.value)}
                   onKeyDown={(e:any)=>e.key==="Enter" && addTask()}
                   className={props.error ? s.inputError : ''}
            />
            <Button callBack={addTask}/>
        </div>
}
export default FullInput