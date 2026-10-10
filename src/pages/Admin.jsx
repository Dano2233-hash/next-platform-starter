import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { ProductImage } from '../components/ProductImage';
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
  CheckCircle,
  Clock,
  Sparkles,
  TrendingUp,
  Flame,
  Star,
  RefreshCw
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToInitialProducts } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Orders State loaded from local storage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) setOrders(JSON.parse(saved));
    } catch (e) {
      console.error('Error reading orders', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
            System Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToInitialProducts}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            title="Reset catalog to initial default products"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-xs font-bold text-rose-300 transition-all shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Manage Products ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            View Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !showAddForm && !editingProduct && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-md shadow-cyan-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* ADD / EDIT FORM MODAL INLINE */}
      {(showAddForm || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Search Catalog */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products in admin catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          </div>

          {/* Products Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-x-auto shadow-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Flags</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 border border-slate-800">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-cyan-400 bg-slate-900">
                            DS
                          </div>
                        )}
                      </div>
                      <span className="line-clamp-1">{p.name}</span>
                    </td>

                    <td className="py-3 px-4 capitalize text-slate-300">{p.category}</td>

                    <td className="py-3 px-4 font-semibold text-cyan-400">{p.platform}</td>

                    <td className="py-3 px-4 font-extrabold text-white">
                      {formatPrice(p.price)}
                    </td>

                    {/* Quick Stock Edit */}
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-center font-bold text-slate-100 focus:outline-none focus:border-cyan-400 text-xs"
                      />
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-950 text-blue-300 border border-blue-800">Featured</span>}
                        {p.isTrending && <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-950 text-purple-300 border border-purple-800">Trending</span>}
                        {p.isFlashDeal && <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-950 text-rose-300 border border-rose-800">Flash</span>}
                        {p.isTopRated && <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-950 text-amber-300 border border-amber-800">Top</span>}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setShowAddForm(false);
                        }}
                        className="p-1.5 rounded bg-slate-800 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
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

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="font-bold text-slate-300">No customer orders placed yet</p>
              <p className="text-xs text-slate-500">Orders created via checkout will automatically appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs text-slate-400">Order ID:</span>
                      <h3 className="text-lg font-black text-cyan-400">{order.orderId}</h3>
                      <span className="text-[11px] text-slate-400">
                        Placed on: {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        {order.status || 'Pending Payment'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950 text-cyan-300 border border-slate-800">
                        Payment: {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Customer Name:</span>
                      <strong className="text-white text-sm">{order.customer?.name}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Phone (WhatsApp):</span>
                      <strong className="text-cyan-400 text-sm">{order.customer?.phone}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block">City / Region:</span>
                      <strong className="text-white text-sm">{order.customer?.city}</strong>
                    </div>
                  </div>

                  {order.customer?.orderNote && (
                    <div className="text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 font-semibold">Note / Player ID: </span>
                      <span className="text-slate-200">{order.customer.orderNote}</span>
                    </div>
                  )}

                  {/* Items list */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items:</h4>
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs bg-slate-950/80 p-2 rounded border border-slate-800/60">
                          <div>
                            <span className="font-bold text-slate-200">{item.product?.name}</span>
                            {item.selectedPackage && (
                              <span className="text-slate-400 ml-2">({item.selectedPackage.name})</span>
                            )}
                            <span className="text-slate-400 ml-2 font-medium">x{item.quantity}</span>
                          </div>
                          <span className="font-extrabold text-cyan-400">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Total Order Amount:</span>
                    <span className="text-lg font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
