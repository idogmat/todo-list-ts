import { addTodoList, removeTodoList, setTodoLists } from "./todolists-reducer";
import { TaskResponseType } from "../api/api";
import { RequestStatusType } from "./app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAC } from "./auth-reducer";

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
const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(
      state,
      action: PayloadAction<{ todolistId: string; task: TaskResponseType }>
    ) {
      state[action.payload.todolistId].unshift({
        ...action.payload.task,
        entityStatus: "idle",
      });
    },
    removeTask(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>
    ) {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (index > -1) {
        state[action.payload.todolistId].splice(index, 1);
      }
    },
    changeTaskStatus(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        status: TaskStatusType;
      }>
    ) {
      state[action.payload.todolistId].forEach((task) =>
        task.id === action.payload.taskId
          ? (task.status = action.payload.status)
          : ""
      );
    },
    changeTaskTitle(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        title: string;
      }>
    ) {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId
      );
      state[action.payload.todolistId][index].title = action.payload.title;
    },
    changeEntityStatusTask(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        entityStatus: RequestStatusType;
      }>
    ) {
      debugger;
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId
      );
      state[action.payload.todolistId][index].entityStatus =
        action.payload.entityStatus;
    },
    setTasksAC(
      state,
      action: PayloadAction<{ todolistId: string; tasks: TaskResponseType[] }>
    ) {
      state[action.payload.todolistId] = action.payload.tasks.map((task) => ({
        ...task,
        entityStatus: "idle",
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodoList, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodoList, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(setTodoLists, (state, action) => {
      action.payload.todolists.forEach((tl) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(loginAC, (state, action) => {
      !action.payload.value && (state = {});
    });
  },
});
export const {
  addTask,
  removeTask,
  changeTaskStatus,
  changeTaskTitle,
  changeEntityStatusTask,
  setTasksAC,
} = slice.actions;
export const tasksReducer = slice.reducer;
