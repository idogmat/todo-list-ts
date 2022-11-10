import React from "react";
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
    return <div>
            <input
                   value={props.taskTitle}
                   onChange={(e)=>changeInput(e.currentTarget.value)}
                   onKeyDown={(e)=>e.key==="Enter" && addTask()}
            />
            <button onClick={addTask}>+</button>
        </div>
}
export default FullInput