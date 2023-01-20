import { FilterValuesType } from "../components/TodoListContainer";
import { RequestStatusType } from "./app-reducer";
import {
  addTodoList,
  changeFieldTodolistTitle,
  changeTodoListFilter,
  changeTodoListInput,
  removeTodoList,
  setTodoLists,
} from "./actions/todolists";

export type todoListsFromAPIType = {
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
export type AddTodoListType = ReturnType<typeof addTodoList>;
export type RemoveTodoListType = ReturnType<typeof removeTodoList>;
export type SetTodoListsType = ReturnType<typeof setTodoLists>;
type ChangeTodoListInputType = ReturnType<typeof changeTodoListInput>;
type ChangeTodoListFilterType = ReturnType<typeof changeTodoListFilter>;
type ChangeFieldTodolistTitleType = ReturnType<typeof changeFieldTodolistTitle>;
type ChangeEntityStatusTodolist = ReturnType<typeof changeEntityStatusTodolist>;

export type TodolistActionType =
  | AddTodoListType
  | RemoveTodoListType
  | ChangeTodoListInputType
  | ChangeTodoListFilterType
  | ChangeFieldTodolistTitleType
  | SetTodoListsType
  | ChangeEntityStatusTodolist;

const initialState: Array<TodoListType> = [
  // {id:'todoListsId1',title:'React',addedDate:'1', order:1,filter:'all', error:false, text:''  },
  // {id:'todoListsId2',title:'React',addedDate:'1',order:1,filter:'all', error:false, text:''  }
];

export const todoListsReducer = (
  state: Array<TodoListType> = initialState,
  action: TodolistActionType
): TodoListType[] => {
  switch (action.type) {
    case "ADD-TODOLIST":
      return [
        {
          ...action.todoList,
          filter: "all",
          error: false,
          text: "",
          entityStatus: "idle",
        },
        ...state,
      ];
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.todoListId);
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.todoListId
          ? { ...tl, filter: action.filter }
          : { ...tl }
      );
    case "CHANGE-TODOLIST-INPUT":
      return state.map((tl) =>
        tl.id === action.todoListId ? { ...tl, text: action.text } : { ...tl }
      );
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.todoListId ? { ...tl, title: action.title } : { ...tl }
      );
    case "CHANGE-ENTITY-STATUS":
      return state.map((tl) =>
        tl.id === action.todoListId
          ? { ...tl, entityStatus: action.entityStatus }
          : { ...tl }
      );
    case "SET-TODOLISTS":
      return action.todoLists.map((tl) => ({
        id: tl.id,
        title: tl.title,
        filter: "all",
        error: false,
        text: "",
        order: tl.order,
        addedDate: tl.addedDate,
        entityStatus: "idle",
      }));
    default:
      return state;
  }
};

export const changeEntityStatusTodolist = (
  todoListId: string,
  entityStatus: RequestStatusType
) => {
  return { type: "CHANGE-ENTITY-STATUS", todoListId, entityStatus } as const;
};
