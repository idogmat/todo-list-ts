import React, {useCallback} from "react";
import s from "./style.module.css";
import {BtnStyle, HiddenCheckbox} from "../style/elements";
import EditableTitle from "./EditTitle";
import {TaskPropsType} from "./TodoList";

type TaskElementType = {
    task: TaskPropsType
    todolistId: string
    changeTaskTitle: (t: string, id: string, text: string) => void
    removeTask: (el: string, id: string) => void
    changeStatus: (a: string, c: string, b: boolean) => void
}
export const Task = React.memo((props: TaskElementType) => {

    const removeTask = useCallback(() => {
        props.removeTask(props.todolistId, props.task.id)
    }, [props.todolistId, props.task.id])

    const onChangeEditTitle = useCallback((text: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, text)
    }, [props.todolistId, props.task.id])

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }, [props.todolistId, props.task.id])

    return <li className={props.task.isDone ? s.done : ''} key={props.task.id}><HiddenCheckbox
        onChange={(e) => onInputChange(e)}
        type="checkbox"
        checked={props.task.isDone}
    />
        <EditableTitle title={props.task.title} callBack={onChangeEditTitle}/>
        <BtnStyle onClick={removeTask}>x</BtnStyle>
    </li>
})