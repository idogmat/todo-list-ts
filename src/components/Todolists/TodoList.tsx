import React, { useEffect } from "react";
import FullInput from "../common/FullInput";
import { BtnStyle } from "../../style/elements";
import s from "../style.module.css";
import EditableTitle from "../common/EditTitle";
import { Task } from "../Tasks/Task";
import { TaskType } from "../../store/tasks-reducer";
import { RequestStatusType } from "../../store/app-reducer";
import { FilterValuesType } from "../../store/todolists-reducer";

type FilterType = "all" | "active" | "completed";

export type TodolistType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  error: boolean;
  filter: FilterType;
  todolistInput: string;
  entityStatus: RequestStatusType;

  setFilterType: (todoListId: string, filter: FilterValuesType) => void;
  onChangedTodolistInput: (todoListId: string, text: string) => void;
  changeFieldTodolistTitle: (todoListId: string, text: string) => void;
  removeTodoList: (todoListId: string) => void;

  changeTaskTitle: (todoListId: string, id: string, text: string) => void;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeStatus: (todolistId: string, id: string, b: TaskType) => void;
  fetchTasks: (s: string) => void;
};
const TodoList: React.FC<TodolistType> = React.memo(
  ({
    todolistId,
    title,
    error,
    tasks,
    filter,
    todolistInput,
    entityStatus,
    setFilterType,
    onChangedTodolistInput,
    changeFieldTodolistTitle,
    removeTodoList,
    changeTaskTitle,
    addTask,
    removeTask,
    changeStatus,
    fetchTasks,
  }) => {
    useEffect(() => {
      fetchTasks(todolistId);
    }, []);

    const selectFilter = (todoListId: string, filter: FilterType) => {
      setFilterType(todoListId, filter);
    };

    const changeTodoListTitle = (text: string) => {
      if (title !== text) changeFieldTodolistTitle(todolistId, text);
    };

    let tasksForTodolist = tasks;

    if (filter === "completed") {
      tasksForTodolist = tasks.filter((el: TaskType) => el.status);
    } else if (filter === "active") {
      tasksForTodolist = tasks.filter((el: TaskType) => !el.status);
    }

    return (
      <div className={s.todolishka}>
        <div className={s.flex}>
          <EditableTitle
            entityStatus={entityStatus}
            title={title}
            callBack={changeTodoListTitle}
          ></EditableTitle>
          <BtnStyle
            disabled={entityStatus === "loading"}
            onClick={() => removeTodoList(todolistId)}
          >
            Remove
          </BtnStyle>
        </div>
        <FullInput
          addTasks={addTask}
          todolistInput={todolistInput}
          onChangedTodolistInput={onChangedTodolistInput}
          error={error}
          todolistId={todolistId}
        />
        {error && <div className={s.errorMessage}>Field is required</div>}

        {tasks.length ? (
          <ul>
            {tasksForTodolist.map((el: TaskType) => {
              return (
                <Task
                  key={el.id}
                  task={el}
                  todolistId={todolistId}
                  removeTask={removeTask}
                  changeTaskTitle={changeTaskTitle}
                  changeStatus={changeStatus}
                  entityStatus={el.entityStatus}
                />
              );
            })}
          </ul>
        ) : (
          <p>Your list is empty</p>
        )}
        <div className={s.sort}>
          <BtnStyle
            className={filter === "all" ? s.activeFilterBtn : ""}
            onClick={() => selectFilter(todolistId, "all")}
          >
            All
          </BtnStyle>
          <BtnStyle
            className={filter === "active" ? s.activeFilterBtn : ""}
            onClick={() => selectFilter(todolistId, "active")}
          >
            Active
          </BtnStyle>
          <BtnStyle
            className={filter === "completed" ? s.activeFilterBtn : ""}
            onClick={() => selectFilter(todolistId, "completed")}
          >
            Completed
          </BtnStyle>
        </div>
      </div>
    );
  }
);

export default TodoList;
