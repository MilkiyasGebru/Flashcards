import PaginationComponent from "./PaginationComponent.tsx";
import { Edit2, Trash2} from "lucide-react"
import EditWord from "./EditWord.tsx";
import DeleteWordConfirmation from "./DeleteWordConfirmation.tsx";
import type WordDTO from "../DTOs/WordDTO.tsx";
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
interface ListWordsProps{
    page: number,
    setPage: (page: number) => void,
    limit: number,
    setLimit: (limit: number) => void,
    totalPages: number,
    deletingWordId: string | null,
    setDeletingWordId: (deleteWordId: string | null) => void,
    handleDeleteWord: (deleteWordId: string) => Promise<void>,
    words: WordDTO[],
    editingWord: WordDTO | null,
    setEditingWord: (editingWord: WordDTO | null) => void,
    handleEditWord: (word: WordDTO) => Promise<void>,
}
export default function ListWords(props: ListWordsProps) {

    return (
        <>
        <div
            className=" relative z-0 w-full lg:w-3/5  flex flex-col  bg-gradient-to-br from-orange-50  to-gray-100 border rounded-2xl border-green-200/50 shadow-xl">
            <div className="flex justify-between items-center p-6 w-full">
                <h3 className="font-bold text-2xl ">Your Flashcards</h3>
            </div>
            <div className="relative w-full overflow-x-auto">

                <table className="relative z-50 table-fixed w-full  overflow-visible px-4 min-w-[700px]">
                    <thead className="h-[80px] bg-white  z-0  ">
                    <tr className=" text-lg font-bold">
                        <th className="px-6 py-3 text-left">Word</th>
                        <th className="px-6 py-3 text-left">Definition</th>
                        <th className="px-6 py-3 text-left">Bin</th>
                        <th className="px-6 py-3 text-left">Next Review</th>
                        <th className="px-6 py-3 text-left">Wrong Guesses</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-md border-b-1 border-green-200/50 ">

                    {props.words.map(word => {
                        return (
                            <tr key={word.id}
                                className="odd:bg-gray-50 even:bg-white hover:bg-green-50/80 transition-colors duration-300 ease-in-out h-[60px]">
                                <td className="px-6 py-3 text-left font-semibold truncate">{word.name}</td>
                                <td className="px-6 py-3 text-left truncate">{word.definition} </td>
                                <td className="px-6 py-3 text-left">{word.bin}</td>
                                <td className="px-6 py-3 text-left ">{getRemainingTimeString(word.next_review_time)}</td>
                                <td className="px-6 py-3 text-left">{word.wrong_guesses}</td>
                                <td className="px-6 py-3 ">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => props.setEditingWord({...word})}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 group"
                                            title="Edit flashcard"
                                        >
                                            <Edit2
                                                className="w-4 h-4 group-hover:scale-110 transition-transform duration-150"/>
                                        </button>
                                        <button
                                            onClick={() => props.setDeletingWordId(word.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 group"
                                            title="Delete flashcard"
                                        >
                                            <Trash2
                                                className="w-4 h-4 group-hover:scale-110 transition-transform duration-150"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>
            </div>

                <PaginationComponent page={props.page} setPage={props.setPage} limit={props.limit}
                                     setLimit={props.setLimit}
                                     totalPages={props.totalPages}/>

            </div>

                {props.editingWord && (
                    <div
                        className=" absolute  top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-opacity-50 w-full flex items-center justify-center z-50 p-4">
                        <EditWord editingWord={props.editingWord} setEditingWord={props.setEditingWord}
                                  handleEditWord={props.handleEditWord}/>
                    </div>
                )}
                {props.deletingWordId && (
                    <div
                        className=" absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-opacity-50 w-full flex items-center justify-center z-50 p-4">
                        <DeleteWordConfirmation deletingWordId={props.deletingWordId}
                                                setDeletingWordId={props.setDeletingWordId}
                                                handleDeleteWord={props.handleDeleteWord}/>
                    </div>
                )}
            </>

            )

            }