import React from "react";
export type PropsType = {
    id:number
    title: string
    isDone:boolean
}
export type TaskType={
    title?:string
    tasks:Array<PropsType>
    removeTask:Function
    setFilterType:Function
    addTasks:Function
}
const TodoList=(props:TaskType)=>{

    const taskList=props.tasks.map((el:PropsType)=>{
        return <li key={el.id}><input type="checkbox"
                          checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={()=>props.removeTask(el.id)}>x</button>
        </li>
    })
    let text:any = React.createRef()

    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input ref={text}/>
                <button onClick={()=>props.addTasks(text.current.value)}>+</button>
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