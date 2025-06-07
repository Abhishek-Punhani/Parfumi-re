import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { getPerfumes } from "@/services/perfumeService";
import type { Perfume } from "@/types/perfume";

const Shop = () => {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState("all");

    const categories = ["all", "floral", "woody", "citrus", "oriental", "fresh"];
    const priceRanges = [
        { label: "All Prices", value: "all" },
        { label: "Under $50", value: "0-50" },
        { label: "$50 - $100", value: "50-100" },
        { label: "$100 - $200", value: "100-200" },
        { label: "Over $200", value: "200+" }
    ];

    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const data = await getPerfumes();
                setPerfumes(data);
                setFilteredPerfumes(data);
            } catch (error) {
                console.error("Error fetching perfumes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfumes();
    }, []);

    useEffect(() => {
        let filtered = perfumes;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(perfume =>
                perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                perfume.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(perfume =>
                perfume.category.toLowerCase() === selectedCategory
            );
        }

        // Filter by price range
        if (priceRange !== "all") {
            const [min, max] = priceRange.split("-").map(Number);
            if (priceRange === "200+") {
                filtered = filtered.filter(perfume => perfume.price >= 200);
            } else {
                filtered = filtered.filter(perfume => 
                    perfume.price >= min && perfume.price <= max
                );
            }
        }

        setFilteredPerfumes(filtered);
    }, [searchTerm, selectedCategory, priceRange, perfumes]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Navbar />
                <div className="animate-pulse pt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-20 pb-12 bg-gradient-to-br from-purple-50 to-rose-50 dark:from-gray-800 dark:to-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Shop Our 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600"> Collection</span>
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto">
                            Discover the perfect fragrance from our curated selection of luxury perfumes
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search perfumes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                {priceRanges.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">
                            {filteredPerfumes.length} Perfume{filteredPerfumes.length !== 1 ? 's' : ''} Found
                        </h2>
                    </div>

                    {filteredPerfumes.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-gray-400 text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-semibold mb-2">No perfumes found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredPerfumes.map((perfume, index) => (
                                <div 
                                    key={perfume._id} 
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <ProductCard perfume={perfume} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Shop;
