import React, { ChangeEvent, useCallback } from "react";
import Button from "./Button";
import { Input } from "../../style/elements";
import s from "../style.module.css";
type InputProps = {
  addTasks: (todolistId: string, title: string) => void;
  todolistInput: string;
  onChangedTodolistInput: (todoListId: string, text: string) => void;
  error: boolean;
  todolistId: string;
};

const FullInput: React.FC<InputProps> = ({
  addTasks,
  todolistInput,
  todolistId,
  onChangedTodolistInput,
  error,
}) => {
  const changeInput = useCallback(
    (text: string) => {
      onChangedTodolistInput(todolistId, text);
      if (todolistInput !== "" || todolistInput.trim() !== "") {
      }
    },
    [todolistId]
  );
  const addTask = useCallback(() => {
    if (todolistInput === "" || todolistInput.trim() === "") {
    } else {
      addTasks(todolistId, todolistInput);
      onChangedTodolistInput(todolistId, "");
    }
  }, [todolistId, todolistInput]);
  return (
    <div className={s.inputBlock}>
      <Input
        value={todolistInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          changeInput(e.currentTarget.value)
        }
        onKeyDown={(e: any) => e.key === "Enter" && addTask()}
        className={error ? s.inputError : ""}
      />
      <Button callBack={addTask} />
    </div>
  );
};
export default FullInput;
