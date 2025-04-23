const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Show 3 pages at a time

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 1, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center space-x-2 ${
          currentPage === 1 ? "text-[#BEBEBE] cursor-not-allowed" : "text-white"
        }`}
      >
        <img src="/events/left.svg" alt="Previous" className="w-4 h-4" />
        <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase">
          PREV
        </span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-4">
        {getPageNumbers().map((pageNum) => (
          <span
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            className={`font-space-grotesk font-bold cursor-pointer ${
              pageNum === currentPage
                ? "text-[24px] text-white"
                : "text-base text-[#BEBEBE]"
            } leading-[40px] tracking-[0.6px] uppercase`}
          >
            {pageNum.toString().padStart(2, "0")}
          </span>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center space-x-2 ${
          currentPage === totalPages
            ? "text-[#BEBEBE] cursor-not-allowed"
            : "text-white"
        }`}
      >
        <span className="font-space-grotesk font-bold text-base leading-[40px] tracking-[0.6px] uppercase">
          NEXT
        </span>
        <img src="/events/right.svg" alt="Next" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
