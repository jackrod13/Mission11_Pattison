import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const categoryParams = selectedCategories
          .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
          .join('&');

        const response = await fetch(
          `https://localhost:7146/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${
            selectedCategories.length ? `&${categoryParams}` : ''
          }`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data.books);
        setTotalPages(Math.max(1, Math.ceil(data.totalNumBooks / pageSize)));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategories, pageNum, pageSize]);

  const sortedBooks = [...books].sort((a, b) =>
    sortAscending
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      <div className="mb-3 text-center">
        <button
          className="btn btn-primary"
          onClick={() => setSortAscending(!sortAscending)}
        >
          Sort by Title: {sortAscending ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      {sortedBooks.map((book) => (
        <div id="projectCard" className="card mb-4" key={book.bookID}>
          <h3 className="card-title px-3 pt-3">{book.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {book.author}
              </li>
              <li>
                <strong>Publisher:</strong> {book.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {book.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {book.classification}
              </li>
              <li>
                <strong>Category:</strong> {book.category}
              </li>
              <li>
                <strong>Page Count:</strong> {book.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${book.price.toFixed(2)}
              </li>
            </ul>
            <button
              className="btn btn-success mt-3"
              onClick={() => navigate(`/purchase/${book.title}/${book.bookID}`)}
            >
              Purchase
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize: number) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
