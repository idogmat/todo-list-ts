import React from "react";
import FullInput from "./FullInput";
import {BtnStyle} from "../style/elements";
import s from './style.module.css'



export type TaskType={
    title:string
    tasks:Array<PropsType>
    removeTask:Function
    setFilterType:Function
    addTasks:()=>void
    changeStatus:Function
    taskTitle:string
    changeTaskTitle:(text:string)=>void

}
export type PropsType = {
    id:string
    title: string
    isDone:boolean
}
const TodoList=(props:TaskType)=>{
    const selectFilter=(text:string)=>{
        props.setFilterType(text)
    }
    const taskList=props.tasks.map((el:PropsType)=>{
        const removeTask =()=>{
            props.removeTask(el.id)
        }
        return <li key={el.id}><input
            onClick={() => props.changeStatus(el.id)}
            type="checkbox"
            checked={el.isDone}
            onChange={() => {}}/>

            <p>{el.title}</p>
            <BtnStyle onClick={removeTask}>x</BtnStyle>
        </li>
    })
    return(
        <>
            <h3>{props.title}</h3>
            <FullInput addTasks={props.addTasks}
                       taskTitle={props.taskTitle}
                       changeTaskTitle={props.changeTaskTitle}/>
            <div>

            </div>
                {props.tasks.length ?
                    <ul>{taskList}</ul> :
                    <p>Your list is empty</p>}
            <div className={s.sort}>
                <BtnStyle onClick={()=>selectFilter('all')}>All</BtnStyle>
                <BtnStyle onClick={()=>selectFilter('active')}>Active</BtnStyle>
                <BtnStyle onClick={()=>selectFilter('completed')}>Completed</BtnStyle>
            </div>
        </>
    )
}
export default  TodoList