"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Share2,
  Star,
  Check,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    category: string;
    brand: string;
    sku: string;
    inStock: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    colors?: string[];
    sizes?: string[];
    tags?: string[];
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Product Title and Badges */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          <span className="text-sm text-gray-600">SKU: {product.sku}</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              {product.discount && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  Save {product.discount}%
                </Badge>
              )}
            </>
          )}
        </div>
        {product.inStock ? (
          <div className="flex items-center text-emerald-600 mt-2">
            <Check className="h-4 w-4 mr-1" />
            <span>In Stock</span>
          </div>
        ) : (
          <div className="text-amber-600 mt-2">Out of Stock</div>
        )}
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`h-8 w-8 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-0"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Size</h3>
            <button className="text-sm text-primary hover:underline">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`h-10 min-w-[2.5rem] px-3 rounded border-2 transition-all ${
                  selectedSize === size
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Quantity</h3>
        <div className="flex items-center border border-gray-300 rounded-md w-32">
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart and Wishlist */}
      <div className="flex gap-4 mt-auto">
        <Button className="flex-1 bg-primary hover:bg-primary/90" size="lg">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          className={`${
            isWishlisted ? "bg-red-50 border-red-200 text-red-500" : ""
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Product Benefits */}
      <div className="grid grid-cols-2 gap-4 mt-8 border-t border-gray-200 pt-8">
        <div className="flex items-start">
          <Truck className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Free Shipping</h4>
            <p className="text-xs text-gray-500">On orders over $50</p>
          </div>
        </div>
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">2 Year Warranty</h4>
            <p className="text-xs text-gray-500">Full coverage</p>
          </div>
        </div>
        <div className="flex items-start">
          <RotateCcw className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">30 Day Returns</h4>
            <p className="text-xs text-gray-500">Hassle-free returns</p>
          </div>
        </div>
        <div className="flex items-start">
          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Secure Checkout</h4>
            <p className="text-xs text-gray-500">SSL encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
