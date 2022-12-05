import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import {connect} from "react-redux";
import {AppStateType} from "./store/store";
import {
    addTaskTC,
    changeStatusTitleTC,

    changeTaskTitleTC,
    deleteTaskTC,
    fetchTasksTC,
    TaskType,
} from "./store/tasks-reducer";
import {
    addTodolistTC,
    changeTodoListFilter,
    changeTodoListInput,
    fetchTodolist,
    removeTodolistTC,
    updateTodolistTitleTC
} from "./store/todolists-reducer";

export type FilterValuesType = 'all' | 'completed' | 'active'

type MapDispatchType = {
    fetchTodolist: () => void
    changeTodoListFilter: (id: string, type: FilterValuesType) => void
    changeTodoListInput: (todoListId: string, text: string) => void

    addTaskTC: (todoListId: string, title: string) => void,
    fetchTasksTC: (s: string) => void
    deleteTaskTC: (s: string, d: string) => void
    changeTaskTitleTC: (todoListId: string, taskId: string, title: string) => void
    changeStatusTitleTC: (todoListId: string, taskId: string, text: TaskType) => void
    updateTodolistTitleTC: (todoListId: string, title: string) => void
    addTodolistTC: (title: string) => void
    removeTodolistTC: (todolistId: string) => void
}

const TodoListComponent = (props: AppStateType & MapDispatchType) => {
    //preload-list
    useEffect(() => {
        props.fetchTodolist()
    }, [])
    //tasks
    const addTask = useCallback((todoListId: string, title: string) => {
        props.addTaskTC(todoListId, title)
    }, [])
    const removeTask = useCallback((todoListId: string, id: string) => {
        props.deleteTaskTC(todoListId, id)
    }, [])
    const changeStatus = useCallback((todoListId: string, id: string, task: TaskType,) => {
        props.changeStatusTitleTC(todoListId, id, task)
    }, [])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, text: string) => {
        props.changeTaskTitleTC(todoListId, taskId, text)
    }, [])

    //todolist
    const onChangedTodolistInput = useCallback((todoListId: string, text: string) => {
        props.changeTodoListInput(todoListId, text)
    }, [])
    const addTodo = useCallback((title: string) => {
        props.addTodolistTC(title)
    }, [])
    const setFilterType = useCallback((todoListId: string, filter: FilterValuesType) => {
        props.changeTodoListFilter(todoListId, filter)
    }, [])
    const removeTodoList = useCallback((todoListId: string) => {
        props.removeTodolistTC(todoListId)
    }, [])
    const changeFieldTodolistTitle = useCallback((todoListId: string, newText: string) => {
        props.updateTodolistTitleTC(todoListId, newText)
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
                                             todolistId={tl.id}
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
    changeTodoListInput,
    changeTodoListFilter,

    fetchTodolist,
    fetchTasksTC,
    deleteTaskTC, addTaskTC, changeTaskTitleTC,
    changeStatusTitleTC, addTodolistTC,
    removeTodolistTC, updateTodolistTitleTC

})(TodoListComponent);
export default React.memo(TodoListContainer)