import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, DollarSign, LogOut, Plus, Edit, Trash2,
  Search, CheckCircle, RefreshCw, Eye, Star, Flame, Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load orders from Local Storage
  const loadOrders = () => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, prodData);
    } else {
      addProduct(prodData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  // Filter products for search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Bar */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="px-3 py-1 bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">
            Admin Portal
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Dano Store Management</h1>
          <p className="text-xs text-slate-400">Manage catalog products, stock levels, and customer orders</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProducts}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Reset to default products catalog"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/80 border border-red-500/50 hover:bg-red-900 text-red-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
              : 'bg-[#090d1a] text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => {
            loadOrders();
            setActiveTab('orders');
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'bg-[#090d1a] text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Filter products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#090d1a] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={handleAddProduct}
              className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#05070f] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4">Price (From)</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-100 flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-cyan-400 font-bold text-[10px] flex-shrink-0">
                        {p.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="line-clamp-1">{p.name}</span>
                    </td>

                    <td className="py-3 px-4 capitalize font-semibold text-slate-300">
                      {p.category}
                    </td>

                    <td className="py-3 px-4 font-medium text-cyan-400">
                      {p.platform}
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-100">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        p.stock > 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                      }`}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex gap-1 text-[10px]">
                        {p.isFeatured && <span className="px-1.5 py-0.5 bg-blue-950 text-blue-300 rounded font-bold">Featured</span>}
                        {p.isTrending && <span className="px-1.5 py-0.5 bg-purple-950 text-purple-300 rounded font-bold">Trending</span>}
                        {p.isFlashDeal && <span className="px-1.5 py-0.5 bg-amber-950 text-amber-300 rounded font-bold">Flash</span>}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg transition-colors"
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-200">Recent Customer Orders</h2>

          {orders.length === 0 ? (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No orders created yet. Once customers checkout, orders will appear here.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.orderId} className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-3 text-xs shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-cyan-400 font-bold text-sm block">{o.orderId}</span>
                      <span className="text-[11px] text-slate-400">Created: {new Date(o.createdAt).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-purple-950/80 border border-purple-500/40 text-purple-300 rounded-lg font-bold">
                        Method: {o.paymentMethod}
                      </span>
                      <span className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded-lg font-bold">
                        {o.status || 'Pending Payment'}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#05070f] p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Customer</span>
                      <span className="font-bold text-slate-200">{o.customerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Phone</span>
                      <span className="font-bold text-slate-200">{o.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">City</span>
                      <span className="font-bold text-slate-200">{o.city}</span>
                    </div>
                  </div>

                  {o.orderNote && (
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-[11px]">
                      <span className="font-bold text-cyan-400">Note: </span>{o.orderNote}
                    </div>
                  )}

                  {/* Items Purchased */}
                  <div className="space-y-1 pt-1">
                    <span className="font-semibold text-slate-400 block text-[11px]">Items:</span>
                    {o.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-slate-300">
                        <span>{item.name} ({item.packageName}) x{item.quantity}</span>
                        <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline font-bold">
                    <span className="text-slate-200">Total Order Amount</span>
                    <span className="text-cyan-400 text-sm font-black">{formatPrice(o.totalPrice)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit / Add Modal */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}
