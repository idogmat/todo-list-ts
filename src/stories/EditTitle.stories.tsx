import React, {useState} from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";import EditTitle from "../components/EditTitle";
/**
 * Primary UI component for user interaction
 */
export default {
    title:'MyInputs',
    component: EditTitle
}

const changeTitleCallBack = action("Title changed")


export const EditTitleBaseExample = (props:any) => {

    return (
        <div style={{width: '50%'}}>
            <EditTitle title={'Test'} callBack={changeTitleCallBack}/>
            <EditTitle title={'Test2'} callBack={changeTitleCallBack}/>
            <EditTitle title={'Test3'} callBack={changeTitleCallBack}/>
        </div>
    );
};
