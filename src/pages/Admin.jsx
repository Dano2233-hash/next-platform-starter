import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Admin = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateStock,
  onResetProducts,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load orders:', e);
    }
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('dano_admin_auth');
    }
    navigate('/admin-login', { replace: true });
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      onEditProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      onAddProduct(productData);
      setShowAddForm(false);
    }
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Admin Access Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Dano Store Control Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage product listings, inventory, and incoming customer orders.</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/80 text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Catalog Count"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtitle="Completed / Pending"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Cumulative IQD Sales"
        />
      </div>

      {/* Tab Controls */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('products');
            setEditingProduct(null);
            setShowAddForm(false);
          }}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Product Management ({products.length})
        </button>

        <button
          onClick={() => {
            setActiveTab('orders');
            setEditingProduct(null);
            setShowAddForm(false);
          }}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Order History ({orders.length})
        </button>
      </div>

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add or Edit Form Drawer/Box */}
          {(showAddForm || editingProduct) && (
            <AdminProductForm
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowAddForm(false);
                setEditingProduct(null);
              }}
            />
          )}

          {/* Action Bar & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090d18] border border-slate-800 p-4 rounded-2xl">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!showAddForm && !editingProduct && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:text-black flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              )}

              <button
                onClick={onResetProducts}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                title="Reset to default dataset"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Default Catalog
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
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
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-bold text-white max-w-xs truncate">{p.name}</td>
                    <td className="p-4 capitalize">{p.category}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400">
                        {p.platform}
                      </span>
                    </td>
                    <td className="p-4 font-extrabold text-cyan-300">{formatPrice(p.price)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => onUpdateStock(p.id, e.target.value)}
                        className="w-20 bg-slate-950 border border-slate-800 text-white rounded px-2 py-1 text-xs font-bold text-center"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 text-[9px] font-extrabold uppercase">
                        {p.isFeatured && <span className="px-1.5 py-0.5 bg-cyan-950 text-cyan-300 rounded">Featured</span>}
                        {p.isTrending && <span className="px-1.5 py-0.5 bg-blue-950 text-blue-300 rounded">Trending</span>}
                        {p.isFlashDeal && <span className="px-1.5 py-0.5 bg-purple-950 text-purple-300 rounded">Flash</span>}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setShowAddForm(false);
                        }}
                        className="p-1.5 rounded bg-slate-800 text-cyan-400 hover:text-white"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 rounded bg-slate-800 text-red-400 hover:text-red-300"
                        title="Delete Product"
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

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-2">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Orders Found</h3>
              <p className="text-xs">When customers create manual checkout orders, they will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o, idx) => (
                <div key={o.orderId || idx} className="p-5 rounded-2xl bg-[#090d18] border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                    <div>
                      <span className="font-mono text-cyan-400 font-extrabold text-sm">{o.orderId}</span>
                      <span className="text-xs text-slate-400 ml-3">{new Date(o.createdAt).toLocaleString()}</span>
                    </div>

                    <span className="text-xs font-black text-cyan-300 bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-full">
                      {formatPrice(o.total)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                    <div>
                      <strong className="text-slate-400 block">Customer:</strong>
                      <span>{o.customerName} ({o.phoneNumber})</span>
                    </div>
                    <div>
                      <strong className="text-slate-400 block">City:</strong>
                      <span>{o.city}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400 block">Payment Method:</strong>
                      <span className="font-bold text-cyan-400 uppercase">{o.paymentMethod}</span>
                    </div>
                  </div>

                  {o.orderNote && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <strong>Note / Player ID:</strong> {o.orderNote}
                    </div>
                  )}

                  {/* Items */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Items</span>
                    <div className="space-y-1">
                      {o.items &&
                        o.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="text-xs text-slate-300 flex justify-between">
                            <span>{item.productName} ({item.packageName}) x{item.quantity}</span>
                            <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
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
    </div>
  );
};
