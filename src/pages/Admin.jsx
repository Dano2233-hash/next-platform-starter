import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Search,
  CheckCircle,
  XCircle,
  RefreshCw,
  Star,
  Zap,
  Flame,
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
    updateStock,
    resetToDefaultProducts,
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
      setShowAddModal(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Logged in as Admin (dano.js)</span>
          </div>
          <h1 className="font-heading text-2xl font-black text-slate-100 mt-1">Dano Store Control Center</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset all catalog products to default dataset?')) {
                resetToDefaultProducts();
              }
            }}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Reset default products"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-900/50 text-red-300 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtext="Active items in store"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtext="Processed manual invoices"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Gross sales generated"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'products'
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Manage Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'orders'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-lg shadow-purple-500/10'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            View Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        )}
      </div>

      {/* Add / Edit Form Drawer Container */}
      {(showAddModal || editingProduct) && (
        <div className="bg-slate-950/80 p-1 rounded-2xl border border-cyan-500/30">
          <AdminProductForm
            initialProduct={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowAddModal(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Platform</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Badges</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 flex items-center gap-3 font-semibold text-slate-100">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                        <ProductImage product={p} className="h-full w-full" />
                      </div>
                      <span className="truncate max-w-[200px]">{p.name}</span>
                    </td>
                    <td className="p-3.5 font-bold text-cyan-400">{p.platform}</td>
                    <td className="p-3.5 text-slate-400 capitalize">{p.category}</td>
                    <td className="p-3.5 font-extrabold text-slate-100">{formatPrice(p.price)}</td>
                    <td className="p-3.5">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-cyan-400 font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        {p.isFeatured && <span title="Featured" className="w-2 h-2 rounded-full bg-cyan-400" />}
                        {p.isTrending && <span title="Trending" className="w-2 h-2 rounded-full bg-purple-400" />}
                        {p.isFlashDeal && <span title="Flash Deal" className="w-2 h-2 rounded-full bg-amber-400" />}
                        {p.isTopRated && <span title="Top Rated" className="w-2 h-2 rounded-full bg-emerald-400" />}
                      </div>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setShowAddModal(false);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete product "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/40 border border-red-900/40 text-red-400 hover:bg-red-900/60"
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
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 text-xs">
              No customer orders recorded yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.orderId} className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Order ID</span>
                      <span className="font-mono font-extrabold text-sm text-cyan-400">{ord.orderId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-bold text-[11px]">
                        Payment: {ord.paymentMethod}
                      </span>
                      <span className="text-xs text-slate-500">{new Date(ord.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Customer</span>
                      <span className="font-bold text-slate-200">{ord.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone</span>
                      <span className="font-bold text-slate-200">{ord.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">City</span>
                      <span className="font-bold text-slate-200">{ord.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Total Amount</span>
                      <span className="font-black text-cyan-400 text-sm">{formatPrice(ord.totalAmount)}</span>
                    </div>
                  </div>

                  {ord.orderNote && (
                    <div className="bg-slate-900 p-2.5 rounded-xl text-xs text-slate-300 border border-slate-800">
                      <strong className="text-slate-400">Order Note / Game ID:</strong> {ord.orderNote}
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">Purchased Products</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ord.items?.map((item) => (
                        <div key={item.cartItemId} className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60 flex items-center gap-2 text-xs">
                          <div className="w-8 h-8 rounded overflow-hidden shrink-0">
                            <ProductImage product={item.product || item} className="h-full w-full" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-slate-200 truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-400">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
