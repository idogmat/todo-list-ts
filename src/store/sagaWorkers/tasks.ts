import { call, put } from "redux-saga/effects";
import { changeStatusError } from "../app-reducer";
import { API, TasksObjType } from "../../api/api";
import { handleServerNetworkError } from "../../utils/errorUtils";
import { CreateTaskResponseType, DeleteTaskType } from "../../api/type";
import {
  addTaskParamsType,
  changeStatusParamsType,
  changeTaskTitleParamsType,
  FetchParamsType,
  removeParamsType,
} from "../type";
import {
  addTask,
  changeEntityStatusTask,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
  setTasksAC,
} from "../tasks-reducer";

export function* fetchTaskWorkerSaga({ todolistId }: FetchParamsType) {
  yield put(changeStatusError("loading"));
  try {
    const res: TasksObjType = yield call(API.getTasks, todolistId);
    yield put(setTasksAC(todolistId, res.items));
    yield put(changeStatusError("succeeded"));
  } catch (e: any) {
    handleServerNetworkError(e, put);
  }
}

export function* removeTaskWorkerSaga({
  todolistId,
  taskId,
}: removeParamsType) {
  yield put(changeStatusError("loading"));
  yield put(changeEntityStatusTask(todolistId, taskId, "loading"));
  yield put;
  try {
    const res: DeleteTaskType = yield call(API.deleteTask, todolistId, taskId);
    if (res.resultCode === 0) {
      yield put(removeTask(todolistId, taskId));
      yield put(changeStatusError("succeeded"));
      yield put(changeEntityStatusTask(todolistId, taskId, "succeeded"));
    }
  } catch (e: any) {
    handleServerNetworkError(e, put);
    yield put(changeEntityStatusTask(todolistId, taskId, "failed"));
  }
}

export function* addTaskWorkerSaga({ todolistId, title }: addTaskParamsType) {
  yield put(changeStatusError("loading"));
  try {
    const res: CreateTaskResponseType = yield call(
      API.addTask,
      todolistId,
      title
    );
    if (res.resultCode === 0) {
      yield put(addTask(todolistId, res.data.item));
      yield put(changeStatusError("succeeded"));
    }
  } catch (e: any) {
    handleServerNetworkError(e, put);
  }
}

export function* changeTaskTitleWorkerSaga({
  todolistId,
  taskId,
  title,
}: changeTaskTitleParamsType) {
  yield put(changeStatusError("loading"));
  try {
    const res: CreateTaskResponseType = yield call(
      API.updateTaskTitle,
      todolistId,
      taskId,
      title
    );
    if (res.resultCode === 0) {
      yield put(changeTaskTitle(todolistId, taskId, res.data.item.title));
      yield put(changeStatusError("succeeded"));
      yield put(changeEntityStatusTask(todolistId, taskId, "succeeded"));
    }
  } catch (e: any) {
    handleServerNetworkError(e, put);
  }
}

export function* changeStatusWorkerSaga({
  todolistId,
  taskId,
  task,
}: changeStatusParamsType) {
  yield put(changeStatusError("loading"));
  try {
    const res: CreateTaskResponseType = yield call(
      API.updateTaskStatus,
      todolistId,
      taskId,
      task
    );
    if (res.resultCode === 0) {
      yield put(changeTaskStatus(todolistId, taskId, task.status));
      yield put(changeStatusError("succeeded"));
      yield put(changeEntityStatusTask(todolistId, taskId, "succeeded"));
    }
  } catch (e: any) {
    handleServerNetworkError(e, put);
  }
}
