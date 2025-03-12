import { ProductCardProps } from "@/types/product";

// This is a mock function that would be replaced with your actual data fetching logic
export async function getProduct(slug: string) {
  // In a real app, you would fetch from an API
  // For now, we'll return mock data
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

  if (slug !== product.slug) {
    return null;
  }

  return product;
}

// Get related products based on a product
export async function getRelatedProducts(): Promise<ProductCardProps[]> {
  // In a real app, you would fetch from an API
  // For now, we'll return mock data
  return [
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
    {
      id: 5,
      image: "/placeholder.svg?height=400&width=300",
      title: "Classic Wool Peacoat",
      price: 249.99,
      category: "Coats",
      rating: 4.9,
      originalPrice: 299.99,
    },
  ];
}
