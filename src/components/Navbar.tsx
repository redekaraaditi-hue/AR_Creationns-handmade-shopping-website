"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-[#072428] text-white border-b border-amber-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 relative rounded-full overflow-hidden border border-amber-400/40 p-0.5">
            <Image
              src="/AR_Creationns logo.jpeg"
              alt="AR CREATIONNS"
              fill
              className="object-cover rounded-full group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold tracking-widest text-base text-white">
              AR CREATIONNS
            </span>
            <span className="text-[10px] tracking-[0.25em] text-amber-300 font-sans uppercase">
              BY AADITI
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-xs tracking-wider uppercase text-emerald-100/80">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          <Link href="#products" className="hover:text-amber-300 transition-colors">
            Collections
          </Link>
          <Link href="#about" className="hover:text-amber-300 transition-colors">
            About Us
          </Link>
          <Link href="#reviews" className="hover:text-amber-300 transition-colors">
            Reviews
          </Link>
        </div>

        {/* Cart Icon */}
        <Link
          href="/checkout"
          className="relative p-2 text-amber-300 hover:text-white transition-colors"
          aria-label="Shopping Cart"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-[#072428] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-sans">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}