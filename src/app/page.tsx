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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

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
    name: "Red Meenakari Lotus Invisible Set",
    category: "Invisible Necklace with Earrings",
    price: 130,
    material: "Hand-painted Enamel & Pearls",
    tag: "New Arrival",
    image: "/hero-red-lotus.jpg",
    description: "Exquisite red and green Meenakari lotus pendant with matching floral ear pins.",
  },
  {
    id: "fl-1",
    name: "Custom Orchid Baby Shower Dohale Floral Set",
    category: "Artificial Flower Jewellery on Rent",
    price: 1200,
    material: "Royal Blue Orchids & Pearls",
    tag: "On Rent",
    image: "/hero-floral-dohale.jpg",
    description: "Complete royal blue orchid floral jewellery set featuring custom Aai-Baba earrings.",
  },
  {
    id: "bg-1",
    name: "Handcrafted Double-Row Pearl Bangles",
    category: "Bangles",
    price: 850,
    material: "Freshwater Pearls & Gold Polish",
    tag: "Bestseller",
    image: "/hero-pearl-bangles.jpg",
    description: "Delicate double-row pearl studded traditional kada bangles set.",
  },
  {
    id: "nth-1",
    name: "Maharashtrian Royal Emerald Pearl Nath",
    category: "Nath",
    price: 650,
    material: "Freshwater Pearls & Emerald Stone",
    tag: "Traditional",
    image: "/hero-jewelry.jpg",
    description: "Classic Marathi nose ring embellished with emerald teardrop stone and pearl cluster.",
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
    tag: "Heritage",
    description: "Handcrafted Kundan necklace adorned with fine pearls and traditional stonework.",
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 3 seconds right-to-left
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

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

            <div className="pt-2">
              <a
                href="#products"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#072428] text-amber-300 font-sans text-xs tracking-widest uppercase font-semibold rounded hover:bg-[#092b31] transition-all shadow-md"
              >
                <span>EXPLORE COLLECTION</span>
                <Palette className="w-4 h-4" />
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
          <p className="text-amber-800 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">SHOP BY CATEGORY</p>
          <h2 className="text-3xl font-serif font-bold text-[#072428]">Explore Our Collections</h2>
        </div>
{/* Category Pills - Increased Size */}
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

      {/* 5. About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#fcfbfa] to-[#f4efe8] border-y border-stone-200">
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

      {/* 6. Customer Reviews Section */}
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
          {/* Review 1 */}
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

          {/* Review 2 */}
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

          {/* Review 3 */}
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

      {/* 7. Footer */}
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