export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
  isInitialized: false as boolean,
};
export type AppActionsType =
  | ReturnType<typeof changeStatusError>
  | ReturnType<typeof setError>
  | ReturnType<typeof setInitialized>;

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-INITIALIZED":
      return { ...state, isInitialized: action.initialized };
    default:
      return state;
  }
};

export const changeStatusError = (status: RequestStatusType) => {
  return { type: "APP/SET-STATUS", status } as const;
};
export const setError = (error: null | string) => {
  return { type: "APP/SET-ERROR", error } as const;
};
export const setInitialized = (initialized: boolean) => {
  return { type: "APP/SET-INITIALIZED", initialized } as const;
};
