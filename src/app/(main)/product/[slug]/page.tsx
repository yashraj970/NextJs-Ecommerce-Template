import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetails from "@/components/Product/product-details";
import ProductGallery from "@/components/Product/product-gallery";
import RelatedProducts from "@/components/Product/related-products";
import ProductReviews from "@/components/Product/product-reviews";
// import ProductStructuredData from "@/components/seo/product-structured-data";
import { Skeleton } from "@/components/ui/skeleton";
import { getProduct, getRelatedProducts } from "@/lib/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fetchProduct = cache(getProduct);

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);

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

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

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
