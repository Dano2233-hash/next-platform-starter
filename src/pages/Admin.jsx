import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Star,
  Flame,
  Zap,
  CheckCircle2,
  XCircle,
  Eye,
  RotateCcw,
  Search,
  Filter,
  ShieldCheck,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin({
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onToggleStock,
  onToggleFlag,
  onResetProducts,
  onLogout,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Read orders from localStorage
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dano_orders') || '[]');
    } catch (e) {
      return [];
    }
  });

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('dano_admin_auth');
    }
    navigate('/admin-login');
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, formData);
    } else {
      onAddProduct(formData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Top Admin Header Bar */}
      <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Admin Control Panel
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Logged in as <strong className="text-cyan-400 font-mono">dano.js</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetProducts}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Reset catalog to initial state"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Reset Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900/80 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Catalog Items persistent in LocalStorage"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="blue"
          subtitle="Customer submitted orders"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Gross aggregate sales"
        />
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-[#0c101c] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({totalProducts})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-[#0c101c] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders Management ({totalOrders})</span>
        </button>
      </div>

      {/* Tab Content: Products */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Action Bar */}
          <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products in admin..."
                className="w-full bg-[#080b14] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <button
              onClick={handleOpenAddForm}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#080b14] text-slate-400 font-extrabold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4">Badges & Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white max-w-xs truncate">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-cyan-400 font-bold shrink-0">
                            {prod.platform || 'DS'}
                          </div>
                          <span className="truncate">{prod.name}</span>
                        </div>
                      </td>
                      <td className="p-4 capitalize">{prod.category}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-[10px]">
                          {prod.platform}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-cyan-400">{formatPrice(prod.price)}</td>

                      {/* Stock toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => onToggleStock(prod.id)}
                          className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase border transition-all ${
                            prod.stock > 0
                              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40 hover:bg-emerald-900/60'
                              : 'bg-rose-950/60 text-rose-400 border-rose-500/40 hover:bg-rose-900/60'
                          }`}
                        >
                          {prod.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>

                      {/* Feature flags toggle buttons */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onToggleFlag(prod.id, 'isFeatured')}
                            title="Toggle Featured"
                            className={`p-1.5 rounded border transition-colors ${
                              prod.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleFlag(prod.id, 'isTrending')}
                            title="Toggle Trending"
                            className={`p-1.5 rounded border transition-colors ${
                              prod.isTrending
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleFlag(prod.id, 'isFlashDeal')}
                            title="Toggle Flash Deal"
                            className={`p-1.5 rounded border transition-colors ${
                              prod.isFlashDeal
                                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleFlag(prod.id, 'isTopRated')}
                            title="Toggle Top Rated"
                            className={`p-1.5 rounded border transition-colors ${
                              prod.isTopRated
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Edit / Delete */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditForm(prod)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(prod.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
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

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-white font-bold text-base">No Orders Created Yet</h3>
                <p className="text-xs mt-1">Orders placed by customers will be listed here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#080b14] text-slate-400 font-extrabold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Phone / City</th>
                      <th className="p-4">Selected Payment Method</th>
                      <th className="p-4">Items Count</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-cyan-400">#{ord.id}</td>
                        <td className="p-4 font-bold text-white">{ord.customer?.name}</td>
                        <td className="p-4">
                          <div>{ord.customer?.phone}</div>
                          <span className="text-[10px] text-slate-500">{ord.customer?.city}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-yellow-400 font-bold text-[10px]">
                            {ord.paymentMethod?.name || 'Manual Transfer'}
                          </span>
                        </td>
                        <td className="p-4">{ord.items?.length || 0} Items</td>
                        <td className="p-4 font-bold text-cyan-400">{formatPrice(ord.totalAmount)}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="p-1.5 text-cyan-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
                            title="View Full Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
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

      {/* Admin Product Modal */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0c101c] border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white font-black text-base">
                Order Details #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>Customer:</strong> {selectedOrder.customer?.name}</p>
              <p><strong>Phone:</strong> {selectedOrder.customer?.phone}</p>
              <p><strong>City:</strong> {selectedOrder.customer?.city}</p>
              {selectedOrder.customer?.note && (
                <p><strong>Note / Player ID:</strong> {selectedOrder.customer?.note}</p>
              )}
              <p>
                <strong>Payment Method:</strong>{' '}
                <span className="text-yellow-400 font-bold">
                  {selectedOrder.paymentMethod?.name}
                </span>
              </p>
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Items Ordered</h4>
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-800/40">
                  <span>{item.productName} (x{item.quantity})</span>
                  <span className="text-cyan-400 font-bold">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline text-sm">
              <span className="text-white font-bold">Total Amount</span>
              <span className="text-cyan-400 font-black text-lg">{formatPrice(selectedOrder.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
