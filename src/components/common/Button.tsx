import React from 'react'
import {BtnStyle} from "../../style/elements";


type ButtonTypeProps={
    name?:string
    callBack:()=>void
}

const Button:React.FC<ButtonTypeProps>=({name,callBack})=>{
    const onClickHandler=()=>{
        callBack()
    }
    return(
        <>
            <BtnStyle onClick={onClickHandler}>{!!name?name:'+'}</BtnStyle>
        </>
    )
}
export default Button