import React from "react";
import Button from "./Button";
import {Input} from "../style/elements";
import s from './style.module.css'
type InputProps={
    addTasks:()=>void
    taskTitle:string
    changeTaskTitle:(text:string)=>void
}

const FullInput=(props:InputProps)=>{

    const changeInput=(text:string)=>{
        props.changeTaskTitle(text)
    }
    const addTask=()=>{
        if(props.taskTitle === ''){

        }else {
            props.addTasks()
        }
    }
    return <div className={s.inputBlock}>
            <Input
                   value={props.taskTitle}
                   onChange={(e:any)=>changeInput(e.currentTarget.value)}
                   onKeyDown={(e:any)=>e.key==="Enter" && addTask()}
            />
            <Button callBack={addTask}/>
        </div>
}
export default FullInput