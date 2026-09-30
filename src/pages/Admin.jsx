import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Plus,
  Trash2,
  Edit,
  Package,
  ShoppingBag,
  DollarSign,
  Layers,
  Star,
  Flame,
  TrendingUp,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';

export function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load orders from Local Storage
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dano_orders') || '[]');
    } catch (e) {
      return [];
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Stat Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filter products by search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-purple-400" />
            <span>Admin Management Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage product catalog, stock levels, featured tags, and view customer orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-xs hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products Catalog"
          value={totalProducts}
          icon={Package}
          color="cyan"
          badge="Live"
        />
        <StatCard
          title="Total Orders Placed"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          badge="Local Storage"
        />
        <StatCard
          title="Total Sales Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          badge="IQD"
        />
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-500 text-slate-950 font-black shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowProductModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs uppercase flex items-center gap-1 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
            <button
              onClick={resetToDefault}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
              title="Reset sample products"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filter products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <div className="bg-[#0c1024] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Featured Flags</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-white block">{p.name}</span>
                      <span className="text-[10px] text-slate-500">{p.id}</span>
                    </td>
                    <td className="p-3 text-cyan-300">{p.category}</td>
                    <td className="p-3 text-purple-300">{p.platform}</td>
                    <td className="p-3 font-bold text-slate-100">{formatPrice(p.price)}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-center font-mono text-cyan-300"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-bold">
                            Featured
                          </span>
                        )}
                        {p.isTrending && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-bold">
                            Trending
                          </span>
                        )}
                        {p.isFlashDeal && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold">
                            Flash Deal
                          </span>
                        )}
                        {p.isTopRated && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                            Top Rated
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setShowProductModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-slate-700"
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
      )}

      {/* Tab 2: Orders Viewer */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-300">No Customer Orders Yet</p>
              <p className="text-xs text-slate-500 mt-1">Orders created during checkout will appear here in real-time.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => {
                const payMethod = PAYMENT_METHODS.find((m) => m.id === ord.paymentMethod) || { name: ord.paymentMethod };
                return (
                  <div
                    key={ord.orderId}
                    className="p-5 rounded-2xl bg-[#0c1024] border border-slate-800 space-y-3 shadow-xl text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-cyan-300 text-sm">{ord.orderId}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          {ord.status || 'Pending Payment'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Customer Name</span>
                        <strong className="text-white">{ord.customerName}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Phone Number</span>
                        <strong className="text-cyan-300">{ord.phoneNumber}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">City</span>
                        <strong>{ord.city}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Selected Payment Method</span>
                        <strong className="text-purple-300">{payMethod.name}</strong>
                      </div>
                    </div>

                    {ord.orderNote && (
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                        Player ID / Note: <strong className="text-slate-200">{ord.orderNote}</strong>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-slate-400">
                        Items: {ord.items?.map((i) => `${i.name} (${i.packageName}) x${i.quantity}`).join(', ')}
                      </span>
                      <span className="text-sm font-black text-cyan-300">
                        {formatPrice(ord.totalAmount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Admin Add/Edit Modal */}
      {showProductModal && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default Admin;
