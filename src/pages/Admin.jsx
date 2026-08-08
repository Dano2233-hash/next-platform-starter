import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, DollarSign, LogOut, Plus, Edit2, Trash2,
  Check, X, Filter, BarChart3, TrendingUp, Sparkles, Star, RefreshCw
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin({ products, addProduct, editProduct, deleteProduct, changeStock, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'add-product' | 'edit-product'
  const [editingProduct, setEditingProduct] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load orders
  useEffect(() => {
    const loadedOrders = localStorage.getItem('dano_orders');
    if (loadedOrders) {
      try {
        setOrders(JSON.parse(loadedOrders));
      } catch (e) {
        setOrders([]);
      }
    }
  }, []);

  // Sync state helpers
  const refreshOrders = () => {
    const loadedOrders = localStorage.getItem('dano_orders');
    if (loadedOrders) {
      try {
        setOrders(JSON.parse(loadedOrders));
      } catch (e) {
        setOrders([]);
      }
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('dano_admin_auth');
    onLogout();
    navigate('/admin-login');
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  // Manage custom action helpers
  const handleAddProductSubmit = (payload) => {
    addProduct(payload);
    setActiveTab('products');
  };

  const handleEditProductSubmit = (payload) => {
    editProduct(payload.id, payload);
    setEditingProduct(null);
    setActiveTab('products');
  };

  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setActiveTab('edit-product');
  };

  const handleDeleteProductClick = (id) => {
    if (window.confirm('Are you sure you want to delete this premium product option?')) {
      deleteProduct(id);
    }
  };

  const handleStatusToggle = (orderNumber) => {
    const updated = orders.map(o => {
      if (o.orderNumber === orderNumber) {
        const nextStatus = o.status === 'Pending Payment Verification'
          ? 'Completed / Codes Delivered'
          : 'Pending Payment Verification';
        return { ...o, status: nextStatus };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('dano_orders', JSON.stringify(updated));
  };

  const deleteOrder = (orderNumber) => {
    if (window.confirm('Are you sure you want to delete this order receipt from database?')) {
      const updated = orders.filter(o => o.orderNumber !== orderNumber);
      setOrders(updated);
      localStorage.setItem('dano_orders', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header section with profile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-[10px] font-black uppercase text-green-400 tracking-widest">ADMIN SECURE PORTAL</span>
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-wider">Store Dashboard</h1>
          <p className="text-xs text-white/50">Manage digital catalog items, orders, client top-up receipts, and live metrics.</p>
        </div>

        <button
          onClick={handleLogoutClick}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout Session
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Catalog Products" value={totalProducts} icon={Package} color="border-cyan-500/20" />
        <StatCard title="Total Received Orders" value={totalOrders} icon={ShoppingBag} color="border-purple-500/20" />
        <StatCard title="Total Projected Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="border-green-500/20" />
      </div>

      {/* Layout Tabs navigation */}
      <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'products' || activeTab === 'edit-product'
              ? 'bg-[#0066ff] text-white'
              : 'bg-white/5 text-white/60 hover:text-white'
          }`}
        >
          Manage Catalog
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#0066ff] text-white'
              : 'bg-white/5 text-white/60 hover:text-white'
          }`}
        >
          View Client Orders ({orders.length})
        </button>

        <button
          onClick={() => {
            setEditingProduct(null);
            setActiveTab('add-product');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'add-product'
              ? 'bg-[#0066ff] text-white'
              : 'bg-white/5 text-white/60 hover:text-white'
          }`}
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </button>
      </div>

      {/* Dynamic Tab Body */}
      <div className="bg-[#09090c] border border-white/5 rounded-xl p-6 shadow-xl">

        {/* VIEW PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-white/50">
              <span>Catalog list: <strong>{products.length}</strong> items registered</span>
              <span className="text-[10px]">Filter: None</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Platform / Badge</th>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4 text-right">Packages (Min Price)</th>
                    <th className="py-3 px-4 text-center">Stock</th>
                    <th className="py-3 px-4 text-center">Flags</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((prod) => {
                    const minPrice = prod.packages && prod.packages.length > 0
                      ? Math.min(...prod.packages.map(p => p.price))
                      : prod.price;

                    return (
                      <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                        {/* Platform / Type */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black uppercase text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-1.5 py-0.5 rounded w-fit">
                              {prod.platform}
                            </span>
                            <span className="text-[9px] font-bold text-white/40 uppercase">
                              {prod.type}
                            </span>
                          </div>
                        </td>

                        {/* Title & Category */}
                        <td className="py-3 px-4">
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-white uppercase">{prod.name}</h4>
                            <p className="text-[10px] text-white/40 font-semibold uppercase">{prod.category}</p>
                          </div>
                        </td>

                        {/* Packages count & Min Price */}
                        <td className="py-3 px-4 text-right">
                          <div className="space-y-0.5">
                            <span className="font-extrabold text-cyan-400">{formatPrice(minPrice)}</span>
                            <p className="text-[10px] text-white/40">({prod.packages ? prod.packages.length : 1} options)</p>
                          </div>
                        </td>

                        {/* Stock Amount Changer */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="number"
                              value={prod.stock}
                              onChange={(e) => changeStock(prod.id, e.target.value)}
                              className="w-16 bg-[#050507] border border-white/10 rounded p-1 text-center font-bold text-xs"
                            />
                            {prod.stock === 0 && (
                              <span className="text-[9px] font-bold uppercase text-red-400 bg-red-950/30 px-1 py-0.5 rounded">
                                Out
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Badges flags */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex flex-wrap gap-1 justify-center max-w-[140px] mx-auto">
                            {prod.isFeatured && <span className="text-[8px] bg-cyan-500/10 text-cyan-400 px-1 rounded border border-cyan-500/20">Feat</span>}
                            {prod.isTrending && <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1 rounded border border-purple-500/20">Trend</span>}
                            {prod.isFlashDeal && <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1 rounded border border-amber-500/20">Flash</span>}
                            {prod.isTopRated && <span className="text-[8px] bg-green-500/10 text-green-400 px-1 rounded border border-green-500/20">Rated</span>}
                          </div>
                        </td>

                        {/* Edit & Delete */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="p-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded hover:bg-cyan-500/20 transition-all cursor-pointer"
                              title="Edit product info"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProductClick(prod.id)}
                              className="p-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-all cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-white/50">
              <span>Customer receipts: <strong>{orders.length}</strong> payments waiting</span>
              <button
                onClick={refreshOrders}
                className="text-cyan-400 font-semibold hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" /> Refresh
              </button>
            </div>

            {orders.length === 0 ? (
              <p className="text-center text-white/30 py-10 font-bold">No orders placed by customers yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.orderNumber}
                    className="p-4 bg-white/5 border border-white/5 rounded-lg flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    {/* Customer details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase text-white bg-white/10 px-2 py-0.5 rounded">
                          #{order.orderNumber}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                          order.status.includes('Completed')
                            ? 'bg-green-500/10 border-green-500/20 text-green-400'
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-white/60">
                        <div>
                          <span>Client:</span> <strong className="text-white">{order.customerName}</strong>
                        </div>
                        <div>
                          <span>Phone:</span> <strong className="text-white">{order.phoneNumber}</strong>
                        </div>
                        <div>
                          <span>City:</span> <strong className="text-white">{order.city}</strong>
                        </div>
                        <div>
                          <span>Manual Payment:</span> <strong className="text-cyan-400 uppercase">{order.paymentMethod}</strong>
                        </div>
                      </div>

                      {/* Purchased items list */}
                      <div className="bg-black/30 p-2.5 rounded border border-white/5 mt-2 space-y-1.5">
                        <span className="text-[9px] text-white/40 block font-bold uppercase">Items Purchased:</span>
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[11px] text-white/80">
                            <span>
                              {it.name} - <span className="text-purple-400">{it.package}</span> <strong className="text-white">x{it.quantity}</strong>
                            </span>
                            <span className="font-semibold text-cyan-400">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {order.note && (
                        <div className="bg-black/30 p-2 rounded text-[10px] italic border-l-2 border-cyan-500 text-white/70">
                          Note: "{order.note}"
                        </div>
                      )}
                    </div>

                    {/* Total Price and Status toggle */}
                    <div className="flex flex-col md:items-end justify-between gap-3 min-w-[140px] border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                      <div className="md:text-right">
                        <span className="text-[9px] text-white/40 block">TOTAL AMOUNT</span>
                        <span className="text-base font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
                      </div>

                      <div className="flex items-center gap-2 w-full md:justify-end">
                        <button
                          onClick={() => handleStatusToggle(order.orderNumber)}
                          className={`flex-1 md:flex-none px-3 py-1.5 rounded font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            order.status.includes('Completed')
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                              : 'bg-green-500/15 text-green-400 border border-green-500/20'
                          }`}
                        >
                          {order.status.includes('Completed') ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                          {order.status.includes('Completed') ? 'Mark Pending' : 'Mark Completed'}
                        </button>

                        <button
                          onClick={() => deleteOrder(order.orderNumber)}
                          className="p-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-all cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADD PRODUCT FORM */}
        {activeTab === 'add-product' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase text-white">Add New Digital Store Asset</h3>
            <AdminProductForm
              onSave={handleAddProductSubmit}
              onCancel={() => setActiveTab('products')}
            />
          </div>
        )}

        {/* EDIT PRODUCT FORM */}
        {activeTab === 'edit-product' && editingProduct && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase text-white">Edit: {editingProduct.name}</h3>
            <AdminProductForm
              initialProduct={editingProduct}
              onSave={handleEditProductSubmit}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab('products');
              }}
            />
          </div>
        )}

      </div>

    </div>
  );
}
