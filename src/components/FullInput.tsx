import React from "react";

const FullInput=(props:any)=>{


    let text:any = React.createRef()
    const changeTitle=()=>{
        props.changeTaskTitle(text.current.value)
        // props.changeTaskTitle(e.currentTarget.value)
    }
    const addPost=()=>{
        props.addTasks()
    }
    return <div>
            <input ref={text}
                   value={props.taskTitle}
                   onChange={changeTitle}
            />
            <button onClick={addPost}>+</button>
        </div>
}
export default FullInput