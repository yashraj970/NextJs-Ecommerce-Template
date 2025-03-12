const products = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    category: "Clothing",
    rating: 4.8,
    isNew: true,
    discount: 25,
  },
  {
    id: 2,
    title: "Designer Sunglasses",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Leather Crossbody Bag",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2080&auto=format&fit=crop",
    category: "Bags",
    rating: 4.7,
    inStock: false,
  },
  {
    id: 4,
    title: "Minimalist Watch with Leather Strap",
    price: 159.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2080&auto=format&fit=crop",
    category: "Watches",
    rating: 4.9,
    discount: 20,
    isFeatured: true,
  },
];

// Sample product data - in a real app, this would come from an API
const allProducts = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    category: "Clothing",
    subcategory: "T-Shirts",
    rating: 4.8,
    isNew: true,
    discount: 25,
    colors: ["#000000", "#FFFFFF", "#FF0000"],
  },
  {
    id: 2,
    title: "Designer Sunglasses",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
    category: "Accessories",
    subcategory: "Eyewear",
    rating: 4.5,
    isFeatured: true,
    colors: ["#000000", "#663300", "#3366CC"],
  },
  {
    id: 3,
    title: "Leather Crossbody Bag",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2080&auto=format&fit=crop",
    category: "Bags",
    subcategory: "Crossbody",
    rating: 4.7,
    inStock: false,
    colors: ["#663300", "#000000", "#F5F5DC"],
  },
  {
    id: 4,
    title: "Minimalist Watch with Leather Strap",
    price: 159.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2080&auto=format&fit=crop",
    category: "Watches",
    subcategory: "Analog",
    rating: 4.9,
    discount: 20,
    isFeatured: true,
    colors: ["#663300", "#000000"],
  },
  {
    id: 5,
    title: "Slim Fit Denim Jeans",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2026&auto=format&fit=crop",
    category: "Clothing",
    subcategory: "Jeans",
    rating: 4.6,
    colors: ["#000080", "#000000", "#87CEEB"],
  },
  {
    id: 6,
    title: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Electronics",
    subcategory: "Audio",
    rating: 4.8,
    discount: 17,
    isNew: true,
    colors: ["#000000", "#FFFFFF", "#FF0000"],
  },
  {
    id: 7,
    title: "Cashmere Scarf",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1584736286279-75260e76eb21?q=80&w=1974&auto=format&fit=crop",
    category: "Accessories",
    subcategory: "Scarves",
    rating: 4.7,
    colors: ["#FF0000", "#000080", "#808080", "#F5F5DC"],
  },
  {
    id: 8,
    title: "Leather Wallet",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2071&auto=format&fit=crop",
    category: "Accessories",
    subcategory: "Wallets",
    rating: 4.5,
    colors: ["#663300", "#000000"],
  },
  {
    id: 9,
    title: "Smart Fitness Tracker",
    price: 129.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2088&auto=format&fit=crop",
    category: "Electronics",
    subcategory: "Wearables",
    rating: 4.6,
    discount: 13,
    colors: ["#000000", "#FF0000", "#3366CC"],
  },
  {
    id: 10,
    title: "Polarized Aviator Sunglasses",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2070&auto=format&fit=crop",
    category: "Accessories",
    subcategory: "Eyewear",
    rating: 4.4,
    colors: ["#663300", "#000000", "#3366CC"],
  },
  {
    id: 11,
    title: "Hooded Parka Jacket",
    price: 199.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
    category: "Clothing",
    subcategory: "Outerwear",
    rating: 4.8,
    discount: 20,
    colors: ["#000000", "#808080", "#000080"],
  },
  {
    id: 12,
    title: "Leather Chelsea Boots",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=2135&auto=format&fit=crop",
    category: "Footwear",
    subcategory: "Boots",
    rating: 4.7,
    colors: ["#663300", "#000000"],
  },
];

// Categories for filtering
const categories = [
  {
    name: "Clothing",
    count: allProducts.filter((p) => p.category === "Clothing").length,
  },
  {
    name: "Accessories",
    count: allProducts.filter((p) => p.category === "Accessories").length,
  },
  {
    name: "Bags",
    count: allProducts.filter((p) => p.category === "Bags").length,
  },
  {
    name: "Watches",
    count: allProducts.filter((p) => p.category === "Watches").length,
  },
  {
    name: "Electronics",
    count: allProducts.filter((p) => p.category === "Electronics").length,
  },
  {
    name: "Footwear",
    count: allProducts.filter((p) => p.category === "Footwear").length,
  },
];
// Get all unique subcategories
const subcategories = [...new Set(allProducts.map((p) => p.subcategory))].map(
  (name) => ({
    name,
    count: allProducts.filter((p) => p.subcategory === name).length,
  })
);

export { products, allProducts, categories, subcategories };
