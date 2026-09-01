import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Wallet
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, toggleStock } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.platform.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      updateProduct(prodData);
    } else {
      addProduct(prodData);
    }
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-900/30 pb-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Dano Store Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Admin Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs border border-rose-500/40 transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>

      {/* Analytics Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Products" value={totalProducts} icon={Package} color="cyan" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="emerald" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-cyan-900/30 pb-2">
        <button
          onClick={() => { setActiveTab('products'); setIsAddingNew(false); setEditingProduct(null); }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'bg-[#080d2b] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>
        <button
          onClick={() => { setActiveTab('orders'); setIsAddingNew(false); setEditingProduct(null); }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'bg-[#080d2b] text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>
      </div>

      {/* Conditional Add/Edit Form Overlay */}
      {(isAddingNew || editingProduct) ? (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => { setEditingProduct(null); setIsAddingNew(false); }}
        />
      ) : activeTab === 'products' ? (
        /* PRODUCTS MANAGEMENT TAB */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-[#080d2b] p-4 rounded-2xl border border-cyan-900/30">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search catalog..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => { setEditingProduct(null); setIsAddingNew(true); }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-[#080d2b] border border-cyan-900/30 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#05091e] text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-cyan-900/30">
                <tr>
                  <th className="p-3.5">Item</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Platform / Type</th>
                  <th className="p-3.5">Base Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Tags / Flags</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#0c143d]/50 transition-colors">
                    <td className="p-3.5 font-bold text-white flex items-center gap-2">
                      <span className="truncate max-w-[180px]">{p.name}</span>
                    </td>
                    <td className="p-3.5 font-mono text-cyan-400">{p.category}</td>
                    <td className="p-3.5">
                      <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700 text-[10px]">
                        {p.platform} ({p.type})
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-white font-mono">{formatPrice(p.price)}</td>
                    <td className="p-3.5">
                      <button
                        onClick={() => toggleStock(p.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-colors flex items-center gap-1 ${
                          p.stock > 0
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {p.stock > 0 ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}</span>
                      </button>
                    </td>
                    <td className="p-3.5 space-x-1">
                      {p.isFeatured && <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded">Featured</span>}
                      {p.isFlashDeal && <span className="text-[9px] bg-amber-950 text-amber-400 px-1.5 py-0.5 rounded">Flash</span>}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 hover:bg-slate-800 border border-slate-700"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-slate-900 text-rose-400 hover:bg-slate-800 border border-slate-700"
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
      ) : (
        /* ORDERS MANAGEMENT TAB */
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-8 text-center bg-[#080d2b] border border-cyan-900/30 rounded-2xl text-slate-400 text-xs">
              No orders received yet. Created customer orders will appear here automatically.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.orderId} className="bg-[#080d2b] border border-cyan-900/30 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-cyan-900/30 pb-3 gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-cyan-400">Order #{ord.orderId}</span>
                      <p className="text-[11px] text-slate-400">{new Date(ord.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Payment Method: <strong className="text-cyan-400 uppercase">{ord.paymentMethod}</strong></span>
                      </span>
                      <span className="text-xs font-extrabold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-500/30">
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 font-medium">Customer:</span>
                      <p className="font-bold text-white">{ord.customer?.name}</p>
                      <p className="text-slate-400">{ord.customer?.phone}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">City:</span>
                      <p className="font-bold text-white">{ord.customer?.city}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Total Amount:</span>
                      <p className="font-extrabold text-cyan-400 text-sm">{formatPrice(ord.totalAmount)}</p>
                    </div>
                  </div>

                  {ord.customer?.orderNote && (
                    <div className="text-xs text-slate-300 bg-[#04081c] p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 font-medium">Note / Player ID:</span> {ord.customer.orderNote}
                    </div>
                  )}

                  <div className="border-t border-slate-800/80 pt-2 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Items Ordered:</span>
                    <div className="flex flex-wrap gap-2">
                      {ord.items?.map((it, idx) => (
                        <span key={idx} className="text-xs bg-[#04081c] border border-cyan-900/30 px-2.5 py-1 rounded-lg text-slate-200">
                          {it.name} ({it.selectedPackage?.name}) x{it.quantity}
                        </span>
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
};
