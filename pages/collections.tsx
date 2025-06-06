import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Collections = () => {
    const collections = [
        {
            id: 1,
            name: "Floral Elegance",
            description: "Delicate and feminine fragrances featuring jasmine, rose, and peony",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
            perfumeCount: 12,
            featured: true
        },
        {
            id: 2,
            name: "Woody Sophistication",
            description: "Rich and warm scents with sandalwood, cedar, and oakmoss",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
            perfumeCount: 8,
            featured: false
        },
        {
            id: 3,
            name: "Citrus Fresh",
            description: "Bright and energizing fragrances with bergamot, lemon, and grapefruit",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
            perfumeCount: 15,
            featured: true
        },
        {
            id: 4,
            name: "Oriental Mystery",
            description: "Exotic and luxurious scents featuring amber, vanilla, and spices",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
            perfumeCount: 10,
            featured: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-20 pb-16 bg-gradient-to-br from-purple-100 via-rose-100 to-indigo-100 dark:from-purple-900 dark:via-rose-900 dark:to-indigo-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                                Curated Collections
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            Discover Our
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600 block">
                                Signature Collections
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Each collection is thoughtfully curated to represent different moods, occasions, and personalities. 
                            Find the perfect fragrance family that resonates with your unique style.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Featured Collections
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Our most popular and carefully selected fragrance families
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {collections.filter(collection => collection.featured).map((collection, index) => (
                            <div 
                                key={collection.id}
                                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={collection.image}
                                        alt={collection.name}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 bg-white/20 dark:bg-gray-700/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                                            {collection.perfumeCount} Fragrances
                                        </span>
                                        <h3 className="text-3xl font-bold mb-3 text-white">
                                            {collection.name}
                                        </h3>
                                        <p className="text-white/90 text-lg leading-relaxed">
                                            {collection.description}
                                        </p>
                                    </div>
                                    
                                    <Link href="/shop">
                                        <Button className="group/btn bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
                                            Explore Collection
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* All Collections Grid */}
                    <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">All Collections</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {collections.map((collection, index) => (
                                <div 
                                    key={collection.id}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden animate-fade-in"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={collection.image}
                                            alt={collection.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-purple-600 transition-colors">
                                                {collection.name}
                                            </h4>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {collection.perfumeCount}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                            {collection.description}
                                        </p>
                                        <Link href="/shop">
                                            <Button variant="outline" size="sm" className="w-full group/btn">
                                                View Collection
                                                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Collections;
