import React, {useEffect, useState} from "react";
import {ButtonSnackbar, Container} from "../../style/elements";
import {RequestStatusType} from "../../store/app-reducer";


const Snackbar = (props:{status:RequestStatusType,error:null|string}) => {
    const [show,setShow] = useState<boolean>(!!props.status);

    let TIME = 2000;
    let TIMER:NodeJS.Timeout;
    function handleTimeout() {
        TIMER = setTimeout(() => {
            setShow(false)
            console.log(props.status)
        }, TIME);
    }

    function handleClose() {
        clearTimeout(TIMER);
    }
    useEffect(() => {

        if (!!props.status) {
            setShow(!!props.status)
            handleTimeout();
        }
        return () => {
            clearTimeout(TIMER);
        };
    }, [props.status,props.error]);
    return (
        show ? (
            <Container status={props.status}>
                <p>{props.status}</p>
                {!!props.error && <p>{props.error}</p>}
                <ButtonSnackbar onClick={handleClose}>x</ButtonSnackbar>
            </Container>
        )
           : <></>
    );
};


export default Snackbar;