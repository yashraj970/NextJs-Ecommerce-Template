"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  CreditCard,
  Check,
  Truck,
  ShieldCheck,
  MapPin,
  CreditCardIcon,
  CheckCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample cart data for order summary
const cartItems = [
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
];

// Calculate order totals
const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const shipping = subtotal > 100 ? 0 : 10;
const tax = subtotal * 0.08;
const discount = subtotal * 0.2; // Assuming 20% discount
const total = subtotal + shipping + tax - discount;

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    shippingMethod: "standard",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    billingAddressSame: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateShippingForm = () => {
    const errors: Record<string, string> = {};

    if (!shippingInfo.firstName) errors.firstName = "First name is required";
    if (!shippingInfo.lastName) errors.lastName = "Last name is required";
    if (!shippingInfo.email) errors.email = "Email is required";
    if (!shippingInfo.phone) errors.phone = "Phone number is required";
    if (!shippingInfo.address) errors.address = "Address is required";
    if (!shippingInfo.city) errors.city = "City is required";
    if (!shippingInfo.state) errors.state = "State is required";
    if (!shippingInfo.zipCode) errors.zipCode = "ZIP code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentForm = () => {
    const errors: Record<string, string> = {};

    if (!paymentInfo.cardName) errors.cardName = "Name on card is required";
    if (!paymentInfo.cardNumber) errors.cardNumber = "Card number is required";
    if (!paymentInfo.expiryDate) errors.expiryDate = "Expiry date is required";
    if (!paymentInfo.cvv) errors.cvv = "CVV is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setCurrentStep("payment");
      window.scrollTo(0, 0);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      setCurrentStep("review");
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = () => {
    // In a real app, you would submit the order to your backend here
    alert("Order placed successfully! Thank you for your purchase.");
  };

  const handleShippingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page Header */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center">
            Checkout
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Checkout Steps */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === "shipping"
                    ? "bg-primary text-white"
                    : currentStep === "payment" || currentStep === "review"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep === "payment" || currentStep === "review" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <MapPin className="h-5 w-5" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">Shipping</span>
            </div>

            <div className="w-full max-w-[100px] sm:max-w-[180px] flex items-center mx-2">
              <div
                className={`h-1 w-full ${
                  currentStep === "payment" || currentStep === "review"
                    ? "bg-emerald-500"
                    : "bg-gray-200"
                }`}
              ></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === "payment"
                    ? "bg-primary text-white"
                    : currentStep === "review"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep === "review" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <CreditCardIcon className="h-5 w-5" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">Payment</span>
            </div>

            <div className="w-full max-w-[100px] sm:max-w-[180px] flex items-center mx-2">
              <div
                className={`h-1 w-full ${
                  currentStep === "review" ? "bg-emerald-500" : "bg-gray-200"
                }`}
              ></div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === "review"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                          Shipping Information
                        </h2>
                        <Link
                          href="/cart"
                          className="text-sm text-primary hover:underline flex items-center"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Back to Cart
                        </Link>
                      </div>
                    </div>

                    <form
                      onSubmit={handleShippingSubmit}
                      className="p-6 space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleShippingInputChange}
                            className={
                              formErrors.firstName ? "border-red-500" : ""
                            }
                          />
                          {formErrors.firstName && (
                            <p className="text-red-500 text-xs">
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleShippingInputChange}
                            className={
                              formErrors.lastName ? "border-red-500" : ""
                            }
                          />
                          {formErrors.lastName && (
                            <p className="text-red-500 text-xs">
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={handleShippingInputChange}
                            className={formErrors.email ? "border-red-500" : ""}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-xs">
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingInputChange}
                            className={formErrors.phone ? "border-red-500" : ""}
                          />
                          {formErrors.phone && (
                            <p className="text-red-500 text-xs">
                              {formErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingInputChange}
                          className={formErrors.address ? "border-red-500" : ""}
                        />
                        {formErrors.address && (
                          <p className="text-red-500 text-xs">
                            {formErrors.address}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div className="space-y-2 col-span-2 sm:col-span-2">
                          <Label htmlFor="city">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingInputChange}
                            className={formErrors.city ? "border-red-500" : ""}
                          />
                          {formErrors.city && (
                            <p className="text-red-500 text-xs">
                              {formErrors.city}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleShippingInputChange}
                            className={formErrors.state ? "border-red-500" : ""}
                          />
                          {formErrors.state && (
                            <p className="text-red-500 text-xs">
                              {formErrors.state}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zipCode">
                            ZIP Code <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleShippingInputChange}
                            className={
                              formErrors.zipCode ? "border-red-500" : ""
                            }
                          />
                          {formErrors.zipCode && (
                            <p className="text-red-500 text-xs">
                              {formErrors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={shippingInfo.country}
                          onValueChange={(value) =>
                            setShippingInfo((prev) => ({
                              ...prev,
                              country: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4 pt-4">
                        <h3 className="font-medium">Shipping Method</h3>

                        <RadioGroup
                          value={shippingInfo.shippingMethod}
                          onValueChange={(value) =>
                            setShippingInfo((prev) => ({
                              ...prev,
                              shippingMethod: value,
                            }))
                          }
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label
                              htmlFor="standard"
                              className="flex-grow cursor-pointer"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">
                                    Standard Shipping
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Delivery in 3-5 business days
                                  </p>
                                </div>
                                <div className="font-medium">
                                  {shipping === 0
                                    ? "Free"
                                    : `$${shipping.toFixed(2)}`}
                                </div>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                            <RadioGroupItem value="express" id="express" />
                            <Label
                              htmlFor="express"
                              className="flex-grow cursor-pointer"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">
                                    Express Shipping
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Delivery in 1-2 business days
                                  </p>
                                </div>
                                <div className="font-medium">$15.00</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full"
                        >
                          Continue to Payment
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              )}

              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                          Payment Information
                        </h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                          onClick={() => setCurrentStep("shipping")}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Back to Shipping
                        </Button>
                      </div>
                    </div>

                    <form
                      onSubmit={handlePaymentSubmit}
                      className="p-6 space-y-6"
                    >
                      <div className="space-y-4">
                        <h3 className="font-medium">Payment Method</h3>

                        <RadioGroup
                          defaultValue="credit-card"
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                            <RadioGroupItem
                              value="credit-card"
                              id="credit-card"
                            />
                            <Label
                              htmlFor="credit-card"
                              className="flex-grow cursor-pointer"
                            >
                              <div className="flex items-center">
                                <CreditCard className="h-5 w-5 mr-2" />
                                <span>Credit / Debit Card</span>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer opacity-50">
                            <RadioGroupItem
                              value="paypal"
                              id="paypal"
                              disabled
                            />
                            <Label
                              htmlFor="paypal"
                              className="flex-grow cursor-not-allowed"
                            >
                              <div className="flex items-center">
                                <span className="font-bold text-blue-600 mr-2">
                                  Pay
                                </span>
                                <span className="font-bold text-blue-800">
                                  Pal
                                </span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">
                          Name on Card <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentInputChange}
                          className={
                            formErrors.cardName ? "border-red-500" : ""
                          }
                        />
                        {formErrors.cardName && (
                          <p className="text-red-500 text-xs">
                            {formErrors.cardName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">
                          Card Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInputChange}
                          className={
                            formErrors.cardNumber ? "border-red-500" : ""
                          }
                        />
                        {formErrors.cardNumber && (
                          <p className="text-red-500 text-xs">
                            {formErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">
                            Expiry Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentInputChange}
                            className={
                              formErrors.expiryDate ? "border-red-500" : ""
                            }
                          />
                          {formErrors.expiryDate && (
                            <p className="text-red-500 text-xs">
                              {formErrors.expiryDate}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <Label htmlFor="cvv">
                              CVV <span className="text-red-500">*</span>
                            </Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3 w-3 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    3 or 4 digit security code on the back of
                                    your card
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInputChange}
                            className={formErrors.cvv ? "border-red-500" : ""}
                          />
                          {formErrors.cvv && (
                            <p className="text-red-500 text-xs">
                              {formErrors.cvv}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                          id="saveCard"
                          checked={paymentInfo.saveCard}
                          onCheckedChange={(checked) =>
                            setPaymentInfo((prev) => ({
                              ...prev,
                              saveCard: checked === true,
                            }))
                          }
                        />
                        <label
                          htmlFor="saveCard"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Save card for future purchases
                        </label>
                      </div>

                      <Separator className="my-2" />

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="billingAddressSame"
                          checked={paymentInfo.billingAddressSame}
                          onCheckedChange={(checked) =>
                            setPaymentInfo((prev) => ({
                              ...prev,
                              billingAddressSame: checked === true,
                            }))
                          }
                        />
                        <label
                          htmlFor="billingAddressSame"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Billing address same as shipping address
                        </label>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full"
                        >
                          Review Order
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              )}

              {currentStep === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                          Review Your Order
                        </h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                          onClick={() => setCurrentStep("payment")}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Back to Payment
                        </Button>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              Shipping Information
                            </h3>
                            <div className="text-sm text-gray-600 mt-2">
                              <p>
                                {shippingInfo.firstName} {shippingInfo.lastName}
                              </p>
                              <p>{shippingInfo.address}</p>
                              <p>
                                {shippingInfo.city}, {shippingInfo.state}{" "}
                                {shippingInfo.zipCode}
                              </p>
                              <p>
                                {shippingInfo.country === "US"
                                  ? "United States"
                                  : shippingInfo.country}
                              </p>
                              <p>{shippingInfo.email}</p>
                              <p>{shippingInfo.phone}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                            onClick={() => setCurrentStep("shipping")}
                          >
                            Edit
                          </Button>
                        </div>

                        <Separator />

                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Payment Method</h3>
                            <div className="text-sm text-gray-600 mt-2">
                              <p>
                                Credit Card ending in{" "}
                                {paymentInfo.cardNumber.slice(-4)}
                              </p>
                              <p>{paymentInfo.cardName}</p>
                              <p>Expires {paymentInfo.expiryDate}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                            onClick={() => setCurrentStep("payment")}
                          >
                            Edit
                          </Button>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-4">Order Items</h3>
                          <div className="space-y-4">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <p className="font-medium">{item.title}</p>
                                  <div className="text-sm text-gray-500">
                                    <span>Color: {item.color}</span>
                                    {item.size && (
                                      <span className="ml-4">
                                        Size: {item.size}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-sm">
                                      Qty: {item.quantity}
                                    </span>
                                    <span className="font-medium">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between text-emerald-600">
                            <span>Discount (20%)</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>

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
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          onClick={handlePlaceOrder}
                          className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full"
                        >
                          Place Order
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                          By placing your order, you agree to our Terms of
                          Service and Privacy Policy.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.title}
                        </p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-emerald-600">
                    <span>Discount (20%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>

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
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    <span>Secure checkout</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-5 w-5 text-emerald-500" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
