import {
  AddTodoListType,
  RemoveTodoListType,
  SetTodoListsType,
} from "./todolists-reducer";
import { TaskResponseType } from "../api/type";
import { RequestStatusType } from "./app-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTask>;
export type AddTaskACType = ReturnType<typeof addTask>;
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatus>;
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitle>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;
export type ChangeEntityStatusTask = ReturnType<typeof changeEntityStatusTask>;

export type TaskActionType =
  | AddTaskACType
  | RemoveTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodoListType
  | RemoveTodoListType
  | SetTodoListsType
  | SetTasksACType
  | ChangeEntityStatusTask;
export type TaskStatusType = 0 | 1;
export type TaskType = {
  addedDate: string;
  deadline: string | null;
  status: TaskStatusType;
  id: string;
  title: string;
  description: string | null;
  todoListId: string;
  order: number;
  priority: number;
  startDate: string | null;
  entityStatus: RequestStatusType;
};
export type TasksStateType = {
  [key: string]: TaskType[];
};
let initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TaskActionType
): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK":
      let newTask = { ...action.task, entityStatus: "idle" } as TaskType;
      return {
        ...state,
        [action.task.todoListId]: [newTask, ...state[action.todoListId]],
      };
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((el) =>
          el.id === action.taskId ? { ...el, status: action.status } : el
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((el) =>
          el.id === action.taskId ? { ...el, title: action.text } : el
        ),
      };
    case "CHANGE-ENTITY-STATUS-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((el) =>
          el.id === action.taskId
            ? { ...el, entityStatus: action.entityStatus }
            : el
        ),
      };
    case "ADD-TODOLIST":
      return {
        [action.todoList.id]: [],
        ...state,
      };
    case "REMOVE-TODOLIST":
      const {
        [action.todoListId]: [],
        ...rest
      } = { ...state };
      return rest;
    case "SET-TODOLISTS":
      const copyTl = { ...state };
      action.todoLists.forEach((tl) => {
        copyTl[tl.id] = [];
      });
      return copyTl;
    case "SET-TASKS":
      const copyTs = { ...state };
      copyTs[action.todolistId] = action.tasks.map((t) => ({
        ...t,
        entityStatus: "idle",
      }));
      return copyTs;
    default:
      return state;
  }
};
export const addTask = (todoListId: string, task: TaskResponseType) => {
  return { type: "ADD-TASK", todoListId, task } as const;
};
export const removeTask = (todoListId: string, taskId: string) => {
  return { type: "REMOVE-TASK", taskId, todoListId } as const;
};
export const changeTaskStatus = (
  todoListId: string,
  taskId: string,
  status: TaskStatusType
) => {
  return { type: "CHANGE-TASK-STATUS", status, todoListId, taskId } as const;
};
export const changeTaskTitle = (
  todoListId: string,
  taskId: string,
  text: string
) => {
  return { type: "CHANGE-TASK-TITLE", text, todoListId, taskId } as const;
};
export const setTasksAC = (todolistId: string, tasks: TaskResponseType[]) => {
  return { type: "SET-TASKS", todolistId, tasks } as const;
};
export const changeEntityStatusTask = (
  todoListId: string,
  taskId: string,
  entityStatus: RequestStatusType
) => {
  return {
    type: "CHANGE-ENTITY-STATUS-TASK",
    todoListId,
    taskId,
    entityStatus,
  } as const;
};
