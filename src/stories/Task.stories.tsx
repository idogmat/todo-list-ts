import React, {useState} from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Tasks/Task";
/**
 * Primary UI component for user interaction
 */
export default {
    title:'Task Component',
    component: Task
}
const changeTaskStatusCallBack2 = action("Status changed 2")
const changeTaskStatusCallBack = action("Status changed 1")
const changeTaskTitleCallBack2 = action("Title changed 2")
const changeTaskTitleCallBack = action("Title changed 1")
const taskRemoved2 = action("Remove Task 2")
const taskRemoved = action("Remove Task 1")

export const TaskBaseExample = (props:any) => {

    return (
        <ul>
        <Task task={{id:'1',status:1,title:'React',addedDate:'1', deadline:'1', description:'1', todoListId:'todolist1',order:1, priority:1, startDate:'1',entityStatus: 'idle'}}
              todolistId={'todolist1'}
              removeTask={taskRemoved}
              changeTaskTitle={changeTaskTitleCallBack}
              changeStatus={changeTaskStatusCallBack}
              entityStatus={'idle'}
        />
            <Task task={{id:'1',status:0,title:'Angular',addedDate:'1', deadline:'1', description:'1', todoListId:'todolist2',order:1, priority:1, startDate:'1',entityStatus: 'idle'}}
                  todolistId={'todolist2'}
                  removeTask={taskRemoved2}
                  changeTaskTitle={changeTaskTitleCallBack2}
                  changeStatus={changeTaskStatusCallBack2}
                  entityStatus={'idle'}
            />
        </ul>
    );
};
