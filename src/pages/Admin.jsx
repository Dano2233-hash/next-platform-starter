import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Star,
  Flame,
  TrendingUp,
  Sparkles,
  Eye,
  Search,
  Layers
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    totalProducts,
    totalOrders,
    totalRevenue
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // products, orders
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
      setShowAddModal(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080d1a] border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Dano Store Management</h1>
            <p className="text-xs text-slate-400">Manage catalog, pricing, inventory & customer orders</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 font-bold text-xs hover:bg-red-900 transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Admin Logout</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="from-blue-600 to-cyan-600"
          subtext="Active items in store"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="from-purple-600 to-pink-600"
          subtext="Manual orders placed"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="from-emerald-600 to-teal-600"
          subtext="Accumulated sales"
        />
      </div>

      {/* Tabs Navigation: Products vs Orders */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* ADD / EDIT PRODUCT FORM MODAL */}
      {(showAddModal || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TAB 1: PRODUCTS TABLE & SECTION FLAGS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#080d1a] p-3 rounded-2xl border border-slate-800">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products in admin list..."
                className="w-full bg-[#0d1427] border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0c1224] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Product</th>
                  <th className="p-4">Platform / Type</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Sections</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 font-bold text-white max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            p.name.slice(0, 4)
                          )}
                        </div>
                        <div>
                          <p className="truncate font-extrabold">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.category.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold border border-slate-700 mr-1">
                        {p.platform}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 font-semibold border border-blue-700/50">
                        {p.type}
                      </span>
                    </td>

                    <td className="p-4 font-extrabold text-cyan-400">
                      {formatPrice(p.price)}
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 bg-[#0d1427] border border-slate-800 rounded px-2 py-1 text-xs font-bold text-slate-100 focus:border-cyan-500"
                      />
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">Featured</span>
                        )}
                        {p.isTrending && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">Trending</span>
                        )}
                        {p.isFlashDeal && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Flash</span>
                        )}
                        {p.isTopRated && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Top</span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900/60"
                        title="Delete product"
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

      {/* TAB 2: ORDERS TABLE & PAYMENT METHOD VIEWER */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#080d1a] rounded-2xl border border-slate-800">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No Customer Orders Yet</h3>
              <p className="text-xs text-slate-400 mt-1">Orders placed by customers will appear here.</p>
            </div>
          ) : (
            <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0c1224] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Items Count</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4 text-right">View Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4 font-bold">
                        <span className="text-cyan-400 block">{order.id}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </td>

                      <td className="p-4">
                        <p className="font-extrabold text-white">{order.customerName}</p>
                        <p className="text-[11px] text-slate-400">{order.phoneNumber} • {order.city}</p>
                      </td>

                      <td className="p-4 font-bold">
                        <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 uppercase">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-slate-300">
                        {order.items?.length || 0} Item(s)
                      </td>

                      <td className="p-4 font-black text-emerald-400">
                        {formatPrice(order.totalAmount)}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 font-bold flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Selected Order Modal View */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white">Order #{selectedOrder.id}</h3>
                    <p className="text-xs text-slate-400">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-[#0b1222] p-3 rounded-xl space-y-1">
                    <p><strong className="text-slate-400">Customer:</strong> {selectedOrder.customerName}</p>
                    <p><strong className="text-slate-400">Phone:</strong> {selectedOrder.phoneNumber}</p>
                    <p><strong className="text-slate-400">City:</strong> {selectedOrder.city}</p>
                    <p><strong className="text-slate-400">Selected Payment Method:</strong> <span className="text-cyan-400 font-extrabold uppercase">{selectedOrder.paymentMethod}</span></p>
                    {selectedOrder.orderNote && (
                      <p><strong className="text-slate-400">Note / Player ID:</strong> {selectedOrder.orderNote}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <strong className="text-slate-300 uppercase text-[11px]">Items Ordered:</strong>
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-800/40 pb-1">
                        <span>{item.productName} {item.packageName ? `(${item.packageName})` : ''} x {item.quantity}</span>
                        <span className="font-bold text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                    <span>Total Amount:</span>
                    <span className="text-cyan-400">{formatPrice(selectedOrder.totalAmount)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
