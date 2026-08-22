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
  Trash2,
  Edit,
  Star,
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
  ResponsiveContainer,
} from "recharts";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  image: string;
  description: string;
  tag?: string | null;
  rating?: number | null;
  reviewsCount?: number | null;
  inStock: boolean;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product?: { name: string; image?: string | null } | null;
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "Necklace",
    customCategory: "",
    price: "",
    material: "Traditional Brass / Gold Polish",
    image: "",
    description: "",
    tag: "Bestseller",
    rating: "4.8",
    reviewsCount: "12",
    inStock: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const [ordersRes, chartRes, productsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/admin/analytics/charts"),
        fetch("/api/admin/products"),
      ]);

      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (chartRes.ok) setChartData(await chartRes.json());
      if (productsRes.ok) setProducts(await productsRes.json());
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
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
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);

    const finalCategory =
      formData.category === "CUSTOM"
        ? formData.customCategory.trim() || "Jewellery"
        : formData.category;

    const payload = {
      ...formData,
      category: finalCategory,
    };

    try {
      const url = isEditing
        ? `/api/admin/products/${formData.id}`
        : "/api/admin/products";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error saving product: ${data.error || "Unknown server error"}`);
        return;
      }

      setFormData({
        id: "",
        name: "",
        category: "Necklace",
        customCategory: "",
        price: "",
        material: "Traditional Brass / Gold Polish",
        image: "",
        description: "",
        tag: "Bestseller",
        rating: "4.8",
        reviewsCount: "12",
        inStock: true,
      });
      setIsEditing(false);

      const prodsRes = await fetch("/api/admin/products");
      if (prodsRes.ok) {
        setProducts(await prodsRes.json());
      }
    } catch (err: any) {
      console.error("Save product failed:", err);
      alert("Failed to reach server.");
    } finally {
      setSavingProduct(false);
    }
  };

  const handleEditClick = (p: ProductItem) => {
    const standardCategories = ["Necklace", "Choker", "Earrings", "Bangles", "Bridal Set", "Watch"];
    const isCustom = !standardCategories.includes(p.category);

    setFormData({
      id: p.id,
      name: p.name,
      category: isCustom ? "CUSTOM" : p.category,
      customCategory: isCustom ? p.category : "",
      price: String(p.price),
      material: p.material || "",
      image: p.image || "",
      description: p.description || "",
      tag: p.tag || "",
      rating: p.rating ? String(p.rating) : "4.8",
      reviewsCount: p.reviewsCount ? String(p.reviewsCount) : "12",
      inStock: p.inStock,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this jewelry item?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="min-h-screen bg-stone-50 text-[#072428] font-sans pb-16">
      {/* Top Bar */}
      <header className="bg-[#072428] text-white px-6 py-4 flex justify-between items-center shadow-md">
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
            onClick={loadData}
            className="flex items-center space-x-1.5 bg-[#092b31] hover:bg-[#0d3b43] text-amber-300 text-xs px-3.5 py-2 rounded-lg border border-amber-500/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Portal</span>
          </button>
          <Link href="/" className="text-xs text-stone-300 hover:text-white">
            View Live Store →
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex space-x-3 bg-stone-200/60 p-1.5 rounded-2xl w-fit border border-stone-300">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "orders"
                ? "bg-[#072428] text-amber-300 shadow-md"
                : "text-stone-700 hover:bg-stone-200"
            }`}
          >
            📊 Orders & Analytics
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "products"
                ? "bg-[#072428] text-amber-300 shadow-md"
                : "text-stone-700 hover:bg-stone-200"
            }`}
          >
            💎 Jewelry Inventory & Reviews ({products.length})
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {activeTab === "orders" ? (
          <>
            {/* Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Total Revenue</p>
                  <p className="text-3xl font-bold text-[#072428] mt-1 font-serif">₹{totalRevenue.toLocaleString("en-IN")}</p>
                </div>
                <div className="w-14 h-14 bg-amber-50 text-amber-800 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Total Bookings</p>
                  <p className="text-3xl font-bold text-[#072428] mt-1 font-serif">{orders.length}</p>
                </div>
                <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Orders Pending</p>
                  <p className="text-3xl font-bold text-amber-700 mt-1 font-serif">{pendingOrders}</p>
                </div>
                <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Fulfilled Orders</p>
                  <p className="text-3xl font-bold text-emerald-700 mt-1 font-serif">{completedOrders}</p>
                </div>
                <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" />
                </div>
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-6 h-6 text-emerald-700" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#072428]">Monthly Business Volume</h3>
                    <p className="text-xs text-stone-500">Total revenue generated per month.</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip formatter={(v: any) => `₹${v.toLocaleString("en-IN")}`} />
                    <Line type="monotone" dataKey="income" stroke="#072428" strokeWidth={2.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <ShoppingBag className="w-6 h-6 text-amber-800" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#072428]">Order Frequency</h3>
                    <p className="text-xs text-stone-500">Number of received orders per month.</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#a47a16" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-stone-100 font-serif font-bold text-lg text-[#072428]">
                Customer Orders Pipeline
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-semibold">
                    <tr>
                      <th className="px-5 py-3.5">Order ID & Date</th>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Destination</th>
                      <th className="px-5 py-3.5">Total Amount</th>
                      <th className="px-5 py-3.5 text-center">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-stone-50/70">
                        <td className="px-5 py-3.5">
                          <span className="font-mono font-bold text-[#072428] block">{o.orderNumber}</span>
                          <span className="text-[11px] text-stone-400">
                            {new Date(o.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-semibold text-stone-900 block">{o.customerName}</span>
                          <a
                            href={`https://wa.me/${o.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 font-medium hover:underline inline-flex items-center space-x-1 mt-0.5"
                          >
                            <span>📱 {o.phone}</span>
                          </a>
                        </td>
                        <td className="px-5 py-3.5 max-w-xs text-stone-600 truncate">
                          {o.address}, {o.city} - {o.pincode}
                        </td>
                        <td className="px-5 py-3.5 font-bold font-serif text-stone-900 text-sm">
                          ₹{o.totalAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <select
                            value={o.status}
                            disabled={updatingId === o.id}
                            onChange={(e) => handleStatusChange(o.id, e.target.value)}
                            className={`text-[11px] font-semibold rounded-lg px-2.5 py-1.5 border shadow-sm outline-none transition-all ${
                              o.status === "delivered"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : o.status === "shipped"
                                ? "bg-blue-50 text-blue-800 border-blue-300"
                                : o.status === "confirmed"
                                ? "bg-purple-50 text-purple-800 border-purple-300"
                                : o.status === "cancelled"
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Inventory & Review Editing Tab */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm h-fit">
              <h2 className="font-serif font-bold text-lg mb-4 text-[#072428]">
                {isEditing ? "Edit Jewelry Details" : "Add New Jewelry Item"}
              </h2>
              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border rounded-lg"
                    placeholder="e.g. Kashmiri Watch"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full p-2.5 border rounded-lg"
                      placeholder="370"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 border rounded-lg"
                    >
                      <option value="Necklace">Necklace</option>
                      <option value="Choker">Choker</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bangles">Bangles</option>
                      <option value="Bridal Set">Bridal Set</option>
                      <option value="Watch">Watch</option>
                      <option value="CUSTOM">+ Add New / Custom Category</option>
                    </select>
                  </div>
                </div>

                {formData.category === "CUSTOM" && (
                  <div>
                    <label className="font-semibold block mb-1 text-emerald-800">Custom Category Name</label>
                    <input
                      type="text"
                      required
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      className="w-full p-2.5 border border-emerald-500 bg-emerald-50/40 rounded-lg"
                      placeholder="e.g. Payal, Mangalsutra"
                    />
                  </div>
                )}

                <div>
                  <label className="font-semibold block mb-1">Photo Image URL / Local Path</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2.5 border rounded-lg"
                    placeholder="https://i.ibb.co/... or /watch.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Rating (out of 5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="w-full p-2.5 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Reviews Count</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.reviewsCount}
                      onChange={(e) => setFormData({ ...formData, reviewsCount: e.target.value })}
                      className="w-full p-2.5 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Material / Finish</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full p-2.5 border rounded-lg"
                    placeholder="e.g. Traditional Brass / Polish"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Tag / Badge</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full p-2.5 border rounded-lg"
                    placeholder="e.g. Trending, Bestseller"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="inStock" className="font-semibold cursor-pointer">In Stock & Available</label>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    disabled={savingProduct}
                    className="flex-1 bg-[#072428] text-amber-300 font-bold py-2.5 rounded-lg hover:bg-[#0d3b43]"
                  >
                    {savingProduct ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          id: "",
                          name: "",
                          category: "Necklace",
                          customCategory: "",
                          price: "",
                          material: "Traditional Brass / Gold Polish",
                          image: "",
                          description: "",
                          tag: "Bestseller",
                          rating: "4.8",
                          reviewsCount: "12",
                          inStock: true,
                        });
                      }}
                      className="px-3.5 bg-stone-200 rounded-lg hover:bg-stone-300 font-medium"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-stone-100 font-serif font-bold text-lg text-[#072428]">
                Current Jewelry Catalog & Ratings
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Photo</th>
                      <th className="px-4 py-3">Title & Material</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Rating</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50">
                        <td className="px-4 py-3">
                          <img
                            src={p.image || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop"}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-stone-900 block">{p.name}</span>
                          <span className="text-[10px] text-stone-400">{p.material}</span>
                        </td>
                        <td className="px-4 py-3 font-medium">
                          <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">{p.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-1 text-amber-600 font-bold">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{p.rating || 4.8}</span>
                            <span className="text-[10px] text-stone-400 font-normal">({p.reviewsCount || 0})</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold font-serif text-stone-900">₹{p.price}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${p.inStock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                            {p.inStock ? "In Stock" : "Sold Out"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button onClick={() => handleEditClick(p)} className="p-1.5 bg-stone-100 hover:bg-stone-200 rounded text-stone-700">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 bg-red-50 hover:bg-red-100 rounded text-red-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}