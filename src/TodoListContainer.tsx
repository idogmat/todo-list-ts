import React from 'react';
import './App.css';
import TodoList, {PropsType} from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import {connect} from "react-redux";
import {AppStateType} from "./store/store";
import {
    addTask,
    changeTaskStatus, changeTaskTitle,
    removeTask,
} from "./store/tasks-reducer";
import {
    addTodoList, changeFieldTodolistTitle,
    changeTodoListFilter, changeTodoListInput,
    removeTodoList,
} from "./store/todulists-reducer";

export type FilterValuesType = 'all' | 'completed' | 'active'

type MapDispatchType = {
    addTask: (todoListId: string, text: string) => void,
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean,) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    addTodoList: (text: string) => void,
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (id: string, type: FilterValuesType) => void
    changeFieldTodolistTitle: (todoListId: string, text: string) => void
    changeTodoListInput: (todoListId: string, text: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, text: string) => void
}

const TodoListComponent = (props: AppStateType & MapDispatchType) => {
    //tasks
    const addTask = (todoListId: string, text: string) => {
        props.addTask(todoListId, text)
    }

    function removeTask(id: string, todoListId: string) {
        props.removeTask(id, todoListId)
    }

    const changeStatus = (todoListId: string, id: string, isDone: boolean,) => {
        props.changeTaskStatus(todoListId, id, isDone,)
    }
    const changeTaskTitle = (todoListId: string, taskId: string, text: string) => {
        props.changeTaskTitle(todoListId, taskId, text)
    }
    //todolist
    const onChangedTodolistInput = (todoListId: string, text: string) => {
        props.changeTodoListInput(todoListId, text)
    }
    const addTodo = (title: string) => {
        props.addTodoList(title)
    }
    const setFilterType = (todoListId: string, filter: FilterValuesType) => {
        props.changeTodoListFilter(todoListId, filter)
    }
    const removeTodoList = (todoListId: string) => {
        props.removeTodoList(todoListId)
    }
    const changeFieldTodolistTitle = (todoListId: string, newText: string) => {
        props.changeFieldTodolistTitle(todoListId, newText)
    }
    return (
        <>
            <AddItemForm addTodo={addTodo}/>
            <hr/>
            <div className="App">
                <div className={'container'}>
                    {!!props.todolists
                        ? props.todolists.map((tl) => {
                            const getTodoList = () => {
                                if (tl.filter === 'completed') {
                                    return props.tasks[tl.id].filter((el: PropsType) => el.isDone === true)
                                } else if (tl.filter === 'active') {
                                    return props.tasks[tl.id].filter((el: PropsType) => el.isDone === false)
                                } else {
                                    return [...props.tasks[tl.id]]
                                }
                            }
                            let tasksForTodoList = getTodoList()
                            return <TodoList key={tl.id} title={tl.title} tasks={tasksForTodoList}
                                             removeTask={removeTask}
                                             setFilterType={setFilterType}
                                             changeStatus={changeStatus}
                                             removeTodoList={removeTodoList}
                                             addTask={addTask}
                                             onChangedTodolistInput={onChangedTodolistInput}
                                             changeFieldTodolistTitle={changeFieldTodolistTitle}
                                             changeTaskTitle={changeTaskTitle}
                                             taskTitle={tl.text}
                                             error={tl.error}
                                             filter={tl.filter}
                                             id={tl.id}

                                             // setError={changeError}

                                // changeTodoListTitle={changeTodoListTitle}


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
    changeTaskTitle

})(TodoListComponent);
export default TodoListContainer