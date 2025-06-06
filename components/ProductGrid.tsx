import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getPerfumes } from "@/services/perfumeService";
import type { Perfume } from "@/types/perfume";
import { useRouter } from "next/router";

const ProductGrid = () => {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const data = await getPerfumes();
                setPerfumes(data);
            } catch (error) {
                console.error("Error fetching perfumes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfumes();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block animate-pulse">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-xl mb-6 shadow-lg"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-900 rounded-full mb-6">
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                            Featured Collection
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Signature{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
                            Fragrances
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Discover our most popular and carefully curated selection of luxury perfumes, each chosen for its exceptional quality and unique character.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {perfumes.map((perfume, index) => (
                        <div
                            key={perfume.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <ProductCard perfume={perfume} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16 animate-fade-in">
                    <button className="group bg-gradient-to-r from-purple-600 to-rose-600 dark:from-purple-700 dark:to-rose-700 hover:from-purple-700 hover:to-rose-700 dark:hover:from-purple-800 dark:hover:to-rose-800 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" onClick={()=>{
                        router.push("/shop")
                    }}>
                        View All Perfumes
                        <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
