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
        <div key={book.bookID} id="bookCard">
          <h3>{book.title}</h3>
          <ul>
            <li>Author: {book.author}</li>
            <li>Publisher: {book.publisher}</li>
            <li>ISBN: {book.isbn}</li>
            <li>Classification: {book.classification}</li>
            <li>Category: {book.category}</li>
            <li>Page Count: {book.pageCount}</li>
            <li>Price: ${book.price.toFixed(2)}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
