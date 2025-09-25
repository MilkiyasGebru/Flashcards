import {useState, type FormEvent} from "react";
import {useAuthContext} from "./useAuthContext.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function useAddWord() {
    const [word, setWord] = useState<string>("");
    const [definition, setDefinition] = useState<string>("");
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

    const handleAddWordFunction = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch(`${BACKEND_BASE_URL}/api/word/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authContext.state.token}`
            },
            body: JSON.stringify({
                name: word,
                definition: definition
            })
        })

        if (response.ok){
            toast("Word Successfully Added")
        }
        else if  (response.status === 401) {
            authContext.dispatch(
                {
                    type: "LOGOUT",
                    payload: {
                        token: null,
                    }
                }
            )
            navigate("/auth")
            localStorage.removeItem("flashcards-token")
            toast("Authentication Token has expired. Login Again")
        }
        else {

            toast("Word was not added successfully")
        }


    }

    return {
        word,
        setWord,
        definition,
        setDefinition,
        handleAddWordFunction
    }

}