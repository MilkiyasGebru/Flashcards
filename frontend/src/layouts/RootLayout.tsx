import {Outlet} from "react-router-dom";
import AuthContextProvider from "../components/AuthContextProvider.tsx";
import {Toaster} from "react-hot-toast";

export default function RootLayout(){
   return (
        <AuthContextProvider>
            <Outlet />
            <Toaster />
        </AuthContextProvider>
   )
}