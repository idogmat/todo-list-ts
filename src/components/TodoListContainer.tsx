import React, {useCallback, useEffect} from 'react';
import '../App.css';
import TodoList from "./Todolists/TodoList";
import AddItemForm from "./common/AddItemForm";
import {connect} from "react-redux";
import {AppStateType} from "../store/store";
import {
    addTaskTC,
    changeStatusTitleTC,
    changeTaskTitleTC,
    deleteTaskTC,
    fetchTasksTC,
    TaskType,
} from "../store/tasks-reducer";
import {
    addTodolistTC,
    changeTodoListFilter,
    changeTodoListInput,
    fetchTodolist,
    FilterValuesType,
    removeTodolistTC,
    TodoListType,
    updateTodolistTitleTC
} from "../store/todolists-reducer";
import {RequestStatusType} from "../store/app-reducer";
import {Skeleton} from "../style/elements";
import Snackbar from "./common/Snackbar";
import {logoutThunk} from "../store/auth-reducer";
import {Navigate, useNavigate} from "react-router-dom";


type MapDispatchType = {
    fetchTodolist: () => void
    changeTodoListFilter: (payload:{todolistId: string, filter: FilterValuesType}) => void
    changeTodoListInput: (payload:{ todolistId: string, text: string }) => void
    updateTodolistTitleTC: (todolistId: string, title: string) => void
    addTodolistTC: (title: string) => void
    logoutThunk: () => void
    addTaskTC: (todolistId: string, title: string) => any,
    deleteTaskTC: (todolistId: string, taskId: string) => any
    fetchTasksTC: (s: string) => any
    changeTaskTitleTC: (todolistId: string, taskId: string, title: string) => any
    changeStatusTitleTC: (todolistId: string, taskId: string, text: TaskType) => any
    removeTodolistTC: (todolistId: string) => void
    appStatus: { status: RequestStatusType }

}

const TodoListComponent = (props: AppStateType & MapDispatchType):any => {
    //preload-list
    useEffect(() => {
            props.fetchTodolist()
    }, [])
    //tasks
    const addTask = useCallback((todolistId: string, title: string) => {
        props.addTaskTC(todolistId, title)
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        props.deleteTaskTC(todolistId,taskId)
    }, [])
    const changeStatus = useCallback((todolistId: string, id: string, task: TaskType,) => {
        props.changeStatusTitleTC(todolistId, id, task)
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, text: string) => {
        props.changeTaskTitleTC(todolistId, taskId, text)
    }, [])

    //todolist
    const onChangedTodolistInput = useCallback((todolistId: string, text: string) => {
        props.changeTodoListInput({todolistId, text})
    }, [])
    const addTodo = useCallback((title: string) => {
        props.addTodolistTC(title)
    }, [])
    const setFilterType = useCallback((todolistId: string, filter: FilterValuesType) => {
        props.changeTodoListFilter({todolistId, filter})
    }, [])
    const removeTodoList = useCallback((todolistId: string) => {
        props.removeTodolistTC(todolistId)
    }, [])
    const changeFieldTodolistTitle = useCallback((todolistId: string, newText: string) => {
        props.updateTodolistTitleTC(todolistId, newText)
    }, [])
    const logout = () => {
        props.logoutThunk()
    }
    if (!props.auth.isLoggedIn) {
        return <Navigate to={'/login'}/>
    } else {
        return <>
            <Snackbar status={props.appStatus.status} error={props.appStatus.error}/>
            <AddItemForm logout={logout} addTodo={addTodo}/>
            {
                props.appStatus.status === 'loading'

                    ? <Skeleton/>
                    : <hr/>
            }
            <div className="App">
                <div className={'container'}>
                    {!!props.todolists
                        ? props.todolists.map((tl: TodoListType) => {
                            let allTasks = props.tasks[tl.id]
                            return <TodoList key={tl.id}
                                             title={tl.title}
                                             entityStatus={tl.entityStatus}
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
    }
}

function mapStateToProps(state: AppStateType) {
    return {
        tasks: state.tasks,
        todolists: state.todolists,
        appStatus: state.appStatus,
        auth: state.auth
    }
}

const TodoListContainer = connect(mapStateToProps, {
    changeTodoListInput,
    changeTodoListFilter,
    fetchTodolist,
    fetchTasksTC,
    deleteTaskTC, addTaskTC, changeTaskTitleTC,
    changeStatusTitleTC, addTodolistTC,
    removeTodolistTC, updateTodolistTitleTC,
    logoutThunk
})(TodoListComponent);
export default React.memo(TodoListContainer)