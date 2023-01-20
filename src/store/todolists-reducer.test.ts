import { v1 } from "uuid";
import axios from "axios"; //for tests
import { TodoListType, todoListsReducer } from "./todolists-reducer";
import {
  addTodoList,
  changeFieldTodolistTitle,
  changeTodoListFilter,
  removeTodoList,
  setTodoLists,
} from "./actions/todolists";

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
  const endState = todoListsReducer(startState, removeTodoList("todoListsId1"));

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
    addTodoList({
      id: todoListsId2,
      title: "test text",
      addedDate: "1",
      order: 1,
    })
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
    changeFieldTodolistTitle(todoListsId2, "changed Title")
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
    changeTodoListFilter(todoListsId2, "completed")
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

  const endState = todoListsReducer([], setTodoLists(newTodoLists));

  expect(endState.length).toBe(2);
});
