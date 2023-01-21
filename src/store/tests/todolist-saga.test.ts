import { call, put } from "redux-saga/effects";
import { changeStatusError } from "../app-reducer";
import { API } from "../../api/api";
import {
  ResponseType,
  ResponseUserType,
  TodoListsAPIType,
  UpdateTodolistResponseType,
} from "../../api/type";
import {
  addTodoList,
  addTodolistCallWorkerSaga,
  changeFieldTodolistTitle,
  removeTodoList,
  removeTodolistCallWorkerSaga,
  setTodoLists,
  updateTodolistTitleCallWorkerSaga,
} from "../actions/todolists";
import {
  addTodolistWorkerSaga,
  fetchTodolistWorkerSaga,
  removeTodolistWorkerSaga,
  updateTodolistTitleWorkerSaga,
} from "../sagaWorkers/todolists";
import { changeEntityStatusTodolist } from "../todolists-reducer";
import { AxiosResponse } from "axios";

describe("todolist-saga test", () => {
  it("fetchTodolistWorkerSaga resolve", () => {
    const gen = fetchTodolistWorkerSaga();
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(call(API.getTodolists));
    const meResponse: ResponseType<TodoListsAPIType[]> = {
      fieldsErrors: [],
      messages: [],
      resultCode: 0,
      statusTest: "",
      data: [{ title: "1111", id: "111", addedDate: "", order: 1 }],
    };
    res = gen.next(meResponse);
    expect(res.value).toEqual(put(setTodoLists(meResponse.data)));
    res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("succeeded")));
  });
  it("addTodolistWorkerSaga resolve", () => {
    const gen = addTodolistWorkerSaga(
      addTodolistCallWorkerSaga("new todolist")
    );
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(call(API.addTodolist, "new todolist"));
    const meResponse: TodoListsAPIType = {
      title: "1111",
      id: "111",
      addedDate: "",
      order: 1,
    };
    res = gen.next(meResponse);
    expect(res.value).toEqual(put(addTodoList(meResponse)));
    res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("succeeded")));
  });

  it("removeTodolistWorkerSaga resolve", () => {
    const gen = removeTodolistWorkerSaga(
      removeTodolistCallWorkerSaga("todolistId")
    );
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(
      put(changeEntityStatusTodolist("todolistId", "loading"))
    );
    res = gen.next();
    expect(res.value).toEqual(call(API.deleteTodolist, "todolistId"));
    const meResponse = {
      data: {
        resultCode: 0,
      },
    } as AxiosResponse<ResponseType<ResponseUserType>>;
    res = gen.next(meResponse as any);
    expect(res.value).toEqual(put(removeTodoList("todolistId")));
    res = gen.next();
    expect(res.value).toEqual(
      put(changeEntityStatusTodolist("todolistId", "succeeded"))
    );
    res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("succeeded")));
  });
  it("removeTodolistWorkerSaga reject", () => {
    const gen = removeTodolistWorkerSaga(
      removeTodolistCallWorkerSaga("todolistId")
    );
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(
      put(changeEntityStatusTodolist("todolistId", "loading"))
    );
    res = gen.next();
    expect(res.value).toEqual(call(API.deleteTodolist, "todolistId"));
    const meResponse = {
      data: {
        resultCode: 1,
      },
    } as AxiosResponse<ResponseType<ResponseUserType>>;
    res = gen.next(meResponse as any);
    expect(res.value).toEqual(put(changeStatusError("failed")));
  });
  it("updateTodolistTitleWorkerSaga resolve", () => {
    const gen = updateTodolistTitleWorkerSaga(
      updateTodolistTitleCallWorkerSaga("todolistId", "updated")
    );
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(
      put(changeEntityStatusTodolist("todolistId", "loading"))
    );
    res = gen.next();
    expect(res.value).toEqual(
      call(API.updateTodolistTitle, "todolistId", "updated")
    );
    const meResponse = {
      resultCode: 0,
    } as UpdateTodolistResponseType;
    res = gen.next(meResponse as any);
    expect(res.value).toEqual(
      put(changeFieldTodolistTitle("todolistId", "updated"))
    );
    res = gen.next();
    expect(res.value).toEqual(
      put(changeEntityStatusTodolist("todolistId", "succeeded"))
    );
    res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("succeeded")));
  });
  it("updateTodolistTitleWorkerSaga rejected", () => {
    const gen = updateTodolistTitleWorkerSaga(
      updateTodolistTitleCallWorkerSaga("todolistId", "updated")
    );
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(
      put(changeEntityStatusTodolist("todolistId", "loading"))
    );
    res = gen.next();
    expect(res.value).toEqual(
      call(API.updateTodolistTitle, "todolistId", "updated")
    );
    const meResponse = {
      resultCode: 1,
    } as UpdateTodolistResponseType;
    res = gen.next(meResponse as any);

    expect(res.value).toEqual(put(changeStatusError("failed")));
  });
});
