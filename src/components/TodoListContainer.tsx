import React, { useCallback, useEffect } from "react";
import "../App.css";
import TodoList from "./Todolists/TodoList";
import AddItemForm from "./common/AddItemForm";
import { connect, useDispatch, useSelector } from "react-redux";
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
import { logoutThunk } from "../store/thunks/authThunks";
import { Navigate } from "react-router-dom";
import {
  addTodolist,
  fetchTodolist,
  removeTodolist,
  updateTodolistTitle,
} from "../store/thunks/todolistsThunks";
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
} from "../store/thunks/tasksThunks";
import { AppStateType, useAppSelector } from "../store/type";
import { getIsInitialized } from "../store/selectors";

type MapDispatchType = {
  fetchTodolist: () => void;
  changeTodoListFilter: (payload: {
    todolistId: string;
    filter: FilterValuesType;
  }) => void;
  changeTodoListInput: (payload: { todolistId: string; text: string }) => void;
  updateTodolistTitle: (param: { todolistId: string; title: string }) => void;
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

const TodoListComponent: React.FC<AppStateType & MapDispatchType> = ({
  fetchTodolist,
  changeTodoListFilter,
  changeTodoListInput,
  updateTodolistTitle,
  addTodolist,
  logoutThunk,
  addTask,
  deleteTask,
  fetchTasks,
  changeTaskTitle,
  changeTaskStatus,
  removeTodolist,
  appStatus,
  tasks,
  todolists,
  auth,
}) => {
  // const initialized = useAppSelector(getIsInitialized);
  //preload-list
  useEffect(() => {
    fetchTodolist();
  }, []);
  //tasks
  const addTaskHandler = useCallback((todolistId: string, title: string) => {
    addTask({ todolistId, title });
  }, []);
  const removeTask = useCallback((todolistId: string, taskId: string) => {
    deleteTask({ todolistId, taskId });
  }, []);
  const changeStatus = useCallback(
    (todolistId: string, id: string, task: TaskType) => {
      changeTaskStatus({ todolistId, taskId: id, task });
    },
    []
  );
  const changeTaskTitleHandler = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      changeTaskTitle({ todolistId, taskId, title });
    },
    []
  );

  //todolist
  const onChangedTodolistInput = useCallback(
    (todolistId: string, text: string) => {
      changeTodoListInput({ todolistId, text });
    },
    []
  );
  const addTodo = useCallback((title: string) => {
    addTodolist(title);
  }, []);
  const setFilterType = useCallback(
    (todolistId: string, filter: FilterValuesType) => {
      changeTodoListFilter({ todolistId, filter });
    },
    []
  );
  const removeTodoList = useCallback((todolistId: string) => {
    removeTodolist(todolistId);
  }, []);
  const changeFieldTodolistTitle = useCallback(
    (todolistId: string, newText: string) => {
      updateTodolistTitle({ todolistId, title: newText });
    },
    []
  );
  const logout = () => {
    logoutThunk();
  };
  if (!auth.isLoggedIn) {
    return <Navigate to={"/login"} />;
  } else {
    return (
      <>
        <Snackbar status={appStatus.status} error={appStatus.error} />
        <AddItemForm logout={logout} addTodo={addTodo} />
        {appStatus.status === "loading" ? <Skeleton /> : <hr />}
        <div className="App">
          <div className={"container"}>
            {!!todolists ? (
              todolists.map((tl: TodoListType) => {
                let allTasks = tasks[tl.id];
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
                    addTask={addTaskHandler}
                    onChangedTodolistInput={onChangedTodolistInput}
                    changeFieldTodolistTitle={changeFieldTodolistTitle}
                    changeTaskTitle={changeTaskTitleHandler}
                    fetchTasks={fetchTasks}
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
