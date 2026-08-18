"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
    paymentMethod: "cod",
  });

  // Calculate Cart Subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Free shipping threshold logic
  const FREE_SHIPPING_THRESHOLD = 1000;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = subtotal === 0 ? 0 : isFreeShipping ? 0 : 80;
  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const totalAmount = subtotal + shippingCost;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      setOrderSuccess(data.order);
      if (clearCart) clearCart();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-[#fcfbfa] text-[#072428] font-sans">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#072428]">
            Order Confirmed!
          </h1>
          <p className="text-stone-600 text-sm">
            Thank you for shopping with AR Creationns. Your order number is:
          </p>
          <div className="inline-block bg-white border border-stone-200 px-6 py-3 rounded-xl font-mono font-bold text-[#072428] text-lg shadow-sm">
            {orderSuccess.orderNumber}
          </div>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            We will contact you shortly on <b>{orderSuccess.phone}</b> to
            confirm dispatch details.
          </p>
          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-[#072428] text-amber-300 text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#092b31] transition-all"
            >
              <span>CONTINUE SHOPPING</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfbfa] text-[#072428] font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-stone-500 hover:text-[#072428] transition-colors mb-2 space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Store</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#072428]">
            Checkout & Shipping
          </h1>
        </div>

        {error && (
          <div className="p-4 mb-8 text-sm text-red-800 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Shipping Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Free Shipping Banner */}
            <div
              className={`p-4 rounded-xl border flex items-center space-x-3 text-xs ${
                isFreeShipping
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-amber-50 border-amber-200 text-amber-900"
              }`}
            >
              <Truck className="w-5 h-5 flex-shrink-0 text-amber-700" />
              <div>
                {isFreeShipping ? (
                  <span className="font-semibold">
                    🎉 You have unlocked Free Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <b>₹{amountNeededForFreeShipping}</b> more to unlock{" "}
                    <b>Free Express Shipping on Orders Above ₹1,000</b>!
                  </span>
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-5"
            >
              <h2 className="font-serif font-bold text-lg text-[#072428] border-b border-stone-100 pb-3">
                1. Delivery Details
              </h2>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="e.g. Pooja Deshmukh"
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#072428]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#072428]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Pincode *
                  </label>
                  <input
                    required
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="416001"
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#072428]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Complete Address (House No, Street, Landmark) *
                </label>
                <textarea
                  required
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Flat No 204, Royal Palms, Near Shivaji Chowk"
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#072428]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  City / District *
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Kolhapur / Pune / Mumbai"
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#072428]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Order Notes / Customization Request (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Custom name tag for earrings, urgent delivery date, etc."
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#072428]"
                />
              </div>

              <h2 className="font-serif font-bold text-lg text-[#072428] border-t border-stone-100 pt-5">
                2. Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 border rounded-xl cursor-pointer hover:bg-stone-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="accent-[#072428]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#072428]">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-xs text-stone-500">
                        Pay in cash upon receiving your order
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </label>

                <label className="flex items-center justify-between p-3.5 border rounded-xl cursor-pointer hover:bg-stone-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === "online"}
                      onChange={handleChange}
                      className="accent-[#072428]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#072428]">
                        UPI / QR Code / Net Banking
                      </p>
                      <p className="text-xs text-stone-500">
                        Instant payment via PhonePe, GPay, Paytm
                      </p>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-amber-700" />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full py-4 bg-[#072428] text-amber-300 text-xs font-semibold rounded-xl hover:bg-[#092b31] transition-all flex items-center justify-center space-x-2 uppercase tracking-widest disabled:opacity-50 shadow-md mt-6"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {loading
                    ? "PLACING ORDER..."
                    : `CONFIRM ORDER • ₹${totalAmount.toLocaleString("en-IN")}`}
                </span>
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <h2 className="font-serif font-bold text-lg text-[#072428] border-b border-stone-100 pb-3">
                Order Summary ({cart.length} item{cart.length === 1 ? "" : "s"})
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-sm">
                  Your cart is empty.
                </div>
              ) : (
                <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center space-x-4"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                        {(item as any).image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={(item as any).image}
                            alt={item.name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-stone-400">
                            No Img
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold text-[#072428] truncate">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#072428]">
                        ₹
                        {(
                          item.price * (item.quantity || 1)
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Cost Calculations */}
              <div className="space-y-3 pt-4 border-t border-stone-100 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center text-stone-600">
                  <span>Delivery Charges</span>
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                      FREE EXPRESS SHIPPING
                    </span>
                  ) : (
                    <span>₹{shippingCost}</span>
                  )}
                </div>

                <div className="flex justify-between text-base font-bold text-[#072428] pt-3 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-amber-800">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-stone-500 space-y-1.5">
                <p className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Free Express Shipping on Orders Above ₹1,000</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>100% Handcrafted Authenticity Guarantee</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}