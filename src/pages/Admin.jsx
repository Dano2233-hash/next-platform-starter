import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useNavigation } from '../hooks/useNavigation';
import {
  Package, ShoppingBag, DollarSign, LogOut, Plus, Search,
  Trash2, Edit, Save, Star, RefreshCw, Layers, CheckCircle2, Clock
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProtectedRoute from '../components/ProtectedRoute';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export function Admin() {
  const { logout } = useAuth();
  const { navigate } = useNavigation();
  const { products, addProduct, editProduct, deleteProduct, resetProducts } = useProducts();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'orders'
  const [searchQuery, setSearchQuery] = useState('');

  // Modal controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load orders from Local Storage
  useEffect(() => {
    const stored = localStorage.getItem('dano_orders');
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('#/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Edit mode
      editProduct(editingProduct.id, productData);
    } else {
      // Add mode
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id);
    }
  };

  const handleQuickStockChange = (id, currentStock, delta) => {
    const nextStock = Math.max(0, currentStock + delta);
    editProduct(id, { stock: nextStock });
  };

  const handleResetCatalog = () => {
    if (window.confirm('This will wipe out all inventory changes and reset to the initial 40+ default products. Continue?')) {
      resetProducts();
    }
  };

  // Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Filter products or orders
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.phoneNumber.includes(searchQuery)
  );

  const getPaymentBadgeColor = (method) => {
    switch (method?.toLowerCase()) {
      case 'fastpay': return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
      case 'korek': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
      case 'mastercard': return 'bg-blue-500/10 text-cyan-400 border border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[#050505] text-white">

        {/* Simple Navbar overlay */}
        <Navbar />

        {/* Dashboard Main container */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Dashboard Header Panel */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-5">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                Merchant Admin Panel
                <span className="text-[10px] font-black bg-brand-cyan text-[#050505] px-2.5 py-0.5 rounded border border-brand-cyan/20 uppercase tracking-widest">
                  Live
                </span>
              </h1>
              <p className="text-xs text-gray-500">Manage catalog inventory, stock levels, promo badges, and customer purchase orders.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetCatalog}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-[#0d0d15] border border-brand-border/80 hover:border-brand-blue/50 rounded-xl transition flex items-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Storefront
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-black uppercase tracking-wider text-red-400 hover:text-red-300 bg-red-950/20 border border-red-500/20 hover:border-red-500/50 rounded-xl transition flex items-center gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Core Analytics Stat Cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Active Inventory"
              value={totalProducts}
              icon={Package}
              description="Total digital items in store"
              trendColor="text-brand-cyan"
            />
            <StatCard
              title="Total Placed Orders"
              value={totalOrders}
              icon={ShoppingBag}
              description="Orders in local storage log"
              trendColor="text-brand-purple"
            />
            <StatCard
              title="Total Store Revenue"
              value={formatPrice(totalRevenue)}
              icon={DollarSign}
              description="Sum of all purchase subtotals"
              trendColor="text-green-400"
            />
          </div>

          {/* Interactive Navigation Tabs & Actions */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-[#0d0d15] border border-brand-border/60">

            {/* View selectors */}
            <div className="flex items-center gap-2 bg-[#050505] p-1 rounded-xl border border-brand-border/80">
              <button
                onClick={() => { setActiveTab('inventory'); setSearchQuery(''); }}
                className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                  activeTab === 'inventory'
                    ? 'bg-brand-blue text-white shadow shadow-brand-blue/15'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Manage Inventory ({totalProducts})
              </button>
              <button
                onClick={() => { setActiveTab('orders'); setSearchQuery(''); }}
                className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                  activeTab === 'orders'
                    ? 'bg-brand-blue text-white shadow shadow-brand-blue/15'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Orders Log ({totalOrders})
              </button>
            </div>

            {/* Live tab search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-grow max-w-xl">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder={activeTab === 'inventory' ? "Search by title, platform or type..." : "Search orders by ID or customer..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#050505] text-white border border-brand-border/60 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue"
                />
                <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-gray-500" />
              </div>

              {/* Add item button (inventory only) */}
              {activeTab === 'inventory' && (
                <button
                  onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
                  className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-xs font-extrabold uppercase tracking-widest text-white transition flex items-center justify-center gap-1.5 flex-shrink-0 shadow shadow-brand-blue/10"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </button>
              )}
            </div>

          </div>

          {/* DATA TABLES SECTION */}
          <div className="rounded-2xl border border-brand-border/60 bg-[#0d0d15]/50 overflow-hidden pb-4">

            {activeTab === 'inventory' ? (
              /* INVENTORY TABLE */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border/80 bg-[#0d0d15] text-gray-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Product Info</th>
                      <th className="p-4">Platform & Type</th>
                      <th className="p-4">Base Price</th>
                      <th className="p-4">Stock Levels</th>
                      <th className="p-4">Marketing Badges</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-gray-500 font-semibold uppercase">No products match your search query</td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition">
                          {/* Title */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-black/40 border border-white/5 rounded-lg flex items-center justify-center font-bold text-brand-cyan tracking-widest">
                                {p.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-bold text-gray-200 line-clamp-1">{p.name}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Category: {p.category}</p>
                              </div>
                            </div>
                          </td>

                          {/* Platform & Type */}
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 font-semibold text-[10px] text-gray-300 uppercase">
                                {p.platform}
                              </span>
                              <span className="bg-brand-blue/5 text-brand-cyan px-2 py-0.5 rounded border border-brand-cyan/10 text-[10px] font-semibold">
                                {p.type}
                              </span>
                            </div>
                          </td>

                          {/* Base Price */}
                          <td className="p-4">
                            <span className="font-bold text-gray-200">
                              {formatPrice(p.price)}
                            </span>
                          </td>

                          {/* Stock Levels */}
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuickStockChange(p.id, p.stock, -10)}
                                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 font-black"
                                title="-10 Stock"
                              >
                                -10
                              </button>
                              <span className={`font-black min-w-8 text-center ${p.stock <= 5 ? 'text-red-400 bg-red-950/20 px-2 py-0.5 rounded' : 'text-gray-200'}`}>
                                {p.stock}
                              </span>
                              <button
                                onClick={() => handleQuickStockChange(p.id, p.stock, 10)}
                                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 font-black"
                                title="+10 Stock"
                              >
                                +10
                              </button>
                            </div>
                          </td>

                          {/* Badges */}
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {p.isFeatured && <span className="bg-cyan-500/10 text-cyan-400 text-[9px] font-bold px-1.5 rounded">Featured</span>}
                              {p.isTrending && <span className="bg-purple-500/10 text-purple-400 text-[9px] font-bold px-1.5 rounded">Trending</span>}
                              {p.isFlashDeal && <span className="bg-amber-500/10 text-amber-400 text-[9px] font-bold px-1.5 rounded">Flash Deal</span>}
                              {p.isTopRated && <span className="bg-pink-500/10 text-pink-400 text-[9px] font-bold px-1.5 rounded">Top Rated</span>}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => { setEditingProduct(p); setIsFormOpen(true); }}
                                className="p-1.5 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 rounded-lg text-brand-cyan transition"
                                title="Edit Product details"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 rounded-lg text-red-400 transition"
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              /* ORDERS TABLE */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border/80 bg-[#0d0d15] text-gray-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Order Details</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Bought Items</th>
                      <th className="p-4">Payment gateway</th>
                      <th className="p-4">Subtotal</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-gray-500 font-semibold uppercase">No order transactions found</td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-white/5 transition align-top">
                          {/* ID & Date */}
                          <td className="p-4 space-y-1">
                            <p className="font-extrabold text-brand-cyan">{o.id}</p>
                            <p className="text-[10px] text-gray-500">{new Date(o.date).toLocaleString('en-US')}</p>
                          </td>

                          {/* Customer */}
                          <td className="p-4 space-y-1">
                            <p className="font-bold text-gray-200">{o.customerName}</p>
                            <p className="text-gray-400 leading-none">{o.phoneNumber}</p>
                            <p className="text-[10px] text-gray-500 leading-none uppercase">{o.city}</p>
                          </td>

                          {/* Items */}
                          <td className="p-4">
                            <div className="space-y-1 text-[11px] max-w-xs">
                              {o.items.map((item, i) => (
                                <p key={i} className="text-gray-300">
                                  <span className="font-semibold text-white">{item.name}</span>
                                  <span className="text-brand-cyan font-semibold ml-1">({item.selectedPackage.name})</span>
                                  <span className="text-gray-500 font-medium ml-1">x{item.quantity}</span>
                                </p>
                              ))}
                              {o.orderNote && (
                                <p className="text-[10px] text-yellow-500 italic pt-1 border-t border-white/5">
                                  Note: "{o.orderNote}"
                                </p>
                              )}
                            </div>
                          </td>

                          {/* Payment gateway */}
                          <td className="p-4">
                            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${getPaymentBadgeColor(o.paymentMethod)}`}>
                              {o.paymentMethod}
                            </span>
                          </td>

                          {/* Subtotal */}
                          <td className="p-4">
                            <span className="font-black text-brand-cyan text-sm">
                              {formatPrice(o.totalAmount)}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="p-4 text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-bold uppercase text-[9px] tracking-wide">
                              <Clock className="h-3 w-3" /> Pending
                            </span>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </main>

        <Footer />

        {/* Dynamic Add/Edit overlay Modal */}
        {isFormOpen && (
          <AdminProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
          />
        )}

      </div>
    </ProtectedRoute>
  );
}

export default Admin;
