import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, toggleStock, resetToDefaults } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [productSearch, setProductSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const featuredCount = products.filter((p) => p.isFeatured).length;

  // Filtered products list
  const displayedProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setIsFormOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Admin Authenticated (dano.js)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Store Administration Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            title="Reset default catalog"
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle={`${featuredCount} featured items`}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="All manual orders recorded"
          icon={ShoppingBag}
          color="cyan"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Lifetime recorded volume"
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Conversion Volume"
          value={totalOrders > 0 ? `${Math.round(totalRevenue / totalOrders).toLocaleString()} IQD` : '0 IQD'}
          subtitle="Average order value"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
            activeTab === 'products'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
            activeTab === 'orders'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Orders Received ({orders.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products in catalog..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#0b101e] border border-slate-800 rounded-2xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070b14] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Base Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Promotions</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {displayedProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-white max-w-xs truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{p.slug}</div>
                      </td>
                      <td className="p-3.5 text-slate-400">{p.category}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-semibold text-[10px]">
                          {p.platform}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-white">{formatPrice(p.price)}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock > 0
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {p.stock > 0 ? `${p.stock} In Stock` : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {p.isFeatured && (
                            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[9px] font-bold border border-blue-800">
                              Featured
                            </span>
                          )}
                          {p.isTrending && (
                            <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[9px] font-bold border border-cyan-800">
                              Trending
                            </span>
                          )}
                          {p.isFlashDeal && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[9px] font-bold border border-rose-800">
                              Flash
                            </span>
                          )}
                          {p.isTopRated && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[9px] font-bold border border-purple-800">
                              Top Rated
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
            <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Orders Received Yet</h3>
              <p className="text-xs">
                As soon as customers submit orders through manual checkout, they will appear here with full payment details.
              </p>
            </div>
          ) : (
            <div className="bg-[#0b101e] border border-slate-800 rounded-2xl overflow-hidden shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#070b14] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Customer & City</th>
                      <th className="p-3.5">Phone Number</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {orders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-slate-900/40 transition">
                        <td className="p-3.5 font-mono font-bold text-cyan-400">{o.orderId}</td>
                        <td className="p-3.5 text-slate-400 text-[11px]">
                          {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'Today'}
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-white">{o.customerName}</div>
                          <div className="text-[10px] text-slate-400">{o.city}</div>
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">{o.phoneNumber}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white font-bold text-[10px] uppercase">
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5 font-black text-cyan-300">{formatPrice(o.totalAmount)}</td>
                        <td className="p-3.5 max-w-xs truncate text-[11px] text-slate-300">
                          {o.items?.map((i) => `${i.name} (${i.quantity})`).join(', ')}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800/80">
                            {o.status || 'Pending Verification'}
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

      {/* Admin Product Modal Form */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
