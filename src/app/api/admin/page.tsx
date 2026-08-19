"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((ord) =>
            ord.id === orderId ? { ...ord, status: newStatus } : ord
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Analytics summary calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="min-h-screen bg-stone-50 text-[#072428] font-sans pb-16">
      {/* Top Admin Navigation */}
      <header className="bg-[#072428] text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="font-serif font-bold text-xl tracking-wider">
            AR CREATIONNS ADMIN
          </h1>
          <p className="text-[11px] text-emerald-200/70">
            Store Management & Orders Portal
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={fetchOrders}
            className="flex items-center space-x-1.5 bg-[#092b31] hover:bg-[#0d3b43] text-amber-300 text-xs px-3.5 py-2 rounded-lg border border-amber-500/20 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/"
            className="text-xs text-stone-300 hover:text-white transition-colors"
          >
            View Live Store →
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-[#072428] mt-1">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                Total Orders
              </p>
              <p className="text-2xl font-bold text-[#072428] mt-1">
                {orders.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-800 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                Pending Actions
              </p>
              <p className="text-2xl font-bold text-amber-700 mt-1">
                {pendingOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                Fulfilled Orders
              </p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">
                {completedOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Orders Table Section */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#072428]">
                Customer Orders
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Manage recent customer orders, addresses, and tracking status.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm text-stone-500">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center text-sm text-stone-500">
              No orders placed yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4">Order ID & Date</th>
                    <th className="px-6 py-4">Customer & Contact</th>
                    <th className="px-6 py-4">Shipping Destination</th>
                    <th className="px-6 py-4">Ordered Items</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-6 py-4 align-top">
                        <span className="font-mono font-bold text-[#072428] block">
                          {order.orderNumber}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4 align-top">
                        <span className="font-semibold text-stone-900 block">
                          {order.customerName}
                        </span>
                        <a
                          href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-emerald-700 font-medium hover:underline block mt-0.5"
                        >
                          📱 {order.phone}
                        </a>
                      </td>

                      <td className="px-6 py-4 align-top max-w-xs">
                        <p className="line-clamp-2 text-stone-600">{order.address}</p>
                        <p className="text-[11px] text-stone-400 font-medium">
                          {order.city} - {order.pincode}
                        </p>
                        {order.notes && (
                          <span className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 mt-1 inline-block">
                            Note: {order.notes}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 align-top">
                        <ul className="space-y-1">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex items-center space-x-2">
                              <span className="font-medium text-[#072428]">
                                {item.quantity}x
                              </span>
                              <span className="text-stone-600 truncate max-w-[140px]">
                                {item.product?.name || "Product"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="px-6 py-4 align-top">
                        <span className="font-bold text-stone-900 block">
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
                          {order.paymentMethod === "cod" ? "Cash On Delivery" : "Online UPI"}
                        </span>
                      </td>

                      <td className="px-6 py-4 align-top">
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border outline-none transition-all ${
                            order.status === "delivered"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : order.status === "shipped"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : order.status === "confirmed"
                              ? "bg-purple-50 text-purple-800 border-purple-300"
                              : "bg-amber-50 text-amber-800 border-amber-300"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}