import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const BASE_URL =
  'https://bookstoreproject-backend-ebgyhka0b6bxebds.eastus-01.azurewebsites.net/api';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  categories: string[]
) => {
  const categoryParams = categories
    .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
    .join('&');
  const url = `${BASE_URL}/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${categories.length ? `&${categoryParams}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch books');
  return await response.json();
};

export const addBook = async (book: Omit<Book, 'bookID'>) => {
  const response = await fetch(`${BASE_URL}/Book/AddBook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  if (!response.ok) throw new Error('Failed to add book');
  return await response.json();
};

export const updateBook = async (
  bookID: number,
  book: Omit<Book, 'bookID'>
) => {
  const response = await fetch(`${BASE_URL}/Book/UpdateBook/${bookID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

  if (!response.ok) throw new Error('Failed to update book');
  return await response.json();
};

export const deleteBook = async (bookID: number) => {
  const response = await fetch(`${BASE_URL}/Book/DeleteBook/${bookID}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete book');
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/Book/GetBookCategories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
};

export const fetchBookById = async (bookID: number) => {
  const response = await fetch(`${BASE_URL}/Book/${bookID}`);
  if (!response.ok) throw new Error('Failed to fetch book by ID');
  return await response.json();
};
