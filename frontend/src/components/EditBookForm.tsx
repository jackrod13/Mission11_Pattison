import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void; // Callback when book is updated
  onCancel: () => void; // Callback to cancel edit
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  // Clone the book prop into local state for editing
  const [formData, setFormData] = useState<Book>({ ...book });

  // Handle input changes and update state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated book to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Check that bookID exists before updating
    if (formData.bookID !== undefined) {
      await updateBook(formData.bookID, formData);
      onSuccess(); // Notify parent to refresh and close
    } else {
      console.error('bookID is missing for update');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update a Book</h2>
      <div className="form-grid">
        {/* Editable input fields for book details */}
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
        <button type="submit">Update Book</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
