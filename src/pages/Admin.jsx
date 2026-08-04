import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit3, ShoppingBag, Gamepad2, Coins } from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin({ products, onAddProduct, onEditProduct, onDeleteProduct }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load orders list from Local Storage
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dano_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Calculate statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const handleLogout = () => {
    localStorage.removeItem('dano_admin_auth');
    navigate('/admin-login');
  };

  const handleProductSubmit = (productData) => {
    if (editingProduct) {
      onEditProduct(productData);
      setEditingProduct(null);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (prodId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(prodId);
    }
  };

  const handleStockChange = (prodId, currentStock) => {
    const newVal = prompt('Enter new stock level:', currentStock);
    if (newVal !== null) {
      const stockNum = parseInt(newVal, 10);
      if (!isNaN(stockNum)) {
        const product = products.find((p) => p.id === prodId);
        if (product) {
          onEditProduct({ ...product, stock: stockNum });
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c0d12] p-6 rounded-2xl border border-[#1a1e29] shadow-xl">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Admin Dashboard</h1>
          <p className="text-xs text-gray-400 mt-1">Manage catalog products, live stock status, and view customer order logs</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg text-xs font-bold bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 transition-all cursor-pointer select-none"
        >
          <LogOut size={14} />
          LOGOUT
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Products" value={totalProducts} icon={Gamepad2} color="blue" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={Coins} color="emerald" />
      </div>

      {/* Main admin panels navigation */}
      <div className="flex border-b border-[#1a1e29]">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
            activeTab === 'products' ? 'border-[#00e5ff] text-[#00e5ff]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Products Manager
        </button>
        <button
          onClick={() => {
            setActiveTab('orders');
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
            activeTab === 'orders' ? 'border-[#00e5ff] text-[#00e5ff]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Customer Orders Log ({orders.length})
        </button>
      </div>

      {/* PRODUCTS MANAGER PANEL */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {!isFormOpen && !editingProduct ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-black uppercase tracking-wider text-gray-300">Catalog Registry</h2>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0066ff] hover:bg-[#0052cc] rounded-lg text-xs font-black text-white transition-colors cursor-pointer select-none"
                >
                  <Plus size={14} />
                  ADD PRODUCT
                </button>
              </div>

              {/* Products Table container */}
              <div className="overflow-x-auto bg-[#0c0d12] border border-[#1a1e29] rounded-xl shadow-md">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1a1e29] text-[10px] text-gray-400 uppercase tracking-widest font-black bg-[#050505]/50">
                      <th className="p-4">Game / Code Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Platform / Type</th>
                      <th className="p-4">Min Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Promo Flags</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1e29]/70 text-xs text-gray-300">
                    {products.map((p) => {
                      const minPrice = p.packages && p.packages.length > 0 ? Math.min(...p.packages.map((pk) => pk.price)) : p.price;
                      return (
                        <tr key={p.id} className="hover:bg-[#151824]/30 transition-all">
                          <td className="p-4 font-bold text-white">{p.name}</td>
                          <td className="p-4 capitalize">{p.category}</td>
                          <td className="p-4">
                            <span className="bg-[#151824] px-1.5 py-0.5 rounded border border-[#1a1e29] font-semibold text-[10px] uppercase text-gray-400">
                              {p.platform}
                            </span>
                            <span className="ml-1.5 font-bold text-[#00e5ff] text-[10px]">{p.type}</span>
                          </td>
                          <td className="p-4 font-black text-[#00e5ff]">{formatPrice(minPrice)}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleStockChange(p.id, p.stock)}
                              className="px-2 py-1 bg-[#151824] hover:bg-[#1e2336] rounded border border-[#1a1e29] font-black text-white hover:text-[#00e5ff]"
                              title="Click to edit stock level"
                            >
                              {p.stock} units
                            </button>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 text-[9px] font-bold">
                              {p.isFeatured && <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">Featured</span>}
                              {p.isTrending && <span className="bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded">Trending</span>}
                              {p.isFlashDeal && <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">Flash</span>}
                              {p.isTopRated && <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">Rated</span>}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-1.5 bg-[#151824] hover:bg-[#1f2436] rounded border border-[#1a1e29] text-gray-300 hover:text-[#00e5ff] transition-colors cursor-pointer"
                                title="Edit Product Details"
                              >
                                <Edit3 size={13} />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="p-1.5 bg-red-500/10 hover:bg-red-500 rounded border border-red-500/20 text-red-500 hover:text-white transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 size={13} />
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
          ) : (
            // Add or Edit Product Form
            <AdminProductForm
              initialData={editingProduct}
              onSubmit={handleProductSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingProduct(null);
              }}
            />
          )}
        </div>
      )}

      {/* CUSTOMER ORDERS PANEL */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-300">Transaction log</h2>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#0c0d12] rounded-xl border border-[#1a1e29]">
              <p className="text-xs text-gray-400">No customer orders have been logged yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.orderNo} className="bg-[#0c0d12] border border-[#1a1e29] rounded-xl p-5 shadow-sm space-y-4">
                  {/* Top order row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1a1e29]/60 pb-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-black text-[#00e5ff] bg-[#00e5ff]/5 border border-[#00e5ff]/20 px-2.5 py-1 rounded-lg">
                        {o.orderNo}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">
                        {new Date(o.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-400">by</span>
                      <span className="text-xs font-bold text-white uppercase">{o.customerName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Payment:</span>
                      <span className="text-xs font-black text-white bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        {o.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Items list & Client Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    <div className="md:col-span-8 space-y-2">
                      <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Purchased Packages</h4>
                      <div className="space-y-1.5">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-gray-300">
                            <span>
                              {it.productName} <span className="text-gray-500">({it.packageName}) x{it.quantity}</span>
                            </span>
                            <span className="font-bold text-white">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-4 bg-[#050505] p-3 rounded-lg border border-[#1a1e29]/50 text-xs space-y-1.5">
                      <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Customer Delivery Meta</h4>
                      <p className="text-gray-400">Phone: <span className="text-white font-bold">{o.phone}</span></p>
                      <p className="text-gray-400">City: <span className="text-white font-bold">{o.city}</span></p>
                      {o.note && <p className="text-gray-400 truncate">Note: <span className="text-gray-300 italic">"{o.note}"</span></p>}
                    </div>
                  </div>

                  {/* Total price bar */}
                  <div className="pt-3 border-t border-[#1a1e29]/40 flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status: <span className="text-amber-500 font-bold">PENDING MANUAL PAYMENT</span></span>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 mr-2 uppercase font-medium">Total Price:</span>
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
  );
}
