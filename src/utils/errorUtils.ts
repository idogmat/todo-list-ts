import { Dispatch } from 'redux'
import { ResponseType } from '../api/api'
import {AppActionsType, changeStatusError, setError} from "../store/app-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error occurred'))
    }
    dispatch(changeStatusError('failed'))
}

export const handleServerNetworkError = (error: string , dispatch: ErrorUtilsDispatchType) => {
    dispatch(setError(error))
    dispatch(changeStatusError('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>