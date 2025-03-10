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
              <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative px-8 py-3 flex space-x-2 items-center z-10 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
                  <span>View All Products</span>
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
