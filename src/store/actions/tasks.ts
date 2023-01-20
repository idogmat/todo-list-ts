import { TaskType } from "../tasks-reducer";

export const fetchTaskCallWorkerSaga = (todolistId: string) => ({
  type: "FETCH-TASKS-CALL",
  todolistId,
});
export const removeTaskCallWorkerSaga = (
  todolistId: string,
  taskId: string
) => ({
  type: "REMOVE-TASK-CALL",
  todolistId,
  taskId,
});
export const addTaskCallWorkerSaga = (todolistId: string, title: string) => ({
  type: "ADD-TASK-CALL",
  todolistId,
  title,
});
export const changeTaskTitleCallWorkerSaga = (
  todolistId: string,
  taskId: string,
  title: string
) => ({
  type: "CHANGE-TITLE-TASK-CALL",
  todolistId,
  taskId,
  title,
});
export const changeStatusCallWorkerSaga = (
  todolistId: string,
  taskId: string,
  task: TaskType
) => ({
  type: "CHANGE-STATUS-TASK-CALL",
  todolistId,
  taskId,
  task,
});
