// Type definition for a Book object
export interface Book {
  bookID: number; // Unique identifier for the book
  title: string; // Title of the book
  author: string; // Name of the author
  publisher: string; // Name of the publisher
  isbn: string; // International Standard Book Number
  classification: string; // Classification (e.g., Fiction, Non-Fiction)
  category: string; // Category (e.g., Biography, Self-Help)
  pageCount: number; // Total number of pages in the book
  price: number; // Price of the book in USD
}
