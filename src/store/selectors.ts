import { AppStateType } from "./store";

export const getStatus = (state: AppStateType) => state.appStatus.status;
export const getError = (state: AppStateType) => state.appStatus.error;
export const getIsLoggedIn = (state: AppStateType) => state.auth.isLoggedIn;
export const getIsInitialized = (state: AppStateType) =>
  state.appStatus.isInitialized;
