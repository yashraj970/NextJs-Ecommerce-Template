"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Clock,
  ArrowRight,
  Sparkles,
  Flame,
  Tag,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

// Sample sale products data
const saleProducts = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    category: "Clothing",
    discount: 25,
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Designer Sunglasses",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
    category: "Accessories",
    discount: 30,
  },
  {
    id: 3,
    title: "Leather Crossbody Bag",
    price: 59.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2080&auto=format&fit=crop",
    category: "Bags",
    discount: 33,
  },
  {
    id: 4,
    title: "Minimalist Watch with Leather Strap",
    price: 119.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2080&auto=format&fit=crop",
    category: "Watches",
    discount: 25,
    isFeatured: true,
  },
  {
    id: 5,
    title: "Slim Fit Denim Jeans",
    price: 49.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2026&auto=format&fit=crop",
    category: "Clothing",
    discount: 28,
  },
  {
    id: 6,
    title: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Electronics",
    discount: 33,
    isNew: true,
  },
  {
    id: 7,
    title: "Cashmere Scarf",
    price: 49.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1584736286279-75260e76eb21?q=80&w=1974&auto=format&fit=crop",
    category: "Accessories",
    discount: 37,
  },
  {
    id: 8,
    title: "Leather Wallet",
    price: 29.99,
    originalPrice: 49.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2071&auto=format&fit=crop",
    category: "Accessories",
    discount: 40,
  },
];

// Featured collections for the sale
const saleCollections = [
  {
    id: 1,
    title: "Summer Essentials",
    description: "Up to 40% off on summer clothing and accessories",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070&auto=format&fit=crop",
    discount: "40%",
    bgColor: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Luxury Watches",
    description: "Premium timepieces at special prices",
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=2070&auto=format&fit=crop",
    discount: "25%",
    bgColor: "from-amber-500 to-red-500",
  },
  {
    id: 3,
    title: "Designer Bags",
    description: "Exclusive deals on premium bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
    discount: "30%",
    bgColor: "from-emerald-500 to-teal-500",
  },
];

// Flash sale items with countdown
const flashSaleItems = [
  {
    id: 101,
    title: "Limited Edition Sneakers",
    price: 79.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
    discount: 47,
    remaining: 5,
  },
  {
    id: 102,
    title: "Designer Perfume Set",
    price: 89.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=1974&auto=format&fit=crop",
    discount: 50,
    remaining: 3,
  },
  {
    id: 103,
    title: "Smart Fitness Watch",
    price: 99.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2088&auto=format&fit=crop",
    discount: 50,
    remaining: 7,
  },
];

export default function SalePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer for flash sale
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[500px] bg-black overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070&auto=format&fit=crop"
          alt="Sale Banner"
          className="object-cover opacity-60"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="mb-2 px-4 py-1 text-lg bg-red-500 hover:bg-red-600">
              Limited Time
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
              SUMMER SALE
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Up to 50% off on selected items. Don&apos;t miss out on these
              incredible deals!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-20 text-center">
                <span className="block text-3xl font-bold">
                  {timeLeft.hours}
                </span>
                <span className="text-sm">Hours</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-20 text-center">
                <span className="block text-3xl font-bold">
                  {timeLeft.minutes}
                </span>
                <span className="text-sm">Minutes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-20 text-center">
                <span className="block text-3xl font-bold">
                  {timeLeft.seconds}
                </span>
                <span className="text-sm">Seconds</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Sale Categories Carousel */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Shop By Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections with special discounts on premium
              products
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {saleCollections.map((collection) => (
                <CarouselItem
                  key={collection.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="overflow-hidden h-[300px] relative group">
                      <div className="absolute inset-0 bg-gradient-to-r opacity-90 z-10 transition-opacity group-hover:opacity-100 ${collection.bgColor}" />
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.title}
                        className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-110"
                        fill
                      />
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                        <Badge className="self-start mb-2 bg-white text-black hover:bg-white/90">
                          {collection.discount} OFF
                        </Badge>
                        <h3 className="text-2xl font-bold mb-2">
                          {collection.title}
                        </h3>
                        <p className="mb-4 text-white/90">
                          {collection.description}
                        </p>
                        <Button
                          variant="outline"
                          className="self-start bg-black/30 border-white text-white hover:bg-white/20"
                        >
                          Shop Collection
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
          </Carousel>
        </section>

        {/* Flash Sale Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl md:text-3xl font-bold">Flash Sale</h2>
              </div>
              <p className="text-gray-600 mt-1">
                Limited quantities, incredible prices
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 text-red-500" />
              <span className="font-medium">
                Ends in: {timeLeft.hours}h {timeLeft.minutes}m{" "}
                {timeLeft.seconds}s
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSaleItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden h-full flex flex-col relative group">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <Badge className="bg-red-500 hover:bg-red-600">
                      -{item.discount}%
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <Badge
                      variant="outline"
                      className="bg-black/70 text-white border-none"
                    >
                      Only {item.remaining} left
                    </Badge>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button className="bg-white text-black hover:bg-white/90">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Quick Add
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-red-600">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        Save ${(item.originalPrice - item.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Button className="flex-grow bg-red-500 hover:bg-red-600 text-white">
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sale Benefits */}
        <section className="mb-20 py-12 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Shop Our Sale</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enjoy premium quality products at unbeatable prices with our
                exceptional service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Authentic Products
                </h3>
                <p className="text-gray-600">
                  100% authentic products with manufacturer warranty
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">
                  Unbeatable discounts on premium quality products
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Quick shipping and hassle-free delivery to your doorstep
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Exclusive Deals</h3>
                <p className="text-gray-600">
                  Special offers and bundles available only during sale
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sale Products */}
        <section>
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700">
              Limited Time
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top Sale Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular discounted items before they&apos;re
              gone
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.slice(0, 8).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: product.id * 0.05 }}
              >
                <Card className="overflow-hidden h-full flex flex-col relative group">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <Badge className="bg-red-500 hover:bg-red-600">
                      -{product.discount}%
                    </Badge>
                    {product.isNew && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button className="bg-white text-black hover:bg-white/90">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Quick Add
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-red-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <Button className="mt-auto w-full bg-primary text-white hover:bg-primary/90">
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button className="bg-black text-white hover:bg-black/80 rounded-full px-8">
                View All Sale Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
