import { useState, useEffect } from "react";
import type { Perfume } from "@/types/perfume";

export interface CartItem {
  perfume: Perfume;
  quantity: number;
  selectedSize: string;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("parfumiere-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("parfumiere-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (perfume: Perfume, selectedSize: string, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.perfume.id === perfume.id && item.selectedSize === selectedSize
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.perfume.id === perfume.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { perfume, quantity, selectedSize }];
    });
  };

  const removeFromCart = (perfumeId: string, selectedSize: string) => {
    setItems(prevItems =>
      prevItems.filter(
        item => !(item.perfume.id === perfumeId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (perfumeId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(perfumeId, selectedSize);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.perfume.id === perfumeId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.perfume.price * item.quantity), 0);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
};
