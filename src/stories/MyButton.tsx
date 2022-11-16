import React from 'react';
import {BtnStyle} from '../style/elements'
/**
 * Primary UI component for user interaction
 */
export const MyButton = (props:any) => {
    return (
        <BtnStyle>{props.title}
        </BtnStyle>
    );
};
