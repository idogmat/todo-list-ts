import { TaskStatusType } from "../store/tasks-reducer";

export type ResponseUserType = {
  userId: number;
};
export type TodoListsAPIType = Pick<
  TaskResponseType,
  "addedDate" | "id" | "order" | "title"
>;
export type TaskResponseType = {
  addedDate: string;
  deadline: string | null;
  status: TaskStatusType;
  id: string;
  title: string;
  description: string | null;
  todoListId: string;
  order: number;
  priority: number;
  startDate: string | null;
};
export type TasksObjType = {
  error: any;
  items: TaskResponseType[];
  totalCount: number;
};
export type CreateTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  item: TodoListsAPIType;
};
export type UpdateTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {};
};

export type DeleteTaskResponseType = {
  data: {
    resultCode: number;
    messages: Array<string>;
    fieldsErrors: Array<string>;
    data: {};
  };
};
export type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};
export type CreateTaskResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {
    item: TaskResponseType;
  };
};
