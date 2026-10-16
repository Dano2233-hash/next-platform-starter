import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useProducts } from '../hooks/useProducts.jsx';
import { AdminProductForm } from '../components/AdminProductForm.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { ProductImage } from '../components/ProductImage.jsx';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Search,
  Filter,
  CheckCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaultProducts } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState('all');

  // Load orders from Local Storage
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('dano_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (e) {
      console.error('Failed to parse orders from localStorage', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleStockChange = (id, newStock) => {
    updateProduct(id, { stock: Math.max(0, newStock) });
  };

  // Metrics calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  // Filtering products
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    if (!matchSearch) return false;

    if (stockFilter === 'in-stock') return (p.stock || 0) > 0;
    if (stockFilter === 'out-of-stock') return (p.stock || 0) <= 0;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">
            Protected Admin Area
          </span>
          <h1 className="text-2xl font-black text-slate-100 mt-1">
            Dano Store Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Manage product inventory, stock levels, packages, and customer orders
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefaultProducts}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            title="Reset catalog to initial preset data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtext="Active game titles & packages"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtext="Saved in Local Storage"
          icon={ShoppingBag}
          color="emerald"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Calculated from created orders"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Tabs Control */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && !isFormOpen && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-md shadow-cyan-950/40 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        )}
      </div>

      {/* Product Form Modal / Section */}
      {isFormOpen && (
        <AdminProductForm
          initialProduct={editingProduct}
          onSubmit={handleSaveProduct}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-100 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="bg-slate-950 text-xs font-bold text-slate-200 rounded-xl px-3 py-2 border border-slate-800 focus:outline-none"
              >
                <option value="all">All Stock Status</option>
                <option value="in-stock">In Stock Only</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-900/80">
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Platform</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Badges</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <ProductImage product={p} className="w-10 h-10 rounded-lg flex-shrink-0" />
                      <div>
                        <span className="font-extrabold text-slate-200 block line-clamp-1">{p.name}</span>
                        <span className="text-[10px] text-slate-500">{p.packages?.length || 0} packages</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300 font-semibold capitalize">
                      {p.category ? p.category.replace('-', ' ') : 'General'}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-[10px]">
                        {p.platform}
                      </span>
                    </td>
                    <td className="p-3.5 font-extrabold text-slate-200">
                      {formatPrice(p.price)}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={p.stock !== undefined ? p.stock : 0}
                          onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                          className="w-16 bg-slate-950 text-xs font-bold text-slate-100 rounded-lg px-2 py-1 border border-slate-800"
                        />
                        {p.stock <= 0 && (
                          <span className="text-[9px] font-bold text-rose-400 uppercase">Out</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && (
                          <span className="text-[9px] bg-purple-950 text-purple-300 border border-purple-800 px-1.5 py-0.5 rounded font-bold">
                            Featured
                          </span>
                        )}
                        {p.isTrending && (
                          <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded font-bold">
                            Trending
                          </span>
                        )}
                        {p.isFlashDeal && (
                          <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded font-bold">
                            Flash
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setIsFormOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg"
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

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-extrabold text-slate-100 border-b border-slate-800 pb-3">
            Customer Orders Log
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No orders registered in Local Storage yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-xs font-black text-cyan-400">Order #{ord.id}</span>
                      <span className="text-[11px] text-slate-500 block">
                        {new Date(ord.date).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Method: {ord.customer?.paymentMethod || 'Manual'}
                      </span>
                      <span className="text-xs font-black text-slate-100">
                        {formatPrice(ord.totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Customer Name</span>
                      <span className="font-bold text-slate-200">{ord.customer?.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone</span>
                      <span className="font-bold text-slate-200">{ord.customer?.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">City</span>
                      <span className="font-bold text-slate-200">{ord.customer?.city}</span>
                    </div>
                  </div>

                  {ord.customer?.note && (
                    <div className="text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-slate-300">
                      <span className="text-slate-500 font-bold block">Note / Player ID:</span>
                      {ord.customer.note}
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Ordered Items:
                    </span>
                    <div className="space-y-1">
                      {ord.items?.map((it, idx) => (
                        <div key={idx} className="text-xs text-slate-300 flex justify-between">
                          <span>
                            • {it.product?.name} ({it.selectedPackage?.name}) x{it.quantity}
                          </span>
                          <span className="font-bold text-slate-400">
                            {formatPrice(it.price * it.quantity)}
                          </span>
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
