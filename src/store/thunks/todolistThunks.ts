import { AppThunkActionType } from "../store";
import { changeStatusError } from "../app-reducer";
import { API } from "../../api/api";
import { handleServerNetworkError } from "../../utils/errorUtils";
import {
  addTodoList,
  changeEntityStatusTodolist,
  changeFieldTodolistTitle,
  removeTodoList,
  setTodoLists,
} from "../todolists-reducer";

export const fetchTodolist = (): AppThunkActionType => async (dispatch) => {
  dispatch(changeStatusError({ status: "loading" }));
  try {
    const res = await API.getTodolists();
    dispatch(changeStatusError({ status: "succeeded" }));
    dispatch(setTodoLists({ todolists: res.data }));
  } catch (e: any) {
    console.log(e, "errr");
    handleServerNetworkError(e.message, dispatch);
  }
};
export const addTodolistTC =
  (title: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.addTodolist(title);
      dispatch(changeStatusError({ status: "succeeded" }));
      dispatch(addTodoList({ todolist: res }));
    } catch (e: any) {
      handleServerNetworkError(e.message, dispatch);
    }
  };
export const removeTodolistTC =
  (todolistId: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    dispatch(
      changeEntityStatusTodolist({ todolistId, entityStatus: "loading" })
    );
    try {
      const res = await API.deleteTodolist(todolistId);
      if (res.data.resultCode === 0) {
        dispatch(
          changeEntityStatusTodolist({ todolistId, entityStatus: "succeeded" })
        );
        dispatch(changeStatusError({ status: "succeeded" }));
        dispatch(removeTodoList({ todolistId }));
      }
    } catch (e: any) {
      handleServerNetworkError(e.message, dispatch);
    }
  };
export const updateTodolistTitleTC =
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
