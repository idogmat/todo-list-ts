import React from "react";
import FullInput from "./FullInput";
import {BtnStyle, HiddenCheckbox} from "../style/elements";
import s from './style.module.css'
import {FilterValuesType} from "../App";
import EditableTitle from "./EditTitle";

type FilterType = 'all' | 'active' | 'completed'


export type TaskType = {
    id: string
    title: string
    tasks: Array<PropsType>
    removeTask: (el: string, id: string) => void
    setFilterType: (s: FilterValuesType, i: string) => void
    addTasks: (text: string, todoListId: string) => void
    changeStatus: (a: string, b: boolean, c: string) => void
    taskTitle: string
    changeTaskTitle: (text: string, id: string) => void
    error: boolean
    setError: (b: boolean, id: string) => void
    removeTodoList: (s: string) => void
    filter: FilterType
    onChangeEditTitleFromTask: (a: string, b: string, c: string) => void
    changeTodoListTitle: (a: string, b: string) => void

}
export type PropsType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TaskType) => {
    const selectFilter = (text: FilterType, id: string) => {
        props.setFilterType(text, id)
    }
    const changeTodoListTitle = (text: string) => {
        props.changeTodoListTitle(props.id, text)
    }
    const taskList = props.tasks.map((el: PropsType) => {
        const removeTask = () => {
            props.removeTask(el.id, props.id)
        }
        const onChangeEditTitle = (title: string) => {
            props.onChangeEditTitleFromTask(el.id, title, props.id)
        }

        return <li className={el.isDone ? s.done : ''} key={el.id}><HiddenCheckbox
            onChange={(e) => props.changeStatus(el.id, e.currentTarget.checked, props.id)}
            type="checkbox"
            checked={el.isDone}
        />
            <EditableTitle title={el.title} onChangeEditTitle={onChangeEditTitle}/>
            <BtnStyle onClick={removeTask}>x</BtnStyle>
        </li>
    })
    return (
        <div className={s.todolishka}>
            <div className={s.flex}>
                <EditableTitle title={props.title} onChangeEditTitle={changeTodoListTitle}></EditableTitle>
                <BtnStyle onClick={() => props.removeTodoList(props.id)}>Remove</BtnStyle>
            </div>
            <FullInput addTasks={props.addTasks}
                       taskTitle={props.taskTitle}
                       changeTaskTitle={props.changeTaskTitle}
                       error={props.error}
                       setError={props.setError}
                       id={props.id}
            />
            {props.error && <div className={s.errorMessage}>Field is required</div>}

            {props.tasks.length ?
                <ul>{taskList}</ul> :
                <p>Your list is empty</p>}
            <div className={s.sort}>
                <BtnStyle className={(props.filter === 'all') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter('all', props.id)}>All</BtnStyle>
                <BtnStyle className={(props.filter === 'active') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter('active', props.id)}>Active</BtnStyle>
                <BtnStyle className={(props.filter === 'completed') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter('completed', props.id)}>Completed</BtnStyle>
            </div>

        </div>
    )
}

export default TodoList