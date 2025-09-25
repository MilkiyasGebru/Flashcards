import {Outlet, useNavigate} from "react-router-dom";
import NavBar from "../components/NavBar.tsx";
import {useAuthContext} from "../hooks/useAuthContext.ts";
import {useEffect} from "react";

export default function HomeLayout(){

    const authContext = useAuthContext()

    const navigate = useNavigate();


    useEffect(() => {
        if (!authContext.state.token) {
            navigate("/")
        }
    }, []);


    return (
        <div className="flex flex-col h-fit min-h-screen w-full bg-[#fdfaf4] bg-[url('/img.png')] bg-cover bg-no-repeat bg-fixed">
            <NavBar/>
            <div className="h-screen w-full flex flex-col ">
                <Outlet/>
            </div>
        </div>
    )
}