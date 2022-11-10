import React, {useState} from 'react';
import './App.css';
import TodoList, {PropsType} from "./components/TodoList";
import { v1 } from 'uuid';
export type FilterValuesType = 'all'|'completed'|'active'

function App() {
    let initTasks:Array<PropsType> = [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Hello world", isDone: true },
        { id: v1(), title: "I am Happy", isDone: false },
    ]

    let [taskTitle,setTaskTitle]=useState('')
    let [tasks,setTasks]=useState<Array<PropsType>>(initTasks)
    let [filter,setFilter]=useState<FilterValuesType>('all')
    let tasksForTodoList=tasks

    const setFilterType=(type:FilterValuesType)=>{
        setFilter(type)
    }
        if(filter === 'completed') {
            tasksForTodoList = tasks.filter((el: PropsType) => el.isDone === true)
        }
        if(filter === 'active') {
            tasksForTodoList = tasks.filter((el: PropsType) => el.isDone === false)
        }
        if(filter === 'all') {
            tasksForTodoList = tasks
        }


    function removeTask(id:string){
        let filteredTasks = tasks.filter((el:PropsType)=>el.id!==id)
        setTasks(filteredTasks)
    }
        const changeStatus=(id:string)=>{
            let newTasks = [...tasks]
            newTasks.find(el=> {
               return el.id === id?el.isDone=!el.isDone:''
            })
            setTasks(newTasks)
    }
    const addTask=()=>{
        let newTasks = [{id:v1(),title:taskTitle,isDone:false},...tasks]
        setTasks(newTasks)
        setTaskTitle('')
    }
        const changeTaskTitle =(text:string)=>{
            setTaskTitle(text)
        }

    return (
        <div className="App">
            <TodoList title = "What to learn" tasks={tasksForTodoList}
                      removeTask={removeTask}
                      setFilterType={setFilterType}
                      changeStatus={changeStatus}
                      addTasks={addTask}
                      taskTitle={taskTitle}
                      changeTaskTitle={changeTaskTitle}
            />

        </div>
    );
}

export default App;
