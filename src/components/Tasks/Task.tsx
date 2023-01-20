import React, { useCallback, useEffect } from "react";
import s from "../style.module.css";
import Spinner, { BtnStyle, HiddenCheckbox } from "../../style/elements";
import EditableTitle from "../common/EditTitle";
import { TaskType } from "../../store/tasks-reducer";
import { RequestStatusType } from "../../store/app-reducer";

type TaskElementType = {
  task: TaskType;
  todolistId: string;
  changeTaskTitle: (t: string, id: string, text: string) => void;
  removeTask: (el: string, id: string) => void;
  changeStatus: (a: string, c: string, b: TaskType) => void;
  entityStatus: RequestStatusType;
};
export const Task = React.memo((props: TaskElementType) => {
  const removeTask = useCallback(() => {
    if (props.entityStatus !== "loading") {
      props.removeTask(props.task.todoListId, props.task.id);
    }
  }, [props.task.todoListId, props.task.id]);

  const onChangeEditTitle = useCallback(
    (text: string) => {
      if (props.entityStatus !== "loading") {
        if (props.task.title !== text)
          props.changeTaskTitle(props.todolistId, props.task.id, text);
      }
    },
    [props.task.todoListId, props.task.id]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.entityStatus !== "loading") {
        let task = { ...props.task, status: e.currentTarget.checked ? 1 : 0 };
        props.changeStatus(
          props.task.todoListId,
          props.task.id,
          task as TaskType
        );
      }
    },
    [props.task.todoListId, props.task.id]
  );

  return (
    <li
      className={s.task + " " + (props.task.status ? s.done + " " : "")}
      key={props.task.id}
    >
      {props.task.entityStatus === "loading" ? (
        <Spinner />
      ) : (
        <HiddenCheckbox
          onChange={(e) => onInputChange(e)}
          type="checkbox"
          checked={!!props.task.status}
        />
      )}

      <EditableTitle
        entityStatus={props.task.entityStatus}
        title={props.task.title}
        callBack={onChangeEditTitle}
      />
      <BtnStyle onClick={removeTask}>x</BtnStyle>
    </li>
  );
});
