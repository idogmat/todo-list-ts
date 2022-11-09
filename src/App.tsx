import React, {useState} from 'react';
import './App.css';
import TodoList, {PropsType} from "./components/TodoList";

export type FilterValuesType = 'all'|'completed'|'active'

function App() {
    let initTasks:Array<PropsType> = [
        { id: 0, title: "HTML&CSS", isDone: true },
        { id: 1, title: "JS", isDone: true },
        { id: 2, title: "ReactJS", isDone: false },
        { id: 3, title: "Hello world", isDone: true },
        { id: 4, title: "I am Happy", isDone: false },
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


    function removeTask(id:number){
        let filteredTasks = tasks.filter((el:PropsType)=>el.id!==id)
        setTasks(filteredTasks)
    }
        const changeStatus=(id:number)=>{
            let newTasks = [...tasks]
            newTasks[id].isDone = !newTasks[id].isDone
            setTasks(newTasks)
    }
    const addTask=()=>{
        tasks.push({id:tasks.length,title:taskTitle,isDone:false})
        let newTasks = [...tasks]
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
