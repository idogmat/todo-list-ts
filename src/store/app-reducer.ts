import {TaskResponseType} from "../api/api";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

export type AppStatusType= ReturnType<typeof changeStatusError>
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppStatusType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const changeStatusError = (status:RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
