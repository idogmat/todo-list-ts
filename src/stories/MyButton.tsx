import React from 'react';
import {BtnStyle} from '../style/elements'
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
