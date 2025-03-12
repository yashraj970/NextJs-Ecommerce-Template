import { ProductCardProps } from "@/types/product";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: ProductCardProps[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
