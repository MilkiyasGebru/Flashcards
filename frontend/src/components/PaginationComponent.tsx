
interface PaginationComponentProps {
    page: number;
    setPage: (selected: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    totalPages: number;
}

export default function PaginationComponent(props: PaginationComponentProps){
    const {page, setPage, limit, setLimit, totalPages} = props;
    const array = [];
    if (page - 2 >= 1) {
        array.push(1);
        if (page - 2 > 1){
            array.push("...")
        }

    }
    for (let i = -1; i < 2; i ++){
        if ((page+ i >= 1) && (page + i <= totalPages)){
            array.push(page + i)
        }

    }

    if ( page + 2 <= totalPages) {

        if (page + 2 < totalPages){
            array.push("...")
        }
        array.push(totalPages)
    }


    return (
        <div className="relative z-0 flex px-10 py-5 justify-between text-md">
            <div className="flex  items-center">
                <label htmlFor="itemsPerPage" className="mr-2 text-gray-700 font-semibold flex items-center">
                    Words per page:
                </label>
                <select
                    id="itemsPerPage"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    className="px-3 py-1 border border-gray-700 rounded bg-white"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>

                </select>
            </div>
            <div className="flex gap-2">
                <button
                    className="border border-transparent p-2 font-semibold  bg-white rounded-md hover:bg-blue-50 hover:cursor-pointer "
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                {array.map((value,index) => {
                    return (
                        <button
                            key={index}
                            className={`border border-transparent px-4 font-semibold hover:bg-blue-50 hover:cursor-pointer  rounded-md ${page === value ? 'bg-green-300 text-white' : 'bg-white'}`}
                            disabled={value === "..."}
                            onClick={ ()=>{
                                if (typeof value === 'number') {
                                    setPage(value);
                                }
                            }}
                        >
                            {value}
                        </button>
                    )
                })}
                <button
                    className="border p-2 font-semibold hover:bg-blue-50 hover:cursor-pointer bg-white border-transparent rounded-md"
                    disabled={page === totalPages}
                    onClick={() => setPage(page+1)}
                >
                    Next
                </button>
            </div>

        </div>
    )
}