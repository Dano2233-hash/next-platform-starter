import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Eye,
  CheckCircle,
  X,
  Sparkles,
  Flame,
  Zap,
  Star
} from 'lucide-react';

export function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleCreateProduct = (productData) => {
    addProduct(productData);
    setIsAddingNew(false);
  };

  const handleUpdateProduct = (productData) => {
    updateProduct(editingProduct.id, productData);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Protected Management Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Dano Store Admin Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-red-950/60 text-red-300 hover:text-white border border-red-800/80 hover:bg-red-900/80 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" /> Admin Logout
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          description="Catalog Items Managed"
          icon={Package}
          color="from-blue-600 to-cyan-600"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          description="Customer Purchases"
          icon={ShoppingBag}
          color="from-purple-600 to-indigo-600"
        />
        <StatCard
          title="Total Store Revenue"
          value={formatPrice(totalRevenue)}
          description="Completed Order Sum"
          icon={DollarSign}
          color="from-emerald-600 to-teal-600"
        />
      </div>

      {/* Tabs bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('products');
              setIsAddingNew(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-[#0a0f20] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4" /> Manage Products ({products.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('orders');
              setIsAddingNew(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-[#0a0f20] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && !isAddingNew && !editingProduct && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Product Form Modal / View */}
      {(isAddingNew || editingProduct) && (
        <div className="my-6">
          <AdminProductForm
            initialData={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={() => {
              setIsAddingNew(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Products Table */}
      {activeTab === 'products' && !isAddingNew && !editingProduct && (
        <div className="bg-[#0a0f20] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#050814] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Section Tags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <span>{prod.name}</span>
                    </td>
                    <td className="p-4 capitalize text-cyan-400">{prod.category}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 border border-slate-700">
                        {prod.platform}
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-slate-100">{formatPrice(prod.price)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={prod.stock}
                        onChange={(e) => updateProduct(prod.id, { stock: Number(e.target.value) })}
                        className="w-16 bg-[#050814] text-slate-100 font-bold text-xs rounded-lg px-2 py-1 border border-slate-700"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {prod.isFeatured && <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">Featured</span>}
                        {prod.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Trending</span>}
                        {prod.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Flash</span>}
                        {prod.isTopRated && <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Top Rated</span>}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(prod)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 hover:text-white transition-colors"
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

      {/* Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-[#0a0f20] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-300">No orders placed yet</h4>
              <p className="text-xs text-slate-500 mt-1">Orders created by customers will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#050814] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200">
                  {orders.map((order) => {
                    const payInfo = PAYMENT_METHODS.find((p) => p.id === order.paymentMethod);
                    return (
                      <tr key={order.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-4 font-extrabold text-cyan-400">{order.id}</td>
                        <td className="p-4 font-bold text-white">{order.customerName}</td>
                        <td className="p-4">{order.phone}</td>
                        <td className="p-4">{order.city}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${payInfo ? payInfo.accentColor : 'text-slate-300'} bg-slate-900 border border-slate-800`}>
                            {payInfo ? payInfo.name : order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-4 font-extrabold text-white">{formatPrice(order.totalAmount)}</td>
                        <td className="p-4 text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-400 hover:bg-cyan-900 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Selected Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0a0f20] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span>Order Details ({selectedOrderDetails.id})</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-bold text-white">{selectedOrderDetails.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone Number:</span>
                <span className="font-bold text-white">{selectedOrderDetails.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">City:</span>
                <span className="font-bold text-white">{selectedOrderDetails.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Method:</span>
                <span className="font-extrabold text-amber-400 uppercase">{selectedOrderDetails.paymentMethod}</span>
              </div>
              {selectedOrderDetails.orderNote && (
                <div className="pt-2">
                  <span className="text-slate-400 block">Player ID / Note:</span>
                  <span className="text-cyan-300 font-mono mt-0.5 block bg-slate-950 p-2 rounded-lg border border-slate-800">
                    {selectedOrderDetails.orderNote}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Items</span>
              {selectedOrderDetails.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div>
                    <span className="font-bold text-slate-100">{item.name}</span>
                    <span className="text-cyan-400 text-[11px] block">{item.packageName} × {item.quantity}</span>
                  </div>
                  <span className="font-bold text-white">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-300">Total Paid/Amount</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
