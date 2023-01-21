import {
  authMeWorkerSaga,
  loginWorkerSaga,
  logoutWorkerSaga,
} from "../sagaWorkers/auth";
import { API } from "../../api/api";
import { call, put } from "redux-saga/effects";
import { AuthMeType, ResponseType, ResponseUserType } from "../../api/type";
import {
  loginAC,
  loginCallWorkerSaga,
  logoutCallWorkerSaga,
} from "../actions/auth";
import { changeStatusError, setInitialized } from "../app-reducer";
import { AxiosResponse } from "axios";

describe("app-saga test", () => {
  it("authMe resolve", () => {
    const gen = authMeWorkerSaga();
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(put(setInitialized(false)));
    res = gen.next();
    expect(res.value).toEqual(call(API.authMe));
    const meResponse: AuthMeType = {
      fieldsErrors: [],
      messages: [],
      resultCode: 0,
      statusText: "OK",
    };
    res = gen.next(meResponse);
    expect(res.value).toEqual(put(loginAC(true)));
    res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("succeeded")));
    res = gen.next();
    expect(res.value).toEqual(put(setInitialized(true)));
  });
  it("authMe rejected", () => {
    const gen = authMeWorkerSaga();
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(put(setInitialized(false)));
    res = gen.next();
    expect(res.value).toEqual(call(API.authMe));
    const meResponse: AuthMeType = {
      fieldsErrors: [],
      messages: [],
      resultCode: 1,
      statusText: "OK",
    };
    res = gen.next(meResponse);
    expect(res.value).toEqual(put(changeStatusError("failed")));
    res = gen.next();
    expect(res.value).toEqual(put(setInitialized(true)));
  });
  it("loginWorkerSaga resolved", () => {
    const user = { email: "string", password: "string", rememberMe: true };
    const gen = loginWorkerSaga(loginCallWorkerSaga(user));
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(call(API.login, user));
    const meResponse = {
      data: {
        resultCode: 0,
      },
    } as AxiosResponse<ResponseType<ResponseUserType>>;
    res = gen.next(meResponse as any);

    expect(res.value).toEqual(put(loginAC(true)));
    res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("succeeded")));
  });
  it("loginWorkerSaga rejected", () => {
    const user = { email: "string", password: "string", rememberMe: true };
    const gen = loginWorkerSaga(loginCallWorkerSaga(user));
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));

    res = gen.next();
    expect(res.value).toEqual(call(API.login, user));
    const meResponse = {
      data: {
        resultCode: 1,
      },
    } as AxiosResponse<ResponseType<ResponseUserType>>;
    res = gen.next(meResponse as any);
    expect(res.value).toEqual(put(changeStatusError("failed")));
  });
  it("logoutWorkerSaga resolved", () => {
    const gen = logoutWorkerSaga();
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));
    res = gen.next();
    expect(res.value).toEqual(call(API.logout));
    const meResponse = {
      data: {
        resultCode: 0,
      },
    } as AxiosResponse<ResponseType<ResponseUserType>>;
    res = gen.next(meResponse as any);

    expect(res.value).toEqual(put(loginAC(false)));
    res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("succeeded")));
  });
  it("logoutWorkerSaga rejected", () => {
    const gen = logoutWorkerSaga();
    let res = gen.next();
    expect(res.value).toEqual(put(changeStatusError("loading")));

    res = gen.next();
    expect(res.value).toEqual(call(API.logout));
    const meResponse = {
      data: {
        resultCode: 1,
      },
    } as AxiosResponse<ResponseType<ResponseUserType>>;
    res = gen.next(meResponse as any);
    expect(res.value).toEqual(put(changeStatusError("failed")));
  });
});
