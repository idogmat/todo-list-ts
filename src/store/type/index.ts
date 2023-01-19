import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { rootReducer } from "../store";

export type AppStateType = ReturnType<typeof rootReducer>;

//type for all thunks
export type AppThunkActionType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AnyAction
>;

export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
//use that for dispatch without connect
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
//use that for select params without connect
//all actionTypes
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType;
  dispatch: AppDispatch;
  rejectValue: any;
}>();
//for use thunk like pro add middleware type thunk
