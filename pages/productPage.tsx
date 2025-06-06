import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Share2, ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import { getPerfumeById } from "@/services/perfumeService";
import { useCart } from "@/contexts/useCart";
import type { Perfume } from "@/types/perfume";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewSection from "@/components/ReviewSection";
import ImageGallery from "@/components/ImageGallery";
import { useToast } from "@/contexts/toast/toastContext";
import { useRouter } from "next/router";
import Link from "next/link";

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [perfume, setPerfume] = useState<Perfume | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart } = useCart();
    const toast  = useToast();

    useEffect(() => {
        const fetchPerfume = async () => {
            if (id) {
                try {
                    const data = await getPerfumeById(typeof id === "string" ? id : id[0]);
                    setPerfume(data);
                    if (data?.sizes.length) {
                        setSelectedSize(data.sizes[0]);
                    }
                } catch (error) {
                    console.error("Error fetching perfume:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPerfume();
    }, [id]);

    const handleAddToCart = () => {
        if (perfume && selectedSize) {
            addToCart(perfume, selectedSize);
            toast.open({
                message: {
                    heading: "Added to cart",
                    content: `${perfume.name} (${selectedSize}) has been added to your cart.`,
                },
                duration: 5000,
                position: "top-center",
                color: "success",
            });
        }
    };

    const handleShare = async () => {
        if (navigator.share && perfume) {
            try {
                await navigator.share({
                    title: perfume.name,
                    text: perfume.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback to copying URL to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.open({
                message: {
                    heading: "Link copied",
                    content: "Product URL copied to clipboard!",
                },
                duration: 5000,
                position: "top-center",
                color: "success",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-lg"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!perfume) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Product Not Found
                        </h1>
                        <Link href="/">
                            <Button>Return to Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <ImageGallery images={perfume.images} productName={perfume.name} />

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Badge variant="secondary">{perfume.brand}</Badge>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-300"}
                                >
                                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                                </Button>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {perfume.name}
                            </h1>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < Math.floor(perfume.rating)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300 dark:text-gray-500"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                    {perfume.rating} ({perfume.reviews.length} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="text-3xl font-bold text-primary">
                            ${perfume.price}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {perfume.description}
                        </p>

                        {/* Size Selection */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Size
                            </h3>
                            <div className="flex space-x-3">
                                {perfume.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        variant={selectedSize === size ? "default" : "outline"}
                                        onClick={() => setSelectedSize(size)}
                                        className="min-w-[60px]"
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-4">
                            <Button
                                size="lg"
                                className="flex-1 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700"
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                            >
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="lg" onClick={handleShare}>
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Product Details */}
                        <Card className="bg-white dark:bg-gray-800 shadow-md">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                    Product Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Brand:</span>
                                        <span className="text-gray-900 dark:text-gray-100">{perfume.brand}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Category:</span>
                                        <span className="text-gray-900 dark:text-gray-100">{perfume.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Availability:</span>
                                        <span
                                            className={
                                                perfume.inStock
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }
                                        >
                                            {perfume.inStock ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Separator className="my-12 border-gray-300 dark:border-gray-700" />

                {/* Reviews Section */}
                <ReviewSection perfume={perfume} />
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;
