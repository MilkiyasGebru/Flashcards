import DisplayQuestion from './DisplayQuestion.tsx';
import DisplayAnswer from './DisplayAnswer';
import {LoaderCircle} from "lucide-react"
import useFlashCardData from "../hooks/useFlashCardData.ts";

export default function FlashCardContainer() {

    const {word, isLoading, isFlipped, handleFlip, fetch_word_to_reviewed} = useFlashCardData()

    if (isLoading){
        return (
            <div className="flex flex-col justify-center items-center gap-6 h-full">
                <LoaderCircle className="animate-spin text-gray-500" size={200} />
                <p className="text-2xl">Loading Please Wait</p>
            </div>
        );
    }

    if (!word){
        return <div className="flex flex-col justify-center items-center h-full">
            <h3 className=" text-xl md:text-3xl  my-auto mx-auto uppercase border px-4 py-3 rounded-md bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 border-gray-300 text-center">You have no more words to review; <br/>you are permanently done!</h3>
        </div>
    }

    return (
        <div className="my-auto h-1/2 w-full">
            <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className={` h-full absolute inset-0  transform transition-transform duration-700 [backface-visibility:hidden]   `}>
                    <DisplayQuestion handleFlip={handleFlip} word={word}/>
                </div>

                <div
                    className="absolute  inset-0  transform  transition-transform duration-700 h-full [backface-visibility:hidden] rotate-y-180 ">
                    <DisplayAnswer handleFlip={handleFlip} word={word} fetch_word_to_reviewed={fetch_word_to_reviewed}/>
                </div>

            </div>
        </div>

    )

}


