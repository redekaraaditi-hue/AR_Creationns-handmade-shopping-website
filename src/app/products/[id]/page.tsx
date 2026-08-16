"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Check,
  Palette,
} from "lucide-react";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const productsData = [
  {
    id: "inv-1",
    name: "Chandra Pearl Invisible Necklace Set",
    category: "Invisible Necklace with Earrings",
    price: 120,
    material: "Gold Finish & Pearls",
    tag: "Bestseller",
    image: "/products/chandra-invisible-necklace.jpeg",
    description:
      "Crescent chandra design adorned with pearls on an invisible cord. Delicate, lightweight, and perfect for ethnic or modern outfits.",
    features: ["Invisible cord design", "Anti-tarnish finish", "Includes matching earrings"],
  },
  {
    id: "inv-2",
    name: "Red Peacock Invisible Necklace Set",
    category: "Invisible Necklace with Earrings",
    price: 250,
    material: "Kundan & Red Beads",
    tag: "Trending",
    image: "/products/red-peacock-invisible-necklace.jpeg",
    description:
      "Ornate gold peacock pendant with ruby-red accents set gracefully on a clear transparent strand.",
    features: ["Handcrafted Kundan work", "Featherlight weight", "Includes ear studs"],
  },
  {
    id: "inv-3",
    name: "Delicate Silver Invisible Necklace",
    category: "Invisible Necklace with Earrings",
    price: 60,
    material: "Silver Finish Beads",
    tag: "Minimalist",
    image: "/products/silver-invisible-necklace.jpeg",
    description: "Ultra-lightweight invisible double-strand necklace for everyday subtle elegance.",
    features: ["Water-resistant thread", "Minimalist look", "Skin-friendly alloy"],
  },
  {
    id: "inv-4",
    name: "Red Meenakari Lotus Invisible Set",
    category: "Invisible Necklace with Earrings",
    price: 130,
    material: "Hand-painted Enamel & Pearls",
    tag: "New Arrival",
    image: "/hero-red-lotus.jpg",
    description:
      "Exquisite red and green Meenakari lotus pendant with matching floral ear pins and pearl hangings.",
    features: ["Handmade Meenakari enamel", "Seed pearl drops", "Matching ear pins"],
  },
  {
    id: "fl-1",
    name: "Custom Orchid Baby Shower Dohale Floral Set",
    category: "Artificial Flower Jewellery on Rent",
    price: 1200,
    material: "Royal Blue Orchids & Pearls",
    tag: "On Rent",
    image: "/hero-floral-dohale.jpg",
    description:
      "Complete royal blue orchid floral jewellery set featuring custom Aai-Baba earrings, tiara, and bajuband.",
    features: ["Customizable Aai-Baba text", "Available for rent or purchase", "Soft backing"],
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
    features: ["High-grade freshwater pearls", "Durable gold polish", "Set of 2"],
  },
  {
    id: "nth-1",
    name: "Maharashtrian Royal Emerald Pearl Nath",
    category: "Nath",
    price: 650,
    material: "Freshwater Pearls & Emerald Stone",
    tag: "Traditional",
    image: "/hero-jewelry.jpg",
    description:
      "Classic Marathi nose ring embellished with emerald teardrop stone and pearl cluster with pain-free clip.",
    features: ["Clip-on (no piercing needed)", "Authentic Peshwai design", "Lightweight"],
  },
  {
    id: "ec-1",
    name: "Peacock Motif Pearl Earcuffs",
    category: "Earcuffs",
    price: 950,
    material: "Gold Finish & Pearls",
    tag: "New Arrival",
    image: "/hero-jewelry.jpg",
    description: "Intricately detailed cuff earrings wrapping smoothly along the ear border.",
    features: ["Full ear coverage", "Secure clip clasp"],
  },
  {
    id: "nk-1",
    name: "Royal Kundan Heritage Choker Necklace",
    category: "Necklace",
    price: 4500,
    material: "24K Gold Plated",
    tag: "Heritage",
    image: "/hero-red-lotus.jpg",
    description: "Handcrafted Kundan necklace adorned with fine pearls and traditional stonework.",
    features: ["Adjustable dori length", "Bridal finish", "Matching earrings"],
  },
  {
    id: "rp-1",
    name: "Velvet Royal Floral Engagement Ring Platter",
    category: "Ring Platter",
    price: 1800,
    material: "Wood, Velvet & Acrylic",
    tag: "Customizable",
    image: "/hero-floral-dohale.jpg",
    description: "Elegant handcrafted ring tray customized for engagement ceremonies.",
    features: ["Custom couple name cutout", "Velvet ring cushions"],
  },
  {
    id: "kw-1",
    name: "Handmade Kashmiri Papier-Mâché Watch",
    category: "Kashmiri Watch",
    price: 2200,
    material: "Kashmiri Art & Quartz",
    tag: "Artisanal",
    image: "/hero-red-lotus.jpg",
    description: "Hand-painted floral Kashmiri artisan watch with an adjustable band.",
    features: ["Hand-painted artwork", "Quartz movement"],
  },
  {
    id: "mp-1",
    name: "Divine Krishna Morpankh Jewellery Set",
    category: "Morpankh Set",
    price: 1750,
    material: "Real Peacock Feather & Gold",
    tag: "Exclusive",
    image: "/hero-red-lotus.jpg",
    description: "Artisanal necklace and earring set incorporating genuine peacock feather motifs.",
    features: ["Peacock motif accents", "Includes necklace and earrings"],
  },
  {
    id: "mt-1",
    name: "Classic Maharashtrian Moti Choker Set",
    category: "Moti Sets",
    price: 2100,
    material: "Woven Pearls & Red Beads",
    tag: "Heritage",
    image: "/hero-pearl-bangles.jpg",
    description: "Multi-layered pearl strand necklace crafted in authentic Maharashtrian style.",
    features: ["Traditional Thushi pattern", "Woven seed pearls"],
  },
  {
    id: "md-1",
    name: "Traditional Bridal Pearl Mundavalya",
    category: "Mundavalya",
    price: 490,
    material: "Pearls & Golden Thread",
    tag: "Bridal Essential",
    image: "/hero-jewelry.jpg",
    description: "Handcrafted traditional headband ornament worn by Marathi brides and grooms.",
    features: ["Pair for Bride and Groom", "Comfort tie string"],
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Find product by id or fallback to first product
  const product =
    productsData.find((p) => p.id === resolvedParams.id) || productsData[0];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AR Creationns! I want to order: ${product.name} (Price: ₹${product.price}). Link: https://arcreationns.com/products/${product.id}`
  );

  return (
    <main className="min-h-screen bg-[#fcfbfa] text-[#072428] font-serif">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <Link
          href="/#products"
          className="inline-flex items-center space-x-2 text-xs font-sans text-stone-600 hover:text-[#072428] uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collections</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-[#f8f6f2]">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-stone-400 font-sans text-xs">
                [{product.name}]
              </div>
            )}
            {product.tag && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#072428] text-amber-300 text-xs font-sans font-bold uppercase rounded shadow">
                {product.tag}
              </span>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="space-y-6 text-left">
            <div>
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-amber-800">
                {product.material}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#072428] mt-1">
                {product.name}
              </h1>
              <p className="text-2xl font-sans font-bold text-amber-900 mt-2">
                ₹{product.price.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-stone-500 ml-2">
                  (Inclusive of all taxes)
                </span>
              </p>
            </div>

            <p className="text-stone-600 font-sans text-sm leading-relaxed border-t border-b border-stone-200 py-4">
              {product.description}
            </p>

            {/* Highlights */}
            {product.features && (
              <div className="space-y-2 font-sans">
                <p className="text-xs font-bold uppercase tracking-wider text-[#072428]">
                  Highlights
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2 font-sans">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-semibold uppercase text-stone-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#072428] text-amber-300 text-xs font-semibold rounded-xl hover:bg-[#092b31] transition-all flex items-center justify-center space-x-2 uppercase tracking-wider shadow"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/918208125340?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-stone-200 pt-6 space-y-3 font-sans text-xs text-stone-600">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>100% Handcrafted & Quality Inspected</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>Free shipping across India on orders over ₹1,000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Palette className="w-4 h-4 text-amber-700" />
                <span>Custom color and design sizing available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}