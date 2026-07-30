import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import AdminProductForm from '../components/AdminProductForm';
import StatCard from '../components/StatCard';
import {
  LogOut,
  Package,
  FileText,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  ListFilter,
  Eye,
  Check,
  Star,
  Settings,
  X,
  TrendingUp,
  Zap,
  Tag,
} from 'lucide-react';

export default function Admin({ navigate }) {
  const { logout } = useAuth();
  const { products, addProduct, editProduct, deleteProduct, updateStock } = useProducts();

  // Load orders from Local Storage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dano_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load orders', e);
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Modal Order View State
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Calculations for StatCards
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (payload) => {
    if (editingProduct) {
      editProduct(editingProduct.id, payload);
      alert('Product updated successfully!');
    } else {
      addProduct(payload);
      alert('Product created successfully!');
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      alert('Product deleted successfully.');
    }
  };

  const handleStockChange = (id, currentVal, change) => {
    const newVal = Math.max(0, parseInt(currentVal || 0) + change);
    updateStock(id, newVal);
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Admin Dashboard Header */}
      <div className="bg-[#0b0c15] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">Operational Dashboard</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage digital inventory, process manual orders, and toggle global placements.</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-950/20 hover:bg-red-950/40 text-red-400 font-bold border border-red-500/10 hover:border-red-500/30 px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shrink-0 uppercase tracking-wider"
        >
          <LogOut className="w-4 h-4" />
          <span>Admin Logout</span>
        </button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard title="Total Products" value={totalProducts} icon={Package} colorClass="text-blue-400" />
        <StatCard title="Total Orders" value={totalOrders} icon={FileText} colorClass="text-purple-400" />
        <StatCard title="Total Sales Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} colorClass="text-emerald-400" />
      </div>

      {/* Toggles and Placements Tabs Row */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'bg-[#0d0d12] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            Manage Product Catalog
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'bg-[#0d0d12] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            View Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !isFormOpen && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-3 px-5 rounded-2xl text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/10 uppercase tracking-wider transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Form Area */}
      {isFormOpen && (
        <div className="animate-fadeIn">
          <AdminProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Product Catalog List Grid */}
      {activeTab === 'products' && !isFormOpen && (
        <div className="bg-[#0d0d12] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#12121a] border-b border-white/5 text-zinc-400 uppercase font-bold tracking-wider">
                  <th className="p-4 py-3">Product Name</th>
                  <th className="p-4 py-3">Platform</th>
                  <th className="p-4 py-3">Type</th>
                  <th className="p-4 py-3">Base Price</th>
                  <th className="p-4 py-3">Stock Level</th>
                  <th className="p-4 py-3 text-center">Placements</th>
                  <th className="p-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((prod) => {
                  const hasPkgs = prod.packages && prod.packages.length > 0;
                  return (
                    <tr key={prod.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 overflow-hidden border border-white/5 shrink-0 flex items-center justify-center">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-zinc-500">{prod.name[0]}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-white font-black">{prod.name}</p>
                          {hasPkgs && (
                            <span className="text-[9px] font-semibold text-cyan-400 uppercase bg-cyan-950/40 px-1 rounded">
                              {prod.packages.length} Custom Pkgs
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-zinc-300 font-semibold uppercase">{prod.platform}</td>
                      <td className="p-4 text-zinc-300 font-semibold uppercase">{prod.type}</td>

                      <td className="p-4 font-black text-[#00e5ff]">{formatPrice(prod.price)}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStockChange(prod.id, prod.stock, -1)}
                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className={`font-bold w-6 text-center ${prod.stock <= 0 ? 'text-red-500' : 'text-white'}`}>
                            {prod.stock}
                          </span>
                          <button
                            onClick={() => handleStockChange(prod.id, prod.stock, 1)}
                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-4">
                        {/* Placement Indicators */}
                        <div className="flex items-center justify-center gap-2.5">
                          <span
                            title="Featured on Home"
                            className={`p-1.5 rounded-lg border transition-all ${
                              prod.isFeatured
                                ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-400'
                                : 'bg-white/[0.01] border-white/5 text-zinc-700'
                            }`}
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </span>
                          <span
                            title="Trending Placement"
                            className={`p-1.5 rounded-lg border transition-all ${
                              prod.isTrending
                                ? 'bg-purple-950/30 border-purple-500/30 text-purple-400'
                                : 'bg-white/[0.01] border-white/5 text-zinc-700'
                            }`}
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                          </span>
                          <span
                            title="Flash Deal"
                            className={`p-1.5 rounded-lg border transition-all ${
                              prod.isFlashDeal
                                ? 'bg-red-950/30 border-red-500/30 text-red-400'
                                : 'bg-white/[0.01] border-white/5 text-zinc-700'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                          </span>
                          <span
                            title="Top Rated"
                            className={`p-1.5 rounded-lg border transition-all ${
                              prod.isTopRated
                                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                                : 'bg-white/[0.01] border-white/5 text-zinc-700'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(prod)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(prod.id, prod.name)}
                            className="p-2 rounded-lg bg-red-950/10 hover:bg-red-950/30 text-red-500 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Orders List View Grid */}
      {activeTab === 'orders' && (
        <div className="bg-[#0d0d12] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          {orders.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <FileText className="w-12 h-12 text-zinc-600 mx-auto" />
              <p className="text-zinc-500 font-bold text-sm">No orders have been submitted yet.</p>
              <p className="text-zinc-600 text-xs">When customers check out, their orders will show up here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto animate-fadeIn">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#12121a] border-b border-white/5 text-zinc-400 uppercase font-bold tracking-wider">
                    <th className="p-4 py-3">Order ID</th>
                    <th className="p-4 py-3">Customer Info</th>
                    <th className="p-4 py-3">City</th>
                    <th className="p-4 py-3">Payment Method</th>
                    <th className="p-4 py-3">Total Cost</th>
                    <th className="p-4 py-3">Created At</th>
                    <th className="p-4 py-3 text-right">Invoice Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 font-black text-cyan-400">{order.orderId}</td>
                      <td className="p-4">
                        <div className="text-left">
                          <p className="font-bold text-white">{order.customer.name}</p>
                          <p className="text-zinc-500 mt-0.5 font-semibold">{order.customer.phone}</p>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-zinc-300">{order.customer.city}</td>
                      <td className="p-4">
                        <span className="bg-amber-950/40 text-amber-400 border border-amber-500/10 px-2 py-0.5 rounded font-black uppercase">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4 font-black text-[#00e5ff]">{formatPrice(order.total)}</td>
                      <td className="p-4 text-zinc-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-white/5 hover:bg-white/10 text-white font-bold py-1.5 px-3 rounded-lg flex items-center gap-1.5 text-[11px] ml-auto transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal View details for individual order */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="relative bg-[#0d0d12] border border-white/10 p-6 rounded-3xl w-full max-w-lg shadow-2xl space-y-5 text-left animate-scaleIn">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Inspect Invoice: {selectedOrder.orderId}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer coordinates */}
            <div className="space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-white/[0.01] p-3 rounded-2xl border border-white/[0.04]">
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[9px] block">Customer</span>
                  <span className="text-white font-bold mt-0.5 block">{selectedOrder.customer.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[9px] block">Phone</span>
                  <span className="text-white font-bold mt-0.5 block">{selectedOrder.customer.phone}</span>
                </div>
                <div className="mt-2.5">
                  <span className="text-zinc-500 uppercase font-bold text-[9px] block">City</span>
                  <span className="text-white font-bold mt-0.5 block">{selectedOrder.customer.city}</span>
                </div>
                <div className="mt-2.5">
                  <span className="text-zinc-500 uppercase font-bold text-[9px] block">Method</span>
                  <span className="text-amber-400 font-black mt-0.5 block uppercase">{selectedOrder.paymentMethod}</span>
                </div>
              </div>

              {selectedOrder.customer.note && (
                <div className="bg-white/[0.01] p-3 rounded-2xl border border-white/[0.04] text-[11px] leading-relaxed">
                  <span className="text-zinc-500 uppercase font-bold text-[9px] block mb-1">Customer Note</span>
                  <span className="text-zinc-300 italic">{selectedOrder.customer.note}</span>
                </div>
              )}
            </div>

            {/* Order Items list */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Item Breakdown</span>
              <div className="divide-y divide-white/5 max-h-48 overflow-y-auto space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs pt-2">
                    <div className="text-left text-zinc-400">
                      <span className="font-bold text-white">{item.name}</span>
                      <span className="text-zinc-500 text-[10px] ml-1.5">
                        {item.packageName ? `(${item.packageName}) ` : ''}x{item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-[#00e5ff]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between text-sm font-black text-white">
              <span>Final Total Invoice:</span>
              <span className="text-base text-[#00e5ff]">{formatPrice(selectedOrder.total)}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
