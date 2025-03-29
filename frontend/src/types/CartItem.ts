// Defines the structure of an item in the shopping cart
export interface CartItem {
  bookID: number; // Unique ID for the book
  title: string; // Book title
  price: number; // Total price for this item (unit price * quantity)
  quantity: number; // Number of copies added to the cart
}
