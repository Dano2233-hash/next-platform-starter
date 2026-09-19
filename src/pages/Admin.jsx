import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Plus,
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Edit2,
  Trash2,
  Star,
  Flame,
  Zap,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetToDefault
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (data) => {
    if (data.id) {
      updateProduct(data.id, data);
    } else {
      addProduct(data);
    }
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem('dano_orders', JSON.stringify(updated));
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-black text-white">Dano Store Admin Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400">
            Manage product catalog, inventory stock, orders, and featured store items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1.5"
            title="Reset catalog to default preset products"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Default Catalog
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900 transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Catalog Items"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtitle="Customer Purchases"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="IQD Accumulated"
        />
      </div>

      {/* Navigation Tabs & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0e1a] border border-slate-800/80 p-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('products');
              setIsAdding(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'products'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Products ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'orders'
                ? 'bg-purple-950 text-purple-300 border border-purple-800 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingProduct(null);
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal Container */}
      {(isAdding || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsAdding(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Products Tab View */}
      {activeTab === 'products' && !isAdding && !editingProduct && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, platform, category..."
              className="w-full bg-[#0a0e1a] text-slate-100 text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>

          <div className="bg-[#0a0e1a] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#060911] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Category / Type</th>
                    <th className="p-3.5">Price (IQD)</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#0e1424] transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden shrink-0">
                            <ProductImage product={p} heightClass="h-10" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 block">{p.name}</span>
                            <span className="text-[10px] text-slate-500">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-300 bg-cyan-950 border border-cyan-800 rounded">
                          {p.platform}
                        </span>
                      </td>

                      <td className="p-3.5 font-medium text-slate-300">
                        {p.category} / {p.type}
                      </td>

                      <td className="p-3.5 font-bold text-cyan-400">
                        {formatPrice(p.price)}
                      </td>

                      <td className="p-3.5">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-16 bg-[#060911] text-slate-100 font-bold text-xs p-1.5 rounded-lg border border-slate-800 text-center focus:border-cyan-500"
                        />
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleFlag(p.id, 'isFeatured')}
                            className={`p-1 rounded ${
                              p.isFeatured ? 'text-amber-400 bg-amber-950 border border-amber-800' : 'text-slate-600'
                            }`}
                            title="Featured"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isTrending')}
                            className={`p-1 rounded ${
                              p.isTrending ? 'text-cyan-400 bg-cyan-950 border border-cyan-800' : 'text-slate-600'
                            }`}
                            title="Trending"
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isFlashDeal')}
                            className={`p-1 rounded ${
                              p.isFlashDeal ? 'text-rose-400 bg-rose-950 border border-rose-800' : 'text-slate-600'
                            }`}
                            title="Flash Deal"
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isTopRated')}
                            className={`p-1 rounded ${
                              p.isTopRated ? 'text-purple-400 bg-purple-950 border border-purple-800' : 'text-slate-600'
                            }`}
                            title="Top Rated"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsAdding(false);
                            }}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-900"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
              No orders found in local storage yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.orderId}
                  className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-cyan-400 text-sm">
                        #{o.orderId}
                      </span>
                      <span className="text-slate-500 ml-3">
                        {new Date(o.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-semibold">Status:</span>
                      <select
                        value={o.status || 'Pending Payment'}
                        onChange={(e) => handleUpdateOrderStatus(o.orderId, e.target.value)}
                        className="bg-[#060911] text-xs font-bold text-cyan-300 p-1.5 rounded-lg border border-slate-800 cursor-pointer"
                      >
                        <option value="Pending Payment">Pending Payment</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">
                        Customer
                      </span>
                      <span className="font-bold text-white">{o.customerName}</span>
                      <span className="text-slate-400 block">{o.phone} ({o.city})</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">
                        Selected Payment Method
                      </span>
                      <span className="font-bold text-cyan-400 uppercase">
                        {o.paymentMethod}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">
                        Total Amount
                      </span>
                      <span className="font-black text-emerald-400 text-sm">
                        {formatPrice(o.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {o.orderNote && (
                    <div className="text-[11px] text-slate-300 bg-[#060911] p-2.5 rounded-xl border border-slate-800">
                      <strong>Order Note / Player ID:</strong> {o.orderNote}
                    </div>
                  )}

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      Ordered Items:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {o.items?.map((it, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-200"
                        >
                          {it.name} {it.package ? `(${it.package})` : ''} x{it.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
