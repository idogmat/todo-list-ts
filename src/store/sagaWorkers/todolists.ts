import { call, put } from "redux-saga/effects";
import { changeStatusError } from "../app-reducer";
import {
  ResponseType,
  TodoListsAPIType,
  UpdateTodolistResponseType,
} from "../../api/type";
import { API } from "../../api/api";
import {
  addTodoList,
  changeFieldTodolistTitle,
  removeTodoList,
  setTodoLists,
} from "../actions/todolists";
import { handleServerNetworkError } from "../../utils/errorUtils";
import {
  addTodolistParamsType,
  removeTodolistParamsType,
  updateTodolistTitleParamsType,
} from "../type";
import { changeEntityStatusTodolist } from "../todolists-reducer";

export function* fetchTodolistWorkerSaga() {
  yield put(changeStatusError("loading"));
  try {
    const res: ResponseType<TodoListsAPIType[]> = yield call(API.getTodolists);
    yield put(setTodoLists(res.data));
    yield put(changeStatusError("succeeded"));
  } catch (e: any) {
    handleServerNetworkError(e, put);
  }
}

export function* addTodolistWorkerSaga({ title }: addTodolistParamsType) {
  yield put(changeStatusError("loading"));
  try {
    const res: TodoListsAPIType = yield call(API.addTodolist, title);
    yield put(addTodoList(res));
    yield put(changeStatusError("succeeded"));
  } catch (e: any) {
    handleServerNetworkError(e.message, put);
  }
}

export function* removeTodolistWorkerSaga({
  todolistId,
}: removeTodolistParamsType) {
  yield put(changeStatusError("loading"));
  yield put(changeEntityStatusTodolist(todolistId, "loading"));
  try {
    const res: ResponseType<UpdateTodolistResponseType> = yield call(
      API.deleteTodolist,
      todolistId
    );
    if (res.data.resultCode === 0) {
      yield put(removeTodoList(todolistId));
      yield put(changeEntityStatusTodolist(todolistId, "succeeded"));
      yield put(changeStatusError("succeeded"));
    } else {
      yield put(changeStatusError("failed"));
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, put);
  }
}

export function* updateTodolistTitleWorkerSaga({
  todolistId,
  title,
}: updateTodolistTitleParamsType) {
  yield put(changeStatusError("loading"));
  yield put(changeEntityStatusTodolist(todolistId, "loading"));
  try {
    const res: UpdateTodolistResponseType = yield call(
      API.updateTodolistTitle,
      todolistId,
      title
    );
    if (res.resultCode === 0) {
      yield put(changeFieldTodolistTitle(todolistId, title));
      yield put(changeEntityStatusTodolist(todolistId, "succeeded"));
      yield put(changeStatusError("succeeded"));
    }
    yield put(changeStatusError("failed"));
  } catch (e: any) {
    handleServerNetworkError(e.message, put);
  }
}
