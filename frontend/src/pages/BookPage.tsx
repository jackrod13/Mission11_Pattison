// Main page that displays the welcome banner, category filter, and list of books
import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  // Track currently selected categories for filtering
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Header row with welcome banner and cart summary */}
      <div className="row bg-primary text-white">
        <div className="col-12">
          <CartSummary /> {/* Floating cart icon (top right) */}
          <WelcomeBand /> {/* Welcome message/banner */}
        </div>
      </div>

      {/* Main content layout with sidebar filter and book list */}
      <div className="row">
        <div className="col-md-3">
          {/* Category filter for book types */}
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          {/* Book list that updates based on selected categories */}
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
