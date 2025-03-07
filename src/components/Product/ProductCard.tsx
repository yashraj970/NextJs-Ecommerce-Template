"use client";
import { motion } from "motion/react";
import {
  ShoppingBag,
  Star,
  Truck,
  Shield,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProductCard({ image, title, price, category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <motion.div
          className="absolute top-4 right-4 z-10 cursor-pointer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="h-6 w-6 text-gray-500 hover:text-red-500 transition-colors" />
        </motion.div>

        <motion.div
          className="relative aspect-square overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <motion.div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Button
              variant="secondary"
              size="lg"
              className="transform -translate-y-2 group-hover:translate-y-0 transition-transform"
            >
              Quick View
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="p-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">{category}</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-2xl font-bold text-gray-900">${price}</span>
              <div className="text-sm text-gray-500">Free shipping</div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary text-white hover:bg-primary/90">
                Add to Cart
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
