// Floating cart summary displayed on the book list page
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate total price and quantity from cart
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <div
      // Floating styled cart summary container
      className="d-flex align-items-center shadow-sm"
      style={{
        position: 'fixed',
        top: '15px',
        right: '20px',
        background: 'white',
        color: '#212529',
        padding: '10px 16px',
        borderRadius: '30px',
        cursor: 'pointer',
        border: '1px solid #dee2e6',
        zIndex: 1050,
        minWidth: '120px',
        justifyContent: 'center',
        fontWeight: 500,
        gap: '10px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.2s ease-in-out',
      }}
      // Clicking the cart summary navigates to cart page
      onClick={() => navigate('/cart')}
      // Hover animation (slight zoom effect)
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {/* Cart icon */}
      <span style={{ fontSize: '1.25rem' }}>🛒</span>

      {/* Quantity badge */}
      <span className="badge bg-success">{totalQuantity}</span>

      {/* Total price */}
      <span style={{ fontWeight: 600 }}>${totalPrice.toFixed(2)}</span>
    </div>
  );
};

export default CartSummary;
