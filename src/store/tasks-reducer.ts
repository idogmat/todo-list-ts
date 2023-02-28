import { API } from "../api/api";
import { changeStatusError, RequestStatusType } from "./app-reducer";
import { handleServerNetworkError } from "../utils/errorUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTodolist,
  fetchTodolist,
  removeTodolist,
} from "./thunks/todolistsThunks";
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
} from "./thunks/tasksThunks";

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
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.getTasks(todolistId);
      thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
      return { todolistId, tasks: res.items };
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch);
    }
  }
);

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeEntityStatusTask(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        entityStatus: RequestStatusType;
      }>
    ) {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId
      );
      state[action.payload.todolistId][index].entityStatus =
        action.payload.entityStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      action.payload && (state[action.payload.todolist.id] = []);
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      action.payload && delete state[action.payload.todolistId];
    });
    builder.addCase(fetchTodolist.fulfilled, (state, action) => {
      action.payload &&
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      action.payload &&
        state[action.payload.todolistId].unshift({
          ...action.payload.task,
          entityStatus: "idle",
        });
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      if (action.payload)
        state[action.payload.todolistId] = action.payload.tasks.map((task) => ({
          ...task,
          entityStatus: "idle",
        }));
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state[action.payload.todolistId].findIndex(
          (task) => task.id === action.payload?.taskId
        );
        if (index > -1) {
          state[action.payload.todolistId].splice(index, 1);
        }
      }
    });
    builder.addCase(changeTaskTitle.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state[action.payload.todolistId].findIndex(
          (task) => task.id === action.payload?.taskId
        );
        state[action.payload.todolistId][index].title = action.payload.title;
      }
    });
    builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.todolistId].forEach((task) =>
          task.id === action.payload?.taskId
            ? (task.status = action.payload?.status)
            : ""
        );
      }
    });
  },
});

export const changeEntityStatusTask = slice.actions.changeEntityStatusTask;

export const tasksReducer = slice.reducer;
