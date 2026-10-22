import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Package,
  ShoppingBag,
  DollarSign,
  Edit,
  Trash2,
  Star,
  Flame,
  Zap,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatPrice';

export const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, updateStock, toggleFlag, resetToDefault } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load orders from LocalStorage
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

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsModalOpen(false);
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  // Filter products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 w-full">

        {/* Admin Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-black text-slate-100 uppercase tracking-tight">
                Admin Management Portal
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as <span className="text-cyan-400 font-extrabold">dano.js</span>. Manage store products, stock, flags, and manual payment orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefault}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Catalog</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <StatCard
            title="Total Products"
            value={totalProducts}
            subtitle="Catalog entries in Local Storage"
            icon={Package}
            color="cyan"
          />
          <StatCard
            title="Total Orders"
            value={totalOrders}
            subtitle="Manual checkout submissions"
            icon={ShoppingBag}
            color="purple"
          />
          <StatCard
            title="Total Revenue"
            value={formatPrice(totalRevenue)}
            subtitle="Combined order totals in IQD"
            icon={DollarSign}
            color="emerald"
          />
        </div>

        {/* Tab Selector & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              Product Catalog ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              Customer Orders ({orders.length})
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={handleOpenAddModal}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          )}
        </div>

        {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">

            {/* Search Input */}
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search catalog by name, platform or category..."
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Products Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Product Info</th>
                      <th className="p-4">Platform & Category</th>
                      <th className="p-4">Base Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Flags (Featured / Flash / Top)</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">

                        {/* Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-[10px] text-cyan-400 overflow-hidden">
                              {prod.image ? (
                                <img src={prod.image} alt="" className="w-full h-full object-cover" />
                              ) : (
                                prod.platform
                              )}
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-200 line-clamp-1">{prod.name}</h4>
                              <span className="text-[10px] text-slate-400">
                                {prod.packages && prod.packages.length > 0 ? `${prod.packages.length} Packages` : 'Single Item'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Platform / Category */}
                        <td className="p-4">
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 text-[10px] font-bold uppercase">
                              {prod.platform}
                            </span>
                            <span className="block text-[11px] text-slate-400">{prod.category}</span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="p-4 font-extrabold text-cyan-300">
                          {formatPrice(prod.price)}
                        </td>

                        {/* Stock Change */}
                        <td className="p-4">
                          <input
                            type="number"
                            value={prod.stock}
                            onChange={(e) => updateStock(prod.id, e.target.value)}
                            className="w-20 bg-slate-950 border border-slate-800 rounded-lg p-1 text-center font-extrabold text-slate-200 focus:border-cyan-400 focus:outline-none"
                          />
                        </td>

                        {/* Feature Flags Toggles */}
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleFlag(prod.id, 'isFeatured')}
                              title="Toggle Featured"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                                prod.isFeatured
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  : 'bg-slate-950 text-slate-500 border-slate-800'
                              }`}
                            >
                              Featured
                            </button>

                            <button
                              onClick={() => toggleFlag(prod.id, 'isTrending')}
                              title="Toggle Trending"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                                prod.isTrending
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                  : 'bg-slate-950 text-slate-500 border-slate-800'
                              }`}
                            >
                              Trending
                            </button>

                            <button
                              onClick={() => toggleFlag(prod.id, 'isFlashDeal')}
                              title="Toggle Flash Deal"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                                prod.isFlashDeal
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                  : 'bg-slate-950 text-slate-500 border-slate-800'
                              }`}
                            >
                              Flash
                            </button>

                            <button
                              onClick={() => toggleFlag(prod.id, 'isTopRated')}
                              title="Toggle Top Rated"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                                prod.isTopRated
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-950 text-slate-500 border-slate-800'
                              }`}
                            >
                              Top
                            </button>
                          </div>
                        </td>

                        {/* Edit & Delete Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${prod.name}?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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

        {/* TAB 2: CUSTOMER ORDERS VIEW */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {orders.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs font-semibold">
                No orders placed yet. New manual orders will appear here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order ID & Date</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Items Ordered</th>
                      <th className="p-4 text-right">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <span className="font-black text-cyan-400 block">{ord.orderId}</span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(ord.createdAt).toLocaleString()}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="font-bold text-slate-200 block">{ord.customerName}</span>
                          <span className="text-[11px] text-slate-400 block">{ord.phone}</span>
                          <span className="text-[10px] text-cyan-300 uppercase font-semibold">{ord.city}</span>
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-extrabold text-[11px] uppercase">
                            {ord.paymentMethod}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="space-y-1 max-w-xs">
                            {ord.items && ord.items.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-slate-300 truncate">
                                • {it.name} x{it.quantity} {it.selectedPackage ? `(${it.selectedPackage.name})` : ''}
                              </div>
                            ))}
                            {ord.orderNote && (
                              <div className="text-[10px] text-amber-400 italic mt-1">
                                Note: {ord.orderNote}
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="p-4 text-right font-black text-cyan-300 text-sm">
                          {formatPrice(ord.totalAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <AdminProductForm
          product={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
};
