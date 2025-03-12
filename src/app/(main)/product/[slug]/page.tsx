import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetails from "@/components/Product/product-details";
import ProductGallery from "@/components/Product/product-gallery";
import RelatedProducts from "@/components/Product/related-products";
import ProductReviews from "@/components/Product/product-reviews";
// import ProductStructuredData from "@/components/seo/product-structured-data";
import { Skeleton } from "@/components/ui/skeleton";

// This would be replaced with your actual data fetching logic
async function getProduct(slug: string) {
  // Simulate API call
  const product = {
    id: 1,
    slug: "premium-leather-jacket",
    title: "Premium Leather Jacket",
    description:
      "Luxurious premium leather jacket with a modern cut and exceptional craftsmanship. Features a soft inner lining, multiple pockets, and durable YKK zippers.",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 124,
    category: "Jackets",
    brand: "Fashion Elite",
    sku: "JKT-PL-001",
    inStock: true,
    isNew: false,
    isFeatured: true,
    colors: ["#000000", "#8B4513", "#708090"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["leather", "jacket", "premium", "winter"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFja2V0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1627637454030-5ddd536e06e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGphY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    features: [
      "Genuine premium leather",
      "Soft polyester lining",
      "YKK zippers",
      "Multiple interior pockets",
      "Adjustable cuffs",
      "Water-resistant treatment",
    ],
    specifications: {
      material: "Genuine leather, polyester lining",
      care: "Professional leather cleaning only",
      origin: "Imported",
      weight: "1.8 kg",
    },
  };

  // In a real app, you'd fetch from an API and handle errors
  if (slug !== product.slug) {
    return null;
  }

  return product;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} | Your Store Name`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: `${product.title} | Your Store Name`,
      description: product.description.substring(0, 160),
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      locale: "en_US",
      siteName: "Your Store Name",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description.substring(0, 160),
      images: [product.images[0]],
    },
    alternates: {
      canonical: `https://yourstore.com/product/${product.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
interface ProductPageProps {
  params: {
    slug: string;
  };
}
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = [
    {
      id: 2,
      image: "/placeholder.svg?height=400&width=300",
      title: "Casual Denim Jacket",
      price: 129.99,
      category: "Jackets",
      rating: 4.5,
      discount: 15,
    },
    {
      id: 3,
      image: "/placeholder.svg?height=400&width=300",
      title: "Vintage Bomber Jacket",
      price: 159.99,
      category: "Jackets",
      rating: 4.7,
      isNew: true,
    },
    {
      id: 4,
      image: "/placeholder.svg?height=400&width=300",
      title: "Waterproof Hiking Jacket",
      price: 189.99,
      category: "Outdoor",
      rating: 4.6,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-24">
      {/* Add structured data for SEO */}
      {/* <ProductStructuredData product={product} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Gallery */}
        <Suspense
          fallback={
            <div className="aspect-square bg-gray-100 animate-pulse rounded-lg"></div>
          }
        >
          <ProductGallery images={product.images} title={product.title} />
        </Suspense>

        {/* Product Details */}
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails product={product} />
        </Suspense>
      </div>

      {/* Product Features and Specifications */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Features & Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
            <dl className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2">
                  <dt className="font-medium text-gray-600 capitalize">
                    {key}:
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      <Suspense
        fallback={
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg mb-16"></div>
        }
      >
        <ProductReviews
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </Suspense>

      {/* Related Products */}
      <Suspense
        fallback={
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        }
      >
        <RelatedProducts products={relatedProducts} />
      </Suspense>
    </main>
  );
}

function ProductDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-2 mt-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-6">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
