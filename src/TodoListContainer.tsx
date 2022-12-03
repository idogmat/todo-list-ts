import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import {connect} from "react-redux";
import {AppStateType} from "./store/store";
import {
    addTask,  changeStatusTitleTC,
    changeTaskStatus,
    changeTaskTitle, changeTaskTitleTC,
    deleteTaskTC,
    fetchTasksTC,
    addTaskTC,
    removeTask, TaskType,
} from "./store/tasks-reducer";
import {
    addTodoList,
    changeFieldTodolistTitle,
    changeTodoListFilter,
    changeTodoListInput,
    fetchTodolist,
    removeTodoList
} from "./store/todolists-reducer";

export type FilterValuesType = 'all' | 'completed' | 'active'

type MapDispatchType = {

    removeTask: (taskId: string, todoListId: string) => void,
    addTodoList: (text: string) => void,
    removeTodoList: (todoListId: string) => void
    fetchTodolist:()=>void
    changeTodoListFilter: (id: string, type: FilterValuesType) => void
    changeFieldTodolistTitle: (todoListId: string, text: string) => void
    changeTodoListInput: (todoListId: string, text: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, text: string) => void


    addTaskTC: (todoListId: string, text: string) => void,
    fetchTasksTC:(s:string)=>void
    deleteTaskTC:(s:string,d:string)=>void
    changeTaskTitleTC:(todoListId: string, taskId: string, text: string) => void
    changeStatusTitleTC:(todoListId: string, taskId: string, text: TaskType) => void
}

const TodoListComponent = (props: AppStateType & MapDispatchType) => {
    //preload-list
    useEffect(()=>{
        props.fetchTodolist()
    },[])
    //tasks
    const addTask = useCallback((todoListId: string, text: string) => {
        props.addTaskTC(todoListId, text)
    },[])
    const removeTask = useCallback((todoListId: string,id: string) => {
        props.deleteTaskTC(todoListId,id)
    },[])
    const changeStatus = useCallback((todoListId: string, id: string, task: TaskType,) => {
        props.changeStatusTitleTC(todoListId, id, task)
    },[])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, text: string) => {
        props.changeTaskTitleTC(todoListId, taskId, text)
    },[])

    //todolist
    const onChangedTodolistInput = useCallback((todoListId: string, text: string) => {
        props.changeTodoListInput(todoListId, text)
    },[])
    const addTodo = useCallback((title: string) => {
        props.addTodoList(title)
    },[])
    const setFilterType = useCallback((todoListId: string, filter: FilterValuesType) => {
        props.changeTodoListFilter(todoListId, filter)
    },[])
    const removeTodoList = useCallback((todoListId: string) => {
        props.removeTodoList(todoListId)
    }, [])
    const changeFieldTodolistTitle = useCallback((todoListId: string, newText: string) => {
        props.changeFieldTodolistTitle(todoListId, newText)
    }, [])


    return (
        <>
            <AddItemForm addTodo={addTodo}/>
            <hr/>
            <div className="App">
                <div className={'container'}>
                    {!!props.todolists
                        ? props.todolists.map((tl) => {
                            let allTasks = props.tasks[tl.id]
                            return <TodoList key={tl.id}
                                             title={tl.title}
                                             id={tl.id}
                                             tasks={allTasks}
                                             todolistInput={tl.text}
                                             error={tl.error}
                                             filter={tl.filter}
                                             removeTask={removeTask}
                                             setFilterType={setFilterType}
                                             changeStatus={changeStatus}
                                             removeTodoList={removeTodoList}
                                             addTask={addTask}
                                             onChangedTodolistInput={onChangedTodolistInput}
                                             changeFieldTodolistTitle={changeFieldTodolistTitle}
                                             changeTaskTitle={changeTaskTitle}
                                             fetchTasksTC={props.fetchTasksTC}
                            />
                        })
                        : <div></div>
                    }
                </div>
            </div>
        </>
    );
}

function mapStateToProps(state: AppStateType) {
    return {
        tasks: state.tasks,
        todolists: state.todolists
    }
}

const TodoListContainer = connect(mapStateToProps, {
    addTask,
    changeTaskStatus,
    removeTask,
    addTodoList,
    removeTodoList,
    changeTodoListInput,
    changeTodoListFilter,
    changeFieldTodolistTitle,
    changeTaskTitle,fetchTodolist,
    fetchTasksTC,
    deleteTaskTC,addTaskTC,changeTaskTitleTC,
    changeStatusTitleTC

})(TodoListComponent);
export default React.memo(TodoListContainer)