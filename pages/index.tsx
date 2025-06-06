import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="px-4 md:px-8 lg:px-16 my-8">
        <HeroBanner />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
