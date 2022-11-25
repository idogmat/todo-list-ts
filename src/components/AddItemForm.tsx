import React, {useState} from "react";
import s from "./style.module.css";
import {Input} from "../style/elements";
import Button from "./Button";

type AddItemForm={
    addTodo:(title:string)=>void
}
const AddItemForm=React.memo((props:AddItemForm)=>{
    let [title,setTitle]=useState('')
    let [error,setError]=useState(false)
    const onChangeHandler=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const addNewTodo=()=>{
        if(title === '' || title.trim() === ''){
            setError(true)
        } else {
            // props.setError(false,props.id)
            props.addTodo(title)
            setTitle('')
        }
    }
    return <div >
        <h3>Add new TodoList</h3>
        <div className={s.inputBlock}>
            <Input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={(e:any)=>e.key==="Enter" && addNewTodo()}
                className={error ? s.inputError : ''}
            />
            <Button callBack={addNewTodo}/>
        </div>
    </div>
})
export default AddItemForm