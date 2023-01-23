import axios from "axios";
import { TaskType } from "../store/tasks-reducer";
import { UserType } from "../store/type";
import {
  CreateTaskResponseType,
  CreateTodolistResponseType,
  DeleteTaskResponseType,
  ResponseType,
  ResponseUserType,
  TasksObjType,
  TodoListsAPIType,
  UpdateTodolistResponseType,
} from "./type";

const key = "f267d306-2e26-49e4-8305-d841bf1e2061";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: { "API-KEY": key },
});

export const API = {
  authMe: () => instance.get("/auth/me").then((response) => response.data),
  login: (user: UserType) =>
    instance.post<ResponseType<ResponseUserType>>("/auth/login", user),
  logout: () => instance.delete("/auth/login"),
  //todolists
  getTodolists: () => {
    return instance.get<TodoListsAPIType[]>("todo-lists").then((resolve) => {
      return resolve;
    });
  },
  addTodolist: (title: string) => {
    return instance
      .post<ResponseType<CreateTodolistResponseType>>("todo-lists", {
        Title: title,
      })
      .then((resolve) => {
        return resolve.data.data.item;
      });
  },
  deleteTodolist: (todolistId: string) => {
    return instance
      .delete<ResponseType<DeleteTaskResponseType>>(`todo-lists/${todolistId}`)
      .then((resolve) => {
        return resolve;
      });
  },
  updateTodolistTitle: (todolistId: string, title: string) => {
    return instance
      .put<ResponseType<UpdateTodolistResponseType>>(
        `todo-lists/${todolistId}`,
        { Title: title }
      )
      .then((resolve) => {
        return resolve.data.resultCode;
      });
  },
  //Tasks
  getTasks: (todolistId: string) => {
    return instance
      .get<TasksObjType>(`todo-lists/${todolistId}/tasks`)
      .then((resolve) => {
        return resolve.data;
      });
  },
  addTask: (todolistId: string, title: string) => {
    return instance
      .post<CreateTaskResponseType>(`todo-lists/${todolistId}/tasks`, {
        Title: title,
      })
      .then((resolve) => {
        return resolve.data;
      });
  },
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => {
    return instance
      .put<CreateTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {
        Title: title,
      })
      .then((resolve) => {
        return resolve.data;
      });
  },
  updateTaskStatus: (todolistId: string, taskId: string, task: TaskType) => {
    return instance
      .put<CreateTaskResponseType>(
        `todo-lists/${todolistId}/tasks/${taskId}`,
        task
      )
      .then((resolve) => {
        return resolve.data;
      });
  },
  deleteTask: (todolistId: string, taskId: string) => {
    return instance
      .delete<ResponseType<DeleteTaskResponseType>>(
        `todo-lists/${todolistId}/tasks/${taskId}`
      )
      .then((resolve) => {
        return resolve.data;
      });
  },
};
