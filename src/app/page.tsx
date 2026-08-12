"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Headphones,
  RotateCcw,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const categories = [
  "All",
  "Invisible Necklace with Earrings",
  "Artificial Flower Jewellery on Rent",
  "Original Flower Jewellery",
  "Earcuffs",
  "Necklace",
  "Bangles",
  "Nath",
  "Ring Platter",
  "Kashmiri Watch",
  "Morpankh Set",
  "Moti Sets",
  "Mundavalya",
];

const productsData = [
  {
    id: "inv-1",
    name: "Chandra Pearl Invisible Necklace Set",
    category: "Invisible Necklace with Earrings",
    price: 120,
    material: "Gold Finish & Pearls",
    tag: "Bestseller",
    image: "/products/chandra-invisible-necklace.jpeg",
    description: "Crescent chandra design adorned with pearls on an invisible cord.",
  },
  {
    id: "inv-2",
    name: "Red Peacock Invisible Necklace Set",
    category: "Invisible Necklace with Earrings",
    price: 250,
    material: "Kundan & Red Beads",
    tag: "Trending",
    image: "/products/red-peacock-invisible-necklace.jpeg",
    description: "Ornate gold peacock pendant with ruby-red accents.",
  },
  {
    id: "inv-3",
    name: "Delicate Silver Invisible Necklace",
    category: "Invisible Necklace with Earrings",
    price: 60,
    material: "Silver Finish Beads",
    tag: "Minimalist",
    image: "/products/silver-invisible-necklace.jpeg",
    description: "Ultra-lightweight invisible double-strand necklace.",
  },
  {
    id: "inv-4",
    name: "Meenakari Lotus Invisible Necklace",
    category: "Invisible Necklace with Earrings",
    price: 130,
    material: "Hand-painted Enamel & Pearls",
    tag: "New Arrival",
    image: "/products/lotus-invisible-necklace.jpeg",
    description: "Exquisite blue and green Meenakari lotus pendant.",
  },
  {
    id: "fl-1",
    name: "Bridal Haldi Floral Jewellery Set (Rental)",
    category: "Artificial Flower Jewellery on Rent",
    price: 800,
    material: "Artificial Flowers & Pearls",
    tag: "On Rent",
    description: "Vibrant yellow and pink artificial floral set available for Haldi and Mehendi functions on rent.",
  },
  {
    id: "fl-2",
    name: "Fresh Jasmine & Rose Bridal Flower Set",
    category: "Original Flower Jewellery",
    price: 2500,
    material: "Fresh Natural Flowers",
    tag: "Freshly Made",
    description: "Custom handcrafted fresh floral jewelry made to order for wedding ceremonies.",
  },
  {
    id: "ec-1",
    name: "Peacock Motif Pearl Earcuffs",
    category: "Earcuffs",
    price: 950,
    material: "Gold Finish & Pearls",
    tag: "New Arrival",
    description: "Intricately detailed cuff earrings wrapping smoothly along the ear border.",
  },
  {
    id: "nk-1",
    name: "Royal Kundan Heritage Choker Necklace",
    category: "Necklace",
    price: 4500,
    material: "24K Gold Plated",
    tag: "Bestseller",
    description: "Handcrafted Kundan necklace adorned with fine pearls and traditional stonework.",
  },
  {
    id: "bg-1",
    name: "Traditional Velvet Pearl Bangles Set",
    category: "Bangles",
    price: 1350,
    material: "Glass Bangles & Kundan",
    tag: "Festive",
    description: "Exquisite bridal bangles set adorned with velvet textures and kundan highlights.",
  },
  {
    id: "nth-1",
    name: "Maharashtrian Royal Pearl Nath",
    category: "Nath",
    price: 650,
    material: "Freshwater Pearls & Ruby",
    tag: "Traditional",
    description: "Classic Marathi nose ring embellished with pink stones and pearl cluster.",
  },
  {
    id: "rp-1",
    name: "Velvet Royal Floral Engagement Ring Platter",
    category: "Ring Platter",
    price: 1800,
    material: "Wood, Velvet & Acrylic",
    tag: "Customizable",
    description: "Elegant handcrafted ring tray customized for engagement ceremonies.",
  },
  {
    id: "kw-1",
    name: "Handmade Kashmiri Papier-Mâché Watch",
    category: "Kashmiri Watch",
    price: 2200,
    material: "Kashmiri Art & Quartz",
    tag: "Artisanal",
    description: "Hand-painted floral Kashmiri artisan watch with an adjustable band.",
  },
  {
    id: "mp-1",
    name: "Divine Krishna Morpankh Jewellery Set",
    category: "Morpankh Set",
    price: 1750,
    material: "Real Peacock Feather & Gold",
    tag: "Exclusive",
    description: "Artisanal necklace and earring set incorporating genuine peacock feather motifs.",
  },
  {
    id: "mt-1",
    name: "Classic Maharashtrian Moti Choker Set",
    category: "Moti Sets",
    price: 2100,
    material: "Woven Pearls & Red Beads",
    tag: "Heritage",
    description: "Multi-layered pearl strand necklace crafted in authentic Maharashtrian style.",
  },
  {
    id: "md-1",
    name: "Traditional Bridal Pearl Mundavalya",
    category: "Mundavalya",
    price: 490,
    material: "Pearls & Golden Thread",
    tag: "Bridal Essential",
    description: "Handcrafted traditional headband ornament worn by Marathi brides and grooms.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#fcfbfa] text-[#072428] overflow-x-hidden font-serif">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#072428] text-amber-300 text-[11px] py-2 px-4 text-center tracking-widest uppercase flex justify-between items-center max-w-full border-b border-amber-500/20 font-sans">
        <span>✨ Handcrafted Artisanal Jewellery | Free Shipping On All Orders</span>
        <span className="hidden md:inline">+91 98765 43210 | contact@arcreationns.com</span>
      </div>

      <Navbar />

      {/* 2. Main Hero Banner Section */}
      <section className="relative bg-gradient-to-r from-[#f7f4ef] via-[#fcfbfa] to-[#f4efe8] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="space-y-6 text-left">
            <p className="text-amber-800 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
              TIMELESS BEAUTY, PRECIOUS YOU
            </p>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#072428] leading-tight">
              Crafted to Shine, <br />
              <span className="italic font-normal text-amber-800">Made for You.</span>
            </h1>

            <p className="text-stone-600 text-sm max-w-md font-sans leading-relaxed">
              Discover exquisite handcrafted traditional and modern jewellery designs that celebrate every moment of your life.
            </p>

            <div className="pt-2">
              <a
                href="#products"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#072428] text-amber-300 font-sans text-xs tracking-widest uppercase font-semibold rounded hover:bg-[#092b31] transition-all shadow-md"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Guarantees Row */}
            <div className="pt-6 border-t border-stone-300/60 grid grid-cols-3 gap-4 text-left font-sans text-xs text-stone-700">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Certified Jewels</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-amber-700" />
                <span>Customisation Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Safe Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative aspect-[4/5] max-w-md mx-auto w-full group">
            <div className="absolute -inset-2 bg-amber-200/40 rounded-3xl blur-xl transition-all group-hover:bg-amber-300/50" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/20 bg-stone-100">
              <Image
                src="/hero-jewelry.jpg"
                alt="Handcrafted Emerald Pearl Nath"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef]/30 via-transparent to-[#f7f4ef]/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust Bar */}
      <section className="bg-[#072428] text-emerald-50 py-6 border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-sans text-xs">
          <div className="flex flex-col items-center space-y-1">
            <Award className="w-6 h-6 text-amber-400" />
            <span className="font-semibold text-white">100% Handcrafted</span>
            <span className="text-[10px] text-emerald-100/60">Traditional Artisans</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <RotateCcw className="w-6 h-6 text-amber-400" />
            <span className="font-semibold text-white">Quality Assured</span>
            <span className="text-[10px] text-emerald-100/60">Inspected Products</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Lock className="w-6 h-6 text-amber-400" />
            <span className="font-semibold text-white">Secure Payments</span>
            <span className="text-[10px] text-emerald-100/60">100% Safe Checkout</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Headphones className="w-6 h-6 text-amber-400" />
            <span className="font-semibold text-white">Customer Support</span>
            <span className="text-[10px] text-emerald-100/60">Always Here to Help</span>
          </div>
        </div>
      </section>

      {/* 4. Category Explorer Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-1">
          <p className="text-amber-800 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">SHOP BY CATEGORY</p>
          <h2 className="text-3xl font-serif font-bold text-[#072428]">Explore Our Collections</h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 pb-6 max-w-6xl mx-auto font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all border ${
                selectedCategory === cat
                  ? "bg-[#072428] text-amber-300 font-semibold border-[#072428] shadow"
                  : "bg-white text-stone-700 border-stone-200 hover:border-amber-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bestsellers Product Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between font-sans"
            >
              <div>
                <div className="aspect-square bg-[#f8f6f2] relative flex items-center justify-center border-b border-stone-100 overflow-hidden">
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#072428] text-amber-300 text-[10px] font-bold uppercase rounded z-20">
                    {product.tag}
                  </span>

                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <p className="text-xs text-center text-stone-500 italic p-4 font-serif">
                      [{product.name}]
                    </p>
                  )}
                </div>

                <div className="p-5 text-center space-y-1">
                  <h3 className="font-serif font-semibold text-[#072428] text-sm leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-amber-800 font-bold text-sm">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2.5 bg-[#072428] text-amber-300 text-xs font-semibold rounded hover:bg-[#092b31] transition-colors flex items-center justify-center space-x-2 uppercase tracking-wider"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO CART</span>
                </button>

                <Link
                  href={`/products/${product.id}`}
                  className="block text-center w-full py-2 border border-stone-300 text-stone-700 text-xs font-medium rounded hover:bg-stone-50 transition-colors uppercase tracking-wider"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Promotional Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#072428] text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between border border-amber-500/20 shadow-xl relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left z-10">
            <span className="text-amber-300 text-xs font-sans font-bold tracking-widest uppercase">LIMITED TIME OFFER</span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold">Shine More, Save More</h3>
            <p className="text-emerald-100/80 text-sm font-sans max-w-md">Get flat 20% off on complete bridal and festive collections.</p>
            <div className="pt-2">
              <a
                href="#products"
                className="inline-block px-6 py-3 bg-amber-500 text-[#072428] text-xs font-sans font-bold uppercase tracking-wider rounded hover:bg-amber-400 transition-colors"
              >
                SHOP NOW →
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0 text-center z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-amber-400 flex items-center justify-center p-2 mx-auto">
              <span className="text-2xl font-serif font-bold text-amber-300">20% <br/><span className="text-xs uppercase font-sans">OFF</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#04191c] text-emerald-200/60 py-12 border-t border-amber-500/20 text-center text-sm space-y-3 font-sans">
        <p className="text-white font-serif text-lg font-bold tracking-widest uppercase">
          AR CREATIONNS
        </p>
        <p className="text-amber-300/80 font-serif text-xs tracking-widest">— BY AADITI —</p>
        <p className="text-xs pt-2">© 2026 AR Creationns. All rights reserved.</p>
      </footer>
    </main>
  );
}