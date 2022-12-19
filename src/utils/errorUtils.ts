import { Dispatch } from 'redux'
import { ResponseType } from '../api/api'
import {AppActionsType, changeStatusError, setError} from "../store/app-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setError({error: data.messages[0]}))
    } else {
        dispatch(setError({error:'Some error occurred'}))
    }
    dispatch(changeStatusError({status: 'failed'}))
}

export const handleServerNetworkError = (error: string , dispatch: ErrorUtilsDispatchType) => {
    dispatch(setError({error}))
    dispatch(changeStatusError({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>