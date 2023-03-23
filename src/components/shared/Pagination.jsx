const Pagination = ({ setCurrentPage, currentPage, totalPage }) => {
  const handlePageIncrease = () => {
    setCurrentPage((p) => p + 1);
  };

  const handlePageDecrease = () => {
    setCurrentPage((p) => p - 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-5">
      <button
        onClick={handlePageDecrease}
        className={`${
          currentPage === 1
            ? "bg-slate-800"
            : "bg-purple-600 hover:bg-purple-700"
        } text-white font-bold py-2 px-4 rounded`}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <p>
        Page: {currentPage} of {totalPage}
      </p>
      <button
        onClick={handlePageIncrease}
        className={`${
          currentPage === totalPage
            ? "bg-slate-800"
            : "bg-purple-600 hover:bg-purple-700"
        } text-white font-bold py-2 px-4 rounded`}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
