"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Palette,
  ShieldCheck,
  Award,
  Sparkles,
  Headphones,
  Lock,
  Star,
  Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  tag?: string | null;
  image: string;
  description: string;
  inStock?: boolean;
}

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

const heroSlides = [
  {
    id: 1,
    image: "/hero-floral-dohale.jpg",
    alt: "Custom Dohale Jevan Floral Jewellery Set",
    tagline: "BRIDAL & BABY SHOWER SPECIAL",
    title: "Dohale Jevan Floral Sets",
  },
  {
    id: 2,
    image: "/hero-pearl-bangles.jpg",
    alt: "Traditional Handcrafted Pearl Studded Bangles",
    tagline: "TIMELESS MAHARASHTRIAN HERITAGE",
    title: "Classic Royal Moti Bangles",
  },
  {
    id: 3,
    image: "/hero-red-lotus.jpg",
    alt: "Red Meenakari Lotus Invisible Necklace Set",
    tagline: "TRENDING INVISIBLE NECKLACE",
    title: "Lotus Invisible Wire Sets",
  },
  {
    id: 4,
    image: "/hero-jewelry.jpg",
    alt: "Handcrafted Emerald Pearl Nath",
    tagline: "SIGNATURE BRIDAL NATH",
    title: "Royal Emerald Pearl Nath",
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

const slideVariants: Variants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 240, damping: 28 },
      opacity: { duration: 0.4 },
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      x: { ease: "easeInOut", duration: 0.5 },
      opacity: { duration: 0.3 },
    },
  },
};

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch dynamic products from Prisma API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Auto-slide hero every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#fcfbfa] text-[#072428] overflow-x-hidden font-serif">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#072428] text-amber-300 text-[11px] py-2 px-4 text-center tracking-widest uppercase flex justify-between items-center max-w-full border-b border-amber-500/20 font-sans">
        <span>✨ Handcrafted Artisanal Jewellery</span>
        <span className="hidden md:inline">+91 8208125340 | contact: @ar_creationns</span>
      </div>

      <Navbar />

      {/* 2. Main Hero Banner Section with 3-Second Carousel */}
      <section className="relative bg-gradient-to-r from-[#f7f4ef] via-[#fcfbfa] to-[#f4efe8] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="space-y-6 text-left">
            <p className="text-amber-800 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
              {heroSlides[currentSlide].tagline}
            </p>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#072428] leading-tight">
              Crafted to Shine, <br />
              <span className="italic font-normal text-amber-800">Made for You.</span>
            </h1>

            <p className="text-stone-600 text-sm max-w-md font-sans leading-relaxed">
              Discover exquisite handcrafted traditional and modern jewellery designs that celebrate every moment of your life.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#072428] text-amber-300 font-sans text-xs tracking-widest uppercase font-semibold rounded hover:bg-[#092b31] transition-all shadow-md"
              >
                <span>EXPLORE COLLECTION</span>
                <Palette className="w-4 h-4" />
              </a>
              <a
                href="#craftsmanship-video"
                className="inline-flex items-center space-x-2 px-6 py-3.5 border border-[#072428] text-[#072428] font-sans text-xs tracking-widest uppercase font-semibold rounded hover:bg-[#072428]/5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-[#072428]" />
                <span>WATCH PROCESS</span>
              </a>
            </div>

            {/* Quick Guarantees Row */}
            <div className="pt-6 border-t border-stone-300/60 grid grid-cols-3 gap-4 text-left font-sans text-xs text-stone-700">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Certified Jewels</span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-amber-700" />
                <span>Customisation Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Safe Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Carousel */}
          <div className="flex flex-col items-center">
            <div className="relative aspect-[4/5] max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/20 bg-stone-100">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={currentSlide}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <Image
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef]/30 via-transparent to-[#f7f4ef]/20 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Navigation Indicator Dots */}
            <div className="flex space-x-2.5 mt-5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all rounded-full ${
                    currentSlide === idx
                      ? "w-6 bg-[#072428]"
                      : "w-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
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
            <Palette className="w-6 h-6 text-amber-400" />
            <span className="font-semibold text-white">Custom Designs</span>
            <span className="text-[10px] text-emerald-100/60">Tailored to You</span>
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
          <p className="text-amber-800 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            SHOP BY CATEGORY
          </p>
          <h2 className="text-3xl font-serif font-bold text-[#072428]">
            Explore Our Collections
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-4 pb-8 max-w-6xl mx-auto font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all border shadow-sm ${
                selectedCategory === cat
                  ? "bg-[#072428] text-amber-300 font-semibold border-[#072428] shadow-md scale-105"
                  : "bg-white text-stone-700 border-stone-300 hover:border-amber-700 hover:text-amber-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 font-sans text-stone-500">
            Loading collections from database...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 font-sans text-stone-500">
            No products found in this category.
          </div>
        ) : (
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
                    {product.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#072428] text-amber-300 text-[10px] font-bold uppercase rounded z-20">
                        {product.tag}
                      </span>
                    )}

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
        )}
      </section>

      {/* 5. Craftsmanship Video Showcase Section */}
      <section
        id="craftsmanship-video"
        className="py-20 bg-[#072428] text-white border-y border-amber-500/20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <p className="text-amber-400 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
              BEHIND THE ARTISTRY
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-50">
              The Making of Artisanal Elegance
            </h2>
            <p className="text-stone-300 text-sm max-w-xl mx-auto font-sans leading-relaxed">
              Witness how every bead, pearl, and delicate strand comes together through meticulous handcrafting.
            </p>
          </div>

          <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 bg-black">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              poster="/hero-jewelry.jpg"
            >
              <source src="/craftsmanship.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* 6. About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#fcfbfa] to-[#f4efe8] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square max-w-md mx-auto w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/20">
              <Image
                src="/AR_Creationns logo.jpeg"
                alt="AR Creationns Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#072428]/20" />
            </div>

            <div className="space-y-5 text-left">
              <p className="text-amber-800 text-xs font-sans font-semibold tracking-[0.25em] uppercase">
                OUR HERITAGE & PASSION
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#072428]">
                Every Piece Tells A Story of Elegance
              </h2>
              <p className="text-stone-600 text-sm font-sans leading-relaxed">
                Founded by Aaditi, <span className="font-semibold text-[#072428]">AR Creationns</span> brings together time-honored Indian traditions and modern aesthetics. From delicate pearl invisible necklaces and handmade Meenakari craft to bespoke floral bridal and baby shower sets, each creation is crafted with meticulous attention to detail.
              </p>
              <p className="text-stone-600 text-sm font-sans leading-relaxed">
                We believe luxury should be personal and accessible. Whether you seek custom wedding ornaments or bridal rental sets, we curate timeless beauty tailored uniquely for you.
              </p>

              <div className="pt-2 flex items-center space-x-6 font-sans">
                <div>
                  <p className="text-2xl font-serif font-bold text-[#072428]">500+</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Custom Orders</p>
                </div>
                <div className="h-8 w-px bg-stone-300" />
                <div>
                  <p className="text-2xl font-serif font-bold text-[#072428]">100%</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Handmade Craft</p>
                </div>
                <div className="h-8 w-px bg-stone-300" />
                <div>
                  <p className="text-2xl font-serif font-bold text-[#072428]">4.9★</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Customer Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews Section */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <p className="text-amber-800 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl font-serif font-bold text-[#072428]">
            Loved By Our Customers
          </h2>
          <p className="text-stone-600 text-sm font-sans max-w-md mx-auto">
            Real feedback from brides and jewelry lovers who chose AR Creationns for their special occasions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 text-xs leading-relaxed italic font-serif">
                "The invisible necklace and earrings set was incredibly lightweight and subtle. It looks floating on the neck and received so many compliments!"
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-[#072428]">Pooja Deshmukh</p>
              <p className="text-[11px] text-stone-400">Pune, Maharashtra</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 text-xs leading-relaxed italic font-serif">
                "Ordered the Dohale Jevan baby shower orchid floral jewelry with personalized Aai-Baba earrings. The craft was flawless and arrived right on time."
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-[#072428]">Snehal Kulkarni</p>
              <p className="text-[11px] text-stone-400">Mumbai, Maharashtra</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 text-xs leading-relaxed italic font-serif">
                "The pearl nath with the emerald stone is authentic Maharashtrian beauty. Perfect finishing and super comfortable clip-on fit."
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-[#072428]">Ankita Patil</p>
              <p className="text-[11px] text-stone-400">Kolhapur, Maharashtra</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
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