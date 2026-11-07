import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit3,
  Trash2,
  LogOut,
  Search,
  RotateCcw,
  Sparkles,
  Flame,
  Zap,
  Star
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';

export function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefaultCatalog } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Orders stored in localStorage 'dano_orders'
  const orders = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('dano_orders') || '[]');
    } catch {
      return [];
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  }, [orders]);

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return products;
    const q = productSearch.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, productSearch]);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8 pb-16 pt-4">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Administration Portal</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Dano Store Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaultCatalog}
            title="Reset catalog back to initial default items"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors border border-red-500/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={products.length}
          subtitle="Active items in store"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          subtitle="Manual customer submissions"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Processed volume in IQD"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Invoices ({orders.length})</span>
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={handleOpenAdd}
            className="mb-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products in admin..."
                className="w-full bg-[#0d1222] text-xs text-slate-200 pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredProducts.length} items
            </span>
          </div>

          <div className="bg-[#0d1222] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#080c18] border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="p-3.5">Product Title</th>
                    <th className="p-3.5">Category / Platform</th>
                    <th className="p-3.5">Base Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-white line-clamp-1">{p.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{p.slug}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 uppercase">
                            {p.platform}
                          </span>
                          <span className="text-slate-400 text-[11px] capitalize">{p.category}</span>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-cyan-400">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={p.stock}
                            onChange={(e) => updateStock(p.id, e.target.value)}
                            className="w-16 bg-[#05070f] border border-slate-700 px-2 py-1 rounded text-xs text-center text-white"
                          />
                          {p.stock === 0 && (
                            <span className="text-[10px] text-red-400 font-bold uppercase">Out</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                            title="Toggle Featured"
                            className={`p-1 rounded ${p.isFeatured ? 'text-amber-400 bg-amber-500/20' : 'text-slate-600'}`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isTrending: !p.isTrending })}
                            title="Toggle Trending"
                            className={`p-1 rounded ${p.isTrending ? 'text-blue-400 bg-blue-500/20' : 'text-slate-600'}`}
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isFlashDeal: !p.isFlashDeal })}
                            title="Toggle Flash Deal"
                            className={`p-1 rounded ${p.isFlashDeal ? 'text-rose-400 bg-rose-500/20' : 'text-slate-600'}`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isTopRated: !p.isTopRated })}
                            title="Toggle Top Rated"
                            className={`p-1 rounded ${p.isTopRated ? 'text-yellow-400 bg-yellow-500/20' : 'text-slate-600'}`}
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete product "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                            title="Delete Product"
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
        </div>
      )}

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0d1222] border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
              <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <p className="font-bold text-white">No Customer Orders Yet</p>
              <p className="text-xs text-slate-500 mt-1">When customers submit checkout orders, they will show up here with full payment details.</p>
            </div>
          ) : (
            <div className="bg-[#0d1222] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#080c18] border-b border-slate-800 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer / Phone</th>
                      <th className="p-3.5">City</th>
                      <th className="p-3.5">Selected Payment</th>
                      <th className="p-3.5">Total (IQD)</th>
                      <th className="p-3.5">Items / Note</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {orders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-400">
                          {o.orderId}
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-col">
                            <span className="font-bold text-white">{o.customerName}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{o.phone}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {o.city}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5 font-black text-emerald-400">
                          {formatPrice(o.totalAmount)}
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <div className="text-[11px] text-slate-300 line-clamp-2">
                            {o.items?.map((it) => `${it.name} (${it.quantity})`).join(', ')}
                          </div>
                          {o.orderNote && (
                            <span className="text-[10px] text-slate-500 block truncate">
                              Note: {o.orderNote}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {o.status || 'Pending'}
                          </span>
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

      {/* Admin Product Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleSaveProduct}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default Admin;
