import React, { useCallback, useEffect } from "react";
import "../App.css";
import TodoList from "./Todolists/TodoList";
import AddItemForm from "./common/AddItemForm";
import { connect } from "react-redux";
import { AppStateType, useAppDispatch } from "../store/store";
import { TaskType } from "../store/tasks-reducer";
import { RequestStatusType } from "../store/app-reducer";
import { Skeleton } from "../style/elements";
import Snackbar from "./common/Snackbar";
import { Navigate } from "react-router-dom";
import { logoutCallWorkerSaga } from "../store/actions/auth";
import {
  addTaskCallWorkerSaga,
  changeStatusCallWorkerSaga,
  changeTaskTitleCallWorkerSaga,
  removeTaskCallWorkerSaga,
} from "../store/actions/tasks";
import { TodoListType } from "../store/todolists-reducer";
import {
  addTodolistCallWorkerSaga,
  changeTodoListFilter,
  changeTodoListInput,
  fetchTodolistCallWorkerSaga,
  removeTodolistCallWorkerSaga,
  updateTodolistTitleCallWorkerSaga,
} from "../store/actions/todolists";

export type FilterValuesType = "all" | "completed" | "active";

type MapDispatchType = {
  changeTodoListFilter: (id: string, type: FilterValuesType) => void;
  changeTodoListInput: (todoListId: string, text: string) => void;
  appStatus: { status: RequestStatusType };
};

const TodoListComponent = (props: AppStateType & MapDispatchType) => {
  const dispatch = useAppDispatch();
  //preload-list
  useEffect(() => {
    dispatch(fetchTodolistCallWorkerSaga());
  }, []);
  //tasks
  const addTask = useCallback((todoListId: string, title: string) => {
    dispatch(addTaskCallWorkerSaga(todoListId, title));
  }, []);

  const removeTask = useCallback((todoListId: string, id: string) => {
    dispatch(removeTaskCallWorkerSaga(todoListId, id));
  }, []);

  const changeStatus = useCallback(
    (todoListId: string, id: string, task: TaskType) => {
      dispatch(changeStatusCallWorkerSaga(todoListId, id, task));
    },
    []
  );

  const changeTaskTitle = useCallback(
    (todoListId: string, taskId: string, text: string) => {
      dispatch(changeTaskTitleCallWorkerSaga(todoListId, taskId, text));
    },
    []
  );

  //todolist
  const onChangedTodolistInput = useCallback(
    (todoListId: string, text: string) => {
      props.changeTodoListInput(todoListId, text);
    },
    []
  );

  const addTodo = useCallback((title: string) => {
    dispatch(addTodolistCallWorkerSaga(title));
  }, []);

  const setFilterType = useCallback(
    (todoListId: string, filter: FilterValuesType) => {
      props.changeTodoListFilter(todoListId, filter);
    },
    []
  );

  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(removeTodolistCallWorkerSaga(todoListId));
  }, []);

  const changeFieldTodolistTitle = useCallback(
    (todoListId: string, newText: string) => {
      dispatch(updateTodolistTitleCallWorkerSaga(todoListId, newText));
    },
    []
  );

  const logout = () => {
    dispatch(logoutCallWorkerSaga());
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
  changeTodoListFilter,
  changeTodoListInput,
})(TodoListComponent);
export default React.memo(TodoListContainer);
