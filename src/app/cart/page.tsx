"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ChevronLeft,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// Sample cart data - in a real app, this would come from a state management solution or API
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Premium Cotton T-Shirt",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      quantity: 2,
      color: "Black",
      size: "M",
    },
    {
      id: 4,
      title: "Minimalist Watch with Leather Strap",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2080&auto=format&fit=crop",
      quantity: 1,
      color: "Brown",
    },
    {
      id: 7,
      title: "Cashmere Scarf",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1584736286279-75260e76eb21?q=80&w=1974&auto=format&fit=crop",
      quantity: 1,
      color: "Red",
    },
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate totals whenever cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);

    // Free shipping over $100, otherwise $10
    const newShipping = newSubtotal > 100 ? 0 : 10;
    setShipping(newShipping);

    // Calculate tax (assuming 8%)
    const newTax = newSubtotal * 0.08;
    setTax(newTax);

    // Calculate total
    setTotal(newSubtotal + newShipping + newTax - discount);
  }, [cartItems, discount]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    // In a real app, you would validate the promo code with an API
    if (promoCode.toLowerCase() === "discount20") {
      const discountAmount = subtotal * 0.2;
      setDiscount(discountAmount);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      alert("Invalid promo code");
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center">
            Your Shopping Cart
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b">
                  <h2 className="text-xl font-semibold">
                    Cart Items (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 flex flex-col sm:flex-row gap-4"
                    >
                      <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium text-lg">
                              {item.title}
                            </h3>
                            <div className="text-sm text-gray-500 mt-1">
                              <span>Color: {item.color}</span>
                              {item.size && (
                                <span className="ml-4">Size: {item.size}</span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0 text-lg font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-3 w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <Link
                    href="/shop"
                    className="flex items-center text-primary hover:underline"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Promo code"
                      className="w-40 h-9"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount (20%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <Link href="/checkout">
                      <Button className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                    <div className="mt-4 text-xs text-center text-gray-500">
                      <p>
                        Secure Checkout. All information is encrypted and
                        secure.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet. Browse
                our products and find something you'll love!
              </p>
              <Link href="/shop">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
