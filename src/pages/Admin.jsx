import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Star,
  Flame,
  Zap,
  TrendingUp,
  RefreshCw,
  Search,
  CheckCircle,
} from 'lucide-react';

import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleSectionFlag,
    resetToDefaults,
  } = useProducts();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'deals'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingNew(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    (p.name || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header Bar */}
      <div className="bg-[#070c1e] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight">
              Dano Store Admin Dashboard
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Manage inventory, prices, section highlights, and customer orders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            title="Reset catalog to initial seed products"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Inventory" value={totalProducts} icon={Package} color="cyan" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="emerald" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-4 text-xs font-extrabold uppercase tracking-wider">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsAddingNew(false);
            setEditingProduct(null);
          }}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Product Management ({totalProducts})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Customer Orders ({totalOrders})
        </button>

        <button
          onClick={() => setActiveTab('deals')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'deals'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Section Highlights &amp; Badges
        </button>
      </div>

      {/* TAB 1: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Action Bar */}
          {!isAddingNew && !editingProduct && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#080d21] border border-slate-800 p-4 rounded-2xl">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#0d142d] border border-slate-700 text-slate-100 text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:border-cyan-400"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          )}

          {/* Add or Edit Form */}
          {(isAddingNew || editingProduct) && (
            <AdminProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsAddingNew(false);
                setEditingProduct(null);
              }}
            />
          )}

          {/* Products Table */}
          {!isAddingNew && !editingProduct && (
            <div className="bg-[#080d21] border border-slate-800 rounded-2xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#050917] text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Platform / Type</th>
                    <th className="p-4">Price (IQD)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden border border-slate-800 shrink-0">
                          {prod.image ? (
                            <img src={prod.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-blue-950 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                              DS
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-100 block">{prod.name}</span>
                          <span className="text-[10px] text-slate-400">{prod.category}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 text-[10px] font-bold mr-1">
                          {prod.platform}
                        </span>
                        <span className="bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 text-[10px] font-bold">
                          {prod.type}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-cyan-400">
                        {formatPrice(prod.price)}
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          value={prod.stock}
                          onChange={(e) => updateStock(prod.id, e.target.value)}
                          className="w-16 bg-[#0c1328] border border-slate-700 rounded-lg p-1 text-center font-bold text-xs focus:border-cyan-400"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg border border-slate-700"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg border border-slate-700"
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
          )}
        </div>
      )}

      {/* TAB 2: CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#080d21] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
              No orders created yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.orderId}
                  className="bg-[#080d21] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-black text-cyan-400">Order #{ord.orderId}</span>
                      <span className="text-[11px] text-slate-400 ml-2">
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleString() : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-pink-950 text-pink-300 border border-pink-800 px-3 py-1 rounded-full uppercase">
                        Payment: {ord.paymentMethod}
                      </span>
                      <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Customer Name:</span>
                      <span className="font-bold text-slate-100">{ord.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Phone (WhatsApp):</span>
                      <span className="font-bold text-slate-100">{ord.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">City:</span>
                      <span className="font-bold text-slate-100">{ord.city}</span>
                    </div>
                  </div>

                  {ord.orderNote && (
                    <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <strong className="text-slate-400">Note:</strong> {ord.orderNote}
                    </div>
                  )}

                  {/* Purchased Items List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase">Items Ordered:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ord.items &&
                        ord.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="bg-[#0c1328] p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs"
                          >
                            <div>
                              <span className="font-bold text-slate-200 block">{it.productName}</span>
                              <span className="text-[10px] text-cyan-400">{it.packageName} x {it.quantity}</span>
                            </div>
                            <span className="font-black text-slate-200">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-sm font-extrabold">
                    <span className="text-slate-300">Total Revenue:</span>
                    <span className="text-cyan-400 font-black text-lg">{formatPrice(ord.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SECTION HIGHLIGHTS */}
      {activeTab === 'deals' && (
        <div className="bg-[#080d21] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div>
            <h3 className="font-extrabold text-base text-slate-100">Manage Homepage Sections</h3>
            <p className="text-xs text-slate-400">
              Toggle products into Featured, Flash Deals, Trending, or Top Rated home sections.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#050917] text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3 text-center">Featured</th>
                  <th className="p-3 text-center">Flash Deal</th>
                  <th className="p-3 text-center">Trending</th>
                  <th className="p-3 text-center">Top Rated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-slate-100">{prod.name}</td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={Boolean(prod.isFeatured)}
                        onChange={() => toggleSectionFlag(prod.id, 'isFeatured')}
                        className="accent-cyan-400 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={Boolean(prod.isFlashDeal)}
                        onChange={() => toggleSectionFlag(prod.id, 'isFlashDeal')}
                        className="accent-cyan-400 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={Boolean(prod.isTrending)}
                        onChange={() => toggleSectionFlag(prod.id, 'isTrending')}
                        className="accent-cyan-400 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={Boolean(prod.isTopRated)}
                        onChange={() => toggleSectionFlag(prod.id, 'isTopRated')}
                        className="accent-cyan-400 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
