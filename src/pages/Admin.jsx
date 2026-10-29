import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
  DollarSign,
  Search,
  RefreshCw,
  Eye,
  CheckCircle2,
  Star,
  Flame,
  Zap,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleProductFlag,
    resetToDefaultProducts
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  // Load orders from Local Storage dano_orders
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders from local storage:', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  // Filter products by search
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 text-slate-950 p-0.5">
            <div className="p-2.5 bg-slate-950 rounded-[14px] text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Admin Control Panel</h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage product catalog, inventory stock, flags, and orders.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to default seed products?')) {
                resetToDefaultProducts();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
            title="Reset Catalog"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Reset Seed Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Catalog Inventory"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          subtitle="Received Purchases"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Gross Completed Orders"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Orders ({totalOrdersCount})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Search bar inside products table */}
          <div className="flex items-center justify-between gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog by title or category..."
                className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-medium">{filteredProducts.length} items listed</span>
          </div>

          {/* Products Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Store Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-slate-100 max-w-xs truncate">
                        {p.name}
                      </td>
                      <td className="p-3.5 text-slate-400">{p.category}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-extrabold text-cyan-400">
                          {p.platform}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-cyan-400">{formatPrice(p.price)}</td>
                      <td className="p-3.5">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-16 bg-slate-950 text-center font-bold p-1 rounded border border-slate-800 focus:border-cyan-500 text-xs"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isFeatured')}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                : 'bg-slate-950 text-slate-500 border-slate-800'
                            }`}
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isTrending')}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              p.isTrending
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : 'bg-slate-950 text-slate-500 border-slate-800'
                            }`}
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isFlashDeal')}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              p.isFlashDeal
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : 'bg-slate-950 text-slate-500 border-slate-800'
                            }`}
                          >
                            Flash
                          </button>
                          <button
                            onClick={() => toggleProductFlag(p.id, 'isTopRated')}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              p.isTopRated
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-950 text-slate-500 border-slate-800'
                            }`}
                          >
                            Top
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="Delete"
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-600" />
              <h3 className="text-base font-bold text-slate-200">No orders received yet</h3>
              <p className="text-xs text-slate-500">When customers submit checkout orders, they will appear here with full payment details.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.orderNumber} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-white font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                        #{ord.orderNumber}
                      </span>
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {ord.paymentMethod}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(ord.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block">Customer Name</span>
                      <strong className="text-slate-100">{ord.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone / WhatsApp</span>
                      <strong className="text-slate-100">{ord.customerPhone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">City</span>
                      <strong className="text-slate-100">{ord.customerCity}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Total Revenue</span>
                      <strong className="text-cyan-400 text-sm">{formatPrice(ord.totalPrice)}</strong>
                    </div>
                  </div>

                  {ord.orderNote && (
                    <div className="p-2.5 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800">
                      <span className="text-slate-500 font-bold block">Order Note / Player ID:</span>
                      <span>{ord.orderNote}</span>
                    </div>
                  )}

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Items Purchased:</span>
                    <div className="flex flex-wrap gap-2">
                      {ord.items?.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200">
                          {item.name} {item.selectedPackage && `(${item.selectedPackage})`} x{item.quantity}
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

      {/* Admin Add/Edit Product Modal */}
      {isFormOpen && (
        <AdminProductForm
          productToEdit={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}
