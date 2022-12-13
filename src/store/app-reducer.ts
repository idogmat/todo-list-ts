


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

export type AppActionsType= ReturnType<typeof changeStatusError>
 | ReturnType<typeof setError>
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state,error:action.error}
        default:
            return state
    }
}

export const changeStatusError = (status:RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setError = (error:null|string) => {
    return {type: 'APP/SET-ERROR', error} as const
}