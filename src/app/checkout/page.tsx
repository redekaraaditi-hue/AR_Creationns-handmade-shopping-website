"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, ArrowLeft, CheckCircle2, CreditCard, Wallet, Truck } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif text-stone-900">Order Placed Successfully!</h1>
          <p className="text-stone-600">
            Thank you for your order, <span className="font-semibold text-stone-900">{formData.fullName}</span>. 
            We have sent a confirmation email to <span className="font-semibold text-stone-900">{formData.email}</span>.
          </p>
          <div className="bg-white p-6 rounded-lg border border-stone-200 text-left space-y-2 text-sm text-stone-700 max-w-md mx-auto">
            <p><span className="font-semibold">Shipping to:</span> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
            <p><span className="font-semibold">Payment Method:</span> {paymentMethod.toUpperCase()}</p>
            <p><span className="font-semibold">Total Paid:</span> ₹{total.toLocaleString("en-IN")}</p>
          </div>
          <Link
            href="/"
            className="inline-block mt-6 px-8 py-3 bg-stone-900 text-white font-medium rounded-md hover:bg-amber-900 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="inline-flex items-center space-x-2 text-stone-600 hover:text-amber-800 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>

        <h1 className="text-3xl font-serif text-stone-900 mb-8">Checkout</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center border border-stone-200 space-y-4">
            <p className="text-stone-600">Your shopping bag is empty.</p>
            <Link href="/" className="inline-block px-6 py-3 bg-stone-900 text-white rounded-md text-sm font-medium hover:bg-amber-900 transition-colors">
              Browse Jewelry Collections
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Shipping & Payment Info */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-4 shadow-sm">
                <h2 className="text-lg font-serif font-semibold text-stone-900">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-stone-900 outline-none text-sm"
                      placeholder="Aditi Patil"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-stone-900 outline-none text-sm"
                      placeholder="aditi@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-stone-900 outline-none text-sm"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-stone-900 outline-none text-sm"
                      placeholder="Flat No, Building, Area"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-stone-900 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Pincode</label>
                    <input
                      required
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-stone-900 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-4 shadow-sm">
                <h2 className="text-lg font-serif font-semibold text-stone-900">Payment Option</h2>

                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-amber-800 bg-amber-50/30' : 'border-stone-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="upi" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')} 
                        className="accent-amber-800" 
                      />
                      <span className="font-medium text-sm text-stone-900">UPI / GPay / PhonePe</span>
                    </div>
                    <Wallet className="w-5 h-5 text-amber-800" />
                  </label>

                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-amber-800 bg-amber-50/30' : 'border-stone-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')} 
                        className="accent-amber-800" 
                      />
                      <span className="font-medium text-sm text-stone-900">Cash on Delivery (COD)</span>
                    </div>
                    <Truck className="w-5 h-5 text-amber-800" />
                  </label>

                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-amber-800 bg-amber-50/30' : 'border-stone-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')} 
                        className="accent-amber-800" 
                      />
                      <span className="font-medium text-sm text-stone-900">Credit / Debit Card</span>
                    </div>
                    <CreditCard className="w-5 h-5 text-amber-800" />
                  </label>
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-serif font-semibold text-stone-900 border-b border-stone-100 pb-3">Order Summary</h2>

                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium text-stone-900">{item.name}</p>
                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-stone-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-4 space-y-2 text-sm text-stone-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-700 font-medium">Free</span> : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-900 border-t border-stone-200 pt-3">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 text-white font-medium rounded-md hover:bg-amber-900 transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Place Order</span>
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </main>
  );
}