// Import navigation tools and hooks
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { CartItem } from '../types/CartItem';

function PurchasePage() {
  const navigate = useNavigate();
  const { bookID } = useParams(); // Get bookID from route
  const { addToCart } = useCart(); // Access cart context

  // State for book title, price, quantity, and loading status
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // Fetch book data by ID when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://localhost:7146/api/Book/${bookID}`
        );
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const book = await response.json();
        setTitle(book.title);
        setPrice(book.price);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookID]);

  // Add selected book and quantity to the cart
  const handleAddToCart = () => {
    if (price !== null && quantity > 0) {
      const newItem: CartItem = {
        bookID: Number(bookID),
        title,
        price: price * quantity,
        quantity,
      };
      addToCart(newItem);
      navigate('/cart'); // Navigate to cart after adding
    }
  };

  return (
    <>
      <WelcomeBand />

      {/* Show loading while fetching book data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Purchase {title}</h2>
          <p>
            Price per book: ${price!.toFixed(2)} <br />
            Total: ${(price! * quantity).toFixed(2)}
          </p>

          {/* Quantity input */}
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ marginLeft: '0.5rem', width: '60px' }}
            />
          </div>

          {/* Action buttons */}
          <button onClick={handleAddToCart}>Add to Cart</button>
          <br />
          <button onClick={() => navigate(-1)}>Go Back</button>
        </>
      )}
    </>
  );
}

export default PurchasePage;
