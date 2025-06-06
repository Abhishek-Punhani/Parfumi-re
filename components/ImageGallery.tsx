import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="space-y-6">
            {/* Main Image */}
            <Card className="overflow-hidden shadow-2xl group border border-gray-200 dark:border-gray-700">
                <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <img
                        src={images[selectedImage]}
                        alt={`${productName} - View ${selectedImage + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Navigation arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:scale-110"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:scale-110"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </button>
                        </>
                    )}

                    {/* Zoom button */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:scale-110">
                        <Maximize2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Image counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 dark:bg-white/40 backdrop-blur-sm text-white dark:text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                            {selectedImage + 1} / {images.length}
                        </div>
                    )}
                </div>
            </Card>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <Card
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`overflow-hidden cursor-pointer transition-transform duration-300 transform 
                                ${selectedImage === index
                                    ? "ring-2 ring-purple-500 shadow-lg"
                                    : "hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-500 shadow-md hover:shadow-lg"
                            }`}
                        >
                            <div className="aspect-square relative">
                                <img
                                    src={image}
                                    alt={`${productName} - Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300"
                                />
                                <div className={`absolute inset-0 transition-colors duration-300 ${
                                    selectedImage === index 
                                        ? "bg-purple-500/20"
                                        : "bg-black/0 hover:bg-black/10 dark:hover:bg-white/10"
                                }`}></div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
