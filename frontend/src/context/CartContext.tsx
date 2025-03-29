// React context for managing cart functionality across the app
import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

// Define the structure of the cart context
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

// Create the cart context (initially undefined)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component that wraps the app and provides cart state
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart (or update if it already exists)
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);

      const updatedCart = prevCart.map((c) =>
        c.bookID === item.bookID
          ? {
              ...c,
              quantity: c.quantity + item.quantity,
              price: c.price + item.price,
            }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  // Remove item from cart by book ID
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart(() => []);
  };

  // Provide cart state and functions to the rest of the app
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the cart context from any component
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
