import {Plus} from "lucide-react"
import useAddWord from "../hooks/useAddWord.ts";
import type {FormEvent} from "react";

interface AddWordProps {
    fetchWords: () => Promise<void>;
}
export default function AddWord({fetchWords}: AddWordProps) {

    const {word, setWord, definition,setDefinition, handleAddWordFunction, loading} = useAddWord();
    const handleAddAndRefetch = async (e: FormEvent) => {
        await handleAddWordFunction(e);
        await fetchWords();
    }
    return (
        <div className="flex flex-col border border-[#fdfaf4] px-3 py-4 gap-5 rounded-2xl shadow-lg w-full lg:w-1/3 h-fit  bg-gradient-to-br from-orange-50  to-gray-100 ">

            <div className="flex gap-4 items-center">
                <Plus className="text-green-500" size={32}/>
                <h3 className="text-3xl font-bold capitalize text-center">Create new word</h3>
            </div>

            <div className="flex flex-col gap-3">
            <p className="font-semibold text-xl">Word:</p>
                <input
                    placeholder="Enter Word..."
                    className="border border-transparent px-3 py-2 outline-none rounded-md bg-white"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <p className="font-semibold text-xl">Definition:</p>
                <textarea
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    placeholder="Enter definition of the word"
                    className="border border-transparent px-3 py-2 outline-none rounded-md resize-none bg-white"
                    rows={5}
                    cols={5}
                />
            </div>
            <button
                className="border border-transparent text-white py-2 px-3 rounded-md text-2xl bg-green-400 disabled:cursor-not-allowed disabled:bg-green-100  hover:cursor-pointer font-semibold "
                onClick={handleAddAndRefetch}
                disabled={loading}
            >
                Add
            </button>

        </div>
    )
}