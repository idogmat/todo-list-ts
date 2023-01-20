import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import {
  addTaskWorkerSaga,
  fetchTaskWorkerSaga,
  removeTaskWorkerSaga,
  TaskActionType,
  tasksReducer,
} from "./tasks-reducer";
import { TodolistActionType, todoListsReducer } from "./todolists-reducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer, AppActionsType } from "./app-reducer";
import { AuthActionsType, authReducer } from "./auth-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import {
  authMeWorkerSaga,
  loginWorkerSaga,
  logoutWorkerSaga,
} from "./sagaWorkers/auth";

//store

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer,
  appStatus: appReducer,
  auth: authReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
//for use thunk like pro add middleware type thunk
sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield takeEvery("INITIALIZE-CALL", authMeWorkerSaga);
  yield takeEvery("LOGIN-CALL", loginWorkerSaga);
  yield takeEvery("LOGOUT-CALL", logoutWorkerSaga);
  yield takeEvery("FETCH-TASKS-CALL", fetchTaskWorkerSaga);
  yield takeEvery("REMOVE-TASK-CALL", removeTaskWorkerSaga);
  yield takeEvery("ADD-TASK-CALL", addTaskWorkerSaga);
}

export default store;
//store

// function* rootWorker() {
//   alert("ok");
// }
// function* rootWatcher() {
//   yield takeEvery("ACTIVATOR-ACTION-TYPE", rootWorker);
// }
// setTimeout(() => {
//   // @ts-ignore
//   store.dispatch({ type: "ACTIVATOR-ACTION-TYPE" });
// }, 2000);

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
//type for all thunks
// export type AppThunkActionType = ThunkAction<void,AppStateType,unknown,AppActionTypes>
export type AppThunkActionType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionTypes
>;

export type AppThunkDispatch = ThunkDispatch<
  AppStateType,
  unknown,
  AppActionTypes
>;
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
//use that for dispatch without connect
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
//use that for select params without connect
//all actionTypes

export type AppActionTypes =
  | TodolistActionType
  | TaskActionType
  | AppActionsType
  | AuthActionsType;

//@ts-ignore
window.store = store;
