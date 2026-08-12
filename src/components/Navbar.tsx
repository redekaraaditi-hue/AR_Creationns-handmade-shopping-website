"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#092b31]/90 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with Image */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/AR_Creationns logo.jpeg"
                alt="AR CREATIONNS"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-serif font-bold tracking-widest text-white uppercase leading-tight">
                AR CREATIONNS
              </span>
              <span className="text-[9px] font-serif tracking-[0.25em] text-amber-300 uppercase">
                BY AADITI
              </span>
            </div>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-emerald-100">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <Link href="/#products" className="hover:text-amber-300 transition-colors">
              Collections
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-amber-300 transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-[#072428] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}