import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/useCart";
import type { Perfume } from "@/types/perfume";
import { useToast } from "@/contexts/toast/toastContext";
import Link from "next/link";

interface ProductCardProps {
    perfume: Perfume;
}

const ProductCard = ({ perfume }: ProductCardProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart } = useCart();
    const toast = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        const defaultSize = perfume.sizes[0] || "50ml";
        addToCart(perfume, defaultSize);
        toast.open({
            message: {
                heading: "Added to cart",
                content: `${perfume.name} has been added to your cart.`,
            },
            duration: 5000,
            position: "top-center",
            color: "success",
        });
    };

    return (
        <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="relative overflow-hidden">
                <Link href={`/product/${perfume._id}`}>
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 relative">
                        <img
                            src={perfume.image}
                            alt={perfume.name}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </Link>
                
                {/* Floating action buttons */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <Button
                        variant="secondary"
                        size="icon"
                        className={`w-10 h-10 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
                            isLiked 
                                ? "text-red-500 bg-red-50 dark:bg-red-900" 
                                : "text-gray-600 bg-white/90 dark:bg-gray-800"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLiked(!isLiked);
                        }}
                    >
                        <Heart className={`h-4 w-4 transition-transform duration-300 ${isLiked ? "fill-current scale-110" : ""}`} />
                    </Button>
                    
                    <Button
                        variant="secondary"
                        size="icon"
                        className="w-10 h-10 rounded-full shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag className="h-4 w-4" />
                    </Button>
                </div>

                {/* Rating badge */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{perfume.rating}</span>
                    </div>
                </div>
            </div>
            
            <CardContent className="p-6 space-y-4">
                <Link href={`/product/${perfume._id}`}>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-purple-600 bg-purple-50 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full">
                                {perfume.brand}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{perfume.category}</span>
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-purple-600 transition-colors duration-300 line-clamp-1">
                            {perfume.name}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                            {perfume.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                            <div className="space-y-1">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    ${perfume.price}
                                </span>
                                <div className="flex items-center space-x-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${
                                                    i < Math.floor(perfume.rating)
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300 dark:text-gray-500"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">({perfume.reviews.length})</span>
                                </div>
                            </div>
                            
                            <Button 
                                size="sm" 
                                onClick={handleAddToCart}
                                className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 shadow-lg"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </Link>
            </CardContent>
        </Card>
    );
};

export default ProductCard;