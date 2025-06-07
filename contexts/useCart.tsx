import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Perfume {
    _id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
}

interface CartItem {
    perfume: Perfume;
    quantity: number;
    selectedSize: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (perfume: Perfume, selectedSize: string) => void;
    removeFromCart: (perfumeId: string, selectedSize: string) => void;
    updateQuantity: (perfumeId: string, selectedSize: string, newQuantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (perfume: Perfume, selectedSize: string) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.perfume._id === perfume._id && item.selectedSize === selectedSize
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.perfume._id === perfume._id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, { perfume, quantity: 1, selectedSize }];
        });
    };

    const removeFromCart = (perfumeId: string, selectedSize: string) => {
        setItems(prevItems => 
            prevItems.filter(item => 
                !(item.perfume._id === perfumeId && item.selectedSize === selectedSize)
            )
        );
    };

    const updateQuantity = (perfumeId: string, selectedSize: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(perfumeId, selectedSize);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.perfume._id === perfumeId && item.selectedSize === selectedSize
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + (item.perfume.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalPrice,
            getTotalItems,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
