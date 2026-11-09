import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  RefreshCw,
  Sparkles,
  Flame,
  Star,
  Eye
} from 'lucide-react';

/**
 * Admin Dashboard Requirements:
 * - Protected route (via ProtectedRoute wrapper)
 * - Add product
 * - Edit product
 * - Delete product
 * - Change stock
 * - View orders
 * - View selected payment method for every order
 * - View total products
 * - View total orders
 * - View total revenue
 * - Manage featured products
 * - Manage trending products
 * - Manage flash deals
 * - Manage top rated products
 * - Logout button (removes dano_admin_auth & redirects to /admin-login)
 */
export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefaults } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Load orders from localStorage 'dano_orders'
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const refreshOrders = () => {
    try {
      const saved = localStorage.getItem('dano_orders');
      setOrders(saved ? JSON.parse(saved) : []);
    } catch (e) {
      console.error(e);
    }
  };

  // KPI calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;

  // Filtered products list for admin table
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(query) || p.platform.toLowerCase().includes(query);
      }
      return true;
    });
  }, [products, categoryFilter, searchQuery]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setProductModalOpen(true);
  };

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, prodData);
    } else {
      addProduct(prodData);
    }
    setProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      deleteProduct(id);
    }
  };

  const toggleProductFlag = (id, flagName, currentValue) => {
    updateProduct(id, { [flagName]: !currentValue });
  };

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Control Panel
          </span>
          <h1 className="text-3xl font-black text-white font-heading tracking-wide">
            STORE MANAGEMENT
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage inventory, view incoming manual payment orders, and configure featured showcases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
            title="Reset to default initial catalog"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Reset Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Catalog items active"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Manual checkout orders"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Gross IQD volume"
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Out of Stock"
          value={outOfStockCount}
          subtitle={outOfStockCount > 0 ? 'Requires restock' : 'All items in stock'}
          icon={AlertTriangle}
          color={outOfStockCount > 0 ? 'amber' : 'purple'}
        />
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({totalProducts})</span>
        </button>

        <button
          onClick={() => {
            refreshOrders();
            setActiveTab('orders');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({totalOrders})</span>
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* PRODUCTS TAB */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Controls: Search, Filter, Add Product button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter catalog products..."
                  className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-900 text-xs text-white rounded-xl px-3 py-2 border border-white/10 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="games">Games</option>
                <option value="mobile-topup">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="rounded-2xl bg-[#090d1e] border border-white/5 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-bold border-b border-white/5">
                  <tr>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">Platform & Category</th>
                    <th className="py-3 px-4">Base Price (IQD)</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-center">Featured Badges</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold">
                        <div className="flex flex-col">
                          <span className="text-white text-sm font-bold">{p.name}</span>
                          <span className="text-[11px] text-slate-500">{p.slug}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {p.platform}
                          </span>
                          <span className="text-slate-400 capitalize">{p.category.replace('-', ' ')}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={p.stock}
                            onChange={(e) => updateStock(p.id, e.target.value)}
                            className="w-16 bg-slate-950 text-center font-bold py-1 px-1.5 rounded-lg border border-white/10 text-xs focus:border-cyan-500 focus:outline-none"
                          />
                          {p.stock <= 0 && (
                            <span className="text-[10px] font-bold text-rose-400 uppercase">
                              Zero
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Toggle Featured */}
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isFeatured', p.isFeatured)}
                            title="Toggle Featured"
                            className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                : 'bg-slate-950/60 text-slate-600 border-white/5'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Trending */}
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isTrending', p.isTrending)}
                            title="Toggle Trending"
                            className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                              p.isTrending
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : 'bg-slate-950/60 text-slate-600 border-white/5'
                            }`}
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Flash Deal */}
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isFlashDeal', p.isFlashDeal)}
                            title="Toggle Flash Deal"
                            className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                              p.isFlashDeal
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-950/60 text-slate-600 border-white/5'
                            }`}
                          >
                            <span className="text-[10px]">%</span>
                          </button>

                          {/* Toggle Top Rated */}
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isTopRated', p.isTopRated)}
                            title="Toggle Top Rated"
                            className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                              p.isTopRated
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : 'bg-slate-950/60 text-slate-600 border-white/5'
                            }`}
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* ---------------------------------------------------- */}
      {/* ORDERS TAB */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading">
              Customer Manual Orders ({orders.length})
            </h3>
            <button
              onClick={refreshOrders}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Orders</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#090d1e] border border-white/5 space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="font-bold text-white text-sm">No Orders Yet</h4>
              <p className="text-xs text-slate-400">
                When customers check out via FastPay, Korek, or MasterCard, orders will appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#090d1e] border border-white/5 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-bold border-b border-white/5">
                    <tr>
                      <th className="py-3 px-4">Order ID & Date</th>
                      <th className="py-3 px-4">Customer & City</th>
                      <th className="py-3 px-4">Phone Number</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Items Ordered</th>
                      <th className="py-3 px-4">Total IQD</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200">
                    {orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-slate-900/40">
                        <td className="py-3.5 px-4 font-mono">
                          <span className="font-bold text-cyan-400">{ord.orderId}</span>
                          <span className="block text-[10px] text-slate-500">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-white block">{ord.customerName}</span>
                          <span className="text-[11px] text-slate-400">{ord.city}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {ord.phoneNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            ord.paymentMethod === 'fastpay'
                              ? 'bg-[#00c389]/15 text-[#00c389] border border-[#00c389]/30'
                              : ord.paymentMethod === 'korek'
                              ? 'bg-[#ffc107]/15 text-[#ffc107] border border-[#ffc107]/30'
                              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          }`}>
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate">
                          {ord.items && ord.items.map((it, idx) => (
                            <span key={idx} className="block text-[11px] text-slate-300">
                              {it.quantity}x {it.name} ({it.selectedPackage?.name})
                            </span>
                          ))}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                          {formatPrice(ord.totalAmount)}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {ord.status || 'Pending Payment'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Admin Add / Edit Modal */}
      {productModalOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setProductModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}
