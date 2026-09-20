import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Package,
  ShoppingBag,
  DollarSign,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Sparkles,
  Flame,
  Star
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export const Admin = ({ products = [], addProduct, updateProduct, deleteProduct, resetToDefault }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
      setIsAdding(false);
    }
  };

  const toggleStockStatus = (prod) => {
    const newStock = prod.stock === 'in_stock' ? 'out_of_stock' : 'in_stock';
    updateProduct(prod.id, { stock: newStock });
  };

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Top Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Dano Store Control Panel</h1>
            <p className="text-xs text-slate-400">Authenticated Admin Session: dano.js</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={products.length}
          subtext="Catalog items"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          subtext="Customer orders"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Processed sales"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-950'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-950'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && !isAdding && !editingProduct && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {(isAdding || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsAdding(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* PRODUCTS TAB CONTENT */}
      {activeTab === 'products' && !isAdding && !editingProduct && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-[#080d1a] p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products in admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1428] border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={resetToDefault}
              className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 underline"
            >
              Reset Default Catalog
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#080d1a] overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0b1226] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-bold">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Badges & Flags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/40">
                    <td className="p-4 flex items-center gap-3 min-w-[200px]">
                      <img
                        src={prod.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div>
                        <div className="font-bold text-slate-100">{prod.name}</div>
                        <div className="text-[10px] text-slate-500">{prod.packages?.length || 1} package options</div>
                      </div>
                    </td>
                    <td className="p-4 uppercase text-[10px] font-bold text-cyan-400">{prod.category}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-purple-400">{prod.platform}</td>
                    <td className="p-4 font-black text-cyan-300">{formatPrice(prod.price)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStockStatus(prod)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          prod.stock === 'in_stock'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : 'bg-red-950 text-red-400 border border-red-800/40'
                        }`}
                      >
                        {prod.stock === 'in_stock' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {prod.stock === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {prod.isFeatured && <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">Featured</span>}
                        {prod.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Trending</span>}
                        {prod.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Deal</span>}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5 text-cyan-400" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-800/40"
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

      {/* ORDERS TAB CONTENT */}
      {activeTab === 'orders' && (
        <div className="rounded-2xl border border-slate-800 bg-[#080d1a] overflow-x-auto p-4 space-y-4">
          <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3">
            Customer Orders Log ({orders.length})
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No customer orders recorded yet in localStorage.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.orderId} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2 gap-1">
                    <div>
                      <span className="font-mono font-bold text-cyan-400">Order ID: {ord.orderId}</span>
                      <span className="text-slate-500 text-[11px] ml-3">{new Date(ord.createdAt).toLocaleString()}</span>
                    </div>
                    <span className="font-black text-cyan-300 text-sm">{formatPrice(ord.totalPrice)}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 pt-1">
                    <div><strong>Customer:</strong> {ord.customer?.name} ({ord.customer?.phone})</div>
                    <div><strong>City:</strong> {ord.customer?.city}</div>
                    <div><strong>Payment Selected:</strong> <span className="text-purple-400 font-bold">{ord.customer?.paymentMethodName}</span></div>
                  </div>

                  {ord.items && ord.items.length > 0 && (
                    <div className="pt-2 text-[11px] text-slate-400">
                      <strong>Ordered Items:</strong> {ord.items.map((i) => `${i.name} (${i.selectedPackageName} × ${i.quantity})`).join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Admin;
