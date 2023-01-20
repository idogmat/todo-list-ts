import { loginCallWorkerSaga } from "../actions/auth";
import {
  addTaskCallWorkerSaga,
  changeStatusCallWorkerSaga,
  changeTaskTitleCallWorkerSaga,
  fetchTaskCallWorkerSaga,
  removeTaskCallWorkerSaga,
} from "../actions/tasks";
import {
  addTodolistCallWorkerSaga,
  removeTodolistCallWorkerSaga,
  updateTodolistTitleCallWorkerSaga,
} from "../actions/todolists";

//auth
export type UserType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type UserParamsType = ReturnType<typeof loginCallWorkerSaga>;

//tasks
export type FetchParamsType = ReturnType<typeof fetchTaskCallWorkerSaga>;
export type removeParamsType = ReturnType<typeof removeTaskCallWorkerSaga>;
export type addTaskParamsType = ReturnType<typeof addTaskCallWorkerSaga>;
export type changeTaskTitleParamsType = ReturnType<
  typeof changeTaskTitleCallWorkerSaga
>;
export type changeStatusParamsType = ReturnType<
  typeof changeStatusCallWorkerSaga
>;
//todolist
export type updateTodolistTitleParamsType = ReturnType<
  typeof updateTodolistTitleCallWorkerSaga
>;
export type removeTodolistParamsType = ReturnType<
  typeof removeTodolistCallWorkerSaga
>;

export type addTodolistParamsType = ReturnType<
  typeof addTodolistCallWorkerSaga
>;
