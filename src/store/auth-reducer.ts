import {API} from "../api/api";
import {changeStatusError, setInitialized} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type UserType = {
    email: string
    password: string
    rememberMe?: boolean
}
const initialState = {
    isLoggedIn: false as boolean
}
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
const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
    },
    extraReducers:(builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action ) => {
            console.log('loginThunk.fulfilled')
            action.payload && (state.isLoggedIn = action.payload?.value)
        });
        builder.addCase(authMeThunk.fulfilled, (state, action ) => {
            console.log('authMeThunk.fulfilled')
            action.payload && (state.isLoggedIn = action.payload?.value)
        });
        builder.addCase(logoutThunk.fulfilled, (state, action ) => {
            console.log('logoutThunk.fulfilled')
            action.payload && (state.isLoggedIn = action.payload?.value)
        });
    }

})
export const authReducer = slice.reducer
// export const loginAC: ActionCreatorWithPayload<any, "auth/loginAC">= slice.actions.loginAC
// export const loginAC= slice.actions.loginAC



