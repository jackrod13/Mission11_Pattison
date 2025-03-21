import { useEffect, useState } from 'react';
import { Book } from './types/Book';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:7146/api/Book/Books?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.max(1, Math.ceil(data.totalNumBooks / pageSize)));
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  // Sorting function
  const sortedBooks = [...books].sort((a, b) => {
    return sortAscending
      ? a.title.localeCompare(b.title) // Ascending order
      : b.title.localeCompare(a.title); // Descending order
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Book List</h1>

      {/* Sorting Button */}
      <div className="text-center mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setSortAscending(!sortAscending)}
        >
          Sort by Title: {sortAscending ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      {/* Book Cards - Vertical List */}
      <div className="d-flex flex-column align-items-center">
        {sortedBooks.map((book) => (
          <div className="card w-75 mb-3 shadow-sm" key={book.bookID}>
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Author:</strong> {book.author}
                </li>
                <li className="list-group-item">
                  <strong>Publisher:</strong> {book.publisher}
                </li>
                <li className="list-group-item">
                  <strong>ISBN:</strong> {book.isbn}
                </li>
                <li className="list-group-item">
                  <strong>Classification:</strong> {book.classification}
                </li>
                <li className="list-group-item">
                  <strong>Category:</strong> {book.category}
                </li>
                <li className="list-group-item">
                  <strong>Page Count:</strong> {book.pageCount}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> ${book.price.toFixed(2)}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(Math.max(1, pageNum - 1))}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-primary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(Math.min(totalPages, pageNum + 1))}
        >
          Next
        </button>
      </div>

      {/* Page Size Dropdown */}
      <div className="text-center mt-3">
        <label className="me-2">Results per page:</label>
        <select
          className="form-select d-inline w-auto"
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default BookList;
