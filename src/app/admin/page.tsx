"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle,
  RefreshCw,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Product {
  name: string;
  image?: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product?: Product | null;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string | null;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  items?: OrderItem[];
}

interface ChartData {
  name: string;
  orders: number;
  income: number;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchChartData() {
    setChartLoading(true);
    try {
      const res = await fetch("/api/admin/analytics/charts");
      if (res.ok) {
        const data = await res.json();
        setChartData(data);
      }
    } catch (err) {
      console.error("Failed to load chart data:", err);
    } finally {
      setChartLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchChartData();
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

  const totalRevenue = orders.reduce(
    (sum, ord) => sum + (ord.totalAmount || 0),
    0
  );
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="min-h-screen bg-stone-50 text-[#072428] font-sans pb-16">
      {/* Admin Topbar */}
      <header className="bg-[#072428] text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-amber-500/20">
        <div>
          <h1 className="font-serif font-bold text-xl tracking-wider">
            AR CREATIONNS ADMIN
          </h1>
          <p className="text-[11px] text-emerald-200/70 uppercase tracking-widest">
            By Aaditi • Store Portal
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              fetchOrders();
              fetchChartData();
            }}
            className="flex items-center space-x-1.5 bg-[#092b31] hover:bg-[#0d3b43] text-amber-300 text-xs px-3.5 py-2 rounded-lg border border-amber-500/20 transition-all font-semibold"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                loading || chartLoading ? "animate-spin" : ""
              }`}
            />
            <span>Refresh Portal</span>
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
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Current Revenue
              </p>
              <p className="text-3xl font-bold text-[#072428] mt-1 font-serif">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-14 h-14 bg-amber-50 text-amber-800 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Total Bookings
              </p>
              <p className="text-3xl font-bold text-[#072428] mt-1 font-serif">
                {orders.length}
              </p>
            </div>
            <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Orders Pending
              </p>
              <p className="text-3xl font-bold text-amber-700 mt-1 font-serif">
                {pendingOrders}
              </p>
            </div>
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Fulfilled Orders
              </p>
              <p className="text-3xl font-bold text-emerald-700 mt-1 font-serif">
                {completedOrders}
              </p>
            </div>
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* 1. Monthly Business Income (Line Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-6 h-6 text-emerald-700" />
              <div>
                <h3 className="font-serif font-bold text-lg text-[#072428]">
                  Monthly Business Volume
                </h3>
                <p className="text-xs text-stone-500">
                  Total income trend for orders this calendar year.
                </p>
              </div>
            </div>

            {chartLoading ? (
              <div className="h-72 flex items-center justify-center text-sm text-stone-500 bg-stone-50 rounded-lg">
                Calculating revenue trend...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#a1a1a1" fontSize={11} />
                  <YAxis
                    stroke="#a1a1a1"
                    fontSize={11}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value: any) =>
                      `₹${value.toLocaleString("en-IN")}`
                    }
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Line
                    type="monotone"
                    name="Income (₹)"
                    dataKey="income"
                    stroke="#072428"
                    strokeWidth={2.5}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* 2. Monthly Order Volume (Bar Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-amber-800" />
              <div>
                <h3 className="font-serif font-bold text-lg text-[#072428]">
                  Order Frequency
                </h3>
                <p className="text-xs text-stone-500">
                  Number of placed customer orders per month.
                </p>
              </div>
            </div>

            {chartLoading ? (
              <div className="h-72 flex items-center justify-center text-sm text-stone-500 bg-stone-50 rounded-lg">
                Counting orders...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#a1a1a1" fontSize={11} />
                  <YAxis stroke="#a1a1a1" fontSize={11} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Bar
                    name="Orders Placed"
                    dataKey="orders"
                    fill="#a47a16"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Customer Orders Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-xl text-[#072428]">
                Recent Orders
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Dispatch management & customer fulfillment status.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-24 text-center text-sm text-stone-500 bg-stone-50 font-medium">
              Synchronizing orders from database...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center text-sm text-stone-500 bg-stone-50 font-medium">
              No orders have been placed yet.
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
                    <th className="px-6 py-4 text-center">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-stone-50/70 transition-colors"
                    >
                      <td className="px-6 py-4 align-top">
                        <span className="font-mono font-bold text-[#072428] block">
                          {order.orderNumber}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 align-top">
                        <span className="font-semibold text-stone-900 block">
                          {order.customerName}
                        </span>
                        <a
                          href={`https://wa.me/${order.phone.replace(
                            /[^0-9]/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-emerald-700 font-medium hover:underline block mt-0.5"
                        >
                          📱 {order.phone}
                        </a>
                      </td>

                      <td className="px-6 py-4 align-top max-w-xs">
                        <p className="line-clamp-2 text-stone-600">
                          {order.address}
                        </p>
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
                          {(order.items || []).map((item) => (
                            <li
                              key={item.id}
                              className="flex items-center space-x-2"
                            >
                              <span className="font-semibold text-[#072428]">
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
                        <span className="font-bold text-stone-900 block font-serif">
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          {order.paymentMethod === "cod"
                            ? "Cash On Delivery"
                            : "Online UPI"}
                        </span>
                      </td>

                      <td className="px-6 py-4 align-top text-center">
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className={`text-[11px] font-semibold rounded-lg px-2.5 py-1.5 border outline-none transition-all cursor-pointer ${
                            order.status === "delivered"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : order.status === "shipped"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : order.status === "confirmed"
                              ? "bg-purple-50 text-purple-800 border-purple-300"
                              : order.status === "cancelled"
                              ? "bg-red-50 text-red-800 border-red-300"
                              : "bg-amber-50 text-amber-800 border-amber-300"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {updatingId === order.id && (
                          <div className="text-[10px] text-stone-400 mt-1">
                            Updating...
                          </div>
                        )}
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