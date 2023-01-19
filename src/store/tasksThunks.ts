import { changeStatusError } from "./app-reducer";
import { API } from "../api/api";
import { handleServerNetworkError } from "../utils/errorUtils";
import { changeEntityStatusTask, TaskType } from "./tasks-reducer";
import { createAppAsyncThunk } from "./type";

export const deleteTask = createAppAsyncThunk(
  "tasks/deleteTask",
  async (param: { todolistId: string; taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    thunkAPI.dispatch(
      changeEntityStatusTask({
        todolistId: param.todolistId,
        taskId: param.taskId,
        entityStatus: "loading",
      })
    );
    try {
      const res = await API.deleteTask(param.todolistId, param.taskId);
      if (res.resultCode === 0) {
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        thunkAPI.dispatch(
          changeEntityStatusTask({
            todolistId: param.todolistId,
            taskId: param.taskId,
            entityStatus: "succeeded",
          })
        );
        return { todolistId: param.todolistId, taskId: param.taskId };
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch);
      thunkAPI.dispatch(
        changeEntityStatusTask({
          todolistId: param.todolistId,
          taskId: param.taskId,
          entityStatus: "failed",
        })
      );
    }
  }
);
export const addTask = createAppAsyncThunk(
  "tasks/addTask",
  async (param: { todolistId: string; title: string }, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.addTask(param.todolistId, param.title);
      if (res.resultCode === 0) {
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        return { todolistId: param.todolistId, task: res.data.item };
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch);
    }
  }
);

export const changeTaskTitle = createAppAsyncThunk(
  "tasks/changeTaskTitle",
  async (
    params: { todolistId: string; taskId: string; title: string },
    thunkAPI
  ) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    thunkAPI.dispatch(
      changeEntityStatusTask({
        todolistId: params.todolistId,
        taskId: params.taskId,
        entityStatus: "loading",
      })
    );
    try {
      const res = await API.updateTaskTitle(
        params.todolistId,
        params.taskId,
        params.title
      );
      if (res.resultCode === 0) {
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        thunkAPI.dispatch(
          changeEntityStatusTask({
            todolistId: params.todolistId,
            taskId: params.taskId,
            entityStatus: "succeeded",
          })
        );
        return {
          todolistId: params.todolistId,
          taskId: params.taskId,
          title: res.data.item.title,
        };
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch);
      thunkAPI.dispatch(
        changeEntityStatusTask({
          todolistId: params.todolistId,
          taskId: params.taskId,
          entityStatus: "failed",
        })
      );
    }
  }
);
export const changeTaskStatus = createAppAsyncThunk(
  "tasks/changeTaskStatus",
  async (
    param: { todolistId: string; taskId: string; task: TaskType },
    thunkAPI
  ) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    thunkAPI.dispatch(
      changeEntityStatusTask({
        todolistId: param.todolistId,
        taskId: param.taskId,
        entityStatus: "failed",
      })
    );
    try {
      const res = await API.updateTaskStatus(
        param.todolistId,
        param.taskId,
        param.task
      );
      if (res.resultCode === 0) {
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        thunkAPI.dispatch(
          changeEntityStatusTask({
            todolistId: param.todolistId,
            taskId: param.taskId,
            entityStatus: "succeeded",
          })
        );
        return {
          todolistId: param.todolistId,
          taskId: param.taskId,
          status: res.data.item.status,
        };
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch);
    }
  }
);
