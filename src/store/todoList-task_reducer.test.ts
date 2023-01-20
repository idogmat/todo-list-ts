import { tasksReducer, TasksStateType } from "./tasks-reducer";
import axios from "axios";
import { todoListsReducer, TodoListType } from "./todolists-reducer";
import { addTodoList, removeTodoList } from "./actions/todolists";
//for tests
test("tasksReducer-add_todoList-Tasks", () => {
  const todoListState: Array<TodoListType> = [
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
  let startState: TasksStateType = {
    todoListsId1: [
      {
        todoListId: "0",
        id: "222",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
      {
        todoListId: "0",
        id: "222",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
    ],
    todoListsId2: [
      {
        todoListId: "0",
        id: "222",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
      {
        todoListId: "0",
        id: "111",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
    ],
  };
  const action = addTodoList({
    id: "111",
    title: "HTML&CSS",
    addedDate: "1",
    order: 0,
  });
  const endTasksState = tasksReducer(startState, action);
  const endTodoListState = todoListsReducer(todoListState, action);
  const keys = Object.keys(endTasksState);
  const newKey = keys.find((k) => k != "todoListsId1" && k != "todoListsId2");
  if (!newKey) throw new Error("new key should be uniq");

  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListState[0].id;
  expect(keys.length).toBe(3);
  expect(idFromTasks).toBe(action.todoList.id);
  // expect(idFromTodoLists).toBe(action.todoListId)
});
test("tasksReducer-remove_todoList-Tasks", () => {
  const todoListState: Array<TodoListType> = [
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
  let startState: TasksStateType = {
    todoListsId1: [
      {
        todoListId: "0",
        id: "222",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
      {
        todoListId: "0",
        id: "222",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
    ],
    todoListsId2: [
      {
        todoListId: "0",
        id: "222",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
      {
        todoListId: "0",
        id: "111",
        title: "HTML&CSS",
        status: 0,
        addedDate: "1",
        order: 0,
        startDate: "1",
        deadline: "2",
        description: "omg",
        priority: 0,
        entityStatus: "idle",
      },
    ],
  };
  const action = removeTodoList("todoListsId1");
  const endTasksState = tasksReducer(startState, action);
  const endTodoListState = todoListsReducer(todoListState, action);
  const keys = Object.keys(endTodoListState);

  expect(keys.length).toBe(1);
});
