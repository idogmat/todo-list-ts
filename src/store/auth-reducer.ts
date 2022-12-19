import {API} from "../api/api";
import {AppThunkActionType} from "./store";
import {changeStatusError, setInitialized} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

export type UserType = {
    email: string
    password: string
    rememberMe?: boolean
}
const initialState = {
    isLoggedIn: false as boolean
}

const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        loginAC(state,action:PayloadAction<{ value: boolean }>){
            state.isLoggedIn = action.payload.value
        }
    }

})
export const authReducer = slice.reducer
// export const loginAC: ActionCreatorWithPayload<any, "auth/loginAC">= slice.actions.loginAC
export const loginAC= slice.actions.loginAC

export const AuthMeThunk = ():AppThunkActionType => async (dispatch:Dispatch) => {
    dispatch(changeStatusError({status:'loading'}))
    dispatch(setInitialized({initialized: false}))
    try {
        const res = await API.authMe()
        if (res.resultCode === 0) {
            dispatch(loginAC({value: true}))
            dispatch(changeStatusError({status:'succeeded'}))
        } else {
            handleServerNetworkError(res.statusText, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)

    } finally {
        dispatch(setInitialized({initialized: true}))
    }
}
export const loginThunk = (user: UserType): AppThunkActionType => async (dispatch:Dispatch) => {
    dispatch(changeStatusError({status:'loading'}))
    try {
        const res = await API.login(user)
        if (res.data.resultCode === 0) {
            dispatch(loginAC({value: true}))
            dispatch(changeStatusError({status:'succeeded'}))
        } else {
            handleServerNetworkError(res.statusText, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
export const logoutThunk = (): AppThunkActionType => async (dispatch:Dispatch) => {
    dispatch(changeStatusError({status:'loading'}))
    try {
        const res = await API.logout()
        if (res.data.resultCode === 0) {
            dispatch(loginAC({value: false}))
            dispatch(changeStatusError({status:'succeeded'}))
        } else {
            handleServerNetworkError(res.statusText, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}