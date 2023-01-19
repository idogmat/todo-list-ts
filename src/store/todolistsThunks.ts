import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeStatusError } from "./app-reducer";
import { API } from "../api/api";
import { handleServerNetworkError } from "../utils/errorUtils";
import {
  changeEntityStatusTodolist,
  changeFieldTodolistTitle,
} from "./todolists-reducer";
import { AppThunkActionType } from "./type";

export const fetchTodolist = createAsyncThunk(
  "todolist/fetchTodolist",
  async (value, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.getTodolists();
      thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
      return { todolists: res.data };
    } catch (e: any) {
      console.log(e, "errr");
      handleServerNetworkError(e.message, thunkAPI.dispatch);
    }
  }
);
export const addTodolist = createAsyncThunk(
  "todolist/addTodolist",
  async (title: string, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.addTodolist(title);
      thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
      return { todolist: res };
    } catch (e: any) {
      handleServerNetworkError(e.message, thunkAPI.dispatch);
    }
  }
);
export const removeTodolist = createAsyncThunk(
  "todolist/removeTodolist",
  async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    thunkAPI.dispatch(
      changeEntityStatusTodolist({ todolistId, entityStatus: "loading" })
    );
    try {
      const res = await API.deleteTodolist(todolistId);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(
          changeEntityStatusTodolist({ todolistId, entityStatus: "succeeded" })
        );
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        return { todolistId };
      }
    } catch (e: any) {
      handleServerNetworkError(e.message, thunkAPI.dispatch);
    }
  }
);
export const updateTodolistTitle =
  (todolistId: string, title: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    dispatch(
      changeEntityStatusTodolist({ todolistId, entityStatus: "loading" })
    );
    try {
      const res = await API.updateTodolistTitle(todolistId, title);
      if (res === 0) {
        dispatch(
          changeEntityStatusTodolist({ todolistId, entityStatus: "succeeded" })
        );
        dispatch(changeStatusError({ status: "succeeded" }));
        dispatch(changeFieldTodolistTitle({ todolistId, title }));
      }
    } catch (e: any) {
      handleServerNetworkError(e.message, dispatch);
    }
  };
