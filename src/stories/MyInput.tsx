import React, {useState} from 'react';
import {Input} from '../style/elements'
import {action} from "@storybook/addon-actions";
/**
 * Primary UI component for user interaction
 */
type MyInputType={
    size:string,
    value:string
}

export const MyInput = (props:MyInputType) => {
    let [input,setInput]=useState(props.value)
    const callBack =action("newTodolist")
    return (
        <div style={{width: '50%'}}>
        <Input size={props.size}
               value={input}
               onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInput((e.currentTarget.value))}
        onKeyDown={(e:any)=>e.key==="Enter" && callBack()}/>
        </div>
    );
};
