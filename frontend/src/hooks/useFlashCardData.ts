import {useEffect, useState} from "react";
import type WordDTO from "../DTOs/WordDTO.tsx";
import {useAuthContext} from "./useAuthContext.ts";

export default function useFlashCardData() {

    const [word, setWord] = useState<WordDTO | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const authContext = useAuthContext();

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };


    const fetch_word_to_reviewed = async () => {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_BASE_URL}/api/word/play`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authContext.state.token}`
            }
        })
        if (!response.ok){
            setWord(null)
        } else {
            const {word} = await response.json();
            setWord(word)
        }
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000)


    }

    useEffect(() => {
        fetch_word_to_reviewed();
    }, [])

    return {
        word,
        isLoading,
        isFlipped,
        handleFlip,
        fetch_word_to_reviewed
    }

}