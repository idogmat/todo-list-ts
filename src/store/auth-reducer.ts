import {createSlice} from "@reduxjs/toolkit";
import {authMeThunk, loginThunk, logoutThunk} from "./authThunks";

export type UserType = {
    email: string
    password: string
    rememberMe?: boolean
}
const initialState = {
    isLoggedIn: false as boolean
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            action.payload && (state.isLoggedIn = action.payload?.value)
        });
        builder.addCase(authMeThunk.fulfilled, (state, action) => {
            action.payload && (state.isLoggedIn = action.payload?.value)
        });
        builder.addCase(logoutThunk.fulfilled, (state, action) => {
            action.payload && (state.isLoggedIn = action.payload?.value)
        });
    }

})
export const authReducer = slice.reducer



