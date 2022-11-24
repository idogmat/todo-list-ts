import React from "react";
import FullInput from "./FullInput";
import {BtnStyle} from "../style/elements";
import s from './style.module.css'
import {FilterValuesType} from "../TodoListContainer";
import EditableTitle from "./EditTitle";
import {Task} from "./Task";

type FilterType = 'all' | 'active' | 'completed'


export type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>

    setFilterType: (id: string, f: FilterValuesType) => void
    onChangedTodolistInput: (todoListId: string, text: string) => void
    changeFieldTodolistTitle: (todoListId: string, text: string) => void
    changeTaskTitle: (t: string, id: string, text: string) => void

    addTask: (todoListId: string, text: string) => void
    removeTask: (el: string, id: string) => void
    changeStatus: (a: string, c: string, b: boolean) => void
    todolistInput: string

    error: boolean
    removeTodoList: (s: string) => void
    filter: FilterType


}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList =React.memo ((props: TodolistType) => {
    const selectFilter = (filter: FilterType, id: string) => {
        props.setFilterType(id, filter)
    }
    const changeTodoListTitle = (text: string) => {
        props.changeFieldTodolistTitle(props.id, text)
    }
    let tasksForTodolist = props.tasks;
    if (props.filter === 'completed') {
        tasksForTodolist= props.tasks.filter((el: TaskPropsType) => el.isDone === true)
    } else if (props.filter === 'active') {
        tasksForTodolist= props.tasks.filter((el: TaskPropsType) => el.isDone === false)
    }
    return (
        <div className={s.todolishka}>
            <div className={s.flex}>
                <EditableTitle title={props.title} callBack={changeTodoListTitle}></EditableTitle>
                <BtnStyle onClick={() => props.removeTodoList(props.id)}>Remove</BtnStyle>
            </div>
            <FullInput addTasks={props.addTask}
                       todolistInput={props.todolistInput}
                       onChangedTodolistInput={props.onChangedTodolistInput}
                       error={props.error}
                       id={props.id}
            />
            {props.error && <div className={s.errorMessage}>Field is required</div>}

            {props.tasks.length ?
                <ul>{tasksForTodolist.map((el: TaskPropsType) => {
                   return <Task key={el.id} task={el}
                          todolistId={props.id}
                          removeTask={props.removeTask}
                          changeTaskTitle={props.changeTaskTitle}
                          changeStatus={props.changeStatus}
                    />
                })}</ul> :
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
})

export default TodoList
