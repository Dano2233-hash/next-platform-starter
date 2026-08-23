import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  Layers
} from 'lucide-react';

export function Admin({
  products,
  orders,
  totalProducts,
  totalOrders,
  totalRevenue,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onLogout
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login');
  };

  const handleFormSubmit = (data) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, data);
    } else {
      onAddProduct(data);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-black text-white">Dano Store Admin Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as <span className="text-cyan-400 font-bold">dano.js</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Admin Logout</span>
        </button>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Catalog size"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtitle="Customer transactions"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Earnings count"
        />
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActiveTab('products'); setShowForm(false); }}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'products'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Products Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setShowForm(false); }}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'orders'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>
          </div>

          {activeTab === 'products' && !showForm && (
            <button
              onClick={() => { setEditingProduct(null); setShowForm(true); }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {/* Product Add / Edit Form Modal/Drawer Container */}
        {showForm && (
          <div className="mb-6">
            <AdminProductForm
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => { setShowForm(false); setEditingProduct(null); }}
            />
          </div>
        )}

        {/* TAB 1: PRODUCTS TABLE */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search catalog products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 text-xs text-slate-100 placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-950 overflow-hidden border border-slate-800 flex-shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-black text-cyan-400">DS</div>
                          )}
                        </div>
                        <div>
                          <p>{p.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{p.id}</p>
                        </div>
                      </td>

                      <td className="p-4 capitalize">{p.category}</td>
                      <td className="p-4 uppercase font-semibold text-cyan-400">{p.platform}</td>
                      <td className="p-4 font-extrabold text-white">{formatPrice(p.price)}</td>

                      <td className="p-4">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => onUpdateStock(p.id, e.target.value)}
                          className="w-16 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-center font-bold text-white"
                        />
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {p.isFeatured && <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Featured</span>}
                          {p.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Trending</span>}
                          {p.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Flash</span>}
                          {p.isTopRated && <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Top</span>}
                        </div>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => { setEditingProduct(p); setShowForm(true); }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-400 transition-colors"
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

        {/* TAB 2: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto">
            {orders.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-300">No Orders Created Yet</h3>
                <p className="text-xs text-slate-500">When customers submit checkout orders, they will appear here.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Ordered Items</th>
                    <th className="p-4">Total Price</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-cyan-400">{o.id}</td>

                      <td className="p-4">
                        <p className="font-bold text-white">{o.customer?.name}</p>
                        <p className="text-slate-400 text-[11px]">{o.customer?.phone} ({o.customer?.city})</p>
                        {o.customer?.note && (
                          <p className="text-amber-400 text-[10px]">Note: {o.customer.note}</p>
                        )}
                      </td>

                      <td className="p-4 font-bold text-emerald-400">
                        {o.paymentMethod}
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          {o.items?.map((item, idx) => (
                            <p key={idx} className="text-[11px]">
                              • <span className="font-semibold text-white">{item.productName}</span> ({item.selectedPackage?.name} x {item.quantity})
                            </p>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 font-extrabold text-white text-sm">
                        {formatPrice(o.total)}
                      </td>

                      <td className="p-4 text-slate-400 text-[11px]">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
