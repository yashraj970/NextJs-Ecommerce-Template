"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Package,
  CreditCard,
  Heart,
  MapPin,
  Bell,
  LogOut,
  Settings,
  Search,
  ChevronRight,
  Filter,
  X,
  Eye,
  Download,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample orders data - in a real app, this would come from your API
interface OrderItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const orders: Order[] = [
  {
    id: "ORD-2023-1234",
    date: "2023-11-15",
    total: 259.97,
    status: "delivered",
    trackingNumber: "TRK928374651",
    estimatedDelivery: "2023-11-20",
    items: [
      {
        id: "item1",
        productName: "Premium Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      },
      {
        id: "item2",
        productName: "Minimalist Watch with Leather Strap",
        price: 159.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2080&auto=format&fit=crop",
      },
      {
        id: "item3",
        productName: "Leather Wallet",
        price: 39.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2071&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2023-1189",
    date: "2023-10-28",
    total: 89.99,
    status: "shipped",
    trackingNumber: "TRK837465192",
    estimatedDelivery: "2023-11-05",
    items: [
      {
        id: "item4",
        productName: "Leather Crossbody Bag",
        price: 89.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2080&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2023-1022",
    date: "2023-09-15",
    total: 329.97,
    status: "delivered",
    trackingNumber: "TRK736451928",
    estimatedDelivery: "2023-09-22",
    items: [
      {
        id: "item5",
        productName: "Wireless Noise-Cancelling Headphones",
        price: 249.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "item6",
        productName: "Cashmere Scarf",
        price: 79.98,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1584736286279-75260e76eb21?q=80&w=1974&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2023-0987",
    date: "2023-08-03",
    total: 149.99,
    status: "cancelled",
    items: [
      {
        id: "item7",
        productName: "Leather Chelsea Boots",
        price: 149.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=2135&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2023-0875",
    date: "2023-07-22",
    total: 199.99,
    status: "delivered",
    trackingNumber: "TRK645192837",
    estimatedDelivery: "2023-07-29",
    items: [
      {
        id: "item8",
        productName: "Hooded Parka Jacket",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2023-0756",
    date: "2023-06-14",
    total: 129.99,
    status: "processing",
    estimatedDelivery: "2023-06-21",
    items: [
      {
        id: "item9",
        productName: "Smart Fitness Tracker",
        price: 129.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2088&auto=format&fit=crop",
      },
    ],
  },
];

export default function OrdersPage() {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      applyFilters(statusFilter, dateFilter);
      return;
    }

    const filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        order.items.some((item) =>
          item.productName.toLowerCase().includes(query.toLowerCase())
        )
    );

    setFilteredOrders(filtered);
  };

  const applyFilters = (status: string, date: string) => {
    let filtered = [...orders];

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((order) => order.status === status);
    }

    // Apply date filter
    if (date !== "all") {
      const now = new Date();
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);

      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);

        switch (date) {
          case "last-month":
            return orderDate >= monthAgo;
          case "last-3-months":
            return orderDate >= threeMonthsAgo;
          case "last-6-months":
            return orderDate >= sixMonthsAgo;
          default:
            return true;
        }
      });
    }

    // Apply search query if exists
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(value, dateFilter);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    applyFilters(statusFilter, value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateFilter("all");
    setFilteredOrders(orders);
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-emerald-500">Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case "processing":
        return <Badge className="bg-amber-500">Processing</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center">
            My Orders
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6 flex flex-col items-center text-center border-b">
                <h2 className="text-xl font-semibold">Account Menu</h2>
              </div>

              <div className="p-4">
                <nav className="space-y-1">
                  <Link
                    href="/account"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
                  >
                    <Package className="mr-3 h-5 w-5" />
                    Orders
                  </Link>
                  <Link
                    href="/account/payment-methods"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    Payment Methods
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Heart className="mr-3 h-5 w-5" />
                    Wishlist
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <MapPin className="mr-3 h-5 w-5" />
                    Addresses
                  </Link>
                  <Link
                    href="/account/notifications"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    Notifications
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </Link>
                  <Link
                    href="/logout"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Link>
                </nav>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Order History</h2>
                <p className="text-gray-500 mt-1">
                  View and manage your orders
                </p>
              </div>

              {/* Filters */}
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search orders..."
                      className="pl-10 pr-4 py-2 w-full"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    {searchQuery && (
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => {
                          setSearchQuery("");
                          applyFilters(statusFilter, dateFilter);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Select
                      value={statusFilter}
                      onValueChange={handleStatusFilterChange}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={dateFilter}
                      onValueChange={handleDateFilterChange}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="last-3-months">
                          Last 3 Months
                        </SelectItem>
                        <SelectItem value="last-6-months">
                          Last 6 Months
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {(statusFilter !== "all" ||
                      dateFilter !== "all" ||
                      searchQuery) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearFilters}
                      >
                        <Filter className="h-4 w-4" />
                        <X className="h-3 w-3 absolute" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="divide-y">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            {getStatusIcon(order.status)}
                            <h3 className="font-medium">{order.id}</h3>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-gray-500 text-sm mt-1">
                            Ordered on {formatDate(order.date)} •{" "}
                            {order.items.length}{" "}
                            {order.items.length === 1 ? "item" : "items"}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-medium">
                            ${order.total.toFixed(2)}
                          </span>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Order Details</DialogTitle>
                                <DialogDescription>
                                  Order {order.id} • Placed on{" "}
                                  {formatDate(order.date)}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="mt-6 space-y-6">
                                {/* Order Status */}
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(order.status)}
                                    <span className="font-medium">
                                      Status:{" "}
                                    </span>
                                    {getStatusBadge(order.status)}
                                  </div>
                                </div>

                                {/* Tracking Info */}
                                {(order.status === "shipped" ||
                                  order.status === "delivered") && (
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                                      <div>
                                        <h4 className="font-medium">
                                          Tracking Information
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                          Tracking Number:{" "}
                                          {order.trackingNumber}
                                        </p>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        <Truck className="mr-2 h-4 w-4" />
                                        Track Package
                                      </Button>
                                    </div>

                                    {order.estimatedDelivery && (
                                      <p className="text-sm mt-2">
                                        {order.status === "delivered"
                                          ? `Delivered on ${formatDate(
                                              order.estimatedDelivery
                                            )}`
                                          : `Estimated delivery: ${formatDate(
                                              order.estimatedDelivery
                                            )}`}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* Order Items */}
                                <div>
                                  <h4 className="font-medium mb-4">
                                    Order Items
                                  </h4>
                                  <div className="space-y-4">
                                    {order.items.map((item) => (
                                      <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                          <img
                                            src={
                                              item.image || "/placeholder.svg"
                                            }
                                            alt={item.productName}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div className="flex-grow">
                                          <p className="font-medium">
                                            {item.productName}
                                          </p>
                                          <div className="flex justify-between mt-1">
                                            <span className="text-sm text-gray-500">
                                              Qty: {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                              $
                                              {(
                                                item.price * item.quantity
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                {/* Order Summary */}
                                <div>
                                  <h4 className="font-medium mb-4">
                                    Order Summary
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Subtotal
                                      </span>
                                      <span>${order.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Shipping
                                      </span>
                                      <span>Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Tax</span>
                                      <span>
                                        ${(order.total * 0.08).toFixed(2)}
                                      </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                      <span>Total</span>
                                      <span>
                                        ${(order.total * 1.08).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between">
                                  <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Invoice
                                  </Button>

                                  {order.status !== "cancelled" && (
                                    <div className="space-x-2">
                                      <Button variant="outline" size="sm">
                                        Contact Support
                                      </Button>
                                      {order.status === "delivered" && (
                                        <Button size="sm">Buy Again</Button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border"
                          >
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No orders found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {searchQuery ||
                      statusFilter !== "all" ||
                      dateFilter !== "all"
                        ? "Try adjusting your filters or search query"
                        : "You haven't placed any orders yet"}
                    </p>
                    {searchQuery ||
                    statusFilter !== "all" ||
                    dateFilter !== "all" ? (
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    ) : (
                      <Link href="/shop">
                        <Button>Start Shopping</Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How can I track my order?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can track your order by clicking the "View Details"
                      button on any shipped order. This will show you the
                      tracking number and a link to track your package with the
                      carrier.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I cancel my order?</AccordionTrigger>
                    <AccordionContent>
                      Orders can only be cancelled if they are still in the
                      "Processing" status. Once an order has been shipped, it
                      cannot be cancelled. Please contact customer support if
                      you need assistance with cancelling an order.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      How do I return an item?
                    </AccordionTrigger>
                    <AccordionContent>
                      To return an item, go to the order details and click the
                      "Return Item" button. You'll need to select a reason for
                      the return and follow the instructions to print a return
                      label. Returns must be initiated within 30 days of
                      delivery.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      When will I receive my refund?
                    </AccordionTrigger>
                    <AccordionContent>
                      Refunds are typically processed within 3-5 business days
                      after we receive your returned item. The time it takes for
                      the refund to appear in your account depends on your
                      payment method and financial institution.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
