"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { use } from "react";

const productsData = [
  { id: "1", name: "Royal Kundan Choker Set", price: 4500, material: "24K Gold Plated", description: "Handcrafted traditional Kundan choker set adorned with fine pearls and intricate stone work." },
  { id: "2", name: "Oxidized Silver Jhumka Earrings", price: 1250, material: "925 Silver", description: "Lightweight, oxidized silver Jhumkas featuring antique tribal patterns and delicate beads." },
  { id: "3", name: "Hand-painted Terracotta Necklace", price: 890, material: "Terracotta Clay", description: "Eco-friendly handmade terracotta necklace set hand-painted with vibrant organic colors." },
  { id: "4", name: "Freshwater Pearl Statement Ring", price: 1650, material: "Freshwater Pearl", description: "Minimalist adjustable brass ring crowned with a natural luster freshwater pearl." },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const product = productsData.find((p) => p.id === resolvedParams.id) || productsData[0];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          <div className="aspect-[4/5] bg-stone-100 rounded-xl flex items-center justify-center text-stone-400 border border-stone-200 shadow-inner">
            [High-Res Image: {product.name}]
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                {product.material}
              </span>
              <h1 className="text-3xl font-serif text-stone-900 mt-1">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-stone-900 mt-2">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>

            <p className="text-stone-600 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="w-full py-4 bg-stone-900 text-white font-medium rounded-md hover:bg-amber-900 transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Shopping Bag</span>
            </button>

            <div className="border-t border-stone-200 pt-6 space-y-3 text-sm text-stone-600">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-amber-800" />
                <span>100% Handcrafted & Quality Inspected</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-amber-800" />
                <span>Free shipping across India on orders over ₹1,000</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-5 h-5 text-amber-800" />
                <span>7-day easy return policy</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}