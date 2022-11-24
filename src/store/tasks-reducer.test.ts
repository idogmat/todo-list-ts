import {v1} from "uuid";
import {
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodoList} from "./todulists-reducer";

test('tasksReducer-remove',()=>{
let startState:TasksStateType={
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
const action = removeTask('1','todoListsId2')
    const endState=tasksReducer(startState,action)

    expect(endState).toEqual({
        "todoListsId1": [{id: '0', title: "HTML&CSS", isDone: true},
            {id: '1', title: "JS", isDone: true},
            {id: '2', title: "ReactJS", isDone: false},
            {id: '3', title: "Hello world", isDone: true},
            {id: '4', title: "I am Happy", isDone: false},
        ],
        'todoListsId2': [
            {id: '2', title: "JS", isDone: true},
        ]
    })

})
test('tasksReducer-add',()=>{
    let startState:TasksStateType={
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
    const action = addTask('todoListsId2','choton novoe')
    const endState=tasksReducer(startState,action)

    expect(endState['todoListsId2'].length).toBe(3)
    expect(endState['todoListsId2'][0].title).toBe('choton novoe')
    expect(endState['todoListsId2'][0].isDone).toBe(false)

})
test('tasksReducer-change_title',()=>{
    let todoListsId1 = v1();
    let todoListsId2 = v1();

    let startState:TasksStateType={
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
    const action = changeTaskTitle('todoListsId2','1','choton novoe')
    const endState=tasksReducer(startState,action)

    expect(endState['todoListsId2'].length).toBe(2)
    expect(endState['todoListsId2'][0].title).toBe('choton novoe')


})
test('tasksReducer-change_status',()=>{

    let startState:TasksStateType={
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
    const action = changeTaskStatus('todoListsId2','1',false)
    const endState=tasksReducer(startState,action)

    expect(endState['todoListsId2'].length).toBe(2)
    expect(endState['todoListsId2'][0].isDone).toBe(false)

})
test('tasksReducer-add_todoList-Tasks',()=>{

    let startState:TasksStateType={
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
    const endState=tasksReducer(startState,action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k=>k!='todoListsId1'&&k!='todoListsId2')
    if(!newKey) throw new Error("new key should be uniq")

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
