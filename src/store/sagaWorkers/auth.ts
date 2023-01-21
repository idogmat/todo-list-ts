import { call, put } from "redux-saga/effects";
import { changeStatusError, setInitialized } from "../app-reducer";
import {
  AuthMeType,
  LogoutType,
  ResponseType,
  ResponseUserType,
} from "../../api/type";
import { API } from "../../api/api";
import { handleServerNetworkError } from "../../utils/errorUtils";
import { UserParamsType } from "../type";
import { AxiosResponse } from "axios";
import { loginAC } from "../actions/auth";

export function* authMeWorkerSaga() {
  yield put(changeStatusError("loading"));
  yield put(setInitialized(false));
  try {
    const res: AuthMeType = yield call(API.authMe);
    if (res.resultCode === 0) {
      yield put(loginAC(true));
      yield put(changeStatusError("succeeded"));
    } else {
      yield put(changeStatusError("failed"));
      handleServerNetworkError(res.statusText, put);
    }
  } catch (e: any) {
    handleServerNetworkError(e, put);
  } finally {
    yield put(setInitialized(true));
  }
}

export function* loginWorkerSaga({ user }: UserParamsType) {
  yield put(changeStatusError("loading"));
  try {
    const res: AxiosResponse<ResponseType<ResponseUserType>> = yield call(
      API.login,
      user
    );
    if (res.data.resultCode === 0) {
      yield put(loginAC(true));
      yield put(changeStatusError("succeeded"));
    } else {
      yield put(changeStatusError("failed"));
    }
  } catch (e: any) {
    handleServerNetworkError(e, put);
  }
}

export function* logoutWorkerSaga() {
  yield put(changeStatusError("loading"));
  try {
    const res: LogoutType = yield call(API.logout);
    if (res.data.resultCode === 0) {
      yield put(loginAC(false));
      yield put(changeStatusError("succeeded"));
    } else {
      yield put(changeStatusError("failed"));
      handleServerNetworkError(res.statusTest, put);
    }
  } catch (e: any) {
    handleServerNetworkError(e, put);
  }
}
