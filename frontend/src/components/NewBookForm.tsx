import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void; // Callback when book is successfully added
  onCancel: () => void; // Callback to close the form without saving
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  // Initialize form state with default/empty book values (bookID not needed)
  const [formData, setFormData] = useState<Omit<Book, 'bookID'>>({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  // Update form state when input fields change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new book to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData); // ✅ No bookID needed
    onSuccess(); // Notify parent that book was added
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <div className="form-grid">
        {/* Form inputs for book fields */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Publisher:
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </label>
        <label>
          Classification:
          <input
            type="text"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Page Count:
          <input
            type="number"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        {/* Form action buttons */}
        <button type="submit">Add Book</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewBookForm;
