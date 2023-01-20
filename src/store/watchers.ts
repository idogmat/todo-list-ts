import { takeEvery } from "redux-saga/effects";
import {
  authMeWorkerSaga,
  loginWorkerSaga,
  logoutWorkerSaga,
} from "./sagaWorkers/auth";
import {
  addTaskWorkerSaga,
  changeStatusWorkerSaga,
  changeTaskTitleWorkerSaga,
  fetchTaskWorkerSaga,
  removeTaskWorkerSaga,
} from "./sagaWorkers/tasks";
import {
  addTodolistWorkerSaga,
  fetchTodolistWorkerSaga,
  removeTodolistWorkerSaga,
  updateTodolistTitleWorkerSaga,
} from "./sagaWorkers/todolists";

export function* tasksWatcherSaga() {
  yield takeEvery("FETCH-TASKS-CALL", fetchTaskWorkerSaga);
  yield takeEvery("REMOVE-TASK-CALL", removeTaskWorkerSaga);
  yield takeEvery("ADD-TASK-CALL", addTaskWorkerSaga);
  yield takeEvery("CHANGE-TITLE-TASK-CALL", changeTaskTitleWorkerSaga);
  yield takeEvery("CHANGE-STATUS-TASK-CALL", changeStatusWorkerSaga);
}

export function* todolistsWatcherSaga() {
  yield takeEvery("FETCH-TODOLIST-CALL", fetchTodolistWorkerSaga);
  yield takeEvery("ADD-TODOLIST-CALL", addTodolistWorkerSaga);
  yield takeEvery("REMOVE-TODOLIST-CALL", removeTodolistWorkerSaga);
  yield takeEvery("UPDATE-TODOLIST-CALL", updateTodolistTitleWorkerSaga);
}

export function* appWatcherSaga() {
  yield takeEvery("INITIALIZE-CALL", authMeWorkerSaga);
  yield takeEvery("LOGIN-CALL", loginWorkerSaga);
  yield takeEvery("LOGOUT-CALL", logoutWorkerSaga);
}
