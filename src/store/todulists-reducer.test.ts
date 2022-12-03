import {v1} from "uuid";

import {addTodoList, removeTodoList, TodoListType, todoListsReducer, setTodoLists} from "./todolists-reducer";


test('todolist-remove', () => {

    const startState: Array<TodoListType> = [
        {id: 'todoListsId1', title: 'first', filter: 'all', error: false, text: ''},
        {id: 'todoListsId2', title: 'first', filter: 'all', error: false, text: ''}
    ]
    const endState = todoListsReducer(startState, removeTodoList('todoListsId1'))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('todoListsId2')

})

test('todolist-Add', () => {
    let todoListsId1 = v1();
    let todoListsId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
        {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
    ]

    const endState = todoListsReducer(startState, addTodoList('test text'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('test text')

})
test('todolist-changeTitle', () => {
    let todoListsId1 = v1();
    let todoListsId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
        {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
    ]

    const endState = todoListsReducer(startState, {
        type: "CHANGE-TODOLIST-TITLE",
        todoListId: todoListsId2,
        text: 'changed Title'
    })

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('changed Title')

})
test('todolist-Filter', () => {
    let todoListsId1 = v1();
    let todoListsId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
        {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
    ]

    const endState = todoListsReducer(startState, {
        type: "CHANGE-TODOLIST-FILTER",
        todoListId: todoListsId2,
        status: 'completed'
    })

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe('completed')

})
// test('todolist-set-todolists', () => {
//     const newTodoLists = [
//         {id: 'todoListsId1', title: 'first', filter:'all', error: false, text: '', order: 1,addedDate:'212'},
//         {id: 'todoListsId2', title: 'first', filter:'all', error: false, text: '', order: 1,addedDate:'212'}
//     ]
//
//
//     const endState = todoListsReducer([], setTodoLists(newTodoLists))
//
//     expect(endState.length).toBe(2)
//
// })