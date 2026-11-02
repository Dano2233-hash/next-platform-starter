import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Sparkles,
  Zap,
  Flame,
  Star
} from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleFlag,
    resetToDefaultProducts
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const outOfStockCount = products.filter((p) => Number(p.stock) <= 0).length;

  const filteredProducts = products.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase().trim();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.platform?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-20">

      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/40 text-cyan-300 font-extrabold text-[11px] uppercase tracking-wider">
              Control Panel
            </span>
            <span className="text-xs text-slate-400">Authenticated as: <strong>dano.js</strong></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Dano Store Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefaultProducts}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to factory catalog"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-800/50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle={`${outOfStockCount} out of stock`}
          icon={Package}
          gradient="from-blue-600 to-cyan-500"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Customer orders received"
          icon={ShoppingBag}
          gradient="from-cyan-500 to-emerald-400"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Calculated in IQD"
          icon={DollarSign}
          gradient="from-emerald-500 to-teal-400"
        />
        <StatCard
          title="In Stock Ratio"
          value={`${Math.round(((totalProducts - outOfStockCount) / Math.max(1, totalProducts)) * 100)}%`}
          subtitle="Catalog availability"
          icon={TrendingUp}
          gradient="from-purple-600 to-pink-500"
        />
      </div>

      {/* Tabs Switcher: Products vs Orders */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          Manage Products ({totalProducts})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          View Customer Orders ({totalOrders})
        </button>
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter products..."
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handleAddClick}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold flex items-center gap-1.5 shadow-md self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Platform & Type</th>
                    <th className="py-3.5 px-4">Base Price</th>
                    <th className="py-3.5 px-4">Stock Status</th>
                    <th className="py-3.5 px-4">Feature Toggles</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => {
                    const inStock = Number(p.stock) > 0;
                    return (
                      <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 shrink-0">
                              <ProductImage
                                image={p.image}
                                name={p.name}
                                category={p.category}
                                platform={p.platform}
                                heightClass="h-10"
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-white block truncate max-w-xs">{p.name}</span>
                              <span className="text-[10px] text-slate-500">{p.packages?.length || 1} packages</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-cyan-400">
                              {p.platform}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-400">
                              {p.type}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-bold text-cyan-400">
                          {formatPrice(p.price)}
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleStock(p.id)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide cursor-pointer border ${
                              inStock
                                ? 'bg-emerald-950/80 border-emerald-800/40 text-emerald-400'
                                : 'bg-red-950/80 border-red-800/40 text-red-400'
                            }`}
                          >
                            {inStock ? `In Stock (${p.stock})` : 'Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleFlag(p.id, 'isFeatured')}
                              className={`p-1 rounded cursor-pointer ${p.isFeatured ? 'text-amber-400 bg-amber-950/40' : 'text-slate-600'}`}
                              title="Toggle Featured"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleFlag(p.id, 'isTrending')}
                              className={`p-1 rounded cursor-pointer ${p.isTrending ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-600'}`}
                              title="Toggle Trending"
                            >
                              <TrendingUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleFlag(p.id, 'isFlashDeal')}
                              className={`p-1 rounded cursor-pointer ${p.isFlashDeal ? 'text-rose-400 bg-rose-950/40' : 'text-slate-600'}`}
                              title="Toggle Flash Deal"
                            >
                              <Zap className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleFlag(p.id, 'isTopRated')}
                              className={`p-1 rounded cursor-pointer ${p.isTopRated ? 'text-yellow-400 bg-yellow-950/40' : 'text-slate-600'}`}
                              title="Toggle Top Rated"
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                No orders placed yet. Place a test checkout order from the store to view it here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Order ID & Date</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Selected Payment Method</th>
                      <th className="py-3.5 px-4">Items Ordered</th>
                      <th className="py-3.5 px-4">Total Amount</th>
                      <th className="py-3.5 px-4">Order Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((o, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-cyan-400 block">{o.orderId}</span>
                          <span className="text-[10px] text-slate-500">
                            {o.createdAt ? new Date(o.createdAt).toLocaleString() : 'Just now'}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-white block">{o.customer?.name}</span>
                          <span className="text-[11px] text-slate-400">{o.customer?.phone}</span>
                          <span className="text-[10px] text-slate-500 block">{o.customer?.city}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 font-extrabold text-[11px]">
                            {o.paymentMethod}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="space-y-0.5">
                            {o.items?.map((item, i) => (
                              <div key={i} className="text-[11px]">
                                <span className="font-medium text-slate-200">{item.name}</span>
                                <span className="text-slate-400"> ({item.packageName} × {item.quantity})</span>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-4 font-black text-cyan-400 text-sm">
                          {formatPrice(o.totalPrice)}
                        </td>

                        <td className="py-3 px-4 text-slate-400 max-w-xs truncate">
                          {o.customer?.note || 'None'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Form Modal (Add / Edit) */}
      <AdminProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
      />

    </div>
  );
}
