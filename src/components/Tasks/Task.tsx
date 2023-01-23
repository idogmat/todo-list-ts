import React, { useCallback } from "react";
import s from "../style.module.css";
import { BtnStyle, HiddenCheckbox, Spinner } from "../../style/elements";
import EditableTitle from "../common/EditTitle";
import { TaskType } from "../../store/tasks-reducer";
import { RequestStatusType } from "../../store/app-reducer";

type TaskElementType = {
  task: TaskType;
  todolistId: string;
  changeTaskTitle: (t: string, id: string, text: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeStatus: (a: string, c: string, b: TaskType) => void;
  entityStatus: RequestStatusType;
};
export const Task: React.FC<TaskElementType> = React.memo(
  ({
    task,
    removeTask,
    changeTaskTitle,
    changeStatus,
    entityStatus,
    todolistId,
  }) => {
    const removeTaskHandler = useCallback(() => {
      if (entityStatus !== "loading") {
        removeTask(task.todoListId, task.id);
      }
    }, [task.todoListId, task.id]);

    const onChangeEditTitle = useCallback(
      (text: string) => {
        if (entityStatus !== "loading") {
          if (task.title !== text) changeTaskTitle(todolistId, task.id, text);
        }
      },
      [task.todoListId, task.id]
    );

    const onInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (entityStatus !== "loading") {
          let taskChanged = {
            ...task,
            status: e.currentTarget.checked ? 1 : 0,
          };
          changeStatus(
            taskChanged.todoListId,
            taskChanged.id,
            taskChanged as TaskType
          );
        }
      },
      [task.todoListId, task.id]
    );
    return (
      <li
        className={s.task + " " + (task.status ? s.done + " " : "")}
        key={task.id}
      >
        {task.entityStatus === "loading" ? (
          <Spinner />
        ) : (
          <HiddenCheckbox
            onChange={(e) => onInputChange(e)}
            type="checkbox"
            checked={!!task.status}
          />
        )}

        <EditableTitle
          entityStatus={task.entityStatus}
          title={task.title}
          callBack={onChangeEditTitle}
        />
        <BtnStyle onClick={removeTaskHandler}>x</BtnStyle>
      </li>
    );
  }
);
