// src/types.ts (ya src/types/index.ts)

export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  description?: string;
  selectedSize?: string; // <-- Yeh error TS2353 fix karega
  quantity?: number;
}

export interface CartItem {
  id: string;
  title?: string;
  name?: string;
  price: string | number;
  image: string;
  quantity: number;
  selectedSize?: string;
  category?: string;
}

export interface CartContextType {
  cartItems: CartItem[]; // <-- Yeh checkout aur cart page ke errors fix karega
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // <-- Yeh TS2339 error fix karega
  clearCart: () => void;
}