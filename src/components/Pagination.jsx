const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center space-x-4 mt-6 mb-5">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 text-black"
            >
                Prev
            </button>
            <span className="px-4 py-2 font-semibold bg-red-600 text-white rounded">
                {currentPage}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 text-black"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination