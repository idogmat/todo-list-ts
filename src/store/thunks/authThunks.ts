import { changeStatusError, setInitialized } from "../app-reducer";
import { API } from "../../api/api";
import { handleServerNetworkError } from "../../utils/errorUtils";
import { createAppAsyncThunk, UserType } from "../type";

export const authMeThunk = createAppAsyncThunk(
  "auth/authMe",
  async (value, thunkAPI) => {
    const { isInitialized } = thunkAPI.getState().appStatus;

    isInitialized &&
      thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.authMe();
      if (res.resultCode === 0) {
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        return { value: true };
      }
    } catch (e: any) {
      isInitialized && handleServerNetworkError(e, thunkAPI.dispatch);
    } finally {
      thunkAPI.dispatch(setInitialized({ initialized: true }));
    }
  }
);
export const logoutThunk = createAppAsyncThunk(
  "auth/logoutThunk",
  async (value, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.logout();
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        return { value: false };
      } else {
        handleServerNetworkError(res.statusText, thunkAPI.dispatch);
        thunkAPI.rejectWithValue({});
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch);
      thunkAPI.rejectWithValue({});
    }
  }
);
export const loginThunk = createAppAsyncThunk(
  "auth/loginThunk",
  async (param: { user: UserType }, thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({ status: "loading" }));
    try {
      const res = await API.login(param.user);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(changeStatusError({ status: "succeeded" }));
        return { value: true };
      } else {
        handleServerNetworkError(res.statusText, thunkAPI.dispatch);
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch);
    }
  }
);
