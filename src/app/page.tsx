import { HeroImagesSlider } from "@/components/Home/ImagesSlider";
import ProductCard from "@/components/Product/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col justify-center items-center">
        <HeroImagesSlider />

        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
