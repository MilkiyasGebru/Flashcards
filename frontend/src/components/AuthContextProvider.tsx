import {type ReactNode, useReducer} from "react";
import {authReducer} from "../reducer/AuthReducer.ts";
import {AuthContext, getAuthInitialState} from "../context/AuthContext.ts";

const AuthContextProvider = ({ children } : {children: ReactNode}) => {

    const [state, dispatch] = useReducer(authReducer, {token: null}, getAuthInitialState);

    return <AuthContext.Provider value={{state, dispatch}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;