import { RequestStatusType } from "./app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAC } from "./auth-reducer";

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListsFromAPIType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  error: boolean;
  text: string;
  order: number;
  addedDate: string;
  entityStatus: RequestStatusType;
};

const initialState: Array<TodoListType> = [];
const slice = createSlice({
  name: "todolist",
  initialState: initialState,
  reducers: {
    addTodoList(
      state,
      action: PayloadAction<{ todolist: TodoListsFromAPIType }>
    ) {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        error: false,
        text: "",
        entityStatus: "idle",
      });
    },
    removeTodoList(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    changeTodoListInput(
      state,
      action: PayloadAction<{ todolistId: string; text: string }>
    ) {
      state.forEach((tl) =>
        tl.id === action.payload.todolistId
          ? (tl.text = action.payload.text)
          : ""
      );
    },
    changeTodoListFilter(
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>
    ) {
      state.forEach((tl) =>
        tl.id === action.payload.todolistId
          ? (tl.filter = action.payload.filter)
          : ""
      );
    },
    changeFieldTodolistTitle(
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) {
      state.forEach((tl) =>
        tl.id === action.payload.todolistId
          ? (tl.title = action.payload.title)
          : ""
      );
    },
    setTodoLists(
      state,
      action: PayloadAction<{ todolists: TodoListsFromAPIType[] }>
    ) {
      action.payload.todolists.forEach((tl) =>
        state.push({
          id: tl.id,
          title: tl.title,
          filter: "all",
          error: false,
          text: "",
          order: tl.order,
          addedDate: tl.addedDate,
          entityStatus: "idle",
        })
      );
    },
    changeEntityStatusTodolist(
      state,
      action: PayloadAction<{
        todolistId: string;
        entityStatus: RequestStatusType;
      }>
    ) {
      state.forEach((tl) =>
        tl.id === action.payload.todolistId
          ? (tl.entityStatus = action.payload.entityStatus)
          : ""
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAC, (state, action) => {
      !action.payload.value && (state.length = 0);
    });
  },
});

export const {
  addTodoList,
  removeTodoList,
  changeTodoListInput,
  changeTodoListFilter,
  changeFieldTodolistTitle,
  setTodoLists,
  changeEntityStatusTodolist,
} = slice.actions;
export const todoListsReducer = slice.reducer;
