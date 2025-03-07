import FeaturesSection from "@/components/Home/features-section";
import { HeroImagesSlider } from "@/components/Home/ImagesSlider";
import ProductCard from "@/components/Product/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col justify-center items-center">
        <HeroImagesSlider />

        {/* Features Section */}
        <FeaturesSection />

        {/* Featured Products */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-primary font-medium">
                HANDPICKED FOR YOU
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our curated selection of premium products, designed to
                elevate your style and enhance your everyday life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  category={product.category}
                  rating={product.rating}
                  isNew={product.isNew}
                  isFeatured={product.isFeatured}
                  inStock={product.inStock !== false}
                  discount={product.discount}
                />
              ))}
            </div>

            <div className="mt-16 text-center">
              <button className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full font-medium">
                View All Products
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
