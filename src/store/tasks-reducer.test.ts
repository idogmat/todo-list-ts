import axios from "axios"; //for tests

import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
  setTasksAC,
  tasksReducer,
  TasksStateType,
} from "./tasks-reducer";
import { addTodoList } from "./actions/todolists";

test("tasksReducer-remove", () => {
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
  const action = removeTask("todoListsId2", "222");
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
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
  });
});
test("tasksReducer-add", () => {
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
        todoListId: "todoListsId2",
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
        todoListId: "todoListsId2",
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
        todoListId: "todoListsId2",
        id: "333",
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
  const action = addTask("todoListsId2", {
    todoListId: "todoListsId2",
    id: "777",
    title: "choton novoe",
    status: 0,
    addedDate: "1",
    order: 0,
    startDate: "1",
    deadline: "2",
    description: "omg",
    priority: 0,
  });
  const endState = tasksReducer(startState, action);

  expect(endState["todoListsId2"].length).toBe(3);
  expect(endState["todoListsId2"][0].title).toBe("choton novoe");
  expect(endState["todoListsId2"][0].id).toBe("777");
});
test("tasksReducer-change_title", () => {
  let startState: TasksStateType = {
    todoListsId1: [
      {
        todoListId: "0",
        id: "333",
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
        id: "444",
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
  };
  const action = changeTaskTitle("todoListsId2", "444", "choton novoe");
  const endState = tasksReducer(startState, action);

  expect(endState["todoListsId2"].length).toBe(2);
  expect(endState["todoListsId2"][0].title).toBe("choton novoe");
});
test("tasksReducer-change_status", () => {
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
        id: "444",
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
  };
  const action = changeTaskStatus("todoListsId2", "444", 1);
  const endState = tasksReducer(startState, action);

  expect(endState["todoListsId2"].length).toBe(2);
  expect(endState["todoListsId2"][0].status).toBe(1);
});
test("tasksReducer-add_todoList-Tasks", () => {
  let startState: TasksStateType = {
    todoListsId1: [
      {
        todoListId: "0",
        id: "444",
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
        id: "444",
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
        id: "444",
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
        id: "444",
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
    id: "444",
    title: "HTML&CSS",
    addedDate: "1",
    order: 0,
  });
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todoListsId1" && k != "todoListsId2");
  if (!newKey) throw new Error("new key should be uniq");

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("tasksReducer-add_todoList-Tasks-load", () => {
  let startState: TasksStateType = {
    todoListsId1: [],
    todoListsId2: [
      {
        todoListId: "0",
        id: "444",
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
        id: "444",
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
  const action = setTasksAC("todoListsId1", startState["todoListsId2"]);
  const endState = tasksReducer({ todoListsId1: [], todoListsId2: [] }, action);
  expect(endState["todoListsId1"].length).toBe(2);
});
