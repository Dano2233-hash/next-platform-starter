import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Flame,
  Zap,
  TrendingUp,
  Star,
  RefreshCw,
  Search,
  CheckCircle,
  Clock
} from 'lucide-react';

export function Admin({
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onToggleFlag,
  onResetProducts,
  onLogout
}) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'sections'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/admin-login');
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('dano_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Delete order ${orderId}?`)) {
      const updated = orders.filter((o) => o.orderId !== orderId);
      setOrders(updated);
      localStorage.setItem('dano_orders', JSON.stringify(updated));
    }
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  // Filtered Products for admin list
  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 pb-12">

      {/* Top Header & Admin Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Admin Control Panel</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              dano.js
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage catalog, inventory stock, customer orders, and featured sections</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-rose-400 border border-rose-800/40 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>

      {/* STAT CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtext={`${products.filter((p) => p.stock > 0).length} in stock`}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtext="Processed via Local Storage"
        />
        <StatCard
          title="Total Sales Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtext="Cumulative order volume"
        />
      </div>

      {/* ADMIN TABS & ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Manage Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Manage Orders ({totalOrders})
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Manage Sections
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-2">
            <button
              onClick={onResetProducts}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 cursor-pointer text-xs flex items-center gap-1"
              title="Reset default catalog"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: MANAGE PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter products..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            </div>
            <span className="text-xs text-slate-400">Showing {filteredProducts.length} items</span>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category & Platform</th>
                    <th className="py-3 px-4">Price (IQD)</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Flags</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-medium">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                            <ProductImage product={p} height="h-10" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-slate-400">{p.soldCount || 0} sold</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-cyan-400 border border-slate-800 mr-1 uppercase">
                          {p.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-blue-400 border border-slate-800 uppercase">
                          {p.platform}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-extrabold text-cyan-400">{formatPrice(p.price)}</span>
                        {p.oldPrice && (
                          <span className="block text-[10px] text-slate-500 line-through">{formatPrice(p.oldPrice)}</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={p.stock}
                            onChange={(e) => onUpdateStock(p.id, e.target.value)}
                            className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-bold focus:outline-none focus:border-cyan-500"
                          />
                          <span className={`text-[10px] font-bold ${p.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {p.stock > 0 ? 'In Stock' : 'Out'}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {p.isFeatured && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-950 text-cyan-400">Featured</span>}
                          {p.isTrending && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-950 text-purple-400">Trending</span>}
                          {p.isFlashDeal && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-950 text-amber-400">Flash</span>}
                          {p.isTopRated && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400">Rated</span>}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${p.name}"?`)) onDeleteProduct(p.id);
                            }}
                            className="p-1.5 text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
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

      {/* TAB 2: MANAGE ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-500" />
              <h4 className="text-base font-bold text-white">No Orders Received Yet</h4>
              <p className="text-xs text-slate-500">When customers complete checkout, orders will show up here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const payMethod = PAYMENT_METHODS.find((m) => m.id === order.paymentMethod);
                return (
                  <div key={order.orderId} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-cyan-400 text-base">{order.orderId}</span>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800/40">
                            {order.status || 'Pending Payment'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Status Change & Delete */}
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status || 'Pending Payment'}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="Pending Payment">Pending Payment</option>
                          <option value="Payment Received">Payment Received</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleDeleteOrder(order.orderId)}
                          className="p-1.5 text-rose-400 hover:bg-slate-800 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Customer & Payment Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Customer Name</span>
                        <span className="text-white font-bold">{order.customerName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Phone Number</span>
                        <span className="text-white font-bold">{order.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">City</span>
                        <span className="text-white font-bold">{order.city}</span>
                      </div>
                      <div>
                        {/* Selected Payment Method Display */}
                        <span className="text-slate-400 block font-medium">Selected Payment Method</span>
                        <span className="text-cyan-400 font-bold">{payMethod ? payMethod.name : order.paymentMethod}</span>
                      </div>
                    </div>

                    {order.orderNote && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                        <span className="text-slate-500 font-bold block text-[10px] uppercase">Customer Order Note / Player ID:</span>
                        {order.orderNote}
                      </div>
                    )}

                    {/* Order Items */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Purchased Items:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                            <div>
                              <span className="font-bold text-slate-200 block">{item.product?.name}</span>
                              <span className="text-[10px] text-cyan-400">{item.selectedPackage?.name} x {item.quantity}</span>
                            </div>
                            <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-xs text-slate-400 font-medium">Order Total:</span>
                      <span className="text-lg font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MANAGE FEATURED SECTIONS */}
      {activeTab === 'sections' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Home Page Section Management</h3>
            <p className="text-xs text-slate-400">Toggle which products appear in Top Sales, Flash Deals, Trending, and Top Rated sections.</p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4 text-center">Featured</th>
                    <th className="py-3 px-4 text-center">Trending</th>
                    <th className="py-3 px-4 text-center">Flash Deal</th>
                    <th className="py-3 px-4 text-center">Top Rated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-850/50">
                      <td className="py-3 px-4 font-bold text-white">{p.name}</td>

                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={!!p.isFeatured}
                          onChange={() => onToggleFlag(p.id, 'isFeatured')}
                          className="w-4 h-4 accent-cyan-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={!!p.isTrending}
                          onChange={() => onToggleFlag(p.id, 'isTrending')}
                          className="w-4 h-4 accent-purple-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={!!p.isFlashDeal}
                          onChange={() => onToggleFlag(p.id, 'isFlashDeal')}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={!!p.isTopRated}
                          onChange={() => onToggleFlag(p.id, 'isTopRated')}
                          className="w-4 h-4 accent-emerald-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add/Edit Modal Form */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}

    </div>
  );
}

export default Admin;
