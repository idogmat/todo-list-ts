import {v1} from "uuid";
import {TodoList, todoListsReducer} from "./todulists-reducer";



test('todolist-remove',()=>{
    let todoListsId1 = v1();
    let todoListsId2 = v1();
    const startState:Array<TodoList>=[
        {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
        {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
    ]
    const endState=todoListsReducer(startState,{type:"REMOVE-TODOLIST",id:todoListsId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListsId2)

})

test('todolist-Add',()=>{
    let todoListsId1 = v1();
    let todoListsId2 = v1();
    const startState:Array<TodoList>=[
        {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
        {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
    ]

    const endState=todoListsReducer(startState,{type:"ADD_TODOLIST",text:'test text'})

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('test text')

})
test('todolist-remove',()=>{
    let todoListsId1 = v1();
    let todoListsId2 = v1();
    const startState:Array<TodoList>=[
        {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
        {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
    ]

    const endState=todoListsReducer(startState,{type:"CHANGE-TODOLIST-TITLE",id:todoListsId2,text:'changed Title'})

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('changed Title')

})
test('todolist-Filter',()=>{
    let todoListsId1 = v1();
    let todoListsId2 = v1();
    const startState:Array<TodoList>=[
        {id: todoListsId1, title: 'first', filter: 'all', error: false, text: ''},
        {id: todoListsId2, title: 'first', filter: 'all', error: false, text: ''}
    ]

    const endState=todoListsReducer(startState,{type:"CHANGE-TODOLIST-FILTER",id:todoListsId2,status:'completed'})

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe('completed')

})