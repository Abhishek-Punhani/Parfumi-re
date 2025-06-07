import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const Cart = () => {
    const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
    const [promoCode, setPromoCode] = useState("");

    const handleQuantityChange = (perfumeId: string, selectedSize: string, newQuantity: number) => {
        updateQuantity(perfumeId, selectedSize, newQuantity);
    };

    const subtotal = getTotalPrice();
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center py-16">
                        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                            <ShoppingBag className="w-24 h-24 mx-auto" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Discover our amazing perfume collections
                        </p>
                        <Link href="/shop">
                            <Button 
                                size="lg" 
                                className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700"
                            >
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link 
                    href="/shop" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Shopping Cart
                            </h1>
                            <Button
                                variant="outline"
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-gray-700"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Clear Cart
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {items.map((item) => (
                                <Card 
                                    key={`${item.perfume._id}-${item.selectedSize}`} 
                                    className="overflow-hidden bg-white dark:bg-gray-800 shadow-md"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.perfume.image}
                                                    alt={item.perfume.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/product/${item.perfume._id}`}
                                                    className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-purple-600"
                                                >
                                                    {item.perfume.name}
                                                </Link>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {item.perfume.brand}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Size: {item.selectedSize}
                                                </p>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleQuantityChange(item.perfume._id, item.selectedSize, item.quantity - 1)}
                                                    className="h-8 w-8"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                
                                                <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">{item.quantity}</span>
                                                
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleQuantityChange(item.perfume._id, item.selectedSize, item.quantity + 1)}
                                                    className="h-8 w-8"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    ${(item.perfume.price * item.quantity).toFixed(2)}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFromCart(item.perfume._id, item.selectedSize)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-gray-700 mt-1"
                                                >
                                                    <Trash2 className="h-3 w-3 mr-1" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 bg-white dark:bg-gray-800 shadow-md">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    
                                    {subtotal <= 100 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Free shipping on orders over $100
                                        </p>
                                    )}
                                </div>

                                <Separator className="my-4" />

                                <div className="flex justify-between text-lg font-semibold">
                                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                                    <span className="text-gray-900 dark:text-gray-100">${total.toFixed(2)}</span>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Promo code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        />
                                        <Button variant="outline">
                                            Apply
                                        </Button>
                                    </div>
                                    
                                    <Button className="w-full bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700">
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
