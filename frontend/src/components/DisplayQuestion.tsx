import type WordDTO from "../DTOs/WordDTO.tsx";

interface DisplayAnswerProps {
    handleFlip : ()=> void;
    word: WordDTO;
}

// bg-[#fffdf8]
export default function DisplayQuestion({handleFlip, word}: DisplayAnswerProps) {

    return (
        <div className="h-full bg-red-700  border border-[#fdfaf4] shadow-xl flex flex-col p-12 rounded-2xl w-4/5 lg:w-2/5 mx-auto items-center  bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50
 ">
            <p className="self-start text-xl font-semibold">WORD:</p>
            <div className="flex flex-col gap-6 mt-16">
                <p className="text-6xl text-[#2D554D] text-center font-semibold">{word.name}</p>
            </div>

            <button
                className="w-fit text-2xl mt-16 px-10 py-2 border border-green-800 rounded-3xl bg-green-800 text-white hover:cursor-pointer "
                onClick={handleFlip}
            >
                Reveal Answer
            </button>
        </div>
    )

}