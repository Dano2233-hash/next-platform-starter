import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  LogOut,
  Sparkles,
  Zap,
  Star,
  Flame,
  Search,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

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
    resetToDefaultProducts,
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  // Filtered Products for Admin List
  const filteredProducts = products.filter(p => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q);
  });

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Authenticated Administrator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Store Management Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage inventory, feature flags, promotions, and inspect incoming orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefaultProducts}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to default initial product catalog"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Products
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-950/40 text-rose-300 border border-rose-800/80 hover:bg-rose-900/60 flex items-center gap-1.5 transition-colors cursor-pointer"
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
          changeText="Active catalog inventory"
          colorScheme="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          changeText="Processed via Local Storage"
          colorScheme="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          changeText="Gross order volume"
          colorScheme="emerald"
        />
      </div>

      {/* Section Tabs (Products vs Orders) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Orders & Payments ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={handleAddNewClick}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center gap-1.5 shadow-md shadow-cyan-950/50 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name, platform..."
                className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xs text-slate-400">{filteredProducts.length} items shown</span>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-x-auto bg-slate-900/40">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3">Promotions</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => {
                  const isOutOfStock = p.stock <= 0;
                  return (
                    <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-xs">{p.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-mono">{p.slug}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-bold text-cyan-400">
                          {p.platform}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            isOutOfStock
                              ? 'bg-rose-950/60 border-rose-800 text-rose-300 hover:bg-rose-900/60'
                              : 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900/60'
                          }`}
                          title="Click to toggle stock between in-stock and out-of-stock"
                        >
                          {isOutOfStock ? 'Out of Stock (0)' : `In Stock (${p.stock})`}
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                            className={`p-1 rounded border text-[10px] ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Featured"
                          >
                            <Sparkles className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isTrending: !p.isTrending })}
                            className={`p-1 rounded border text-[10px] ${
                              p.isTrending
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Trending"
                          >
                            <Flame className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isFlashDeal: !p.isFlashDeal })}
                            className={`p-1 rounded border text-[10px] ${
                              p.isFlashDeal
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            <Zap className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isTopRated: !p.isTopRated })}
                            className={`p-1 rounded border text-[10px] ${
                              p.isTopRated
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Top Rated"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700"
                            title="Delete Product"
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
      )}

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <h3 className="font-bold text-white text-base">No Orders Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Orders created by customers at checkout will appear here in real-time with their selected payment method.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.orderId}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-cyan-400">
                        {ord.orderId}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Payment:</span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold uppercase bg-slate-950 border border-cyan-800 text-cyan-300">
                        {ord.paymentMethod}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase bg-amber-950/60 border border-amber-800 text-amber-300">
                        {ord.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block">Customer:</span>
                      <strong className="text-white">{ord.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone / WhatsApp:</span>
                      <strong className="text-white">{ord.phoneNumber}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">City:</span>
                      <strong className="text-white">{ord.city}</strong>
                    </div>
                  </div>

                  {ord.orderNote && (
                    <div className="text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-400">
                      <strong className="text-slate-300">Note / Player ID:</strong> {ord.orderNote}
                    </div>
                  )}

                  {/* Items summary */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="text-slate-400">
                      Items: {ord.items?.map(i => `${i.name} (${i.packageName}) x${i.quantity}`).join(', ')}
                    </div>
                    <div className="font-black text-sm text-white">
                      Total: <span className="text-cyan-400">{formatPrice(ord.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <AdminProductForm
        product={editingProduct}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
