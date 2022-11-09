import React from "react";
import FullInput from "./FullInput";

export type TaskType={
    title:string
    tasks:Array<PropsType>
    removeTask:Function
    setFilterType:Function
    addTasks:Function
    changeStatus:Function
    taskTitle:string
    changeTaskTitle:Function

}
export type PropsType = {
    id:number
    title: string
    isDone:boolean
}
const TodoList=(props:TaskType)=>{

    const taskList=props.tasks.map((el:PropsType)=>{
        return <li key={el.id}><input onClick={()=>props.changeStatus(el.id)} type="checkbox"
                          checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={()=>props.removeTask(el.id)}>x</button>
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
            <ul>
                {taskList}
            </ul>
            <div>
                <button onClick={()=>props.setFilterType('all')}>All</button>
                <button onClick={()=>props.setFilterType('active')}>Active</button>
                <button onClick={()=>props.setFilterType('completed')}>Completed</button>
            </div>
        </div>
    )
}
export default  TodoList