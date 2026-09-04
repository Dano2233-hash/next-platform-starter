import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  LogOut,
  Edit,
  Trash2,
  RefreshCw,
  Search,
  Check,
  Star,
  Flame,
  Zap,
  TrendingUp,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export const Admin = () => {
  const { logout } = useAuth();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleProductFlag,
    resetProducts
  } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dano_orders');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setOrders(parsed);
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (payload) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      setEditingProduct(null);
    } else {
      addProduct(payload);
      setIsAddingNew(false);
    }
  };

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);

  // Filter products for admin table
  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Top Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-black uppercase tracking-widest">
            Admin Panel
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Store Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage product catalog, stock counts, section feature toggles, and view order receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProducts}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Reset Catalog to Initial Products"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-extrabold transition-colors flex items-center gap-1.5 shadow-md"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Active items in store"
        />
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          icon={ShoppingBag}
          color="purple"
          subtitle="Orders saved in LocalStorage"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Calculated from created orders"
        />
      </div>

      {/* Section Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('products');
              setEditingProduct(null);
              setIsAddingNew(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Products Management ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders History ({totalOrdersCount})
          </button>
        </div>

        {activeTab === 'products' && !isAddingNew && !editingProduct && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Products Tab Content */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add / Edit Form Modal Form */}
          {(isAddingNew || editingProduct) && (
            <AdminProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setEditingProduct(null);
                setIsAddingNew(false);
              }}
            />
          )}

          {/* Search Table Filter */}
          {!isAddingNew && !editingProduct && (
            <div className="flex items-center justify-between gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by title, category, platform..."
                  className="w-full pl-10 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Showing {filteredProducts.length} items
              </span>
            </div>
          )}

          {/* Products Table */}
          {!isAddingNew && !editingProduct && (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Product Title</th>
                    <th className="p-3.5">Platform & Type</th>
                    <th className="p-3.5">Base Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Feature Badges</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-slate-100 max-w-xs truncate">
                        {p.name}
                      </td>
                      <td className="p-3.5 space-x-1">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-semibold text-[10px]">
                          {p.platform}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-semibold text-[10px]">
                          {p.type}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-cyan-400">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-3.5">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-20 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs font-bold text-center focus:border-cyan-500"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isFeatured')}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                                : 'bg-slate-950 border-slate-800 text-slate-600'
                            }`}
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isTrending')}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                              p.isTrending
                                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                : 'bg-slate-950 border-slate-800 text-slate-600'
                            }`}
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isFlashDeal')}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                              p.isFlashDeal
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                                : 'bg-slate-950 border-slate-800 text-slate-600'
                            }`}
                          >
                            Flash
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                          }}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-400"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-500">Orders created on checkout will appear here.</p>
            </div>
          ) : (
            orders.map((ord, idx) => (
              <div
                key={ord.orderId || idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-cyan-400 text-sm">{ord.orderId}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                      {ord.status || 'Pending Payment'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span>Date: {ord.createdAt ? new Date(ord.createdAt).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Customer Info</span>
                    <span className="font-bold text-white block mt-0.5">{ord.customerName}</span>
                    <span className="text-slate-400 block">{ord.phone} ({ord.city})</span>
                    {ord.orderNote && <span className="text-amber-400 block mt-1">Note: {ord.orderNote}</span>}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Payment Choice</span>
                    <span className="font-bold text-cyan-300 uppercase block mt-0.5">{ord.paymentMethod}</span>
                    <span className="font-mono font-extrabold text-cyan-400 text-sm block mt-1">
                      Total: {formatPrice(ord.totalAmount)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Items ({ord.items ? ord.items.length : 0})</span>
                    {ord.items && ord.items.map((it, i) => (
                      <div key={i} className="text-slate-300 text-[11px] flex justify-between">
                        <span>{it.productName} ({it.packageName}) × {it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
