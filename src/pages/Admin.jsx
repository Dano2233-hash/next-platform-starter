import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Search,
  CheckCircle,
  XCircle,
  Zap,
  Flame,
  Star,
  Sparkles
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const {
    products,
    orders,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
    resetToInitialProducts
  } = useProducts();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  // Filtered products list
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductSubmit = (productData) => {
    if (editingProduct) {
      editProduct(productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingNew(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Control Bar */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h1 className="text-2xl font-black text-white">Dano Store Management</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as superadmin (<strong className="text-cyan-400">dano.js</strong>). Full catalog & order rights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to initial preset items?')) {
                resetToInitialProducts();
              }
            }}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          subtitle="Active items in store"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          subtitle="Customer order history"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          subtitle="Cumulative IQD earnings"
        />
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsAddingNew(false);
            setEditingProduct(null);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('orders');
            setIsAddingNew(false);
            setEditingProduct(null);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* Tab: Products */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add / Edit Form Modal or View */}
          {isAddingNew || editingProduct ? (
            <AdminProductForm
              product={editingProduct}
              onSubmit={handleProductSubmit}
              onCancel={() => {
                setIsAddingNew(false);
                setEditingProduct(null);
              }}
            />
          ) : (
            <>
              {/* Product Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090f1e] border border-slate-800 p-4 rounded-2xl">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>

                <button
                  onClick={() => setIsAddingNew(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-[#090f1e] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-4">Item</th>
                        <th className="p-4">Category / Platform</th>
                        <th className="p-4">Base Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Badges</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-slate-900/60 transition-colors">
                          {/* Image & Title */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                                {prod.image ? (
                                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                                    DS
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-white">{prod.name}</p>
                                <p className="text-[10px] text-slate-500 font-mono">ID: {prod.id}</p>
                              </div>
                            </div>
                          </td>

                          {/* Category / Platform */}
                          <td className="p-4">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/20 inline-block">
                                {prod.platform}
                              </span>
                              <p className="text-[11px] text-slate-400">{prod.category}</p>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="p-4 font-extrabold text-white">
                            {formatPrice(prod.price)}
                          </td>

                          {/* Stock Quick Control */}
                          <td className="p-4">
                            <input
                              type="number"
                              value={prod.stock}
                              onChange={(e) => updateStock(prod.id, e.target.value)}
                              className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-bold text-cyan-400 focus:outline-none focus:border-cyan-500"
                            />
                          </td>

                          {/* Featured Badges */}
                          <td className="p-4">
                            <div className="flex flex-wrap items-center gap-1">
                              {prod.isFeatured && (
                                <span className="bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded text-[9px] font-bold">Featured</span>
                              )}
                              {prod.isTrending && (
                                <span className="bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded text-[9px] font-bold">Trending</span>
                              )}
                              {prod.isFlashDeal && (
                                <span className="bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-bold">Flash</span>
                              )}
                            </div>
                          </td>

                          {/* Action Buttons */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingProduct(prod)}
                                className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-900 rounded-lg hover:bg-slate-800 border border-slate-800"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete ${prod.name}?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-900 rounded-lg hover:bg-slate-800 border border-slate-800"
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
            </>
          )}
        </div>
      )}

      {/* Tab: Customer Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-12 text-center space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Customer Orders Yet</h3>
              <p className="text-xs text-slate-400">New orders placed by customers will be displayed here in real-time.</p>
            </div>
          ) : (
            orders.map((ord, idx) => (
              <div key={idx} className="bg-[#090f1e] border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-cyan-400 text-sm">#{ord.orderId}</span>
                      <span className="text-[10px] uppercase font-extrabold bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                        {ord.customer?.paymentMethod}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Placed on {new Date(ord.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Amount</span>
                    <span className="text-base font-black text-white">{formatPrice(ord.totalAmount)}</span>
                  </div>
                </div>

                {/* Customer Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <div>Name: <strong className="text-white">{ord.customer?.name}</strong></div>
                  <div>Phone: <strong className="text-cyan-400">{ord.customer?.phone}</strong></div>
                  <div>City: <strong className="text-white">{ord.customer?.city}</strong></div>
                  <div>Payment: <strong className="text-purple-400">{ord.customer?.paymentMethod}</strong></div>
                  {ord.customer?.note && (
                    <div className="col-span-2 sm:col-span-4 pt-1 border-t border-slate-800/80">
                      Note/ID: <span className="text-slate-200">{ord.customer?.note}</span>
                    </div>
                  )}
                </div>

                {/* Items Breakdown */}
                <div className="space-y-2">
                  {ord.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-[8px]">
                              DS
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-[10px] text-cyan-400">
                            {item.selectedPackage?.name} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-300">
                        {formatPrice(item.cartUnitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
