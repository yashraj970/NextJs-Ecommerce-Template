"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample wishlist data
interface WishlistItem {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  discount?: number;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      title: "Premium Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      category: "Clothing",
      inStock: true,
      discount: 25,
    },
    {
      id: 2,
      title: "Designer Sunglasses",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
      category: "Accessories",
      inStock: true,
    },
    {
      id: 3,
      title: "Leather Crossbody Bag",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2080&auto=format&fit=crop",
      category: "Bags",
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
      inStock: true,
      discount: 20,
    },
  ]);

  const removeItem = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page Header */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center">
            My Wishlist
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {wishlistItems.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">
                Saved Items ({wishlistItems.length})
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={clearWishlist}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="relative overflow-hidden h-full flex flex-col">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {item.discount && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                          -{item.discount}%
                        </Badge>
                      )}
                      {!item.inStock && (
                        <Badge variant="outline" className="bg-gray-100">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>

                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-sm font-medium text-primary mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <Button
                          className="w-full bg-primary text-white hover:bg-primary/90 rounded-full"
                          disabled={!item.inStock}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Save items you love to your wishlist. Review them anytime and
                easily move them to your cart.
              </p>
              <Link href="/shop">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
