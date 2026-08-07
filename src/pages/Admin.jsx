import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { AdminProductForm } from '../components/AdminProductForm';
import { StatCard } from '../components/StatCard';
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ListOrdered,
  Package,
  DollarSign,
  TrendingUp,
  Award,
  Flame,
  Star,
  RefreshCw,
  Eye
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function Admin() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const [activeTab, setActiveTab] = useState('products'); // products, orders, stats
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage key 'dano_orders'
  useEffect(() => {
    const stored = localStorage.getItem('dano_orders');
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading orders', e);
      }
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('dano_admin_auth');
    navigate('/admin-login');
  };

  // Metrics calculators
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(productData);
      setEditingProduct(null);
    } else if (isAdding) {
      addProduct(productData);
      setIsAdding(false);
    }
  };

  const handleToggleFlag = (product, flag) => {
    const updated = {
      ...product,
      [flag]: !product[flag]
    };
    updateProduct(updated);
  };

  const handleStockChange = (product, newStock) => {
    const updated = {
      ...product,
      stock: Number(newStock) || 0
    };
    updateProduct(updated);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Admin Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure product catalogs, manage inventory stock, and track local customer orders.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-950/25 hover:bg-red-900/45 text-red-500 hover:text-red-400 px-4 py-2.5 rounded-lg border border-red-500/20 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="flex space-x-2 border-b border-slate-900 pb-px">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsAdding(false);
            setEditingProduct(null);
          }}
          className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${
            activeTab === 'products'
              ? 'border-cyan-500 text-cyan-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Manage Products ({totalProducts})
        </button>
        <button
          onClick={() => {
            setActiveTab('orders');
            setIsAdding(false);
            setEditingProduct(null);
          }}
          className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${
            activeTab === 'orders'
              ? 'border-cyan-500 text-cyan-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Track Orders ({totalOrders})
        </button>
        <button
          onClick={() => {
            setActiveTab('metrics');
            setIsAdding(false);
            setEditingProduct(null);
          }}
          className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${
            activeTab === 'metrics'
              ? 'border-cyan-500 text-cyan-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Store Metrics
        </button>
      </div>

      {/* TAB 1: MANAGE PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add product drawer/form triggers */}
          {!isAdding && !editingProduct ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black px-5 py-3 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-cyan-500/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reset catalog to initial default list? Your local changes will be lost.')) {
                    resetToDefault();
                  }
                }}
                className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 px-4 py-2 rounded text-xs font-bold uppercase tracking-wide transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          ) : (
            <AdminProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsAdding(false);
                setEditingProduct(null);
              }}
            />
          )}

          {/* Catalog Listing Table */}
          {!isAdding && !editingProduct && (
            <div className="bg-[#0a0a14] border border-slate-900 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs text-slate-300">
                  <thead className="bg-slate-950/60 uppercase text-[10px] font-black tracking-wider text-slate-500 border-b border-slate-900">
                    <tr>
                      <th className="p-4">Name / ID</th>
                      <th className="p-4">Platform</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Homepage Promotion Flags</th>
                      <th className="p-4">Min Price</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-950/40 transition-colors">
                        {/* Name */}
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{prod.name}</div>
                          <span className="text-[10px] text-slate-500 font-medium">{prod.id}</span>
                        </td>
                        {/* Platform */}
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/10">
                            {prod.platform}
                          </span>
                        </td>
                        {/* Type */}
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-500/10">
                            {prod.type}
                          </span>
                        </td>
                        {/* Stock count */}
                        <td className="p-4">
                          <input
                            type="number"
                            value={prod.stock}
                            onChange={(e) => handleStockChange(prod, e.target.value)}
                            className="w-16 bg-slate-950 border border-slate-900 focus:outline-none focus:border-cyan-500 rounded px-2 py-1 text-center font-bold text-white"
                          />
                        </td>
                        {/* Featured Toggles */}
                        <td className="p-4 space-x-1.5">
                          <button
                            onClick={() => handleToggleFlag(prod, 'isFeatured')}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase transition-colors ${
                              prod.isFeatured ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'bg-slate-950 text-slate-500 border border-slate-900'
                            }`}
                            title="Featured promotion section"
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => handleToggleFlag(prod, 'isTrending')}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase transition-colors ${
                              prod.isTrending ? 'bg-orange-600/20 text-orange-400 border border-orange-500/20' : 'bg-slate-950 text-slate-500 border border-slate-900'
                            }`}
                            title="Trending section"
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => handleToggleFlag(prod, 'isFlashDeal')}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase transition-colors ${
                              prod.isFlashDeal ? 'bg-red-600/20 text-red-400 border border-red-500/20' : 'bg-slate-950 text-slate-500 border border-slate-900'
                            }`}
                            title="Flash Deals section"
                          >
                            Flash
                          </button>
                          <button
                            onClick={() => handleToggleFlag(prod, 'isTopRated')}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase transition-colors ${
                              prod.isTopRated ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/20' : 'bg-slate-950 text-slate-500 border border-slate-900'
                            }`}
                            title="Top Rated section"
                          >
                            Rated
                          </button>
                        </td>
                        {/* Price */}
                        <td className="p-4 font-black text-cyan-400 text-sm">
                          {formatPrice(prod.price)}
                        </td>
                        {/* Actions */}
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-950 border border-slate-900 hover:border-cyan-500/10 rounded transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-950 border border-slate-900 hover:border-red-500/10 rounded transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* TAB 2: VIEW ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-[#0a0a14] border border-slate-900 rounded-xl p-12 text-center text-slate-500">
              <ListOrdered className="w-12 h-12 mx-auto mb-4 opacity-30 text-slate-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2">
                No Orders Placed Yet
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Any orders processed on the checkout screen will appear immediately here with manual details.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={order.orderId} className="bg-[#0a0a14] border border-slate-900 rounded-xl p-6 space-y-4">

                  {/* Order header banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-3.5">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-black text-white">{order.orderId}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-500/20">
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Placed on: {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Total Bill</span>
                      <span className="text-base font-black text-cyan-400">{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>

                  {/* Customer personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-950/40 p-3 rounded border border-slate-900 text-xs">
                    <div>
                      <span className="text-slate-500 font-bold block">Customer Name</span>
                      <span className="text-slate-200 font-bold">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block">Phone Number</span>
                      <span className="text-slate-200 font-bold">{order.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block">Location City</span>
                      <span className="text-slate-200 font-bold">{order.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block">Manual Payment choice</span>
                      <span className="text-cyan-400 font-black uppercase tracking-wider">{order.paymentMethod}</span>
                    </div>
                    {order.note && (
                      <div className="col-span-1 sm:col-span-4 mt-2 border-t border-slate-900/60 pt-2">
                        <span className="text-slate-500 font-bold block">Order Note / IDs</span>
                        <span className="text-slate-300 block bg-slate-950 p-2 rounded mt-1">{order.note}</span>
                      </div>
                    )}
                  </div>

                  {/* Items list */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ordered Products</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs items-center bg-slate-950/20 p-2 rounded border border-slate-900/40">
                          <div>
                            <span className="font-bold text-white">{item.productName}</span>
                            <span className="text-[10px] text-slate-500 block uppercase">{item.platform} • {item.packageName} (x{item.quantity})</span>
                          </div>
                          <span className="text-slate-300 font-bold">{formatPrice(item.packagePrice * item.quantity)}</span>
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

      {/* TAB 3: STORE METRICS */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard title="Total Catalog Products" value={totalProducts} icon={Package} />
            <StatCard title="Total Orders Handled" value={totalOrders} icon={ListOrdered} colorClass="text-purple-400 border-purple-500/10 bg-purple-950/5" />
            <StatCard title="Total Revenue (Estimated)" value={formatPrice(totalRevenue)} icon={DollarSign} colorClass="text-emerald-400 border-emerald-500/10 bg-emerald-950/5" />
          </div>

          <div className="bg-[#0a0a14] border border-slate-900 rounded-xl p-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-3">
              Sales Performance & Activity
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Dano Store local gaming portal is operating correctly. Since all customer transactions are registered using local manual payment gateways (FastPay, Korek balance, MasterCard), make sure you check your local wallets corresponding to the selected payment method before manually activating keys and products.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
