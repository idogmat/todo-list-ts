import { RequestStatusType } from "./app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTodolist,
  fetchTodolist,
  removeTodolist,
} from "./thunks/todolistsThunks";

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
const initialState: Array<TodoListType> = [
  // {id:'todoListsId1',title:'React',addedDate:'1', order:1,filter:'all', error:false, text:''  },
  // {id:'todoListsId2',title:'React',addedDate:'1',order:1,filter:'all', error:false, text:''  }
];

const slice = createSlice({
  name: "todolist",
  initialState: initialState,
  reducers: {
    addTodoList(
      state,
      action: PayloadAction<{ todolist: TodoListsFromAPIType }>
    ) {},
    removeTodoList(state, action: PayloadAction<{ todolistId: string }>) {},
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
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      !!action.payload &&
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          error: false,
          text: "",
          entityStatus: "idle",
        });
    });
    builder.addCase(fetchTodolist.fulfilled, (state, action) => {
      state.length = 0;
      !!action.payload &&
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
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.findIndex(
          (tl) => tl.id === action.payload?.todolistId
        );
        if (index > -1) {
          state.splice(index, 1);
        }
      }
    });
  },
});

export const {
  changeTodoListInput,
  changeTodoListFilter,
  changeFieldTodolistTitle,
  changeEntityStatusTodolist,
} = slice.actions;
export const todoListsReducer = slice.reducer;
