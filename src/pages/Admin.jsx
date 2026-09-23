import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Star,
  Flame,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    resetToDefaultProducts
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Product Filter
  const filteredProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q);
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingNew(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header */}
      <div className="bg-[#090d1a] border border-purple-500/30 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">Admin Dashboard</h1>
              <span className="text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Logged in as <span className="text-cyan-400 font-mono font-bold">dano.js</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefaultProducts}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 flex items-center gap-1.5 transition-all"
            title="Reset Catalog to initial seed data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Reset Seed Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 text-xs font-bold border border-red-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
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
          value={totalProducts}
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue (IQD)"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsAddingNew(false);
            setEditingProduct(null);
          }}
          className={`pb-3 text-sm font-extrabold flex items-center gap-2 transition-all border-b-2 cursor-pointer ${
            activeTab === 'products'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({totalProducts})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('orders');
            setIsAddingNew(false);
            setEditingProduct(null);
          }}
          className={`pb-3 text-sm font-extrabold flex items-center gap-2 transition-all border-b-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'border-purple-400 text-purple-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({totalOrders})</span>
        </button>
      </div>

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add or Edit Form Drawer */}
          {(isAddingNew || editingProduct) && (
            <AdminProductForm
              productToEdit={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsAddingNew(false);
                setEditingProduct(null);
              }}
            />
          )}

          {/* Search & Add Action Bar */}
          {!isAddingNew && !editingProduct && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090d1a] p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title or category..."
                  className="w-full bg-slate-950 text-xs text-slate-100 placeholder-slate-500 pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>

              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          )}

          {/* Product Table */}
          {!isAddingNew && !editingProduct && (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Platform</th>
                      <th className="p-4">Base Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Placements</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                            <ProductImage
                              src={p.image}
                              alt={p.name}
                              name={p.name}
                              category={p.category}
                              platform={p.platform}
                              className="h-full"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-white line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.type} • {p.packages?.length || 1} packs</p>
                          </div>
                        </td>

                        <td className="p-4 capitalize text-slate-300 font-medium">
                          {p.category.replace('-', ' ')}
                        </td>

                        <td className="p-4">
                          <span className="bg-slate-900 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                            {p.platform}
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
                            className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-center font-bold text-white focus:border-cyan-500"
                          />
                        </td>

                        <td className="p-4">
                          <div className="flex gap-1">
                            {p.isFeatured && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400" title="Featured Hero" />
                            )}
                            {p.isTrending && (
                              <span className="w-2 h-2 rounded-full bg-purple-400" title="New & Trending" />
                            )}
                            {p.isFlashDeal && (
                              <span className="w-2 h-2 rounded-full bg-amber-400" title="Flash Deal" />
                            )}
                            {p.isTopRated && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Top Rated" />
                            )}
                          </div>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 bg-red-950/40 border border-red-500/20 transition-colors"
                              title="Delete product"
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
        </div>
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-600" />
              <h3 className="text-base font-bold text-slate-200">No Orders Created Yet</h3>
              <p className="text-xs text-slate-400">Customer orders will show up here once placed.</p>
            </div>
          ) : (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Items Count</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Created Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-4 font-mono font-bold text-cyan-400">
                          #{ord.orderId}
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-white">{ord.customerName}</p>
                          <p className="text-[11px] text-slate-400">{ord.phone} • {ord.city}</p>
                          {ord.orderNote && (
                            <p className="text-[10px] text-purple-300 italic mt-0.5">"{ord.orderNote}"</p>
                          )}
                        </td>

                        <td className="p-4">
                          <span className="bg-slate-900 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold uppercase text-[10px]">
                            {ord.paymentMethod}
                          </span>
                        </td>

                        <td className="p-4 font-bold text-slate-300">
                          {ord.items?.length || 0} items
                        </td>

                        <td className="p-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                          {formatPrice(ord.totalAmount)}
                        </td>

                        <td className="p-4">
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-extrabold">
                            {ord.status || 'Pending Payment'}
                          </span>
                        </td>

                        <td className="p-4 text-right text-slate-400 text-[11px]">
                          {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Today'}
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
    </div>
  );
}
