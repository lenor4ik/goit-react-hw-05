import {memo, useState} from 'react';

function Pagination({ totalItems, itemsPerPage = 20, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={{backgroundColor: currentPage === i ? 'lightblue' : ''}}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              style={{backgroundColor: currentPage === i ? 'lightblue' : ''}}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="ellipsis">...</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
        pageNumbers.push(<span key="ellipsis-before">...</span>);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              style={{backgroundColor: currentPage === i ? 'lightblue' : ''}}
            >
              {i}
            </button>
          );
        }
      } else {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
        pageNumbers.push(<span key="ellipsis">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              style={{backgroundColor: currentPage === i ? 'lightblue' : ''}}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="ellipsis-after">...</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {renderPageNumbers()}
    </div>
  );
}

export default memo(Pagination);
