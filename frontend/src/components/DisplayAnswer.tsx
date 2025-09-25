import type WordDTO from "../DTOs/WordDTO.tsx";
import {useAuthContext} from "../hooks/useAuthContext.ts";

interface DisplayAnswerProps {
    handleFlip : ()=> void;
    word: WordDTO;
    fetch_word_to_reviewed: ()=> Promise<void>;
}


export default function DisplayAnswer({handleFlip, word, fetch_word_to_reviewed}: DisplayAnswerProps){

    const authContext = useAuthContext()
    const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const review_word = async (review_status: boolean)=>{
        const response = await fetch(`${BACKEND_BASE_URL}/api/word/review/${word.id}`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authContext.state.token}`
            },
            body: JSON.stringify({
                review_status:  review_status
            })
        })
        if (!response.ok){
            console.log("Error Occurred")
        }
        await fetch_word_to_reviewed()
        handleFlip()
    }

    return (
        <div
            className=" my-auto border border-[#fdfaf4] shadow-xl flex flex-col p-12 rounded-2xl h-full w-4/5 lg:w-2/5 mx-auto items-center bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
            <p className="self-start text-2xl font-semibold">Definition:</p>
            <div className="flex flex-col gap-6 mt-4">
                <p className="text-3xl text-[#2D554D] text-center font-semibold">{word.name}</p>
                <p className="text-2xl text-center text-[#2D554A]">{word.definition}</p>
            </div>


            <p className="text-xl mt-6">Did you know the answer?</p>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={()=>{review_word(true)}}
                    className="w-fit text-xl  px-10 py-2 border border-green-600 rounded-xl bg-green-600 text-white hover:cursor-pointer ">
                    Yes
                </button>
                <button
                    onClick={()=>review_word(false)}
                    className="w-fit text-xl  px-10 py-2 border border-red-600 rounded-xl bg-red-600 text-white hover:cursor-pointer "
                >
                    No
                </button>
            </div>
        </div>
    )
}