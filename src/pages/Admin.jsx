import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  RotateCcw,
  CheckCircle,
  Star,
  Zap,
  Flame,
  TrendingUp,
  Smartphone
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured,
    toggleTrending,
    toggleFlashDeal,
    toggleTopRated,
    resetToDefault
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load orders from LocalStorage
  const [orders] = useState(() => {
    try {
      const stored = localStorage.getItem('dano_orders');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleCreateProduct = (productData) => {
    addProduct(productData);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
      setIsFormOpen(false);
    }
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header Bar */}
      <div className="bg-[#090e1a] border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Authenticated Admin
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Dano Store Management</h1>
          <p className="text-xs text-slate-400">Manage products, stock inventory, home feature toggles, and view customer orders.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Reset Catalog to Default Items"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          trend="Active in catalog"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          trend="Customer checkout submissions"
        />
        <StatCard
          title="Total Store Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          trend="Completed orders value"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-blue-600/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Product Catalog ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-blue-600/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Tab 1: Product Catalog Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Search Filter Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by title, category, or platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-xs text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 pl-9 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>

          {/* Products Table */}
          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Home Sections</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-100 min-w-[180px]">
                        {prod.name}
                        {prod.tag && (
                          <span className="ml-2 px-1.5 py-0.5 text-[9px] rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-normal">
                            {prod.tag}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 capitalize text-slate-400">{prod.category}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 text-[10px] font-bold">
                          {prod.platform}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-cyan-400">
                        {formatPrice(prod.price)}
                      </td>
                      <td className="p-3.5">
                        <input
                          type="number"
                          value={prod.stock}
                          onChange={(e) => updateProduct(prod.id, { stock: Number(e.target.value) })}
                          className="w-16 bg-slate-950 text-center text-xs text-slate-200 border border-slate-800 rounded px-1 py-0.5 focus:outline-none focus:border-cyan-500"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleFeatured(prod.id)}
                            className={`p-1.5 rounded border transition-all ${
                              prod.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="Top Sales Toggle"
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleFlashDeal(prod.id)}
                            className={`p-1.5 rounded border transition-all ${
                              prod.isFlashDeal
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="Flash Deals Toggle"
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleTrending(prod.id)}
                            className={`p-1.5 rounded border transition-all ${
                              prod.isTrending
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="New & Trending Toggle"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleTopRated(prod.id)}
                            className={`p-1.5 rounded border transition-all ${
                              prod.isTopRated
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="Top Rated Toggle"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
                            title="Delete Product"
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

      {/* Tab 2: Customer Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
              <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">No customer orders recorded yet.</p>
              <p className="text-xs text-slate-500">Orders submitted during checkout will be displayed here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div
                  key={idx}
                  className="bg-[#090e1a] border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold">{order.orderId}</span>
                      <p className="text-[11px] text-slate-500">
                        Placed on: {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {order.status || 'Pending Payment'}
                      </span>
                      <span className="text-sm font-black text-cyan-400">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info & Payment Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 uppercase font-bold text-[10px] block">Customer</span>
                      <span className="font-bold text-slate-200">{order.customer?.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase font-bold text-[10px] block">Phone & City</span>
                      <span className="text-slate-300">{order.customer?.phone} ({order.customer?.city})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase font-bold text-[10px] block">Selected Payment Method</span>
                      <span className="font-bold text-cyan-400 uppercase">{order.customer?.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Purchased Items List */}
                  <div className="space-y-2 text-xs">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Purchased Items:</span>
                    <div className="divide-y divide-slate-800/40">
                      {order.items?.map((item, itemIdx) => (
                        <div key={itemIdx} className="py-1.5 flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-slate-200">{item.product?.name}</span>
                            <span className="text-cyan-400 text-[11px] ml-2">Package: {item.packageName} × {item.quantity}</span>
                            {item.accountDetails && (
                              <span className="text-[10px] font-mono text-slate-400 block">ID: {item.accountDetails}</span>
                            )}
                          </div>
                          <span className="font-mono text-slate-300">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Add/Edit Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          initialProduct={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};
