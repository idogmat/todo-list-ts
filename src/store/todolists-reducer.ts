import { FilterValuesType } from "../components/TodoListContainer";
import { API } from "../api/api";
import { TodoListsAPIType } from "../api/type";
import { AppThunkActionType } from "./store";
import { changeStatusError, RequestStatusType } from "./app-reducer";
import { handleServerNetworkError } from "../utils/errorUtils";

const ADD_TODOLIST = "ADD_TODOLIST";
const REMOVE_TODOLIST = "REMOVE-TODOLIST";
const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER";
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE";
const CHANGE_TODOLIST_INPUT = "CHANGE-TODOLIST-INPUT";
const SET_TODOLISTS = "SET-TODOLISTS";
const CHANGE_ENTITY_STATUS = "CHANGE-ENTITY-STATUS";
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
    case ADD_TODOLIST:
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
    case REMOVE_TODOLIST:
      return state.filter((tl) => tl.id !== action.todoListId);
    case CHANGE_TODOLIST_FILTER:
      return state.map((tl) =>
        tl.id === action.todoListId
          ? { ...tl, filter: action.filter }
          : { ...tl }
      );
    case CHANGE_TODOLIST_INPUT:
      return state.map((tl) =>
        tl.id === action.todoListId ? { ...tl, text: action.text } : { ...tl }
      );
    case CHANGE_TODOLIST_TITLE:
      return state.map((tl) =>
        tl.id === action.todoListId ? { ...tl, title: action.title } : { ...tl }
      );
    case CHANGE_ENTITY_STATUS:
      return state.map((tl) =>
        tl.id === action.todoListId
          ? { ...tl, entityStatus: action.entityStatus }
          : { ...tl }
      );
    case SET_TODOLISTS:
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
export const addTodoList = (todoList: TodoListsAPIType) => {
  return { type: ADD_TODOLIST, todoList } as const;
};
//generate id for 2 reducers/important made action.type for both reducers
export const removeTodoList = (todoListId: string) => {
  return { type: REMOVE_TODOLIST, todoListId } as const;
};
export const changeTodoListInput = (todoListId: string, text: string) => {
  return { type: CHANGE_TODOLIST_INPUT, todoListId, text } as const;
};
export const changeTodoListFilter = (
  todoListId: string,
  filter: FilterValuesType
) => {
  return { type: CHANGE_TODOLIST_FILTER, todoListId, filter } as const;
};
export const changeFieldTodolistTitle = (todoListId: string, title: string) => {
  return { type: CHANGE_TODOLIST_TITLE, todoListId, title } as const;
};
export const setTodoLists = (todoLists: todoListsFromAPIType[]) => {
  return { type: SET_TODOLISTS, todoLists } as const;
};

export const changeEntityStatusTodolist = (
  todoListId: string,
  entityStatus: RequestStatusType
) => {
  return { type: CHANGE_ENTITY_STATUS, todoListId, entityStatus } as const;
};

export const fetchTodolist = (): AppThunkActionType => async (dispatch) => {
  dispatch(changeStatusError("loading"));
  try {
    const res = await API.getTodolists();
    console.log(res);
    dispatch(setTodoLists(res.data));
    dispatch(changeStatusError("succeeded"));
    // setResultUtils<todoListsFromAPIType[]>(setTodoLists,res.data,dispatch)
  } catch (e: any) {
    console.log(e, "errr");
    handleServerNetworkError(e.message, dispatch);
  }
};
// export type ThunkAction<
//     R, // Return type of the thunk function
//     S, // state type used by getState
//     E, // any "extra argument" injected into the thunk
//     A extends Action // known types of actions that can be dispatched
//     > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
export const addTodolistTC =
  (title: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError("loading"));
    try {
      const res = await API.addTodolist(title);
      dispatch(addTodoList(res));
      dispatch(changeStatusError("succeeded"));
      // setResultUtils<TodoListsAPIType>(addTodoList,res,dispatch)
    } catch (e: any) {
      // console.log(e)
      handleServerNetworkError(e.message, dispatch);
    }
  };
export const removeTodolistTC =
  (todolistId: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError("loading"));
    dispatch(changeEntityStatusTodolist(todolistId, "loading"));
    try {
      const res = await API.deleteTodolist(todolistId);
      if (res.data.resultCode === 0) {
        dispatch(removeTodoList(todolistId));
        dispatch(changeEntityStatusTodolist(todolistId, "succeeded"));
        dispatch(changeStatusError("succeeded"));
      }
    } catch (e: any) {
      handleServerNetworkError(e.message, dispatch);
    }
  };
export const updateTodolistTitleTC =
  (todolistId: string, title: string): AppThunkActionType =>
  async (dispatch) => {
    dispatch(changeStatusError("loading"));
    dispatch(changeEntityStatusTodolist(todolistId, "loading"));
    try {
      const res = await API.updateTodolistTitle(todolistId, title);
      if (res === 0) {
        dispatch(changeFieldTodolistTitle(todolistId, title));
        dispatch(changeEntityStatusTodolist(todolistId, "succeeded"));
        dispatch(changeStatusError("succeeded"));
      }
    } catch (e: any) {
      handleServerNetworkError(e.message, dispatch);
    }
  };
