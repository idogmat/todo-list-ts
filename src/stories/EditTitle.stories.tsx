import React, {useState} from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Tasks/Task";import EditTitle from "../components/common/EditTitle";
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
            <EditTitle entityStatus={'idle'} title={'Test'} callBack={changeTitleCallBack}/>
            <EditTitle entityStatus={'idle'} title={'Test2'} callBack={changeTitleCallBack}/>
            <EditTitle entityStatus={'idle'} title={'Test3'} callBack={changeTitleCallBack}/>
        </div>
    );
};
