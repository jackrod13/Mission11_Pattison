import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BookPage';
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage'; 

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/purchase/:title/:bookID" element={<PurchasePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
