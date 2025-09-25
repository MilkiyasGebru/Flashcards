import { X, Check} from "lucide-react"


export default function AnotherEdit(){
    return (
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Edit Flashcard</h2>
                <button
                    // onClick={() => setEditingCard(null)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                    <X className="w-5 h-5"/>
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Word</label>
                    <input
                        type="text"
                        // value={editingCard.word}
                        // onChange={(e) => setEditingCard({...editingCard, word: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Definition</label>
                    <textarea
                        // value={editingCard.definition}
                        // onChange={(e) => setEditingCard({...editingCard, definition: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bin</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            // value={editingCard.bin}
                            // onChange={(e) => setEditingCard({...editingCard, bin: Number(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wrong Guesses</label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            // value={editingCard.wrongGuesses}
                            // onChange={(e) => setEditingCard({...editingCard, wrongGuesses: Number(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
                <button
                    // onClick={() => setEditingCard(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-150"
                >
                    Cancel
                </button>
                <button
                    // onClick={handleSaveEdit}
                    className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors duration-150 flex items-center space-x-2"
                >
                    <Check className="w-4 h-4"/>
                    <span>Save Changes</span>
                </button>
            </div>
        </div>
    )
}