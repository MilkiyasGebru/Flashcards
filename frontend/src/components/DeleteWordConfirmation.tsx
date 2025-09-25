import {Trash2} from "lucide-react";

interface DelteWordProps {
    deletingWordId: string;
    setDeletingWordId: (word_id: string | null) => void;
    handleDeleteWord:  (word_id: string ) => Promise<void>;
}

export default function DeleteWordConfirmation({deletingWordId, setDeletingWordId, handleDeleteWord}: DelteWordProps) {

    return (
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
                Are you sure you want to delete this flashcard? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
                <button
                    onClick={() => setDeletingWordId(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-150"
                >
                    Cancel
                </button>
                <button
                    onClick={() => handleDeleteWord(deletingWordId)}
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors duration-150 flex items-center space-x-2"
                >
                    <Trash2 className="w-4 h-4"/>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    )
}