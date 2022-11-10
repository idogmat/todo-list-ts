import React, {useState} from "react";

const FullInput=(props:any)=>{

    const changeInput=(text:any)=>{
        props.changeTaskTitle(text)
    }
    const addTask=()=>{
        props.addTasks()
    }
    return <div>
            <input
                   value={props.taskTitle}
                   onChange={(e)=>changeInput(e.currentTarget.value)}
            />
            <button onClick={addTask}>+</button>
        </div>
}
export default FullInput