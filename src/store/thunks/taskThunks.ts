import { AppThunkActionType } from "../store";
import { changeStatusError } from "../app-reducer";
import { API } from "../../api/api";
import { handleServerNetworkError } from "../../utils/errorUtils";
import {
  addTask,
  changeEntityStatusTask,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
  setTasksAC,
  TaskType,
} from "../tasks-reducer";

export const fetchTasksTC =
  (todolistId: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.getTasks(todolistId);
      dispatch(setTasksAC({ todolistId, tasks: res.items }));
      dispatch(changeStatusError({ status: "succeeded" }));
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    }
  };

export const deleteTaskTC =
  (todolistId: string, taskId: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    dispatch(
      changeEntityStatusTask({ todolistId, taskId, entityStatus: "loading" })
    );
    try {
      const res = await API.deleteTask(todolistId, taskId);
      if (res.resultCode === 0) {
        dispatch(changeStatusError({ status: "succeeded" }));
        dispatch(
          changeEntityStatusTask({
            todolistId,
            taskId,
            entityStatus: "succeeded",
          })
        );
        dispatch(removeTask({ todolistId, taskId }));
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
      dispatch(
        changeEntityStatusTask({ todolistId, taskId, entityStatus: "failed" })
      );
    }
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.addTask(todolistId, title);
      if (res.resultCode === 0) {
        dispatch(addTask({ todolistId, task: res.data.item }));
        dispatch(changeStatusError({ status: "succeeded" }));
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    }
  };

export const changeTaskTitleTC =
  (todolistId: string, taskId: string, title: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    dispatch(
      changeEntityStatusTask({ todolistId, taskId, entityStatus: "loading" })
    );
    try {
      const res = await API.updateTaskTitle(todolistId, taskId, title);
      if (res.resultCode === 0) {
        debugger;
        dispatch(
          changeTaskTitle({ todolistId, taskId, title: res.data.item.title })
        );
        dispatch(changeStatusError({ status: "succeeded" }));
        dispatch(
          changeEntityStatusTask({
            todolistId,
            taskId,
            entityStatus: "succeeded",
          })
        );
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
      dispatch(
        changeEntityStatusTask({ todolistId, taskId, entityStatus: "failed" })
      );
    }
  };

export const changeStatusTitleTC =
  (todolistId: string, taskId: string, task: TaskType): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError({ status: "loading" }));
    dispatch(
      changeEntityStatusTask({ todolistId, taskId, entityStatus: "loading" })
    );
    try {
      const res = await API.updateTaskStatus(todolistId, taskId, task);
      if (res.resultCode === 0) {
        dispatch(
          changeTaskStatus({ todolistId, taskId, status: res.data.item.status })
        );
        dispatch(changeStatusError({ status: "succeeded" }));
        dispatch(
          changeEntityStatusTask({
            todolistId,
            taskId,
            entityStatus: "succeeded",
          })
        );
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    }
  };
