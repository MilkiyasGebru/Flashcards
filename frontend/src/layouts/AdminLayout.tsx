import AddWord from "../components/AddWord.tsx";
import ListWords from "../components/ListWords.tsx";
import useListWords from "../hooks/useListWords.ts";

export default function AdminLayout() {

    const {page, setPage, limit, setLimit, words, totalPages, editingWord, setEditingWord, deletingWordId, setDeletingWordId, handleDeleteWord, fetchWords, handleEditWord} = useListWords()

    return (
        <div className="flex flex-col lg:flex-row justify-around px-12 py-6 gap-6 lg:px-24 lg:py-12">
            <AddWord fetchWords={fetchWords} />
            <ListWords page={page} setPage={setPage} limit={limit} setLimit={setLimit}  words={words} totalPages={totalPages}
                editingWord={editingWord} setEditingWord={setEditingWord} deletingWordId={deletingWordId} setDeletingWordId={setDeletingWordId} handleDeleteWord={handleDeleteWord} handleEditWord={handleEditWord}
            />
        </div>
    )
}