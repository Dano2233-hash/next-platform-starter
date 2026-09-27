import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  Eye,
  RotateCcw
} from 'lucide-react';

export default function Admin({ productsHook }) {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = productsHook;

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  // Load orders from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dano_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading orders:', e);
    }
  }, []);

  // Compute metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[2px]">
            <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Dano Store Control Panel</h1>
            <p className="text-xs text-slate-400">Manage catalog, pricing, inventory stock, and orders</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog back to initial default products?')) {
                resetToDefault();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 text-xs font-bold transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 hover:bg-rose-900 text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="from-blue-600 to-indigo-600"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="from-cyan-600 to-blue-600"
        />
        <StatCard
          title="Total Revenue (IQD)"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="from-purple-600 to-indigo-700"
        />
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Products Management ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !showAddForm && !editingProduct && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal Inline */}
      {(showAddForm || editingProduct) && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && !showAddForm && !editingProduct && (
        <div className="space-y-4">
          {/* Search filter */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filter products by name, category, platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090d1a] border border-slate-800 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Products Table */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category / Platform</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Featured Flags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-bold text-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center text-cyan-400 font-black text-xs">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          p.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <span className="block font-extrabold text-white text-sm">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.type} • {p.packages?.length || 1} Packages</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-600/40 text-cyan-300 font-bold text-[10px] uppercase">
                        {p.platform}
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5 capitalize">{p.category}</span>
                    </td>

                    <td className="p-4 font-extrabold text-cyan-400">
                      {formatPrice(p.price)}
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-20 bg-slate-900 border border-slate-800 text-white font-extrabold text-xs rounded-lg px-2.5 py-1 focus:border-cyan-500 focus:outline-none"
                      />
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && <span className="px-1.5 py-0.5 rounded bg-purple-950 border border-purple-600/40 text-purple-300 text-[9px] font-bold">Featured</span>}
                        {p.isTrending && <span className="px-1.5 py-0.5 rounded bg-blue-950 border border-blue-600/40 text-blue-300 text-[9px] font-bold">Trending</span>}
                        {p.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-rose-950 border border-rose-600/40 text-rose-300 text-[9px] font-bold">Flash</span>}
                        {p.isTopRated && <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600/40 text-amber-300 text-[9px] font-bold">Top Rated</span>}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
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
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-extrabold text-slate-300">No Orders Created Yet</h3>
              <p className="text-xs text-slate-500">When customers place orders, they will appear here with full customer details.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.orderId} className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">

                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 uppercase font-semibold">Order ID:</span>
                      <strong className="text-cyan-400 font-extrabold text-sm ml-2">#{ord.orderId}</strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{new Date(ord.createdAt).toLocaleString()}</span>
                      <span className="px-2.5 py-1 rounded bg-amber-950 border border-amber-600/40 text-amber-300 font-bold text-[10px] uppercase">
                        {ord.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Customer */}
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Customer Info</span>
                      <span className="text-white font-extrabold block">{ord.customer?.name}</span>
                      <span className="text-slate-300 block">Phone: {ord.customer?.phone}</span>
                      <span className="text-slate-300 block">City: {ord.customer?.city}</span>
                      {ord.customer?.orderNote && (
                        <span className="text-cyan-400 block pt-1 text-[11px]">Note: {ord.customer.orderNote}</span>
                      )}
                    </div>

                    {/* Payment */}
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Payment Operator</span>
                      <span className="text-cyan-400 font-extrabold text-sm uppercase block">{ord.paymentMethod}</span>
                      <span className="text-slate-300 block">Total Amount: <strong className="text-white font-bold">{formatPrice(ord.totalAmount)}</strong></span>
                    </div>

                    {/* Purchased Items */}
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Purchased Items ({ord.items?.length || 0})</span>
                      <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                        {ord.items?.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-[11px]">
                            <span className="text-slate-200 truncate">{it.name} ({it.packageName})</span>
                            <span className="text-cyan-400 font-bold">x{it.quantity}</span>
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

    </div>
  );
}
