import { TodoListsAPIType } from "../../api/type";
import { FilterValuesType } from "../../components/TodoListContainer";
import { todoListsFromAPIType } from "../todolists-reducer";

export const addTodoList = (todoList: TodoListsAPIType) => {
  return { type: "ADD-TODOLIST", todoList } as const;
};
export const removeTodoList = (todoListId: string) => {
  return { type: "REMOVE-TODOLIST", todoListId } as const;
};
export const changeTodoListInput = (todoListId: string, text: string) => {
  return { type: "CHANGE-TODOLIST-INPUT", todoListId, text } as const;
};
export const changeTodoListFilter = (
  todoListId: string,
  filter: FilterValuesType
) => {
  return { type: "CHANGE-TODOLIST-FILTER", todoListId, filter } as const;
};
export const changeFieldTodolistTitle = (todoListId: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", todoListId, title } as const;
};
export const setTodoLists = (todoLists: todoListsFromAPIType[]) => {
  return { type: "SET-TODOLISTS", todoLists } as const;
};

export const fetchTodolistCallWorkerSaga = () => ({
  type: "FETCH-TODOLIST-CALL",
});
export const addTodolistCallWorkerSaga = (title: string) => ({
  type: "ADD-TODOLIST-CALL",
  title,
});
export const removeTodolistCallWorkerSaga = (todolistId: string) => ({
  type: "REMOVE-TODOLIST-CALL",
  todolistId,
});
export const updateTodolistTitleCallWorkerSaga = (
  todolistId: string,
  title: string
) => ({
  type: "UPDATE-TODOLIST-CALL",
  todolistId,
  title,
});
