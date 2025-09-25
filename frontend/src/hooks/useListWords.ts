import {useEffect, useState} from "react";
import type WordDTO from "../DTOs/WordDTO.tsx";
import {useAuthContext} from "./useAuthContext.ts";
import toast from "react-hot-toast";

function getRemainingTimeString(targetDateString: string) {
    const targetDate = new Date(targetDateString);
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    // If the target date has passed, return a simple message
    if (difference <= 0) {
        return "Now 🎉";
    }

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Build the output string
    let result = "";
    if (days > 0) {
        result += `${days}d `;
    }
    if (days > 0 || hours > 0) {
        result += `${hours}h `;
    }
    if (days > 0 || hours > 0 || minutes > 0) {
        result += `${minutes}m `;
    }
    result += `${seconds}s`;

    return result.trim(); // Trim any trailing spaces
}

export default function useListWords() {
    const [limit, setLimit] = useState<number>(5);
    const [page, setPage] = useState(1);
    const [words, setWords] = useState<WordDTO[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const authContext = useAuthContext();
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const [editingWord, setEditingWord] = useState<WordDTO | null>(null);
    const [deletingWordId, setDeletingWordId] = useState<string | null>(null);

    const fetchWords = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/api/word/fetch?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authContext.state.token}`
            },
        });

        if (!response.ok){
            toast("Words Fetched Successfully");
        }
        const {words, total} : {words: WordDTO[], total: number} = await response.json();
        words.map(word =>{
            word.remaining_time = getRemainingTimeString(word.next_review_time)
        })
        setWords(words);
        setTotalPages(Math.ceil(total/limit));
    }

    const handleDeleteWord = async (word_id: string)=>{

        const response = await fetch(`${BACKEND_BASE_URL}/api/word/delete/${word_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authContext.state.token}`
            },
        });
        if (response.ok){
            toast("Word Deleted Successfully");
            await fetchWords();
        }
        setDeletingWordId(null)
    }

    const handleEditWord = async (word : WordDTO)=>{

        const response = await fetch(`${BACKEND_BASE_URL}/api/word/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authContext.state.token}`
            },
            body: JSON.stringify(word)
        })
        if (response.ok){
            toast("Word Edited Successfully");
            await fetchWords();
            setEditingWord(null);

        } else {
            toast("Word Could Not Be Edited")
            const json_response = await response.json()
            console.log(json_response)
        }

    }

    useEffect(()=> {
        fetchWords()
        const interval_id = setInterval( ()=>setWords(currentWords => {
                return currentWords.map(word => ({
                    ...word,
                    remaining_time: getRemainingTimeString(word.next_review_time)
                }));})

            , 1000)

        return () => clearInterval(interval_id);

    }, [limit, page])

    return {
        page,
        setPage,
        limit,
        setLimit,
        words,
        setWords,
        totalPages,
        editingWord,
        setEditingWord,
        deletingWordId,
        setDeletingWordId,
        handleDeleteWord,
        fetchWords,
        handleEditWord
    }

}