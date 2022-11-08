import React, {useState} from 'react';
import './App.css';
import TodoList, {PropsType, TaskType} from "./components/TodoList";

export type FilterValuesType = 'all'|'completed'|'active'

function App() {
    let initTasks:Array<PropsType> = [
        { id: 0, title: "HTML&CSS", isDone: true },
        { id: 1, title: "JS", isDone: true },
        { id: 2, title: "ReactJS", isDone: false },
        { id: 3, title: "Hello world", isDone: true },
        { id: 4, title: "I am Happy", isDone: false },
    ]

    // function insideUseState(data:any,funcForSetData:Function){
    //     return [data,funcForSetData()]
    // }
    //let [tasks,setTasks]=useState(initialState)
    //
    // let arr =useState(initTasks)
    //
    // let tasks=arr[0]
    // let setTasks=arr[1]



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
    const addTask=(text:string)=>{
        tasks.push({id:(tasks.length),title:text,isDone:false})
        let newTasks = [...tasks]
        setTasks(newTasks)
    }
    return (
        <div className="App">
            <TodoList title = "What to learn" tasks={tasksForTodoList}
                      removeTask={removeTask}
                      setFilterType={setFilterType}
            addTasks={addTask}/>
            {/*<TodoList title = "Songs" tasks={tasks2}*/}
            {/*          removeTask={removeTask}/>*/}
            {/*<TodoList title = "Books"/>*/}

        </div>
    );
}

export default App;
