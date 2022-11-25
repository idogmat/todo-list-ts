import React, {useState} from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";
import TodoListContainer from "../TodoListContainer";
import {Provider} from "react-redux";
import store from "../store/store";
import {ReduxStoreProviderDecorator} from "../../.storybook/ReduxStoreProviderDecorator";
/**
 * Primary UI component for user interaction
 */
export default {
    title:'TodoList Component',
    component: TodoListContainer,
    decorators: [ReduxStoreProviderDecorator]
}


export const TodoListContainerBaseExample = (props:any) => {

    return <TodoListContainer/>

};
