import React, {useState} from "react";
import {Input, TodoTitle} from "../style/elements";

type EditableTitle={
    title:string
    onChangeEditTitle:(s:string)=>void

}
const EditableTitle=(props:EditableTitle)=>{
    let [editOption,setEditOption]=useState(false)
    let [title,setTitle]=useState(props.title)
    const activateEditMode=()=> {
        setEditOption(true)
        setTitle(props.title)
    }
    const activateViewMode=()=> {
        setEditOption(false)
        props.onChangeEditTitle(title)
    }
    const onChangeTitleHandler=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return editOption
        ? <Input
            onBlur={activateViewMode}
            value={title}
            onChange={onChangeTitleHandler}
            autoFocus/>
        :<TodoTitle onDoubleClick={activateEditMode}>{props.title}</TodoTitle>
}
export default EditableTitle