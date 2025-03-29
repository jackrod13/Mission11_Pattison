// Page that displays the user's shopping cart
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate the total price of all items in the cart
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Your cart</h2>
      {/* Show alert if cart has items */}
      {cart.length > 0 && (
        <div className="alert alert-info text-center" role="alert">
          📦 You have <strong>{cart.length}</strong> item
          {cart.length > 1 && 's'} in your cart.
        </div>
      )}
      {/* Show message if cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item: CartItem) => (
            <li key={item.bookID}>
              <strong>{item.title}</strong>

              {/* Show quantity, unit price, and subtotal */}
              <p>Quantity: {item.quantity || 1}</p>
              <p>
                Unit Price: ${(item.price / (item.quantity || 1)).toFixed(2)}
              </p>
              <p>Total: ${item.price.toFixed(2)}</p>

              {/* Remove item from cart */}
              <button onClick={() => removeFromCart(item.bookID)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Show overall total and navigation options */}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={() => navigate('/')}>Continue Browsing</button>{' '}
      <button>Checkout</button>
    </div>
  );
}

export default CartPage;
