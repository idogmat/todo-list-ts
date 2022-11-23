import React from "react";
import FullInput from "./FullInput";
import {BtnStyle, HiddenCheckbox} from "../style/elements";
import s from './style.module.css'
import {FilterValuesType} from "../TodoListContainer";
import EditableTitle from "./EditTitle";

type FilterType = 'all' | 'active' | 'completed'


export type TaskType = {
    id: string
    title: string
    tasks: Array<PropsType>
    removeTask: (el: string, id: string) => void
    setFilterType: (id:string , f: FilterValuesType) => void
    addTask: (todoListId: string,text: string ) => void
    changeStatus: (a: string, c: string,b: boolean ) => void
    onChangedTodolistInput: (todoListId:string,text:string)=> void
    changeFieldTodolistTitle:(todoListId:string,text:string)=>void
    changeTaskTitle: (t: string,id: string,text: string ) => void


    taskTitle: string
    error: boolean
    removeTodoList: (s: string) => void
    filter: FilterType


}
export type PropsType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TaskType) => {
    const selectFilter = (filter: FilterType, id: string) => {
        props.setFilterType(id ,filter)
    }
    const changeTodoListTitle = (text: string) => {
        props.changeFieldTodolistTitle(props.id, text)
    }
    const taskList = props.tasks.map((el: PropsType) => {
        const removeTask = () => {
            props.removeTask(el.id, props.id)
        }
        const onChangeEditTitle = (text: string) => {
            props.changeTaskTitle( props.id, el.id, text)
        }

        return <li className={el.isDone ? s.done : ''} key={el.id}><HiddenCheckbox
            onChange={(e) => props.changeStatus(props.id, el.id, e.currentTarget.checked, )}
            type="checkbox"
            checked={el.isDone}
        />
            <EditableTitle title={el.title} callBack={onChangeEditTitle}/>
            <BtnStyle onClick={removeTask}>x</BtnStyle>
        </li>
    })
    return (
        <div className={s.todolishka}>
            <div className={s.flex}>
                <EditableTitle title={props.title} callBack={changeTodoListTitle}></EditableTitle>
                <BtnStyle onClick={() => props.removeTodoList(props.id)}>Remove</BtnStyle>
            </div>
            <FullInput addTasks={props.addTask}
                       taskTitle={props.taskTitle}
                       onChangedTodolistInput={props.onChangedTodolistInput}
                       error={props.error}
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