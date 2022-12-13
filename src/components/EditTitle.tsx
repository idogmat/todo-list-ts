import React, {useEffect, useState} from "react";
import {Input, TodoTitle} from "../style/elements";
import {RequestStatusType} from "../store/app-reducer";

type EditableTitleType={
    title:string
    callBack:(a:string)=>void
    entityStatus:RequestStatusType
}
const EditableTitle=React.memo((props:EditableTitleType)=>{
    let [editOption,setEditOption]=useState(false)
    let [title,setTitle]=useState(props.title)
    const activateEditMode=()=> {
        if (props.entityStatus !== 'loading') {
            setEditOption(true)
            setTitle(props.title)
        }
    }
    const activateViewMode=()=> {
        if (props.entityStatus !== 'loading') {
            setEditOption(false)
            props.callBack(title)
        }
    }
    const onChangeTitleHandler=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return editOption
        ? <Input
            size={'2rem'}
            onBlur={activateViewMode}
            value={title}
            onChange={onChangeTitleHandler}
            autoFocus/>
        :<TodoTitle onDoubleClick={activateEditMode}>{props.title}</TodoTitle>
})
export default EditableTitle