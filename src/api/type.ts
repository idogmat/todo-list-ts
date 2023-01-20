import { TaskStatusType } from "../store/tasks-reducer";

export type ResponseUserType = {
  userId: number;
};
export type TodoListsAPIType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};
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
export type CreateTaskResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  statusTest: string;
  data: {
    item: TaskResponseType;
  };
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
  statusText: string;
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
  statusTest: string;
  data: D;
};
export type AuthMeType = Omit<UpdateTodolistResponseType, "data">;
export type LogoutType = ResponseType<CreateTaskResponseType>;
export type DeleteTaskType = Pick<
  CreateTaskResponseType,
  "resultCode" | "messages"
>;
