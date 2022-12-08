import React, {useEffect} from "react";
import FullInput from "./FullInput";
import {BtnStyle} from "../style/elements";
import s from './style.module.css'
import {FilterValuesType} from "../TodoListContainer";
import EditableTitle from "./EditTitle";
import {Task} from "./Task";
import {TaskStatusType, TaskType} from "../store/tasks-reducer";

type FilterType = 'all' | 'active' | 'completed'


export type TodolistType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    error: boolean
    filter: FilterType
    todolistInput: string

    setFilterType: (todoListId: string, filter: FilterValuesType) => void
    onChangedTodolistInput: (todoListId: string, text: string) => void
    changeFieldTodolistTitle: (todoListId: string, text: string) => void
    removeTodoList: (todoListId: string) => void

    changeTaskTitle: (todoListId: string, id: string, text: string) => void
    addTask: (todoListId: string, text: string) => void
    removeTask: (todoListId: string, id: string) => void
    changeStatus: (todoListId: string, id: string, b: TaskType) => void

    fetchTasksTC:(s:string)=>void

}
const TodoList =React.memo ((props: TodolistType) => {
    //preload-tasks
    useEffect(()=>{
        props.fetchTasksTC(props.todolistId)
    },[])
    const selectFilter = (filter: FilterType, id: string) => {
        props.setFilterType(id, filter)
    }
    const changeTodoListTitle = (text: string) => {
        if(props.title !== text) props.changeFieldTodolistTitle(props.todolistId, text)
    }
    let tasksForTodolist = props.tasks;

    if (props.filter === 'completed') {
        tasksForTodolist= props.tasks.filter((el: TaskType) => el.status)
    } else if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter((el: TaskType) => !el.status)
    }
    return (
        <div className={s.todolishka}>
            <div className={s.flex}>
                <EditableTitle title={props.title} callBack={changeTodoListTitle}></EditableTitle>
                <BtnStyle onClick={() => props.removeTodoList(props.todolistId)}>Remove</BtnStyle>
            </div>
            <FullInput addTasks={props.addTask}
                       todolistInput={props.todolistInput}
                       onChangedTodolistInput={props.onChangedTodolistInput}
                       error={props.error}
                       todolistId={props.todolistId}
            />
            {props.error && <div className={s.errorMessage}>Field is required</div>}

            {props.tasks.length ?
                <ul>{tasksForTodolist.map((el: TaskType) => {
                   return <Task key={el.id} task={el}
                          todolistId={props.todolistId}
                          removeTask={props.removeTask}
                          changeTaskTitle={props.changeTaskTitle}
                          changeStatus={props.changeStatus}
                    />
                })}</ul> :
                <p>Your list is empty</p>}
            <div className={s.sort}>
                <BtnStyle className={(props.filter === 'all') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter('all', props.todolistId)}>All</BtnStyle>
                <BtnStyle className={(props.filter === 'active') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter('active', props.todolistId)}>Active</BtnStyle>
                <BtnStyle className={(props.filter === 'completed') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter('completed', props.todolistId)}>Completed</BtnStyle>
            </div>

        </div>
    )
})

export default TodoList
