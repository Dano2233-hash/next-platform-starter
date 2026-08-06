import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ShoppingBag,
  Package,
  CircleDollarSign,
  ClipboardList,
  Check,
  X,
  Lock,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin({ products, onAddProduct, onEditProduct, onDeleteProduct, onChangeStock, onLogout }) {
  const navigate = useNavigate();

  // Load orders from Local Storage
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dano_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing orders', e);
      }
    }
    return [];
  });

  // State
  const [activeTab, setActiveTab] = useState('products'); // products, orders
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      onEditProduct(editingProduct.id, formData);
    } else {
      onAddProduct(formData);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleUpdateStock = (productId, stockVal) => {
    onChangeStock(productId, stockVal);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((ord) => {
      if (ord.orderId === orderId) {
        return { ...ord, status: newStatus };
      }
      return ord;
    });
    setOrders(updated);
    localStorage.setItem('dano_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      const updated = orders.filter((ord) => ord.orderId !== orderId);
      setOrders(updated);
      localStorage.setItem('dano_orders', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Admin Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Manage product directory, monitor incoming manual payment requests and update stocks</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/15 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Dashboard</span>
        </button>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Catalog Products" value={totalProducts} icon={Package} color="blue" />
        <StatCard title="Total Manual Orders" value={totalOrders} icon={ClipboardList} color="purple" />
        <StatCard title="Total Revenue (IQD)" value={formatPrice(totalRevenue)} icon={CircleDollarSign} color="emerald" />
      </div>

      {/* Section Tabs switcher */}
      <div className="flex gap-2 border-b border-slate-900 pb-px">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'border-[#00e5ff] text-[#00e5ff]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          View Manual Orders ({orders.length})
        </button>
      </div>

      {/* Tab: Products List view */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Product Catalog List
            </h3>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-lg shadow-[#0066ff]/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-slate-950/40 border border-slate-900 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs text-slate-300">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-900 text-slate-400 uppercase font-bold tracking-widest">
                    <th className="p-4">ID / Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform / Type</th>
                    <th className="p-4">Base Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Sections</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 font-semibold">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-900/10 transition-colors">
                      {/* Name info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                            {product.image ? (
                              <img src={product.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[10px] text-slate-500 font-bold">fallback</span>
                            )}
                          </div>
                          <div>
                            <span className="font-extrabold text-white block text-sm">{product.name}</span>
                            <span className="text-[10px] text-slate-500 block truncate max-w-[180px] mt-0.5">
                              Slug: {product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-slate-900 text-slate-400 uppercase text-[10px]">
                          {product.category}
                        </span>
                      </td>

                      {/* Platform / Type */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="text-white block uppercase">{product.platform}</span>
                          <span className="text-[10px] text-[#00e5ff] block">{product.type}</span>
                        </div>
                      </td>

                      {/* Base Price */}
                      <td className="p-4">
                        <span className="font-bold text-white block">{formatPrice(product.price)}</span>
                        {product.oldPrice > 0 && (
                          <span className="text-[10px] text-slate-500 line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </td>

                      {/* Stock input box */}
                      <td className="p-4">
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                          className="w-16 bg-[#040406] border border-slate-900 focus:border-[#00e5ff] rounded px-2 py-1.5 text-slate-100 focus:outline-none"
                        />
                      </td>

                      {/* Sections checkmarks */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 text-[9px] font-extrabold text-slate-500 uppercase">
                          {product.isFeatured && <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/15">Featured</span>}
                          {product.isTrending && <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/15">Trending</span>}
                          {product.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/15">Flash Deal</span>}
                          {product.isTopRated && <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">Top Rated</span>}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-900 transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                                onDeleteProduct(product.id);
                              }
                            }}
                            className="p-2 rounded bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-500 border border-slate-900 hover:border-red-500/20 transition-colors"
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
        </div>
      )}

      {/* Tab: View Manual Orders List */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
            Incoming Manual Orders & Transfer Verification Requests
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-slate-950/20 border border-slate-950 p-8 rounded-3xl">
              <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">No manual orders placed yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-6 rounded-2xl bg-[#09090c] border border-slate-900/80 space-y-4"
                >
                  {/* Top order summary header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{order.orderId}</span>
                        <span
                          className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded ${
                            order.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        Placed on: {new Date(order.date).toLocaleString()}
                      </span>
                    </div>

                    {/* Order action status buttons */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      {order.status !== 'completed' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.orderId, 'completed')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/15 transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Approved</span>
                        </button>
                      )}
                      {order.status !== 'pending' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.orderId, 'pending')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-wider border border-yellow-500/15 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Mark Pending</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(order.orderId)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/10 text-slate-500 hover:text-red-500 border border-slate-900 hover:border-red-500/20 transition-all"
                        title="Delete order log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Customer details info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold bg-slate-950 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-500 uppercase tracking-widest block text-[9px]">Customer Name</span>
                      <span className="text-white mt-1 block">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase tracking-widest block text-[9px]">Phone / Telegram</span>
                      <span className="text-white mt-1 block">{order.phoneNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase tracking-widest block text-[9px]">City / Country</span>
                      <span className="text-white mt-1 block">{order.city}</span>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold bg-slate-950 p-4 rounded-xl">
                    <div>
                      <span className="text-slate-500 uppercase tracking-widest block text-[9px]">Payment Method</span>
                      <span className="text-[#00e5ff] mt-1 block uppercase tracking-wider">{order.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase tracking-widest block text-[9px]">Order Notes</span>
                      <span className="text-slate-300 mt-1 block italic leading-relaxed">
                        {order.note || 'No notes left by user.'}
                      </span>
                    </div>
                  </div>

                  {/* Items breakdown inside order */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">Purchased Products List</span>
                    {order.items.map((it) => (
                      <div key={it.id} className="flex justify-between text-xs font-semibold text-slate-400">
                        <span>
                          {it.name} <strong className="text-slate-500 ml-1">({it.packageName}) × {it.quantity}</strong>
                        </span>
                        <span className="text-slate-300">{formatPrice(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Grand total summary banner */}
                  <div className="flex justify-between items-baseline pt-4 border-t border-slate-900/60 font-black">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Total Amount Paid manually</span>
                    <span className="text-sm text-[#00e5ff]">{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit form overlay modal */}
      {showForm && (
        <AdminProductForm
          product={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
