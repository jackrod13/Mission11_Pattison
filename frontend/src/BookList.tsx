import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://localhost:7146/api/Book/Books');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Book List</h1>
      <br />
      {books.map((book) => (
        <div id="bookCard" className="card" key={book.bookID}>
          <h3 className="card-title">{book.title}</h3>
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
          </div>
        </div>
      ))}
    </>
  );
}

export default BookList;
