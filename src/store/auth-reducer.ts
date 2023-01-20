import { loginAC } from "./actions/auth";

type InitialStateType = typeof initialState;
export type AuthActionsType = ReturnType<typeof loginAC>;
export const initialState = {
  isLoggedIn: false,
};
export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET-USER":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
