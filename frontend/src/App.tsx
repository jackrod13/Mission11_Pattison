// Import global styles
import './App.css';

// Import pages
import BooksPage from './pages/BookPage';
import CartPage from './pages/CartPage';
import PurchasePage from './pages/PurchasePage';

// React Router for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// CartProvider provides cart context to the entire app
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      {/* Wrap entire app in CartProvider so cart state is accessible globally */}
      <CartProvider>
        <Router>
          <Routes>
            {/* Home and /projects both show the list of books */}
            <Route path="/" element={<BooksPage />} />
            <Route path="/projects" element={<BooksPage />} />

            {/* Purchase page takes book title and bookID as route parameters */}
            <Route path="/purchase/:title/:bookID" element={<PurchasePage />} />

            {/* Cart page shows the current cart contents */}
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
