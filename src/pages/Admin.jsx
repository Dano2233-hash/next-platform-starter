import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Layers,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      updateProduct(prodData);
      setEditingProduct(null);
    } else {
      addProduct(prodData);
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Welcome, dano.js &bull; Manage inventory and customer orders</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-800 text-red-300 hover:bg-red-900 text-xs font-bold flex items-center gap-1.5 shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={totalProducts} icon={Package} color="cyan" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="emerald" />
      </div>

      {/* Tabs bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {(showAddModal || editingProduct) && (
        <AdminProductForm
          initialProduct={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TAB 1: PRODUCTS TABLE */}
      {activeTab === 'products' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Badges</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                          <ProductImage
                            src={prod.image}
                            alt={prod.name}
                            category={prod.category}
                            platform={prod.platform}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-bold text-white max-w-xs line-clamp-1">{prod.name}</div>
                      </div>
                    </td>
                    <td className="p-4 capitalize">{prod.category}</td>
                    <td className="p-4 font-semibold text-cyan-400">{prod.platform}</td>
                    <td className="p-4 font-extrabold text-white">{formatPrice(prod.price)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={prod.stock}
                        onChange={(e) => updateStock(prod.id, parseInt(e.target.value, 10) || 0)}
                        className="w-16 bg-slate-950 border border-slate-800 rounded p-1 text-center font-bold text-white"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.isFeatured && <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px]">Featured</span>}
                        {prod.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 text-[10px]">Trending</span>}
                        {prod.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 text-[10px]">Flash</span>}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-slate-700"
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

      {/* TAB 2: ORDERS TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-700" />
              <p className="text-sm font-bold">No orders recorded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {orders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400">{ord.orderId}</td>
                      <td className="p-4">
                        <div className="font-bold text-white">{ord.customer?.name}</div>
                        <div className="text-[11px] text-slate-400">{ord.customer?.phone}</div>
                      </td>
                      <td className="p-4">{ord.customer?.city}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold uppercase text-[10px]">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4 font-black text-cyan-400">{formatPrice(ord.totalPrice)}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px]">
                          {ord.status || 'Completed'}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
