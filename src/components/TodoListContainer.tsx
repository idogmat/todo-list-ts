import React, { useCallback, useEffect } from "react";
import "../App.css";
import TodoList from "./Todolists/TodoList";
import AddItemForm from "./common/AddItemForm";
import { connect } from "react-redux";
import { fetchTasks, TaskType } from "../store/tasks-reducer";
import {
  changeTodoListFilter,
  changeTodoListInput,
  FilterValuesType,
  TodoListType,
} from "../store/todolists-reducer";
import { RequestStatusType } from "../store/app-reducer";
import { Skeleton } from "../style/elements";
import Snackbar from "./common/Snackbar";
import { logoutThunk } from "../store/authThunks";
import { Navigate } from "react-router-dom";
import {
  addTodolist,
  fetchTodolist,
  removeTodolist,
  updateTodolistTitle,
} from "../store/todolistsThunks";
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
} from "../store/tasksThunks";
import { AppStateType } from "../store/type";

type MapDispatchType = {
  fetchTodolist: () => void;
  changeTodoListFilter: (payload: {
    todolistId: string;
    filter: FilterValuesType;
  }) => void;
  changeTodoListInput: (payload: { todolistId: string; text: string }) => void;
  updateTodolistTitle: (todolistId: string, title: string) => void;
  addTodolist: (title: string) => void;
  logoutThunk: () => void;
  addTask: (param: { todolistId: string; title: string }) => any;
  deleteTask: (param: { todolistId: string; taskId: string }) => any;
  fetchTasks: (s: string) => any;
  changeTaskTitle: (param: {
    todolistId: string;
    taskId: string;
    title: string;
  }) => any;
  changeTaskStatus: (param: {
    todolistId: string;
    taskId: string;
    task: TaskType;
  }) => any;
  removeTodolist: (todolistId: string) => void;
  appStatus: { status: RequestStatusType };
};

const TodoListComponent = (props: AppStateType & MapDispatchType): any => {
  //preload-list
  useEffect(() => {
    props.fetchTodolist();
  }, []);
  //tasks
  const addTask = useCallback((todolistId: string, title: string) => {
    props.addTask({ todolistId, title });
  }, []);
  const removeTask = useCallback((todolistId: string, taskId: string) => {
    props.deleteTask({ todolistId, taskId });
  }, []);
  const changeStatus = useCallback(
    (todolistId: string, id: string, task: TaskType) => {
      props.changeTaskStatus({ todolistId, taskId: id, task });
    },
    []
  );
  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      props.changeTaskTitle({ todolistId, taskId, title });
    },
    []
  );

  //todolist
  const onChangedTodolistInput = useCallback(
    (todolistId: string, text: string) => {
      props.changeTodoListInput({ todolistId, text });
    },
    []
  );
  const addTodo = useCallback((title: string) => {
    props.addTodolist(title);
  }, []);
  const setFilterType = useCallback(
    (todolistId: string, filter: FilterValuesType) => {
      props.changeTodoListFilter({ todolistId, filter });
    },
    []
  );
  const removeTodoList = useCallback((todolistId: string) => {
    props.removeTodolist(todolistId);
  }, []);
  const changeFieldTodolistTitle = useCallback(
    (todolistId: string, newText: string) => {
      props.updateTodolistTitle(todolistId, newText);
    },
    []
  );
  const logout = () => {
    props.logoutThunk();
  };
  if (!props.auth.isLoggedIn) {
    return <Navigate to={"/login"} />;
  } else {
    return (
      <>
        <Snackbar
          status={props.appStatus.status}
          error={props.appStatus.error}
        />
        <AddItemForm logout={logout} addTodo={addTodo} />
        {props.appStatus.status === "loading" ? <Skeleton /> : <hr />}
        <div className="App">
          <div className={"container"}>
            {!!props.todolists ? (
              props.todolists.map((tl: TodoListType) => {
                let allTasks = props.tasks[tl.id];
                return (
                  <TodoList
                    key={tl.id}
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
                    fetchTasks={props.fetchTasks}
                  />
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </>
    );
  }
};

function mapStateToProps(state: AppStateType) {
  return {
    tasks: state.tasks,
    todolists: state.todolists,
    appStatus: state.appStatus,
    auth: state.auth,
  };
}

const TodoListContainer = connect(mapStateToProps, {
  changeTodoListInput,
  changeTodoListFilter,
  fetchTodolist,
  fetchTasks,
  deleteTask,
  changeTaskTitle,
  changeTaskStatus,
  addTodolist,
  removeTodolist,
  updateTodolistTitle,
  logoutThunk,
  addTask,
})(TodoListComponent);
export default React.memo(TodoListContainer);
