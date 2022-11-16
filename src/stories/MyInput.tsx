import React, {useState} from 'react';
import {Input} from './elements'
/**
 * Primary UI component for user interaction
 */
type MyInputType={
    size:string,
    value:string
}

export const MyInput = (props:MyInputType) => {
    let [input,setInput]=useState(props.value)
    return (
        <Input size={props.size}
               value={input}
               onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInput((e.currentTarget.value))}/>

    );
};
