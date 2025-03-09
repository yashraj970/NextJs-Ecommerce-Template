"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Clock,
  CreditCard,
  Gift,
} from "lucide-react";
import { useId } from "react";

export default function FeaturesSection() {
  // Use useId to generate stable IDs for server/client rendering
  const id = useId();

  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Quality Guarantee",
      description:
        "Every item is carefully inspected to ensure premium quality and craftsmanship.",
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Free Shipping",
      description: "Enjoy free worldwide shipping on all orders over $100.",
    },
    {
      icon: <RefreshCw className="h-10 w-10" />,
      title: "Easy Returns",
      description:
        "Not satisfied? Return within 30 days for a full refund, no questions asked.",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "24/7 Support",
      description:
        "Our customer service team is available around the clock to assist you.",
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "Secure Payment",
      description:
        "Shop with confidence using our encrypted and secure payment methods.",
    },
    {
      icon: <Gift className="h-10 w-10" />,
      title: "Gift Wrapping",
      description:
        "Make your gift special with our premium gift wrapping service.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Fixed positions for background elements to prevent hydration errors
  const bgElements = [
    { x: "10%", y: "20%", scale: 0.8, delay: 0 },
    { x: "70%", y: "15%", scale: 0.6, delay: 2 },
    { x: "25%", y: "60%", scale: 0.7, delay: 4 },
    { x: "80%", y: "70%", scale: 0.9, delay: 6 },
    { x: "40%", y: "30%", scale: 0.5, delay: 8 },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />

      {/* Animated background elements with fixed positions */}
      <div className="absolute inset-0 overflow-hidden">
        {bgElements.map((el, i) => (
          <motion.div
            key={`${id}-bg-${i}`}
            className="absolute h-[300px] w-[300px] rounded-full bg-emerald-500/10"
            initial={{ x: el.x, y: el.y, scale: el.scale }}
            animate={{
              x: [el.x, `calc(${el.x} + 5%)`, el.x],
              y: [el.y, `calc(${el.y} + 5%)`, el.y],
            }}
            transition={{
              duration: 15,
              delay: el.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            className="text-emerald-400 font-medium mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHY CHOOSE US
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The Premium Shopping Experience
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-neutral-300"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We&apos;re committed to providing an exceptional shopping experience
            with premium products and unmatched service.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={`${id}-feature-${index}`}
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/40 transition-colors group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-5 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-300">{feature.description}</p>
              <div className="h-1 w-0 bg-gradient-to-r from-emerald-500 to-emerald-300 mt-6 group-hover:w-1/2 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button className="px-8 py-3 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white rounded-full relative group overflow-hidden">
            <span className="relative z-10">Learn More About Our Services</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
