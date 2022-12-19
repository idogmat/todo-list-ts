import React, {useEffect} from "react";
import FullInput from "../common/FullInput";
import {BtnStyle} from "../../style/elements";
import s from '../style.module.css'
import EditableTitle from "../common/EditTitle";
import {Task} from "../Tasks/Task";
import {TaskType} from "../../store/tasks-reducer";
import {RequestStatusType} from "../../store/app-reducer";
import {FilterValuesType} from "../../store/todolists-reducer";

type FilterType = 'all' | 'active' | 'completed'


export type TodolistType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    error: boolean
    filter: FilterType
    todolistInput: string
    entityStatus:RequestStatusType


    setFilterType: (todoListId: string, filter: FilterValuesType) => void
    onChangedTodolistInput: (todoListId: string, text: string) => void
    changeFieldTodolistTitle: (todoListId: string, text: string) => void
    removeTodoList: (todoListId: string) => void

    changeTaskTitle: (todoListId: string, id: string, text: string) => void
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeStatus: (todolistId: string, id: string, b: TaskType) => void

    fetchTasksTC:(s:string)=>void

}
const TodoList =React.memo ((props: TodolistType) => {
    // console.log(props.todolistId,'test')
    //preload-tasks
    useEffect(()=>{
        props.fetchTasksTC(props.todolistId)
    },[props.todolistId])
    const selectFilter = ( todoListId: string,filter: FilterType) => {
        props.setFilterType(todoListId, filter)
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
                <EditableTitle entityStatus={props.entityStatus} title={props.title} callBack={changeTodoListTitle}></EditableTitle>
                <BtnStyle disabled={props.entityStatus === 'loading'} onClick={() => props.removeTodoList(props.todolistId)}>Remove</BtnStyle>
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
                                entityStatus={el.entityStatus}
                    />
                })}</ul> :
                <p>Your list is empty</p>}
            <div className={s.sort}>
                <BtnStyle className={(props.filter === 'all') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter( props.todolistId,'all')}>All</BtnStyle>
                <BtnStyle className={(props.filter === 'active') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter( props.todolistId,'active')}>Active</BtnStyle>
                <BtnStyle className={(props.filter === 'completed') ? s.activeFilterBtn : ''}
                          onClick={() => selectFilter( props.todolistId,'completed')}>Completed</BtnStyle>
            </div>

        </div>
    )
})

export default TodoList
