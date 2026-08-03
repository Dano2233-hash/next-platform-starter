import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Database, ClipboardList, PlusCircle, Pencil, Trash, LogOut, TrendingUp, Package, Layers } from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin({ products, onAddProduct, onEditProduct, onDeleteProduct, onLogout }) {
  const navigate = useNavigate();

  // Active tab selection
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Load orders history
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(stored);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login');
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((total, order) => total + (order.total || 0), 0);

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      onEditProduct(formData);
      setEditingProduct(null);
    } else {
      onAddProduct(formData);
      setIsAdding(false);
    }
  };

  const getPaymentLabel = (method) => {
    switch (method?.toLowerCase()) {
      case 'fastpay':
        return 'FastPay';
      case 'korek':
        return 'Korek';
      case 'mastercard':
        return 'MasterCard';
      default:
        return 'Manual';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top action header block */}
      <div className="bg-[#090911] border border-[#121225] p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            🛡️ Admin Dashboard Hub
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Welcome back. Manage products, update digital stocks, and verify manual Kurdistan user payments.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-red-950/20 hover:bg-red-900/30 border border-red-500/30 text-red-400 text-xs font-bold py-2 px-4 rounded-xl transition-premium uppercase"
        >
          <LogOut className="w-4 h-4" />
          Logout Admin
        </button>
      </div>

      {/* Stats row grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Store Products" value={totalProducts} icon={<Package className="w-5 h-5" />} color="cyan" />
        <StatCard title="Total Client Orders" value={totalOrders} icon={<ClipboardList className="w-5 h-5" />} color="purple" />
        <StatCard title="Estimated Revenue" value={formatPrice(totalRevenue)} icon={<TrendingUp className="w-5 h-5" />} color="amber" />
      </div>

      {/* Tabs list navigation */}
      <div className="border-b border-[#121225] flex gap-4 select-none">
        <button
          onClick={() => { setActiveTab('products'); setIsAdding(false); setEditingProduct(null); }}
          className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-premium flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'products' ? 'border-[#00e5ff] text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          Manage Products ({totalProducts})
        </button>
        <button
          onClick={() => { setActiveTab('orders'); setIsAdding(false); setEditingProduct(null); }}
          className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-premium flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'orders' ? 'border-[#00e5ff] text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          View Orders ({totalOrders})
        </button>
      </div>

      {/* Main tab content */}
      <div className="space-y-6">
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Catalog Database Manager
              </h2>
              {!isAdding && !editingProduct && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-[#0066ff] to-[#7000ff] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-premium uppercase"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add New Product
                </button>
              )}
            </div>

            {/* Product Add/Edit Form */}
            {(isAdding || editingProduct) && (
              <AdminProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => { setIsAdding(false); setEditingProduct(null); }}
              />
            )}

            {/* List Table of products */}
            {!isAdding && !editingProduct && (
              <div className="bg-[#090911] border border-[#121225] rounded-xl overflow-hidden text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/60 text-gray-400 font-extrabold uppercase tracking-wider border-b border-[#121225] text-[10px]">
                        <th className="p-4">Name & Platform</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Price (IQD)</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">SoldCount</th>
                        <th className="p-4">Placements</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#121225]/50 text-gray-300">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-white/1">
                          <td className="p-4">
                            <div className="font-bold text-white line-clamp-1">{p.name}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">{p.platform}</div>
                          </td>
                          <td className="p-4 uppercase text-[10px] text-purple-400 font-bold">{p.type}</td>
                          <td className="p-4 font-bold text-[#00e5ff]">{formatPrice(p.price)}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.stock > 0 ? 'bg-green-950/40 text-green-400 border border-green-500/20' : 'bg-red-950/40 text-red-400 border border-red-500/20'
                            }`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-white">{p.soldCount}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {p.isFeatured && <span className="bg-blue-950/60 border border-blue-900/60 text-blue-400 px-1 py-0.5 rounded text-[8px] uppercase font-bold">Featured</span>}
                              {p.isTrending && <span className="bg-purple-950/60 border border-purple-900/60 text-purple-400 px-1 py-0.5 rounded text-[8px] uppercase font-bold">Trending</span>}
                              {p.isFlashDeal && <span className="bg-red-950/60 border border-red-900/60 text-red-400 px-1 py-0.5 rounded text-[8px] uppercase font-bold">Flash</span>}
                              {p.isTopRated && <span className="bg-amber-950/60 border border-amber-900/60 text-amber-400 px-1 py-0.5 rounded text-[8px] uppercase font-bold">Top</span>}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-gray-300 hover:text-white transition-premium"
                                title="Edit Product"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => { if (confirm(`Are you sure you want to delete ${p.name}?`)) onDeleteProduct(p.id); }}
                                className="p-1.5 bg-red-950/40 hover:bg-red-900/30 border border-red-500/20 rounded text-red-400 hover:text-red-300 transition-premium"
                                title="Delete Product"
                              >
                                <Trash className="w-3.5 h-3.5" />
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
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Customer Orders History Database
            </h2>

            {orders.length === 0 ? (
              <div className="bg-[#090911] border border-[#121225] p-12 rounded-xl text-center space-y-2">
                <span className="text-3xl block">📋</span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">No Orders Found</h3>
                <p className="text-[10px] text-gray-500 leading-normal max-w-xs mx-auto">
                  New client orders will automatically stream and populate inside this list once customers finalize manual checkout.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice().reverse().map((o) => (
                  <div key={o.orderNumber} className="bg-[#090911] border border-[#121225] p-5 rounded-xl space-y-4 text-xs">

                    {/* Upper order header */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#121225]/60 pb-3">
                      <div>
                        <span className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest block">Reference</span>
                        <span className="text-xs font-black text-[#00e5ff] tracking-widest uppercase">{o.orderNumber}</span>
                      </div>

                      <div className="flex gap-2">
                        <span className="bg-[#120033] border border-[#7000ff]/30 text-purple-400 font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider">
                          📱 {getPaymentLabel(o.customer?.paymentMethod)}
                        </span>
                        <span className="bg-yellow-950/40 border border-yellow-500/20 text-yellow-500 font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider">
                          ⌛ {o.status || 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Customer info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-black/30 p-3 rounded-lg border border-[#121225]/40 text-[11px]">
                      <div>
                        <span className="text-[9px] text-gray-500 font-bold block uppercase">Client Name</span>
                        <span className="text-white font-extrabold">{o.customer?.name}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block uppercase">Phone</span>
                        <span className="text-white font-bold">{o.customer?.phone}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block uppercase">City Location</span>
                        <span className="text-white font-semibold">{o.customer?.city}</span>
                      </div>
                    </div>

                    {/* Note if any */}
                    {o.customer?.note && (
                      <div className="bg-black/20 p-2.5 rounded border-l-2 border-purple-500 text-gray-400 text-[10px] leading-relaxed">
                        <strong>Client Note:</strong> {o.customer.note}
                      </div>
                    )}

                    {/* Ordered items list summary */}
                    <div className="space-y-2">
                      <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-wider block">Cart items ({o.items?.reduce((t, i) => t + i.quantity, 0)})</span>
                      <div className="bg-black/20 p-3 rounded border border-[#121225]/40 space-y-1.5">
                        {o.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-gray-300 text-[11px]">
                            <span>{item.product?.name} ({item.selectedPackage}) x{item.quantity}</span>
                            <span className="text-white font-bold">{formatPrice(item.product?.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total summary bottom */}
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-gray-500 font-bold">Submitted Date: {new Date(o.date).toLocaleDateString()}</span>
                      <div className="text-right">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold block">Total Price Due</span>
                        <span className="text-sm font-black text-[#00e5ff]">{formatPrice(o.total)}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
