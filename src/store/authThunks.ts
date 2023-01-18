import {createAsyncThunk} from "@reduxjs/toolkit";
import {changeStatusError, setInitialized} from "./app-reducer";
import {API} from "../api/api";
import {handleServerNetworkError} from "../utils/errorUtils";
import {UserType} from "./auth-reducer";

export const authMeThunk = createAsyncThunk('auth/authMe', async (value,thunkAPI) => {
    thunkAPI.dispatch(changeStatusError({status:'loading'}))
    thunkAPI.dispatch(setInitialized({initialized: false}))
    try {
        const res = await API.authMe()
        if (res.resultCode === 0) {
            thunkAPI.dispatch(changeStatusError({status:'succeeded'}))
            return {value: true}
        } else {
            handleServerNetworkError(res.statusText, thunkAPI.dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)

    } finally {
        thunkAPI.dispatch(setInitialized({initialized: true}))
    }
})
export const logoutThunk = createAsyncThunk('auth/logoutThunk',async (value,thunkAPI)=>{
    thunkAPI.dispatch(changeStatusError({status:'loading'}))
    try {
        const res = await API.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(changeStatusError({status:'succeeded'}))
            return {value: false}
        } else {
            handleServerNetworkError(res.statusText, thunkAPI.dispatch)
            thunkAPI.rejectWithValue({})
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)
        thunkAPI.rejectWithValue({})
    }
})
export const loginThunk = createAsyncThunk('auth/loginThunk',async (param:{ user: UserType },thunkAPI)=>{
    thunkAPI.dispatch(changeStatusError({status:'loading'}))
    try {
        const res = await API.login(param.user)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(changeStatusError({status:'succeeded'}))
            return {value: true}
        } else {
            handleServerNetworkError(res.statusText, thunkAPI.dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    }
})