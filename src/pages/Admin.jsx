import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  CheckCircle,
  XCircle,
  Search,
  Sparkles,
  Flame,
  Zap,
  Star,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { products, orders, addProduct, updateProduct, deleteProduct, toggleStock, resetToDefaults } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  const filteredProducts = products.filter((p) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.platform?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term)
    );
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingProduct(false);
    }
  };

  const toggleFlag = (id, flagName) => {
    const prod = products.find((p) => p.id === id);
    if (prod) {
      updateProduct(id, { [flagName]: !prod[flagName] });
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#090e1d] border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Admin Portal
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Dano Store Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Manage catalog items, monitor orders, and control product placement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            title="Reset catalog back to original initial dataset"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Products"
          value={totalProducts}
          subtext="In active catalog"
          icon={Package}
          color="cyan"
        />
        <StatCard
          label="Total Orders"
          value={totalOrders}
          subtext="Placed by customers"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          label="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="From confirmed orders"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Product Management ({totalProducts})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Customer Orders ({totalOrders})
        </button>
      </div>

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by title..."
                className="w-full bg-[#090e1d] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#090e1d] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#05070f] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Product</th>
                    <th className="py-3.5 px-4 font-bold">Category</th>
                    <th className="py-3.5 px-4 font-bold">Platform</th>
                    <th className="py-3.5 px-4 font-bold">Price</th>
                    <th className="py-3.5 px-4 font-bold">Stock</th>
                    <th className="py-3.5 px-4 font-bold">Badges / Sections</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-cyan-400">
                                DS
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-slate-500 block truncate max-w-xs">{p.type}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 capitalize font-medium text-slate-400">
                        {p.category}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 border border-cyan-500/20">
                          {p.platform}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                        {formatPrice(p.price)}
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                            p.stock > 0
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-950/60 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {p.stock > 0 ? `${p.stock} In Stock` : 'Out of Stock'}
                        </button>
                      </td>

                      {/* Section badges toggle */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleFlag(p.id, 'isFeatured')}
                            title="Toggle Featured"
                            className={`p-1 rounded text-[10px] font-bold border transition-colors ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleFlag(p.id, 'isTrending')}
                            title="Toggle Trending"
                            className={`p-1 rounded text-[10px] font-bold border transition-colors ${
                              p.isTrending
                                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleFlag(p.id, 'isFlashDeal')}
                            title="Toggle Flash Deal"
                            className={`p-1 rounded text-[10px] font-bold border transition-colors ${
                              p.isFlashDeal
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleFlag(p.id, 'isTopRated')}
                            title="Toggle Top Rated"
                            className={`p-1 rounded text-[10px] font-bold border transition-colors ${
                              p.isTopRated
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
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
            <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <p className="font-semibold text-white">No customer orders placed yet</p>
              <p className="text-xs mt-1">Orders placed by customers will appear here with selected payment methods.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order, idx) => (
                <div
                  key={order.orderNumber || idx}
                  className="bg-[#090e1d] border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-300 text-sm">
                          {order.orderNumber}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-amber-950/60 text-amber-400 border border-amber-500/30">
                          {order.status || 'Pending Payment'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        Placed: {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Total Order Value</span>
                      <span className="text-base font-black text-cyan-400">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Customer */}
                    <div className="bg-[#05070f] p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[11px]">Customer Details</span>
                      <p className="font-bold text-white">{order.customer?.name}</p>
                      <p className="text-slate-300 font-mono">{order.customer?.phone}</p>
                      <p className="text-slate-400">City: {order.customer?.city}</p>
                    </div>

                    {/* Selected Payment Method */}
                    <div className="bg-[#05070f] p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[11px]">Selected Payment Method</span>
                      <p className="font-extrabold text-white uppercase text-sm text-cyan-400">
                        {order.paymentMethod}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Manual verification required
                      </p>
                      {order.orderNote && (
                        <p className="text-amber-300 text-[11px] pt-1">
                          Note: {order.orderNote}
                        </p>
                      )}
                    </div>

                    {/* Items */}
                    <div className="bg-[#05070f] p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-semibold block text-[11px]">Purchased Items ({order.items?.length})</span>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {order.items?.map((item) => (
                          <div key={item.id} className="flex justify-between text-[11px]">
                            <span className="text-slate-200 truncate">
                              {item.name} {item.packageName ? `(${item.packageName})` : ''} x{item.quantity}
                            </span>
                            <span className="font-mono text-cyan-300 ml-2">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit or Add Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
