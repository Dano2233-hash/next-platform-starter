import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../components/PaymentMethodCard';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Star,
  Zap,
  TrendingUp,
  Flame,
  Search,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const Admin = ({
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onToggleFlag,
  onResetProducts
}) => {
  const { logout } = useAuth();
  const { orders } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleFormSubmit = (data) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, data);
    } else {
      onAddProduct(data);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0f1d] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">Manage Dano Store products, stock, flags and customer orders</p>
        </div>

        <div className="flex items-center gap-3">
          {onResetProducts && (
            <button
              onClick={() => {
                if (window.confirm("Reset all products back to default initial dataset?")) {
                  onResetProducts();
                }
              }}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold rounded-xl border border-slate-800 transition flex items-center gap-1.5 cursor-pointer"
              title="Reset products to initial defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/80 hover:bg-red-900/80 text-red-400 font-bold text-xs rounded-xl border border-red-500/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Products" value={totalProducts} icon={Package} color="cyan" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="emerald" />
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-950/50'
              : 'bg-[#0a0f1d] text-slate-400 hover:bg-slate-800'
          }`}
        >
          Manage Products ({totalProducts})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-950/50'
              : 'bg-[#0a0f1d] text-slate-400 hover:bg-slate-800'
          }`}
        >
          Customer Orders ({totalOrders})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products in admin..."
                className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100 outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl shadow flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#060a14] text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Flags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => {
                  const minPrice = Array.isArray(p.packages) && p.packages.length > 0
                    ? Math.min(...p.packages.map((pkg) => pkg.price))
                    : p.price;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 font-bold text-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-900 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-cyan-400 font-bold">{p.platform?.slice(0, 3)}</span>
                          )}
                        </div>
                        <span className="line-clamp-1">{p.name}</span>
                      </td>
                      <td className="p-4 text-slate-400">{p.category}</td>
                      <td className="p-4 text-cyan-400 font-medium">{p.platform}</td>
                      <td className="p-4 font-black text-slate-100">{formatPrice(minPrice)}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => onUpdateStock(p.id, e.target.value)}
                          className="w-16 bg-[#060a14] border border-slate-800 text-center py-1 rounded text-xs text-cyan-400 font-bold outline-none"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          {/* Featured */}
                          <button
                            onClick={() => onToggleFlag(p.id, 'isFeatured')}
                            className={`p-1 rounded ${
                              p.isFeatured ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-600'
                            }`}
                            title="Toggle Featured"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                          {/* Trending */}
                          <button
                            onClick={() => onToggleFlag(p.id, 'isTrending')}
                            className={`p-1 rounded ${
                              p.isTrending ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-600'
                            }`}
                            title="Toggle Trending"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                          </button>
                          {/* Flash Deal */}
                          <button
                            onClick={() => onToggleFlag(p.id, 'isFlashDeal')}
                            className={`p-1 rounded ${
                              p.isFlashDeal ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'text-slate-600'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                          </button>
                          {/* Top Rated */}
                          <button
                            onClick={() => onToggleFlag(p.id, 'isTopRated')}
                            className={`p-1 rounded ${
                              p.isTopRated ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-600'
                            }`}
                            title="Toggle Top Rated"
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsFormOpen(true);
                            }}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${p.name}?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 bg-red-950/60 hover:bg-red-900/60 text-red-400 rounded-lg cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#0a0f1d] border border-slate-800 rounded-2xl">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-300">No orders placed yet</h3>
              <p className="text-xs text-slate-500">Orders created by customers will appear here in real-time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => {
                const payObj = PAYMENT_METHODS.find((p) => p.id === o.customer?.paymentMethod) || PAYMENT_METHODS[0];

                return (
                  <div key={o.orderId} className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-cyan-400 text-base">Order #{o.orderId}</span>
                        <span className="text-[10px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded">
                          {o.status || 'Pending Payment'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{new Date(o.createdAt).toLocaleString()}</span>
                    </div>

                    {/* Customer & Payment details */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 block font-semibold">Customer:</span>
                        <span className="font-bold text-slate-200">{o.customer?.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-semibold">Phone:</span>
                        <span className="font-bold text-slate-200">{o.customer?.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-semibold">City:</span>
                        <span className="font-bold text-slate-200">{o.customer?.city}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-semibold">Selected Payment Method:</span>
                        <span className="font-extrabold text-cyan-400">{payObj.name} ({payObj.number})</span>
                      </div>
                    </div>

                    {/* Note if present */}
                    {o.customer?.note && (
                      <div className="bg-[#060a14] p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                        <strong className="text-cyan-400">Note / Player ID:</strong> {o.customer.note}
                      </div>
                    )}

                    {/* Items List */}
                    <div className="border-t border-slate-800/80 pt-3 space-y-2">
                      <span className="text-xs font-bold text-slate-400">Order Items:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {o.items?.map((item, idx) => (
                          <div key={idx} className="bg-[#060a14] p-2 rounded-lg border border-slate-800 flex justify-between text-xs">
                            <span className="text-slate-200 font-semibold">{item.name} x{item.quantity}</span>
                            <span className="text-cyan-400 font-bold">{formatPrice(item.unitPrice * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-sm font-black">
                      <span className="text-slate-300">Total Order Amount:</span>
                      <span className="text-cyan-400 text-base">{formatPrice(o.totalAmount)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Product Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;
