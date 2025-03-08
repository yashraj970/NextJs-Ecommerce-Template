"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Search,
  ChevronDown,
  X,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Star,
  Check,
  Clock,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/Product/ProductCard";

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

export default function ShopPage() {
  const [products, setProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortOption, setSortOption] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedSubcategories.includes(product.subcategory)
      );
    }

    // Price range filter
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortOption) {
      case "price-low-high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredProducts.sort(
          (a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1)
        );
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // featured
        filteredProducts.sort(
          (a, b) => (a.isFeatured ? -1 : 1) - (b.isFeatured ? -1 : 1)
        );
    }

    setProducts(filteredProducts);

    // Update active filters for display
    const newActiveFilters: string[] = [];
    if (selectedCategories.length > 0) {
      selectedCategories.forEach((cat) => newActiveFilters.push(cat));
    }
    if (selectedSubcategories.length > 0) {
      selectedSubcategories.forEach((subcat) => newActiveFilters.push(subcat));
    }
    if (priceRange[0] > 0 || priceRange[1] < 300) {
      newActiveFilters.push(`$${priceRange[0]} - $${priceRange[1]}`);
    }
    setActiveFilters(newActiveFilters);
  }, [
    searchQuery,
    selectedCategories,
    selectedSubcategories,
    priceRange,
    sortOption,
  ]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((c) => c !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange([0, 300]);
    setSearchQuery("");
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    if (filter.includes("$")) {
      setPriceRange([0, 300]);
    } else if (categories.some((c) => c.name === filter)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== filter));
    } else {
      setSelectedSubcategories((prev) => prev.filter((c) => c !== filter));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner */}
      <div className="relative h-[300px] bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Shop Banner"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shop Collection
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our curated selection of premium products designed for your
            lifestyle
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 md:hidden">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 300]}
                        max={300}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="mb-6"
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <Accordion type="multiple" defaultValue={["categories"]}>
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div
                              key={category.name}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`mobile-category-${category.name}`}
                                checked={selectedCategories.includes(
                                  category.name
                                )}
                                onCheckedChange={() =>
                                  handleCategoryChange(category.name)
                                }
                              />
                              <label
                                htmlFor={`mobile-category-${category.name}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                              >
                                {category.name}
                                <span className="text-gray-500">
                                  ({category.count})
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="subcategories">
                      <AccordionTrigger>Product Type</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {subcategories.map((subcategory) => (
                            <div
                              key={subcategory.name}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`mobile-subcategory-${subcategory.name}`}
                                checked={selectedSubcategories.includes(
                                  subcategory.name
                                )}
                                onCheckedChange={() =>
                                  handleSubcategoryChange(subcategory.name)
                                }
                              />
                              <label
                                htmlFor={`mobile-subcategory-${subcategory.name}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                              >
                                {subcategory.name}
                                <span className="text-gray-500">
                                  ({subcategory.count})
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <SheetFooter>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "grid" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "list" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("list")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 300]}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.name}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() =>
                          handleCategoryChange(category.name)
                        }
                      />
                      <label
                        htmlFor={`category-${category.name}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                      >
                        {category.name}
                        <span className="text-gray-500">
                          ({category.count})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Product Type</h3>
                <div className="space-y-2">
                  {subcategories.map((subcategory) => (
                    <div
                      key={subcategory.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`subcategory-${subcategory.name}`}
                        checked={selectedSubcategories.includes(
                          subcategory.name
                        )}
                        onCheckedChange={() =>
                          handleSubcategoryChange(subcategory.name)
                        }
                      />
                      <label
                        htmlFor={`subcategory-${subcategory.name}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                      >
                        {subcategory.name}
                        <span className="text-gray-500">
                          ({subcategory.count})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Active Filters:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {filter}
                    <button onClick={() => removeFilter(filter)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-500">
                Showing {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <motion.div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                <AnimatePresence>
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className={
                        viewMode === "list"
                          ? "flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-sm overflow-hidden"
                          : ""
                      }
                    >
                      {viewMode === "list" ? (
                        <>
                          <div className="md:w-1/3 relative">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              className="w-full h-full object-cover aspect-square md:aspect-auto"
                            />
                            {product.isNew && (
                              <Badge className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600">
                                New
                              </Badge>
                            )}
                            {product.discount && (
                              <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                                -{product.discount}%
                              </Badge>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-2 flex justify-between">
                              <span className="text-sm font-medium text-primary">
                                {product.category}
                              </span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="text-sm font-medium">
                                  {product.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                              {product.title}
                            </h3>

                            <div className="flex items-center mb-4 text-sm">
                              {product.inStock !== false ? (
                                <div className="flex items-center text-emerald-600">
                                  <Check className="h-4 w-4 mr-1" />
                                  <span>In Stock</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-amber-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>Ships in 2-3 weeks</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                      ${product.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Free shipping
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-full"
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full">
                                  <ShoppingBag className="mr-2 h-4 w-4" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <ProductCard
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
                          colors={product.colors}
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SlidersHorizontal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </motion.div>
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-primary text-white"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <span className="mx-1">...</span>
                  <Button variant="outline" size="sm">
                    10
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
