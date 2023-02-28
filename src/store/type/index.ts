import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { rootReducer } from "../store";

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppThunkActionType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AnyAction
>;

export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType;
  dispatch: AppDispatch;
  rejectValue: any;
}>();
export type UserType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
