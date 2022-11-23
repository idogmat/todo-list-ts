import {removeTask, tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodoList, removeTodoList, TodoListType, todoListsReducer} from "./todulists-reducer";

test('tasksReducer-add_todoList-Tasks', () => {
    const todoListState: Array<TodoListType> = [
        {id: 'todoListsId1', title: 'first', filter: 'all', error: false, text: ''},
        {id: 'todoListsId2', title: 'first', filter: 'all', error: false, text: ''}
    ]
    let startState: TasksStateType = {
        "todoListsId1": [{id: '0', title: "HTML&CSS", isDone: true},
            {id: '1', title: "JS", isDone: true},
            {id: '2', title: "ReactJS", isDone: false},
            {id: '3', title: "Hello world", isDone: true},
            {id: '4', title: "I am Happy", isDone: false},
        ],
        'todoListsId2': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
        ]
    }
    const action = addTodoList('NEW TODOLIST ')
    const endTasksState = tasksReducer(startState, action)
    const endTodoListState = todoListsReducer(todoListState, action)
    const keys = Object.keys(endTasksState)
    const newKey = keys.find(k => k != 'todoListsId1' && k != 'todoListsId2')
    if (!newKey) throw new Error("new key should be uniq")


    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListState[0].id
    expect(keys.length).toBe(3)
    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)


})
test('tasksReducer-remove_todoList-Tasks', () => {
    const todoListState: Array<TodoListType> = [
        {id: 'todoListsId1', title: 'first', filter: 'all', error: false, text: ''},
        {id: 'todoListsId2', title: 'first', filter: 'all', error: false, text: ''}
    ]
    let startState: TasksStateType = {
        "todoListsId1": [{id: '0', title: "HTML&CSS", isDone: true},
            {id: '1', title: "JS", isDone: true},
            {id: '2', title: "ReactJS", isDone: false},
            {id: '3', title: "Hello world", isDone: true},
            {id: '4', title: "I am Happy", isDone: false},
        ],
        'todoListsId2': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
        ]
    }
    const action = removeTodoList('todoListsId1')
    const endTasksState = tasksReducer(startState, action)
    const endTodoListState = todoListsReducer(todoListState, action)
    const keys = Object.keys(endTodoListState)

    expect(keys.length).toBe(1)
})