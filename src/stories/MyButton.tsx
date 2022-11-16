import React from 'react';
import {BtnStyle} from './elements'
/**
 * Primary UI component for user interaction
 */
type BtnType={
    title:string
}
export const MyButton = (props:BtnType) => {
    return (
        <BtnStyle>{props.title}
        </BtnStyle>
    );
};
