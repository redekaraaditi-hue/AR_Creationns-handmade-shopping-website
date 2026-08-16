"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
    paymentMethod: "cod", // 'cod' or 'upi'
  });

  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 1000 || subtotal === 0 ? 0 : 70;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty! Please add some jewellery items first.");
      return;
    }

    // Format WhatsApp summary
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* x ${item.quantity} = ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const orderText = `✨ *NEW ORDER - AR CREATIONNS* ✨
--------------------------------
🛍️ *Customer Details:*
• Name: ${formData.fullName}
• Phone: ${formData.phone}
• Address: ${formData.address}, ${formData.city} - ${formData.pincode}
${formData.notes ? `• Customization Note: ${formData.notes}\n` : ""}
--------------------------------
📦 *Ordered Items:*
${itemsList}

--------------------------------
💰 *Subtotal:* ₹${subtotal.toLocaleString("en-IN")}
🚚 *Shipping:* ${shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
🌟 *Grand Total:* ₹${grandTotal.toLocaleString("en-IN")}
💳 *Payment Mode:* ${
      formData.paymentMethod === "cod"
        ? "Cash on Delivery"
        : "UPI / Online Payment"
    }
--------------------------------
Please confirm my order!`;

    const encodedMessage = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/918208125340?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setIsOrdered(true);
    if (clearCart) clearCart();
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#072428] font-serif">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/#products"
            className="inline-flex items-center space-x-2 text-xs font-sans text-stone-600 hover:text-[#072428] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#072428]">
            Checkout & Order
          </h1>
        </div>

        {isOrdered ? (
          /* Order Confirmation Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 text-center max-w-lg mx-auto shadow-sm space-y-5 font-sans">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#072428]">
              Order Placed Successfully!
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your order details have been forwarded to **AR Creationns** on WhatsApp. We will get in touch with you shortly to confirm processing and delivery.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3.5 bg-[#072428] text-amber-300 text-xs font-semibold rounded-xl uppercase tracking-wider hover:bg-[#092b31] transition-all"
            >
              Back to Home
            </Link>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart Screen */
          <div className="bg-white rounded-3xl p-12 border border-stone-200 text-center max-w-md mx-auto shadow-sm space-y-4 font-sans">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
            <h2 className="text-lg font-serif font-bold text-stone-800">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-xs text-stone-500">
              Explore our handcrafted collections and add your favourite pieces to your bag.
            </p>
            <Link
              href="/#products"
              className="inline-block px-6 py-3 bg-[#072428] text-amber-300 text-xs font-semibold rounded-xl uppercase tracking-wider hover:bg-[#092b31]"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          /* Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Shipping Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm font-sans space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-lg font-serif font-bold text-[#072428]">
                  Shipping Address
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Enter your delivery destination details.
                </p>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Pooja Deshmukh"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#072428] focus:bg-white transition-colors font-sans text-xs placeholder:font-sans text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      WhatsApp / Mobile No *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9823011223"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#072428] focus:bg-white transition-colors font-sans text-xs tabular-nums placeholder:font-sans placeholder:tabular-nums text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Street Address & Landmark *
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Apartment, Road, Landmark..."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#072428] focus:bg-white transition-colors font-sans text-xs tabular-nums placeholder:font-sans placeholder:tabular-nums text-stone-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Pune / Kolhapur"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#072428] focus:bg-white transition-colors font-sans text-xs placeholder:font-sans text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Postal Code / PIN *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 411001"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#072428] focus:bg-white transition-colors font-sans text-xs tabular-nums placeholder:font-sans placeholder:tabular-nums text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Customization / Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Specific name tag, wrist size, color alteration..."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#072428] focus:bg-white transition-colors font-sans text-xs placeholder:font-sans text-stone-800"
                  />
                </div>

                {/* Payment Selection */}
                <div className="pt-2">
                  <label className="block font-semibold text-stone-700 mb-2">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-2 gap-3 font-sans">
                    <label
                      className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === "cod"
                          ? "border-[#072428] bg-emerald-50/50 text-[#072428] font-bold"
                          : "border-stone-200 text-stone-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="text-[#072428] focus:ring-0"
                      />
                      <span>Cash on Delivery</span>
                    </label>

                    <label
                      className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === "upi"
                          ? "border-[#072428] bg-emerald-50/50 text-[#072428] font-bold"
                          : "border-stone-200 text-stone-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === "upi"}
                        onChange={handleInputChange}
                        className="text-[#072428] focus:ring-0"
                      />
                      <span>UPI / GPay / PhonePe</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-[#072428] text-amber-300 hover:bg-[#092b31] rounded-2xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg transition-all font-sans"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm Order via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 space-y-6 font-sans">
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="text-base font-serif font-bold text-[#072428] border-b border-stone-100 pb-3">
                  Order Summary ({cart.length} items)
                </h3>

                <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-3 text-xs font-sans"
                    >
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ShoppingBag className="w-5 h-5 text-stone-400 m-auto mt-3.5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-800 truncate font-serif">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-stone-500 font-sans tabular-nums">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>

                        <div className="flex items-center space-x-2 mt-1 font-sans">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="w-5 h-5 bg-stone-100 rounded flex items-center justify-center hover:bg-stone-200 text-stone-700 font-sans tabular-nums"
                          >
                            -
                          </button>
                          <span className="font-bold text-stone-800 font-sans tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-5 h-5 bg-stone-100 rounded flex items-center justify-center hover:bg-stone-200 text-stone-700 font-sans tabular-nums"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-[#072428] font-sans tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-rose-600 hover:text-rose-800 mt-1 inline-block"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-100 pt-3 space-y-2 text-xs text-stone-600 font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-stone-900 font-sans tabular-nums">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping Charges</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-semibold uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded font-sans">
                          Free Delivery
                        </span>
                      ) : (
                        <span className="font-sans tabular-nums">₹{shippingFee}</span>
                      )}
                    </span>
                  </div>
                  <div className="border-t border-stone-200 pt-3 flex justify-between text-sm font-bold text-[#072428] font-sans">
                    <span>Grand Total</span>
                    <span className="font-sans tabular-nums">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#072428]/5 border border-[#072428]/10 rounded-2xl p-4 space-y-2 text-[11px] text-stone-600 font-sans">
                <div className="flex items-center space-x-2 text-[#072428] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>100% Secure & Verified Handcraft</span>
                </div>
                <div className="flex items-center space-x-2 text-[#072428] font-semibold">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Free Express Shipping on Orders Above ₹1,000</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}