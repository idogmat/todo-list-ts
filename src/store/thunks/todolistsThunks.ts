import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeStatusError } from "../app-reducer";
import { API } from "../../api/api";
import { handleServerNetworkError } from "../../utils/errorUtils";
import {
  changeEntityStatusTodolist,
  changeFieldTodolistTitle,
} from "../todolists-reducer";
import { AppThunkActionType, createAppAsyncThunk } from "../type";

export const fetchTodolist = createAppAsyncThunk(
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
export const addTodolist = createAppAsyncThunk(
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
export const removeTodolist = createAppAsyncThunk(
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
export const updateTodolistTitle = createAppAsyncThunk(
  "todolist/updateTodolistTitle",
  async (param: { todolistId: string; title: string }, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    thunkAPI.dispatch(
      changeEntityStatusTodolist({
        todolistId: param.todolistId,
        entityStatus: "loading",
      })
    );
    try {
      const res = await API.updateTodolistTitle(param.todolistId, param.title);
      if (res === 0) {
        thunkAPI.dispatch(
          changeEntityStatusTodolist({
            todolistId: param.todolistId,
            entityStatus: "succeeded",
          })
        );
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        thunkAPI.dispatch(
          changeFieldTodolistTitle({
            todolistId: param.todolistId,
            title: param.title,
          })
        );
      }
    } catch (e: any) {
      handleServerNetworkError(e.message, thunkAPI.dispatch);
    }
  }
);
