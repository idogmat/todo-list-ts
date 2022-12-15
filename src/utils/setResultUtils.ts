import {changeStatusError} from "../store/app-reducer";
import { AppThunkDispatch} from "../store/store";


export const setResultUtils = <T>(action:any,data:T|any, dispatch: AppThunkDispatch) => {
    dispatch(action(data))
    dispatch(changeStatusError('succeeded'))
}
