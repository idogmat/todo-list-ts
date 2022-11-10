import React from "react";
import FullInput from "./FullInput";

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

            <span>{el.title}</span>
            <button onClick={removeTask}>x</button>
        </li>
    })
    return(
        <div>
            <h3>{props.title}</h3>
            <FullInput addTasks={props.addTasks}
                       taskTitle={props.taskTitle}
                       changeTaskTitle={props.changeTaskTitle}/>
            <div>

            </div>
                {props.tasks.length ?
                    <ul>{taskList}</ul> :
                    <p>Your list is empty</p>}
            <div>
                <button onClick={()=>selectFilter('all')}>All</button>
                <button onClick={()=>selectFilter('active')}>Active</button>
                <button onClick={()=>selectFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
export default  TodoList