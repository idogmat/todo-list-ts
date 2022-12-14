import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized:false as boolean
}

export type AppActionsType= ReturnType<typeof changeStatusError>
    | ReturnType<typeof setError>
    | ReturnType<typeof setInitialized>

const slice = createSlice({
    name:'app',
    initialState:initialState,
    reducers:{
        changeStatusError(state,action:PayloadAction<{ status: RequestStatusType }>){
            state.status = action.payload.status
        },
        setError(state,action:PayloadAction<{ error:null|string }>){
            state.error = action.payload.error
        },
        setInitialized(state,action:PayloadAction<{ initialized:boolean }>){
            state.isInitialized = action.payload.initialized
        },

    }
})

export const changeStatusError = slice.actions.changeStatusError
export const setError= slice.actions.setError
export const  setInitialized = slice.actions.setInitialized
export const appReducer = slice.reducer


