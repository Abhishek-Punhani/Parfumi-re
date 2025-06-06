import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroBanner = () => {
    return (
        <section className="relative h-[80vh] bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/30 dark:bg-purple-700/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-rose-200/30 dark:bg-rose-700/30 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-200/30 dark:bg-indigo-700/30 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent dark:from-black/30" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-lg border border-purple-100 dark:border-purple-700">
                            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
                                New Collection Available
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                            Discover Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600 block">
                                Perfect Scent
                            </span>
                        </h1>

                        <p className="text-xl leading-relaxed max-w-lg text-gray-600 dark:text-gray-300">
                            Immerse yourself in our curated collection of luxury perfumes from the world&apos;s most prestigious brands. Each fragrance tells a unique story.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                size="lg"
                                className="group bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Explore Collection
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
                            >
                                View All Fragrances
                            </Button>
                        </div>
                    </div>

                    <div className="relative lg:block hidden">
                        <div className="relative animate-fade-in delay-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-rose-400/20 dark:from-purple-700/20 dark:to-rose-700/20 rounded-3xl blur-3xl transform rotate-6"></div>
                            <div className="relative bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-600/50">
                                <div className="aspect-square bg-gradient-to-br from-purple-100 to-rose-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                                    <div className="text-6xl">🌹</div>
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Signature Collection
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                                        Premium fragrances crafted for elegance
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;