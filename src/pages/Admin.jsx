import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Star,
  Zap,
  TrendingUp,
  Sparkles,
  Search,
  CheckCircle2,
  Phone,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetToDefaults
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  // Load orders from Local Storage
  const loadOrders = () => {
    try {
      const savedRaw = localStorage.getItem('dano_orders');
      if (savedRaw) {
        setOrders(JSON.parse(savedRaw));
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error('Error loading orders in Admin', e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleProductSubmit = (productData) => {
    if (editingProduct) {
      editProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  // Calculations for Stat Cards
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filtered products list
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#090d1a] border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-purple-950/80 text-purple-300 border border-purple-700/50">
              Admin Area
            </span>
            <h1 className="text-2xl font-black text-slate-100">Dano Store Control Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage inventory, update prices & stock, toggle featured flags, and review order payments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            title="Reset catalog to default preset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/80 text-rose-300 font-extrabold text-xs transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Active items in database"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtitle="Orders placed by customers"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Gross sales volume"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-slate-100'
            }`}
          >
            Manage Products ({totalProducts})
          </button>
          <button
            onClick={() => {
              loadOrders();
              setActiveTab('orders');
            }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-slate-100'
            }`}
          >
            Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !showAddForm && !editingProduct && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal Container */}
      {(showAddForm || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSubmit={handleProductSubmit}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && !showAddForm && !editingProduct && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by title or category..."
              className="w-full bg-[#090d1a] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>

          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#05070f] text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product Title</th>
                    <th className="p-4">Category / Platform</th>
                    <th className="p-4">Base Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-center">Section Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center text-cyan-400 font-extrabold text-xs">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <span>{p.name.substring(0, 2).toUpperCase()}</span>
                            )}
                          </div>
                          <div>
                            <span>{p.name}</span>
                            {p.packages && p.packages.length > 0 && (
                              <span className="text-[10px] font-semibold text-cyan-400 block">
                                {p.packages.length} packages
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="block font-semibold text-slate-200">{p.category}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{p.platform} • {p.type}</span>
                      </td>

                      <td className="p-4 font-black text-cyan-300">
                        {formatPrice(p.price)}
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-16 bg-[#05070f] border border-slate-800 rounded-lg p-1 text-center font-bold text-xs text-slate-100 focus:border-cyan-500"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => toggleFlag(p.id, 'isFeatured')}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                                : 'bg-slate-900 border-slate-800 text-slate-600'
                            }`}
                            title="Toggle Featured"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isTrending')}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isTrending
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                : 'bg-slate-900 border-slate-800 text-slate-600'
                            }`}
                            title="Toggle Trending"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isFlashDeal')}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isFlashDeal
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                                : 'bg-slate-900 border-slate-800 text-slate-600'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isTopRated')}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isTopRated
                                ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                : 'bg-slate-900 border-slate-800 text-slate-600'
                            }`}
                            title="Toggle Top Rated"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 border border-slate-800 transition-colors"
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
              No customer orders recorded yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord, idx) => (
                <div
                  key={idx}
                  className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2.5 py-1 rounded-lg">
                        #{ord.orderId}
                      </span>
                      <span className="text-xs text-slate-400">
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleString() : 'Recent'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Payment Method:</span>
                      <span className="px-2.5 py-1 rounded-lg font-extrabold text-xs bg-purple-950/80 text-purple-300 border border-purple-800/50">
                        {ord.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Customer: <strong className="text-white">{ord.customerName}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Phone: <strong className="text-white">{ord.phoneNumber}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>City: <strong className="text-white">{ord.city}</strong></span>
                    </div>
                  </div>

                  {ord.orderNote && (
                    <div className="p-2.5 rounded-xl bg-[#05070f] border border-slate-800 text-xs text-slate-300">
                      <span className="font-bold text-slate-400 block text-[10px]">Note / Player ID:</span>
                      {ord.orderNote}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Items Count: {ord.items ? ord.items.length : 0}
                    </span>
                    <span className="text-base font-black text-cyan-300">
                      Total: {formatPrice(ord.totalAmount)}
                    </span>
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
