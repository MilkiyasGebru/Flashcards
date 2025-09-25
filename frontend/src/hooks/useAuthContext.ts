import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.ts";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext must be used within the AuthContext")
    }

    return context;
}