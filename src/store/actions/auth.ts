import { UserType } from "../type";

export const loginAC = (value: boolean) => {
  return { type: "SET-USER", value } as const;
};
export const initializeApp = () => ({ type: "INITIALIZE-CALL" });
export const loginCallWorkerSaga = (user: UserType) => ({
  type: "LOGIN-CALL",
  user,
});
export const logoutCallWorkerSaga = () => ({
  type: "LOGOUT-CALL",
});
