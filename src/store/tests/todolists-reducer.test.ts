import { v1 } from "uuid";
import axios from "axios"; //for tests
import {
  TodoListType,
  todoListsReducer,
  changeFieldTodolistTitle,
  changeTodoListFilter,
} from "../todolists-reducer";
import {
  addTodolist,
  fetchTodolist,
  removeTodolist,
} from "../thunks/todolistsThunks";

test("todolist-remove", () => {
  const startState: Array<TodoListType> = [
    {
      id: "todoListsId1",
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
    {
      id: "todoListsId2",
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
  ];
  const endState = todoListsReducer(
    startState,
    removeTodolist.fulfilled(
      { todolistId: "todoListsId1" },
      "type",
      "todoListsId1"
    )
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe("todoListsId2");
});

test("todolist-Add", () => {
  let todoListsId1 = v1();
  let todoListsId2 = v1();
  const startState: Array<TodoListType> = [
    {
      id: todoListsId1,
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
    {
      id: todoListsId2,
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
  ];

  const endState = todoListsReducer(
    startState,
    addTodolist.fulfilled(
      {
        todolist: {
          id: "todoListsId2",
          title: "test text",
          addedDate: "1",
          order: 1,
        },
      },
      "type",
      "test text"
    )
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("test text");
});
test("todolist-changeTitle", () => {
  let todoListsId1 = v1();
  let todoListsId2 = v1();
  const startState: Array<TodoListType> = [
    {
      id: todoListsId1,
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
    {
      id: todoListsId2,
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
  ];

  const endState = todoListsReducer(
    startState,
    changeFieldTodolistTitle({
      todolistId: todoListsId2,
      title: "changed Title",
    })
  );

  expect(endState.length).toBe(2);
  expect(endState[1].title).toBe("changed Title");
});
test("todolist-Filter", () => {
  let todoListsId1 = v1();
  let todoListsId2 = v1();
  const startState: Array<TodoListType> = [
    {
      id: todoListsId1,
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
    {
      id: todoListsId2,
      title: "React",
      addedDate: "1",
      order: 1,
      filter: "all",
      error: false,
      text: "",
      entityStatus: "idle",
    },
  ];

  const endState = todoListsReducer(
    startState,
    changeTodoListFilter({ todolistId: todoListsId2, filter: "completed" })
  );

  expect(endState.length).toBe(2);
  expect(endState[1].filter).toBe("completed");
});
test("todolist-set-todolists", () => {
  const newTodoLists = [
    {
      id: "todoListsId1",
      title: "first",
      filter: "all",
      error: false,
      text: "",
      order: 1,
      addedDate: "212",
      entityStatus: "idle",
    },
    {
      id: "todoListsId2",
      title: "first",
      filter: "all",
      error: false,
      text: "",
      order: 1,
      addedDate: "212",
      entityStatus: "idle",
    },
  ];

  const endState = todoListsReducer(
    [],
    fetchTodolist.fulfilled({ todolists: newTodoLists }, "type")
  );

  expect(endState.length).toBe(2);
});
