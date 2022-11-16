import React, {useState} from 'react';
import './App.css';
import TodoList, {PropsType} from "./components/TodoList";
import {v1} from 'uuid';
// import s from "./components/style.module.css";
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active'
type IDType = string
type TodoLists = {
    id: IDType
    title: string
    filter: FilterValuesType
    error:boolean
    text:string
}

function App() {
    let todoListsId1 = v1();
    let todoListsId2 = v1();

    let [tasks, setTasks] = useState({
        [todoListsId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
        ],
        [todoListsId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ]
    })
    let [todoLists, setTodoListFilter] = useState<Array<TodoLists>>(
        [{id: todoListsId1, title: 'gggg', filter: 'all',error:false,text:''}])

    const changeError=(type:boolean,inputId:string) => {
        let error = todoLists.find(el => el.id === inputId)
        if(error) {
            error.error = type
        }
        setTodoListFilter([...todoLists])
    }
    const setFilterType = (type: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = type
            setTodoListFilter([...todoLists])
        }
    }

    function removeTask(id: string, todoListId: string) {
        let newArr= tasks[todoListId]
        let newTasks=newArr.filter(el => el.id !== id)
        tasks[todoListId]=newTasks
        setTasks({...tasks})
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        let newTasks = {...tasks}
        newTasks[todoListId].find(el => {
            return el.id === id ? el.isDone = isDone : ''
        })
        setTasks(newTasks)
    }
    const addTask = (text:string,todoListId: string) => {
        let newTask = {id: v1(), title: text, isDone: false}
        tasks[todoListId].unshift(newTask)
        setTasks(tasks)

    }
    const changeTaskTitle = (text: string, inputId:string) => {
        let todoList = todoLists.find(el => el.id === inputId)
        if (todoList) {
            todoList.text = text
            setTodoListFilter([...todoLists])
        }

    }


    const addTodo=(title:string)=>{
        let newTodoList:TodoLists ={id: v1(), title: title, filter: 'all',error:false,text:''}
        setTodoListFilter([newTodoList,...todoLists])
        setTasks({[newTodoList.id]:[],...tasks})
    }
    const removeTodoList =(todoListId:string)=>{
        let newArr = todoLists.filter(tl=>tl.id !== todoListId)
        setTodoListFilter(newArr)
    }
    const changeTodoListTitle =(todoListId:string,newText:string)=>{
        let todoList = todoLists.find(tl=>tl.id === todoListId)
        if(todoList) {
            todoList.title = newText
            setTodoListFilter([...todoLists])
        }
    }
    const onChangeEditTitleFromTask=(elementId:string,
                                     newText:string,
                                     todoListId:string)=>{
        let newTitle=tasks[todoListId].find(el=>el.id === elementId)
        if(newTitle){
            newTitle.title =newText
            setTasks({...tasks})
        }

    }
    return (
        <div className="App">
            <AddItemForm addTodo={addTodo}/>
            {

                todoLists.map((tl) => {
                    const getTodoList = () => {
                        if (tl.filter === 'completed') {
                            return tasks[tl.id].filter((el: PropsType) => el.isDone === true)
                        } else if (tl.filter === 'active') {
                            return tasks[tl.id].filter((el: PropsType) => el.isDone === false)
                        } else {
                            return [...tasks[tl.id]]
                        }
                    }
                    let tasksForTodoList = getTodoList()
                    return <TodoList key={tl.id} title={tl.title} tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     setFilterType={setFilterType}
                                     changeStatus={changeStatus}
                                     addTasks={addTask}
                                     taskTitle={tl.text}
                                     changeTaskTitle={changeTaskTitle}
                                     error={tl.error}
                                     setError={changeError}
                                     filter={tl.filter}
                                     id={tl.id}
                                     removeTodoList={removeTodoList}
                                     onChangeEditTitleFromTask={onChangeEditTitleFromTask}
                                     changeTodoListTitle={changeTodoListTitle}

                    />
                })
            }


        </div>
    );
}

export default App;
