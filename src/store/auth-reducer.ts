import {API} from "../api/api";
import {AppThunkActionType} from "./store";
import {changeStatusError} from "./app-reducer";
import {handleServerNetworkError} from "../utils/errorUtils";
import {AxiosError} from "axios";

export type UserType ={
    email:string
    password:string
    rememberMe?:boolean
}
const initialState = {
    isLoggedIn:false
}

type InitialStateType = typeof initialState
export type AuthActionsType= ReturnType<typeof loginAC>

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER':
            return {...state,isLoggedIn:action.value}
        default:
            return state
    }
}
export const loginAC= (value:boolean)=> {
    return {type: "SET-USER", value} as const
}
export const AuthMeThunk = ():AppThunkActionType => async (dispatch)=> {
    dispatch(changeStatusError('loading'))
    try{
        const res = await API.authMe()
        if(res.resultCode === 0){
            dispatch(loginAC(true))
            dispatch(changeStatusError('succeeded'))
        } else {
            handleServerNetworkError(res.statusText, dispatch)
        }
    }catch (e:any){
        handleServerNetworkError(e, dispatch)
    }
}
export const loginThunk = (user:UserType):AppThunkActionType => async (dispatch)=> {
    dispatch(changeStatusError('loading'))
    try{
       const res = await  API.login(user)
        if(res.data.resultCode === 0){
            dispatch(loginAC(true))
            dispatch(changeStatusError('succeeded'))
        } else {
            handleServerNetworkError(res.statusText, dispatch)
        }
    }catch (e:any){
        handleServerNetworkError(e, dispatch)
    }
}
export const logoutThunk = ():AppThunkActionType => async (dispatch)=> {
    dispatch(changeStatusError('loading'))
    try{
       const res = await  API.logout()
        if(res.data.resultCode === 0){
            dispatch(loginAC(false))
            dispatch(changeStatusError('succeeded'))
        } else {
            handleServerNetworkError(res.statusText, dispatch)
        }
    }catch (e:any){
        handleServerNetworkError(e, dispatch)
    }
}