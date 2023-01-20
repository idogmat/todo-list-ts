import { loginCallWorkerSaga } from "../actions/auth";

//auth
export type UserType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type UserParamsType = ReturnType<typeof loginCallWorkerSaga>;

//app
