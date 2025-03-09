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
  Edit,
  Camera,
  Save,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample user data - in a real app, this would come from your authentication system
const userData = {
  id: "user123",
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  addresses: [
    {
      id: "addr1",
      name: "Home",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr2",
      name: "Work",
      street: "456 Office Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: "pm1",
      type: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: "pm2",
      type: "mastercard",
      last4: "5555",
      expiryMonth: "08",
      expiryYear: "2024",
      isDefault: false,
    },
  ],
  notifications: {
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    accountActivity: true,
  },
};

export default function AccountPage() {
  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setUser((prev) => ({ ...prev, ...editedUser }));
    setIsEditing(false);
  };

  const toggleNotification = (key: keyof typeof user.notifications) => {
    setUser((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const setDefaultAddress = (id: string) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    }));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setUser((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page Header */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center">
            My Account
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6 flex flex-col items-center text-center border-b">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback>
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              </div>

              <div className="p-4">
                <nav className="space-y-1">
                  <Link
                    href="/account"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
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
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      Personal Information
                    </h2>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>

                  <div className="p-6">
                    {isEditing ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <Avatar className="h-24 w-24">
                              <AvatarImage
                                src={user.avatar}
                                alt={`${user.firstName} ${user.lastName}`}
                              />
                              <AvatarFallback>
                                {user.firstName.charAt(0)}
                                {user.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={editedUser.firstName}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={editedUser.lastName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={editedUser.email}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={editedUser.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button
                            onClick={handleSaveProfile}
                            className="bg-primary text-white hover:bg-primary/90"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              First Name
                            </h3>
                            <p className="mt-1">{user.firstName}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Last Name
                            </h3>
                            <p className="mt-1">{user.lastName}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Email
                            </h3>
                            <p className="mt-1">{user.email}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">
                              Phone
                            </h3>
                            <p className="mt-1">{user.phone}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Account ID
                          </h3>
                          <p className="mt-1 text-gray-600">{user.id}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Address
                    </Button>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.addresses.map((address) => (
                      <Card key={address.id} className="overflow-hidden">
                        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                          <div className="flex items-center">
                            <h3 className="font-medium">{address.name}</h3>
                            {address.isDefault && (
                              <Badge variant="secondary" className="ml-2">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600">
                            {address.street}
                            <br />
                            {address.city}, {address.state} {address.zipCode}
                            <br />
                            {address.country}
                          </p>

                          {!address.isDefault && (
                            <Button
                              variant="link"
                              className="mt-2 h-auto p-0 text-primary"
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              Set as default
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payment">
                <Card>
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.paymentMethods.map((method) => (
                      <Card key={method.id} className="overflow-hidden">
                        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-6 bg-gray-200 rounded mr-2 flex items-center justify-center">
                              {method.type === "visa" ? "VISA" : "MC"}
                            </div>
                            <h3 className="font-medium">
                              •••• {method.last4}
                              {method.isDefault && (
                                <Badge variant="secondary" className="ml-2">
                                  Default
                                </Badge>
                              )}
                            </h3>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>

                          {!method.isDefault && (
                            <Button
                              variant="link"
                              className="mt-2 h-auto p-0 text-primary"
                              onClick={() => setDefaultPaymentMethod(method.id)}
                            >
                              Set as default
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">
                      Notification Preferences
                    </h2>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Order Updates</h3>
                        <p className="text-sm text-gray-500">
                          Receive notifications about your order status
                        </p>
                      </div>
                      <Switch
                        checked={user.notifications.orderUpdates}
                        onCheckedChange={() =>
                          toggleNotification("orderUpdates")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Promotions and Sales</h3>
                        <p className="text-sm text-gray-500">
                          Receive notifications about discounts and special
                          offers
                        </p>
                      </div>
                      <Switch
                        checked={user.notifications.promotions}
                        onCheckedChange={() => toggleNotification("promotions")}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">New Arrivals</h3>
                        <p className="text-sm text-gray-500">
                          Be the first to know about new products
                        </p>
                      </div>
                      <Switch
                        checked={user.notifications.newArrivals}
                        onCheckedChange={() =>
                          toggleNotification("newArrivals")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Account Activity</h3>
                        <p className="text-sm text-gray-500">
                          Receive notifications about account security and
                          updates
                        </p>
                      </div>
                      <Switch
                        checked={user.notifications.accountActivity}
                        onCheckedChange={() =>
                          toggleNotification("accountActivity")
                        }
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
