import type {IAuthContext} from "../context/AuthContext.ts";
import type {AuthAction} from "../context/AuthContext.ts";




export const authReducer = (state: IAuthContext['state'], action: AuthAction) : IAuthContext['state'] => {

    switch (action.type) {
        case 'LOGIN':{
            return {
                token: action.payload.token,
            }

        }
        case 'LOGOUT':{
            return {
                token: null,
            }
        }
        default:
            return state;
    }

}