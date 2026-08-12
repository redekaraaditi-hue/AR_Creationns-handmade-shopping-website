"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#092b31] border-l border-amber-500/20 shadow-2xl z-50 flex flex-col justify-between text-white"
          >
            {/* Header */}
            <div className="p-6 border-b border-amber-500/20 flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold tracking-wider">
                Your Shopping Bag
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-amber-300 hover:text-white transition-colors"
                aria-label="Close Shopping Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <p className="text-sm text-emerald-100/60 text-center py-12 font-serif italic">
                  Your bag is currently empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#072428] p-4 rounded-lg border border-amber-500/10"
                  >
                    <div>
                      <h4 className="font-serif text-sm text-white font-semibold">
                        {item.name}
                      </h4>
                      <p className="text-xs text-amber-300 font-bold mt-0.5">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center font-bold hover:bg-amber-500/30 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs px-2">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-6 h-6 rounded bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center font-bold hover:bg-amber-500/30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-amber-500/20 bg-[#072428] space-y-4">
                <div className="flex justify-between items-center text-sm font-serif">
                  <span className="text-emerald-100/80">Subtotal:</span>
                  <span className="text-amber-300 font-bold text-lg">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-3.5 bg-amber-500 text-[#072428] font-bold text-sm rounded flex items-center justify-center space-x-2 hover:bg-amber-400 transition-colors shadow-lg text-center justify-center"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}