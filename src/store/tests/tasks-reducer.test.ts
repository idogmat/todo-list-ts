import { fetchTasks, tasksReducer, TasksStateType } from "../tasks-reducer";
import { addTodolist } from "../thunks/todolistsThunks";
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
} from "../thunks/tasksThunks";
import { TaskResponseType } from "../../api/type";

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
  const action = deleteTask.fulfilled(
    {
      todolistId: "todoListsId2",
      taskId: "222",
    },
    "requestId",
    { todolistId: "todoListsId2", taskId: "222" }
  );
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
  const param = {
    todolistId: "todoListsId2",
    task: {
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
    },
  };
  const action = addTask.fulfilled(
    {
      todolistId: "todoListsId2",
      task: {
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
      },
    },
    "requestId",
    {
      todolistId: "todoListsId2",
      title: "choton novoe",
    }
  );
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
  const action = changeTaskTitle.fulfilled(
    {
      todolistId: "todoListsId2",
      taskId: "444",
      title: "choton novoe",
    },
    "test",
    { todolistId: "todoListsId2", taskId: "444", title: "choton novoe" }
  );
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
  const action = changeTaskStatus.fulfilled(
    {
      todolistId: "todoListsId2",
      taskId: "444",
      status: 1,
    },
    "sss",
    {
      todolistId: "todoListsId2",
      taskId: "444",
      task: {
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
    }
  );
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
  const action = addTodolist.fulfilled(
    {
      todolist: {
        id: "444",
        title: "HTML&CSS",
        addedDate: "1",
        order: 0,
      },
    },
    "type",
    "HTML&CSS"
  );
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todoListsId1" && k != "todoListsId2");
  if (!newKey) throw new Error("new key should be uniq");

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("tasksReducer-add_todoList-Tasks-load", () => {
  let add: TaskResponseType[] = [
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
    },
  ];
  let startState: TasksStateType = {
    todoListsId1: [],
  };
  const action = fetchTasks.fulfilled(
    { todolistId: "todoListsId1", tasks: add },
    "",
    "todoListsId1"
  );
  const endState = tasksReducer({ todoListsId1: [], todoListsId2: [] }, action);
  expect(endState["todoListsId1"].length).toBe(2);
});
